// src/hooks/useInfinitePayCheckout.ts
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { infinitePayService, CreateCheckoutLinkRequest, PaymentCheckRequest } from '@/services/infinitePay';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/services/supabase';
import { INFINITEPAY_CONFIG } from '@/services/infinitePay_config';

export const useInfinitePayCheckout = (orderId: string | null) => {
  const [isCreatingCheckout, setIsCreatingCheckout] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Buscar dados da order
  const { data: orderData, isLoading: isLoadingOrder } = useQuery({
    queryKey: ['order', orderId],
    queryFn: async () => {
      if (!orderId) return null;
      
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          profiles (id, name, email),
          plans (id, plan_name, price),
          visas (name, country)
        `)
        .eq('id', orderId)
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: !!orderId,
  });

  /**
   * Cria o link de checkout no InfinitePay
   */
  const createCheckout = async () => {
    if (!orderData) {
      setCheckoutError('Dados da order não encontrados');
      return;
    }

    // Validar configuração antes de prosseguir
    if (!INFINITEPAY_CONFIG.HANDLE || INFINITEPAY_CONFIG.HANDLE === 'seu_handle_aqui') {
      setCheckoutError(INFINITEPAY_CONFIG.ERROR_MESSAGES.INVALID_HANDLE);
      return;
    }

    setIsCreatingCheckout(true);
    setCheckoutError(null);

    try {
      // Preparar dados para o InfinitePay
      const checkoutData: CreateCheckoutLinkRequest = {
        handle: INFINITEPAY_CONFIG.HANDLE,
        redirect_url: `${window.location.origin}${INFINITEPAY_CONFIG.REDIRECT_URLS.SUCCESS}?orderId=${orderId}`,
        webhook_url: `${window.location.origin}${INFINITEPAY_CONFIG.WEBHOOK.URL}`,
        order_nsu: orderId,
        customer: {
          name: orderData.profiles.name,
          email: orderData.profiles.email,
        },
        items: [
          {
            quantity: orderData.applicants_quantity,
            price: infinitePayService.convertToCents(parseFloat(orderData.plans.price)),
            description: `Plano ${orderData.plans.plan_name} - ${orderData.plans.visa.name} - ${orderData.plans.visa.country_key}`,
          },
        ],
      };

      // Criar link de checkout
      const response = await infinitePayService.createCheckoutLink(checkoutData);
      
      // Atualizar status da order para "checkout_created"
      await supabase
        .from('orders')
        .update({ 
          payment_status: INFINITEPAY_CONFIG.PAYMENT_STATUS.CHECKOUT_CREATED,
          payment_details: {
            ...orderData.payment_details,
            checkout_url: response.url,
            created_at: new Date().toISOString(),
            handle: INFINITEPAY_CONFIG.HANDLE,
          }
        })
        .eq('id', orderId);

      // Redirecionar para o checkout do InfinitePay
      window.location.href = response.url;

    } catch (error) {
      console.error('Erro ao criar checkout:', error);
      setCheckoutError(error instanceof Error ? error.message : 'Erro desconhecido ao criar checkout');
    } finally {
      setIsCreatingCheckout(false);
    }
  };

  /**
   * Verifica o status de um pagamento
   */
  const checkPaymentStatus = async (transactionNsu: string, slug: string) => {
    if (!orderId) return null;

    try {
      const data: PaymentCheckRequest = {
        handle: INFINITEPAY_CONFIG.HANDLE,
        order_nsu: orderId,
        transaction_nsu: transactionNsu,
        slug: slug,
      };

      const response = await infinitePayService.checkPaymentStatus(data);
      
      // Atualizar status da order baseado na resposta
      if (response.success && response.paid) {
        await supabase
          .from('orders')
          .update({ 
            payment_status: INFINITEPAY_CONFIG.PAYMENT_STATUS.PAID,
            payment_details: {
              ...orderData?.payment_details,
              transaction_nsu: transactionNsu,
              slug: slug,
              paid_amount: infinitePayService.convertFromCents(response.paid_amount),
              capture_method: response.capture_method,
              paid_at: new Date().toISOString(),
              installments: response.installments,
            }
          })
          .eq('id', orderId);
      } else {
        // Pagamento não foi aprovado
        await supabase
          .from('orders')
          .update({ 
            payment_status: INFINITEPAY_CONFIG.PAYMENT_STATUS.FAILED,
            payment_details: {
              ...orderData?.payment_details,
              transaction_nsu: transactionNsu,
              slug: slug,
              failed_at: new Date().toISOString(),
              failure_reason: 'Pagamento não foi aprovado pelo InfinitePay',
            }
          })
          .eq('id', orderId);
      }

      return response;
    } catch (error) {
      console.error('Erro ao verificar status do pagamento:', error);
      throw error;
    }
  };

  /**
   * Processa retorno do pagamento (quando usuário volta do InfinitePay)
   */
  const processPaymentReturn = async (searchParams: URLSearchParams) => {
    const transactionNsu = searchParams.get('transaction_nsu');
    const slug = searchParams.get('slug');
    const receiptUrl = searchParams.get('receipt_url');
    const captureMethod = searchParams.get('capture_method');

    if (transactionNsu && slug && orderId) {
      try {
        // Verificar status do pagamento
        const paymentStatus = await checkPaymentStatus(transactionNsu, slug);
        
        if (paymentStatus?.success && paymentStatus.paid) {
          // Atualizar order com dados do pagamento
          await supabase
            .from('orders')
            .update({ 
              payment_status: INFINITEPAY_CONFIG.PAYMENT_STATUS.PAID,
              payment_details: {
                ...orderData?.payment_details,
                transaction_nsu: transactionNsu,
                slug: slug,
                receipt_url: receiptUrl,
                capture_method: captureMethod,
                paid_at: new Date().toISOString(),
                installments: paymentStatus.installments,
              }
            })
            .eq('id', orderId);

          // Redirecionar para página de sucesso
          navigate(`${INFINITEPAY_CONFIG.REDIRECT_URLS.SUCCESS}?orderId=${orderId}&status=paid`);
        } else {
          // Pagamento não foi aprovado
          navigate(`${INFINITEPAY_CONFIG.REDIRECT_URLS.FAILED}&orderId=${orderId}`);
        }
      } catch (error) {
        console.error('Erro ao processar retorno do pagamento:', error);
        navigate(`${INFINITEPAY_CONFIG.REDIRECT_URLS.ERROR}&orderId=${orderId}`);
      }
    }
  };

  return {
    orderData,
    isLoadingOrder,
    isCreatingCheckout,
    checkoutError,
    createCheckout,
    checkPaymentStatus,
    processPaymentReturn,
    config: infinitePayService.getConfig(),
  };
};
