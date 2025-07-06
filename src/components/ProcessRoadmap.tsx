
const ProcessRoadmap = () => {
  const steps = [
    {
      step: 1,
      title: 'Diagnóstico gratuito',
      description: 'Analisamos seu perfil e o tipo de visto ideal para o seu objetivo.'
    },
    {
      step: 2,
      title: 'Planejamento e Documentação',
      description: 'Orientamos sobre os documentos e montamos o dossiê consular.'
    },
    {
      step: 3,
      title: 'Solicitação e Acompanhamento',
      description: 'Enviamos tudo corretamente e acompanhamos as atualizações.'
    },
    {
      step: 4,
      title: 'Entrega e Pós-processo',
      description: 'Seu visto aprovado com suporte até o momento da viagem.'
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">
            Como Funciona Nosso Processo
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Do início ao visto aprovado: um processo transparente e eficiente
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Mobile - Vertical Layout */}
          <div className="block md:hidden">
            {steps.map((stepItem, index) => (
              <div key={index} className="flex items-start mb-8 relative">
                <div className="flex-shrink-0 relative z-10">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                    {stepItem.step}
                  </div>
                  {index < steps.length - 1 && (
                    <div className="absolute top-12 left-1/2 transform -translate-x-0.5 w-0.5 h-16 bg-primary/30"></div>
                  )}
                </div>
                
                <div className="ml-6 flex-grow">
                  <div className="bg-white rounded-lg p-6 shadow-sm border">
                    <h3 className="text-xl font-semibold text-secondary mb-2">{stepItem.title}</h3>
                    <p className="text-gray-600">{stepItem.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop - Horizontal Layout */}
          <div className="hidden md:block">
            <div className="relative">
              {/* Connecting Line */}
              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-primary/30 transform -translate-y-1/2 z-0"></div>
              
              <div className="grid grid-cols-4 gap-8">
                {steps.map((stepItem, index) => (
                  <div key={index} className="relative">
                    {/* Step Circle */}
                    <div className="flex justify-center mb-6">
                      <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white font-bold text-xl relative z-10">
                        {stepItem.step}
                      </div>
                    </div>
                    
                    {/* Step Content */}
                    <div className="bg-white rounded-lg p-6 shadow-sm border text-center">
                      <h3 className="text-lg font-semibold text-secondary mb-3">{stepItem.title}</h3>
                      <p className="text-gray-600 text-sm">{stepItem.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessRoadmap;
