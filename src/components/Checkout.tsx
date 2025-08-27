// src/components/Checkout.tsx
import { useSearchParams } from 'react-router-dom';
import { useInfinitePayCheckout } from '@/hooks/useInfinitePayCheckout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, CreditCard, CheckCircle, AlertCircle } from 'lucide-react';

export const Checkout = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('orderId');
  
  const { 
    orderData, 
    isLoadingOrder, 
    isCreatingCheckout, 
    checkoutError, 
    createCheckout 
  } = useInfinitePayCheckout(orderId);
  
  if (isLoadingOrder) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          <span className="ml-2 text-lg">Carregando dados do pedido...</span>
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

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-6 w-6 text-blue-600" />
            Checkout
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Resumo do Plano */}
          <div className="border-b pb-4">
            <h3 className="font-semibold mb-3 text-lg">Resumo do Pedido</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>País:</span>
                <span className="font-medium">{orderData.plans.visa.country}</span>
              </div>
              <div className="flex justify-between">
                <span>Visto:</span>
                <span className="font-medium">{orderData.plans.visa.name}</span>
              </div>
              <div className="flex justify-between">
                <span>Plano:</span>
                <span className="font-medium">{orderData.plans.plan_name}</span>
              </div>
              <div className="flex justify-between">
                <span>Preço:</span>
                <span className="font-bold text-lg text-green-600">
                  R$ {parseFloat(orderData.plans.price).toFixed(2).replace('.', ',')}
                </span>
              </div>
              {orderData.plans.description && (
                <div className="text-sm text-gray-600 mt-2">
                  {orderData.plans.description}
                </div>
              )}
            </div>
          </div>
          
          {/* Dados do Usuário */}
          <div className="border-b pb-4">
            <h3 className="font-semibold mb-3 text-lg">Dados do Solicitante</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Nome:</span>
                <span className="font-medium">{orderData.profiles.name}</span>
              </div>
              <div className="flex justify-between">
                <span>Email:</span>
                <span className="font-medium">{orderData.profiles.email}</span>
              </div>
              {orderData.profiles.phone_number && (
                <div className="flex justify-between">
                  <span>Telefone:</span>
                  <span className="font-medium">{orderData.profiles.phone_number}</span>
                </div>
              )}
            </div>
          </div>

          {/* Status do Pagamento */}
          {orderData.payment_status && (
            <div className="border-b pb-4">
              <h3 className="font-semibold mb-3 text-lg">Status do Pagamento</h3>
              <div className="flex items-center gap-2">
                {orderData.payment_status === 'paid' ? (
                  <>
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="text-green-600 font-medium">Pagamento Aprovado</span>
                  </>
                ) : orderData.payment_status === 'checkout_created' ? (
                  <>
                    <Loader2 className="h-5 w-5 text-blue-600 animate-spin" />
                    <span className="text-blue-600 font-medium">Checkout Criado</span>
                  </>
                ) : (
                  <>
                    <AlertCircle className="h-5 w-5 text-orange-600" />
                    <span className="text-orange-600 font-medium">Aguardando Pagamento</span>
                  </>
                )}
              </div>
            </div>
          )}
          
          {/* Erro do Checkout */}
          {checkoutError && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{checkoutError}</AlertDescription>
            </Alert>
          )}

          {/* Botão de Pagamento */}
          {orderData.payment_status !== 'paid' && (
            <Button 
              className="w-full" 
              size="lg" 
              onClick={createCheckout}
              disabled={isCreatingCheckout}
            >
              {isCreatingCheckout ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Criando Checkout...
                </>
              ) : (
                <>
                  <CreditCard className="mr-2 h-4 w-4" />
                  Finalizar Pagamento
                </>
              )}
            </Button>
          )}

          {/* Informações de Segurança */}
          <div className="text-xs text-gray-500 text-center pt-4 border-t">
            <p>🔒 Seus dados estão protegidos e o pagamento é processado com segurança pela InfinitePay</p>
            <p className="mt-1">💳 Aceitamos cartões de crédito e PIX</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};