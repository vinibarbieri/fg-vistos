// src/components/UserRegistration.tsx
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useUserRegistration } from '@/hooks/useUserRegistration';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UserRegistrationData } from '@/hooks/useUserRegistration';

export const UserRegistration = () => {
  const [searchParams] = useSearchParams();
  const { handleSubmit } = useUserRegistration();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    quantity: 1
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Cadastre-se para continuar com o pagamento do plano {searchParams.get('planName')}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-4">
            <Input
              type="number"
              placeholder="Quantas pessoas?"
              value={formData.quantity}
              onChange={(e) => setFormData({...formData, quantity: Number(e.target.value)})}
              required
            />
            <Input
              placeholder="Nome completo"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
            />
            <Input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
            />
            <Input
              type="password"
              placeholder="Senha"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              required
            />
            {error && (
              <p className="text-sm text-red-600">{error}</p>
            )}
            
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Criando conta..." : "Continuar para Checkout"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};