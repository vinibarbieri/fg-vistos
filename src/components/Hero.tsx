
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Star, Users, Award } from 'lucide-react';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative bg-gradient-to-br from-secondary via-secondary to-secondaryLight text-white py-20 lg:py-32 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 bg-primary rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-primary/30 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/20 rounded-full blur-lg"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center items-center gap-6 mb-8 text-sm text-gray-300">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-primary" />
              <span>20+ anos de experiência</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-primary" />
              <span>+5.000 vistos aprovados</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-primary" />
              <span>Especialistas certificados</span>
            </div>
          </div>

          {/* Main content */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Seu <span className="text-primary">
                Visto Aprovado
              </span> com Segurança e Agilidade
            </h1>
            
            <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-3xl mx-auto leading-relaxed">
              Transformamos sonhos em realidade com processos transparentes e 
              acompanhamento personalizado do início ao fim.
            </p>

            {/* Rating and reviews */}
            <div className="flex justify-center items-center gap-4 mb-8">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-gray-300">4.9/5</span>
              <span className="text-gray-400">•</span>
              <span className="text-gray-300">+2.500 clientes satisfeitos</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-white px-10 py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              onClick={() => navigate('/vistos')}
            >
              <CheckCircle className="w-5 h-5 mr-2" />
              Solicitar Visto Agora
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="border-2 border-white/30 text-white hover:bg-white hover:text-secondary px-10 py-6 text-lg font-semibold rounded-xl backdrop-blur-sm transition-all duration-300 transform hover:scale-105"
              onClick={() => {
                window.location.href = 'https://api.whatsapp.com/send?phone=5548998231163&text=Ol%C3%A1,%20estou%20interessado%20no%20servi%C3%A7o%20de%20vistos%20consulares';
              }}
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
              </svg>
              Falar com Especialista
            </Button>
          </div>

          {/* Additional benefits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="text-center p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Processo Garantido</h3>
              <p className="text-sm text-gray-300">Acompanhamento completo até a aprovação</p>
            </div>
            
            <div className="text-center p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Suporte Premium</h3>
              <p className="text-sm text-gray-300">Atendimento personalizado 24/7</p>
            </div>
            
            <div className="text-center p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Resultados Comprovados</h3>
              <p className="text-sm text-gray-300">Alta taxa de aprovação comprovada</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
