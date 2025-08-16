
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card'
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MessageCircle } from 'lucide-react';

const WhyChooseUs = () => {
  const features = [
    {
      number: '+20',
      label: 'Anos de Experiência',
      description: 'Mais de duas décadas ajudando pessoas a realizarem seus sonhos'
    },
    {
      number: '+5.000',
      label: 'Vistos Aprovados',
      description: 'Milhares de clientes satisfeitos com vistos aprovados'
    },
    {
      number: '100%',
      label: 'Atendimento Humano',
      description: 'Suporte direto com especialistas reais, sem robôs'
    },
    {
      number: '24/7',
      label: 'Especialistas Reais',
      description: 'Equipe qualificada disponível para esclarecer suas dúvidas'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-secondary mb-6">
            Por que Escolher a FG Vistos?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Sua confiança é nosso maior patrimônio. Veja por que somos referência no mercado
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {features.map((feature, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="text-4xl font-bold text-primary mb-2">{feature.number}</div>
                <h3 className="text-lg font-semibold text-secondary mb-2">{feature.label}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <p className="text-lg text-gray-700 mb-6">
            Pronto para dar o próximo passo? Fale diretamente com nossos especialistas!
          </p>
          <Button 
            size="lg" 
            className="bg-primary hover:bg-primary/90 text-white px-8 py-4 text-lg"
            onClick={() => {
              window.location.href = 'https://api.whatsapp.com/send?phone=5548998231163&text=Ol%C3%A1,%20estou%20interessado%20no%20servi%C3%A7o%20de%20vistos%20consulares';
            }}
          >
            <FontAwesomeIcon icon={faWhatsapp} />Falar no WhatsApp
          </Button>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
