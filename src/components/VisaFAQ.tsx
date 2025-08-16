import { useState, useEffect } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { cnCountries, isValidCountryKey } from '@/cn/cnCountries';

interface FAQ {
  question: string;
  answer: string;
}

interface VisaFAQProps {
  selectedCountryFromSelector: string;
}

const VisaFAQ = ({ selectedCountryFromSelector }: VisaFAQProps) => {
  const [selectedCountry, setSelectedCountry] = useState('Estados Unidos');

  const faqData: Record<string, FAQ[]> = {
    'Estados Unidos': [
      {
        question: 'O que é o formulário DS-160?',
        answer: 'O DS-160 é o formulário online obrigatório para solicitação de visto americano não-imigrante. Deve ser preenchido com informações pessoais, profissionais e sobre o motivo da viagem.'
      },
      {
        question: 'Como funciona a entrevista consular?',
        answer: 'A entrevista consular é realizada no consulado americano e é obrigatória para a maioria dos solicitantes. O oficial consular fará perguntas sobre seus planos de viagem e vínculos com o Brasil.'
      },
      {
        question: 'Quanto tempo demora para sair o visto americano?',
        answer: 'Após a aprovação na entrevista, o visto geralmente fica pronto em 5 a 10 dias úteis. O tempo total do processo pode variar de 2 a 8 semanas dependendo da disponibilidade de agendamento.'
      }
    ],
    'Canadá': [
      {
        question: 'Qual a diferença entre visto e eTA?',
        answer: 'O eTA (Electronic Travel Authorization) é uma autorização eletrônica mais simples para brasileiros que viajam de avião ao Canadá por turismo ou negócios. O visto tradicional é necessário para outros tipos de viagem.'
      },
      {
        question: 'O que é a coleta de biometria?',
        answer: 'A biometria inclui impressões digitais e foto digital, coletadas em um centro autorizado. É obrigatória para solicitações de visto canadense e tem validade de 10 anos.'
      },
      {
        question: 'Posso trabalhar no Canadá com visto de turismo?',
        answer: 'Não, o visto de turismo não permite trabalhar no Canadá. Para trabalhar, é necessário obter uma permissão de trabalho específica antes da viagem.'
      }
    ]
  };

  // Atualiza o país selecionado quando recebe prop do VisaSelector
  useEffect(() => {
    if (selectedCountryFromSelector && isValidCountryKey(selectedCountryFromSelector)) {
      const country = cnCountries.find(c => c.key === selectedCountryFromSelector);
      setSelectedCountry(country ? country.name : 'Estados Unidos');
    }
  }, [selectedCountryFromSelector]);

  const currentFAQs = faqData[selectedCountry] || faqData['Estados Unidos'];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">
              Perguntas Frequentes
            </h2>
            <p className="text-lg text-gray-600">
              Esclarecemos as principais dúvidas sobre cada destino
            </p>
          </div>

          <div className="mb-8 flex flex-col">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ver perguntas sobre:
            </label>
            <select 
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="w-full text-lg p-3 border border-gray-300 rounded-lg focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all duration-200"
            >
              {cnCountries.map(country => (
                <option key={country.name} value={country.name}>
                  {country.name}
                </option>
              ))}
            </select>
          </div>

          <Accordion type="single" collapsible className="w-full">
            {currentFAQs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-lg font-medium text-gray-800 data-[state=open]:text-primary transition-all duration-200">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-lg text-gray-600">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default VisaFAQ;
