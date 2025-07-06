import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { cnCountries, isValidCountry } from '@/cn/cnCountries';

interface VisaSelectorProps {
  selectedCountryProp?: string;
  showWhatsAppButton?: boolean;
}

const VisaSelector = ({ selectedCountryProp, showWhatsAppButton = false }: VisaSelectorProps) => {
  const [selectedCountry, setSelectedCountry] = useState('Estados Unidos');
  const [selectedVisaType, setSelectedVisaType] = useState('Turismo');
  const visaTypes = ['Turismo', 'Negócios', 'Estudo', 'Trabalho'];

  // Atualiza o país selecionado quando recebe prop
  useEffect(() => {
    if (selectedCountryProp && isValidCountry(selectedCountryProp)) {
      setSelectedCountry(selectedCountryProp);
    }
  }, [selectedCountryProp]);

  const plans = {
    'Estados Unidos': {
      'Turismo': [
        {
          name: 'Básico',
          price: 'R$ 890',
          services: ['Preenchimento do DS-160', 'Agendamento da entrevista', 'Suporte por WhatsApp', 'Checklist de documentos']
        },
        {
          name: 'Premium',
          price: 'R$ 1.590',
          services: ['Tudo do plano Básico', 'Preparação para entrevista', 'Análise de perfil', 'Acompanhamento até aprovação', 'Suporte prioritário']
        },
        {
          name: 'VIP',
          price: 'R$ 2.890',
          services: ['Tudo do plano Premium', 'Consultor dedicado', 'Revisão completa de documentos', 'Simulação de entrevista', 'Garantia de reembolso*']
        }
      ],
      'Negócios': [
        {
          name: 'Executivo',
          price: 'R$ 1.890',
          services: ['Preenchimento especializado', 'Carta convite empresarial', 'Documentação corporativa', 'Suporte executivo']
        }
      ]
    },
    'Canadá': {
      'Turismo': [
        {
          name: 'Básico',
          price: 'R$ 990',
          services: ['Preenchimento do DS-160', 'Agendamento da entrevista', 'Suporte por WhatsApp', 'Checklist de documentos']
        },
        {
          name: 'Premium',
          price: 'R$ 1.390',
          services: ['Tudo do plano Básico', 'Preparação para entrevista', 'Análise de perfil', 'Acompanhamento até aprovação', 'Suporte prioritário']
        },
        {
          name: 'VIP',
          price: 'R$ 3.290',
          services: ['Tudo do plano Premium', 'Consultor dedicado', 'Revisão completa de documentos', 'Simulação de entrevista', 'Garantia de reembolso*']
        }
      ],
      'Negócios': [
        {
          name: 'Executivo',
          price: 'R$ 1.890',
          services: ['Preenchimento especializado', 'Carta convite empresarial', 'Documentação corporativa', 'Suporte executivo']
        }
      ]
    },
  };

  const currentPlans = plans[selectedCountry]?.[selectedVisaType] || [];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">
            Escolha seu Destino e Tipo de Visto
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Selecione o país e tipo de visto desejado para ver nossos planos especializados
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">País de Destino</label>
              <select 
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
              >
                {cnCountries.map(country => (
                  <option key={country.name} value={country.name}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de Visto</label>
              <select 
                value={selectedVisaType}
                onChange={(e) => setSelectedVisaType(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
              >
                {visaTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {currentPlans.map((plan, index) => (
              <Card key={index} className={`relative ${index === 1 ? 'border-primary border-2 transform scale-105' : ''}`}>
                {index === 1 && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-primary text-white px-4 py-1 rounded-full text-sm font-medium">
                      Mais Popular
                    </span>
                  </div>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-xl text-secondary">{plan.name}</CardTitle>
                  <div className="text-3xl font-bold text-primary">{plan.price}</div>
                  <p className="text-sm text-gray-500 mt-2">* Valor não inclui taxa consular</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {plan.services.map((service, serviceIndex) => (
                      <li key={serviceIndex} className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{service}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="space-y-3">
                    <Link to="/checkout">
                      <Button 
                        className={`w-full ${index === 1 ? 'bg-primary hover:bg-primary/90' : 'bg-secondary hover:bg-secondary/90'}`}
                      >
                        Escolher Plano
                      </Button>
                    </Link>
                    
                    {showWhatsAppButton && (
                      <Button 
                        variant="outline"
                        className="w-full border-primary text-primary hover:bg-primary hover:text-white"
                        onClick={() => {
                          const message = `Olá, estou planejando uma viagem de *${selectedVisaType.toLowerCase()}* para o *${selectedCountry}* e preciso de mais informações sobre o processo de visto. 
                          \nTenho interesse no plano *${plan.name}*. Poderiam me auxiliar com os próximos passos?`;
                          const encodedMessage = encodeURIComponent(message);
                          window.open(`https://api.whatsapp.com/send?phone=5548998231163&text=${encodedMessage}`, '_blank');
                        }}
                      >
                        Falar com Atendente
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisaSelector;
