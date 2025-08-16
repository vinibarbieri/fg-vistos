
import { Button } from '@/components/ui/button';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Passaporte, Aviao, Ny } from '@/assets/images';

const Hero = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: Passaporte,
      alt: 'Passaportes carimbados',
      text: 'Assessoria Completa para o Mundo Inteiro'
    },
    {
      image: Aviao,
      alt: 'Clientes felizes embarcando',
      text: 'Aprovação com Agilidade e Segurança'
    },
    {
      image: Ny,
      alt: 'Destino EUA',
      text: 'Mais de 20 Anos de Experiência em Vistos'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const goToPreviousSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <section className="relative h-screen overflow-hidden group">
      {/* Carousel */}
      <div className="relative w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div 
              className="w-full h-full bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              {/* Gradient overlay for better text readability */}
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent sm:bg-gradient-to-r sm:from-black sm:via-black/80 sm:via-black/60 sm:to-transparent" style={{ background: 'linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 60%, rgba(0,0,0,0.4) 85%, rgba(0,0,0,0) 100%)' }}></div>
              
              {/* Content */}
              <div className="relative z-10 flex flex-col justify-center h-full text-white px-4 sm:px-8 lg:px-16 sm:ml-10">
                <div className="max-w-xs sm:max-w-sm md:max-w-lg lg:max-w-2xl">
                  <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in text-left" style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.8)' }}>
                    Seu <span className="text-primary" style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.8)' }}>Visto Aprovado</span> com Segurança e Eficiência
                  </h1>
                  <p className="text-xl sm:text-lg md:text-2xl mb-8 text-gray-200 animate-fade-in text-left" style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.8)' }}>
                    Consultoria especializada para sua viagem, com planos personalizados, pagamento
                    facilitado e suporte completo em todas as etapas.
                  </p>
                  
                  {/* Overlay text */}
                  <div className="mb-8">
                    <h2 className="text-2xl md:text-4xl font-semibold text-primary animate-fade-in text-left" style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.8)' }}>
                      {slide.text}
                    </h2>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-start animate-fade-in">
                    <Button 
                      size="lg" 
                      className="bg-primary hover:bg-primary/60 text-white px-8 py-4 text-lg"
                      onClick={() => {
                        navigate('/vistos');
                      }}
                    >
                      Solicitar Assessoria Agora
                    </Button>
                    <Button 
                      variant="outline" 
                      size="lg" 
                      className="text-black hover:bg-primary hover:text-white hover:border-primary px-8 py-4 text-lg"
                      onClick={() => {
                        window.location.href = 'https://api.whatsapp.com/send?phone=5548998231163&text=Ol%C3%A1,%20estou%20interessado%20no%20servi%C3%A7o%20de%20vistos%20consulares';
                      }}
                    >
                      <FontAwesomeIcon icon={faWhatsapp} />Fale com um atendente
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation arrows */}
      <button
        onClick={goToPreviousSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 z-20 opacity-0 sm:group-hover:opacity-100"
        aria-label="Slide anterior"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <button
        onClick={goToNextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 z-20 opacity-0 sm:group-hover:opacity-100"
        aria-label="Próximo slide"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dots indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'bg-primary scale-125' : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Ir para slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
