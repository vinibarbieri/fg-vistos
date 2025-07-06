import { Search, FileText, Send, CheckCircle, ArrowRight } from 'lucide-react';

const ProcessRoadmap = () => {
  const steps = [
    {
      step: 1,
      title: 'Diagnóstico gratuito',
      description: 'Analisamos seu perfil e o tipo de visto ideal para o seu objetivo.',
      icon: Search,
    },
    {
      step: 2,
      title: 'Planejamento e Documentação',
      description: 'Orientamos sobre os documentos e montamos o dossiê consular.',
      icon: FileText,
    },
    {
      step: 3,
      title: 'Solicitação e Acompanhamento',
      description: 'Enviamos tudo corretamente e acompanhamos as atualizações.',
      icon: Send,
    },
    {
      step: 4,
      title: 'Entrega e Pós-processo',
      description: 'Seu visto aprovado com suporte até o momento da viagem.',
      icon: CheckCircle,
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          {/* <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
            <CheckCircle className="w-8 h-8 text-primary" />
          </div> */}
          <h2 className="text-4xl md:text-5xl font-bold text-secondary mb-6">
            Como Funciona Nosso Processo
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Do início ao visto aprovado: um processo transparente e eficiente com acompanhamento completo
          </p>
        </div>

        <div className="max-w-7xl mx-auto">
          {/* Mobile - Vertical Layout */}
          <div className="block md:hidden space-y-8">
            {steps.map((stepItem, index) => {
              const Icon = stepItem.icon;
              return (
                <div key={index} className="relative">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 relative z-10">
                      <div className={`w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white shadow-lg transform hover:scale-105 transition-transform duration-300`}>
                        <Icon className="w-8 h-8" />
                      </div>
                      {index < steps.length - 1 && (
                        <div className="absolute top-16 left-1/2 transform -translate-x-0.5 w-1 h-20 bg-gradient-to-b from-primary/40 to-primary/20"></div>
                      )}
                    </div>
                    
                    <div className="ml-6 flex-grow">
                      <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 hover:shadow-2xl transition-shadow duration-300 min-h-48 flex flex-col justify-center">
                        <div className="flex items-center mb-3">
                          <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-semibold">
                            Passo {stepItem.step}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold text-secondary mb-3">{stepItem.title}</h3>
                        <p className="text-gray-600 leading-relaxed">{stepItem.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Desktop - Horizontal Layout */}
          <div className="hidden md:block">
            <div className="relative">
              {/* Connecting Line */}
              <div className="absolute top-8 left-0 right-0 h-1 bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20 transform -translate-y-1/2 z-0"></div>
              
              <div className="grid grid-cols-4 gap-8">
                {steps.map((stepItem, index) => {
                  const Icon = stepItem.icon;
                  return (
                    <div key={index} className="relative group">
                      {/* Step Circle */}
                      <div className="flex justify-center mb-8">
                        <div className={`w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white shadow-xl transform group-hover:scale-110 transition-all duration-300 relative z-10`}>
                          <Icon className="w-8 h-8" />
                        </div>
                      </div>
                      
                      {/* Step Content */}
                      <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 text-center hover:shadow-2xl transition-all duration-300 transform group-hover:-translate-y-2 h-64 flex flex-col justify-center">
                        {/* <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mb-4">
                          <span className="text-primary font-bold text-lg">{stepItem.step}</span>
                        </div> */}
                        <h3 className="text-xl font-bold text-secondary mb-4">{stepItem.title}</h3>
                        <p className="text-gray-600 leading-relaxed">{stepItem.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-secondary mb-4">
                Pronto para começar sua jornada?
              </h3>
              <p className="text-gray-600 mb-6">
                Entre em contato conosco e inicie seu processo de visto hoje mesmo
              </p>
              <button className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-full font-semibold transition-colors duration-300 flex items-center mx-auto">
                Começar Agora
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessRoadmap;
