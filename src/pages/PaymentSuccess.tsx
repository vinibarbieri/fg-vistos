// src/pages/PaymentSuccess.tsx
import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useInfinitePayCheckout } from '@/hooks/useInfinitePayCheckout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, XCircle, AlertCircle, Loader2, Receipt, CreditCard } from 'lucide-react';

export const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const orderId = searchParams.get('orderId');
  const status = searchParams.get('status');
  
  const { orderData, isLoadingOrder, processPaymentReturn } = useInfinitePayCheckout(orderId);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (orderId && !status) {
      // Processar retorno do pagamento se não tiver status
      setIsProcessing(true);
      processPaymentReturn(searchParams).finally(() => {
        setIsProcessing(false);
      });
    }
  }, [orderId, status, searchParams, processPaymentReturn]);

  if (isLoadingOrder || isProcessing) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          <span className="ml-2 text-lg">Processando pagamento...</span>
        </div>
      </div>
    );
  }

  if (!orderData) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Pedido não encontrado. Verifique se o link está correto.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  const renderPaymentStatus = () => {
    switch (status) {
      case 'paid':
        return (
          <div className="text-center">
            <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-green-600 mb-2">Pagamento Aprovado!</h2>
            <p className="text-gray-600 mb-6">
              Seu pagamento foi processado com sucesso. Em breve você receberá um email com os próximos passos.
            </p>
            
            {/* Detalhes do Pagamento */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-green-800 mb-3">Detalhes do Pagamento</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Plano:</span>
                  <span className="font-medium">{orderData.plans.plan_name}</span>
                </div>
                <div className="flex justify-between">
                  <span>Valor Pago:</span>
                  <span className="font-bold text-green-600">
                    R$ {parseFloat(orderData.plans.price).toFixed(2).replace('.', ',')}
                  </span>
                </div>
                {orderData.payment_details?.capture_method && (
                  <div className="flex justify-between">
                    <span>Forma de Pagamento:</span>
                    <span className="font-medium capitalize">
                      {orderData.payment_details.capture_method === 'credit_card' ? 'Cartão de Crédito' : 'PIX'}
                    </span>
                  </div>
                )}
                {orderData.payment_details?.transaction_nsu && (
                  <div className="flex justify-between">
                    <span>ID da Transação:</span>
                    <span className="font-mono text-xs">{orderData.payment_details.transaction_nsu}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Botões de Ação */}
            <div className="space-y-3">
              {orderData.payment_details?.receipt_url && (
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => window.open(orderData.payment_details.receipt_url, '_blank')}
                >
                  <Receipt className="mr-2 h-4 w-4" />
                  Ver Comprovante
                </Button>
              )}
              <Button 
                className="w-full"
                onClick={() => navigate('/')}
              >
                Voltar ao Início
              </Button>
            </div>
          </div>
        );

      case 'failed':
        return (
          <div className="text-center">
            <XCircle className="h-16 w-16 text-red-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-red-600 mb-2">Pagamento Não Aprovado</h2>
            <p className="text-gray-600 mb-6">
              Houve um problema com seu pagamento. Verifique os dados e tente novamente.
            </p>
            
            <div className="space-y-3">
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => navigate(`/checkout?orderId=${orderId}`)}
              >
                <CreditCard className="mr-2 h-4 w-4" />
                Tentar Novamente
              </Button>
              <Button 
                className="w-full"
                onClick={() => navigate('/')}
              >
                Voltar ao Início
              </Button>
            </div>
          </div>
        );

      case 'error':
        return (
          <div className="text-center">
            <AlertCircle className="h-16 w-16 text-orange-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-orange-600 mb-2">Erro no Processamento</h2>
            <p className="text-gray-600 mb-6">
              Ocorreu um erro ao processar seu pagamento. Entre em contato conosco para obter ajuda.
            </p>
            
            <div className="space-y-3">
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => navigate('/contato')}
              >
                Entrar em Contato
              </Button>
              <Button 
                className="w-full"
                onClick={() => navigate('/')}
              >
                Voltar ao Início
              </Button>
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center">
            <Loader2 className="h-16 w-16 text-blue-600 mx-auto mb-4 animate-spin" />
            <h2 className="text-2xl font-bold text-blue-600 mb-2">Verificando Pagamento</h2>
            <p className="text-gray-600 mb-6">
              Aguarde enquanto verificamos o status do seu pagamento...
            </p>
          </div>
        );
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-center">
            Status do Pagamento
          </CardTitle>
        </CardHeader>
        <CardContent>
          {renderPaymentStatus()}
        </CardContent>
      </Card>
    </div>
  );
};
