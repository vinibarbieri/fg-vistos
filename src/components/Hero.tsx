
import { Button } from '@/components/ui/button';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-gradient-to-br from-secondary via-secondary to-secondaryLight text-white py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
            Seu <span className="text-primary">Visto Aprovado</span> com Segurança e Eficiência
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200 animate-fade-in">
            Consultoria especializada para sua viagem, com planos personalizados, pagamento
            facilitado e suporte completo em todas as etapas.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-white px-8 py-4 text-lg"
              onClick={() => {
                navigate('/vistos');
              }}
            >
              Solicitar Assessoria Agora
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-white text-secondary hover:bg-white hover:bg-secondary hover:text-white px-8 py-4 text-lg"
              onClick={() => {
                window.location.href = 'https://api.whatsapp.com/send?phone=5548998231163&text=Ol%C3%A1,%20estou%20interessado%20no%20servi%C3%A7o%20de%20vistos%20consulares';
              }}
            >
              <FontAwesomeIcon icon={faWhatsapp} />Fale com um atendente
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
