import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Loader2, AlertCircle } from 'lucide-react';
import { cnCountries, isValidCountry } from '@/cn/cnCountries';
import { useVisaPlans } from '@/hooks/useVisaPlans';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useCountryVisaTypes from '@/hooks/useCountryVisaTypes';


interface VisaSelectorProps {
  selectedCountryProp?: string;
  showWhatsAppButton?: boolean;
}


const VisaSelector = ({ selectedCountryProp, showWhatsAppButton = false }: VisaSelectorProps) => {
  const [selectedCountry, setSelectedCountry] = useState('eua');
  const [selectedVisaType, setSelectedVisaType] = useState('visto');

  const { data: visaTypes, isLoading: isLoadingVisaTypes, isError: isVisaTypesError } = useCountryVisaTypes({
    country: selectedCountry
  });

  // Buscar planos do Supabase
  const { plans, isLoading: isLoadingPlans, isError: isPlansError, error: plansError } = useVisaPlans({ 
    country: selectedCountry, 
    visa_type: selectedVisaType 
  });

  // Atualiza o país selecionado quando recebe prop
  useEffect(() => {
    if (selectedCountryProp && isValidCountry(selectedCountryProp)) {
      setSelectedCountry(selectedCountryProp);
    }
  }, [selectedCountryProp]);

  // Função para formatar preço
  const formatPrice = (price: number) => {
    return `R$ ${price.toLocaleString('pt-BR')}`;
  };

  // Renderizar erro
  if (isPlansError) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-secondary mb-6">
              Encontre o visto certo para o seu destino
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Selecione o país e tipo de visto desejado para ver nossos planos
            </p>
          </div>
          <div className="flex justify-center items-center py-20">
            <AlertCircle className="h-12 w-12 text-red-500 mr-3" />
            <div className="text-center">
              <p className="text-lg text-red-600 font-medium">Erro ao carregar planos</p>
              <p className="text-gray-600">{plansError?.message || 'Tente novamente mais tarde'}</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-secondary mb-6">
            Encontre o visto certo para o seu destino
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Selecione o país e tipo de visto desejado para ver nossos planos
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
                  <option key={country.key} value={country.key}>
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
                {isVisaTypesError || visaTypes?.length === 0 ? (
                  <option>
                    Nenhum encontrado
                  </option>
                ) : isLoadingVisaTypes ? (
                  <option>
                    Carregando...
                  </option>
                ) : (
                  <>
                    <option value="Selecione um tipo de visto">
                      Selecione um tipo de visto
                    </option>
                    {visaTypes?.map(visa => (
                      <option key={visa.name} value={visa.name}>{visa.name}</option>
                    ))}
                  </>
                )}
              </select>
            </div>
          </div>

          {isLoadingPlans && (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
              <span className="ml-3 text-lg text-gray-600">Carregando planos...</span>
            </div>
          )}

          {plans && plans.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {plans.map((plan, index) => (
                <Card key={plan.id} className={`relative ${index === 1 ? 'border-primary border-2 transform scale-105' : ''}`}>
                  <CardHeader className="text-center">
                    <CardTitle className="text-xl text-secondary">{plan.plan_name}</CardTitle>
                    <div className="text-3xl font-bold text-primary">{formatPrice(plan.price)}</div>
                    <p className="text-sm text-gray-500 mt-2">* Valor não inclui taxa consular</p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 mb-6">
                      {plan.description && (
                        <li className="flex items-start">
                          <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{plan.description}</span>
                        </li>
                      )}
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
                            \nTenho interesse no plano *${plan.plan_name}*. Poderiam me auxiliar com os próximos passos?`;
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
          ) : (
            <div className="text-center py-10">
              {selectedCountry === 'Outros Destinos' ? (
                <p className="text-lg text-gray-600 mb-2">
                  Para destinos não listados, clique abaixo e fale com nossa equipe:
                </p>
              ) : (
              <p className="text-lg text-gray-600 mb-2">
                Clique abaixo e fale com a nossa equipe sobre o visto {selectedVisaType.toLowerCase()} para o {selectedCountry}
              </p>
              )}
              <Button 
                variant="outline" 
                size="lg" 
                className="bg-primary text-white hover:bg-white hover:bg-secondary hover:text-white px-8 py-4 text-lg"
                onClick={() => {
                  const message = `Olá, estou planejando uma viagem de *${selectedVisaType.toLowerCase()}* para o *${selectedCountry}* e preciso de mais informações sobre o processo. 
                  \nPoderiam me auxiliar com os próximos passos?`;
                  const encodedMessage = encodeURIComponent(message);
                  window.location.href = `https://api.whatsapp.com/send?phone=5548998231163&text=${encodedMessage}`;
                }}
              >
                <FontAwesomeIcon icon={faWhatsapp} />Fale com um atendente
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default VisaSelector;
