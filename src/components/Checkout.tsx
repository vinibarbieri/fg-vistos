// src/components/Checkout.tsx
import { useCheckout } from '@/hooks/useCheckout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export const Checkout = () => {
  const { orderData } = useCheckout();
  
  if (!orderData) {
    return <div className="text-center py-8">Carregando...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Checkout - {orderData.plans.plan_name}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Resumo do Plano */}
          <div className="border-b pb-4">
            <h3 className="font-semibold mb-2">Resumo do Plano</h3>
            <p>Plano: {orderData.plans.plan_name}</p>
            <p>Preço: R$ {orderData.plans.price}</p>
          </div>
          
          {/* Dados do Usuário */}
          <div className="border-b pb-4">
            <h3 className="font-semibold mb-2">Dados do Solicitante</h3>
            <p>Nome: {orderData.profiles.name}</p>
            <p>Email: {orderData.profiles.email}</p>
          </div>
          
          {/* Botão de Pagamento */}
          <Button className="w-full" size="lg">
            Finalizar Pagamento
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};