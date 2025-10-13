// src/components/UserRegistration.tsx
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useUserRegistration } from '@/hooks/useUserRegistration';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { UserRegistrationData } from '@/hooks/useUserRegistration';
import { usePlanById } from '@/hooks/usePlanById';
import { useVisasById } from '@/hooks/useVisasById';
import { PlansT } from '@/types/PlansT';
import { VisasT } from '@/types/VisasT';
import { useDocumentById } from '@/hooks/useDocumentById';

export const UserRegistration = () => {
  const [searchParams] = useSearchParams();
  const { handleSubmit } = useUserRegistration();
  const planId = searchParams.get('planId') || '';
  const { documentData: plan, isLoading: isLoadingPlan, error: errorPlan } = useDocumentById<PlansT>(planId, 'plans');
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    quantity: 1
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Hook para buscar o visto - só executa quando o plano estiver carregado e tiver visa_id
  const { visa, isLoading: isLoadingVisa, error: errorVisa } = useVisasById(
    plan?.visa_id || '', 
    !isLoadingPlan && !!plan?.visa_id
  );

  // Função para calcular o valor total
  const calculateTotal = () => {
    if (!plan) return 0;
    return plan.price * formData.quantity;
  };

  // Função para formatar moeda
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      await handleSubmit(formData as UserRegistrationData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro no cadastro');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoadingPlan) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-2xl mx-auto">
          <CardContent className="p-6">
            <div className="text-center space-y-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="text-gray-600">Carregando informações do plano...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (errorPlan || !plan) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-2xl mx-auto">
          <CardContent className="p-6">
            <div className="text-center space-y-4">
              <div className="text-red-600 text-lg font-semibold">
                Erro ao carregar o plano
              </div>
              <p className="text-gray-600">
                {errorPlan?.message || 'Plano não encontrado. Verifique se o link está correto.'}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto space-y-6">

        {/* Card do formulário */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">
              Complete seus dados para prosseguir
            </CardTitle>
            <p className="text-sm text-gray-600">
              Preencha as informações abaixo para criar sua conta e continuar com o pagamento
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={onSubmit} className="space-y-6">
              {/* Seleção de quantidade */}
              <div className="space-y-2">
                <Label htmlFor="quantity" className="text-sm font-medium">
                  Quantas pessoas? *
                </Label>
                <div className="flex items-center space-x-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setFormData({...formData, quantity: Math.max(1, formData.quantity - 1)})}
                    disabled={formData.quantity <= 1}
                  >
                    -
                  </Button>
                  <Input
                    id="quantity"
                    type="number"
                    min="1"
                    value={formData.quantity}
                    onChange={(e) => setFormData({...formData, quantity: Math.max(1, Number(e.target.value))})}
                    className="text-center w-20"
                    required
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setFormData({...formData, quantity: formData.quantity + 1})}
                  >
                    +
                  </Button>
                </div>
                <p className="text-xs text-gray-500">
                  Selecione quantas pessoas serão incluídas no plano
                </p>
              </div>

              <Separator />

              {/* Dados pessoais */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium">
                    Nome completo *
                  </Label>
                  <Input
                    id="name"
                    placeholder="Digite seu nome completo"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">
                    Email *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium">
                    Senha *
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Crie uma senha segura"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    required
                  />
                </div>
              </div>

              {/* Resumo do valor */}
              <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                <div className="flex justify-between text-sm ">
                  <span>Serviço:</span>
                  <span className="font-medium">
                  {visa?.name || 'Carregando...'}
                  </span>
                </div>
                <div className="flex justify-between text-sm ">
                  <span>País:</span>
                  <span className="font-medium">
                  {visa?.country}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Quantidade:</span>
                  <span className="font-medium">{formData.quantity} pessoa{formData.quantity > 1 ? 's' : ''}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Plano Selecionado:</span>
                  <span className="font-medium">
                    {plan?.plan_name}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Valor unitário:</span>
                  <span>{plan?.price ? formatCurrency(plan.price) : 'Carregando...'}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-bold text-green-600">
                  <span>Total:</span>
                  <span>{formatCurrency(calculateTotal())}</span>
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}
              
              <Button type="submit" className="w-full" disabled={isLoading} size="lg">
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Criando conta...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <span>Continuar para Checkout</span>
                  </div>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};