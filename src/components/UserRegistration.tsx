// src/components/UserRegistration.tsx
import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useUserRegistration } from '@/hooks/useUserRegistration';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ProfileT } from '@/types/ProfilesT';

export const UserRegistration = () => {
  const [searchParams] = useSearchParams();
  const { handleSubmit } = useUserRegistration();
  
  const planId = searchParams.get('planId');
  const planName = searchParams.get('planName');
  const price = searchParams.get('price');
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleSubmit(formData as ProfileT);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Cadastro para {planName}</CardTitle>
          <p className="text-gray-600">Preço: R$ {price}</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-4">
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
            <Button type="submit" className="w-full">
              Continuar para Checkout
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};