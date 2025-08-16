
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import VisaSelector from '@/components/VisaSelector';
import CountryShowcase from '@/components/CountryShowcase';
import VisaFAQ from '@/components/VisaFAQ';
import { Features } from '@/components/ui/features';
import { Button } from '@/components/ui/button';
import { ShieldCheck, Plane, FileCheck2 } from 'lucide-react';
import { VistosImagem, EtaImagem, ConsularImagem } from '@/assets/images';
import { cnCountries, Country } from '@/cn';
import useCountryVisaTypes from '@/hooks/useCountryVisaTypes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';


const Vistos = () => {
  const [selectedCountryFromShowcase, setSelectedCountryFromShowcase] = useState('');
  const [selectedService, setSelectedService] = useState(0); // 0: Vistos, 1: ETA, 2: Representação

  const services = [
    {
      id: 1,
      icon: Plane,
      title: "Vistos",
      description: "Assessoria completa para obtenção de vistos para todos os destinos. Nossa equipe especializada cuida de todo o processo.",
      image: VistosImagem,
    },
    {
      id: 2,
      icon: FileCheck2,
      title: "Autorização Eletrônica (ETA)",
      description: "Processo simplificado para países que exigem autorização eletrônica de viagem. Rápido e seguro.",
      image: EtaImagem,
    },
    {
      id: 3,
      icon: ShieldCheck,
      title: "Representação Consular",
      description: "Representamos você nos consulados, cuidando de todos os trâmites necessários para sua documentação.",
      image: ConsularImagem,
    },
  ];

  const scrollToVisaSelector = () => {
    const element = document.getElementById('visa-selector');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleServiceChange = (index: number) => {
    setSelectedService(index);
  };

  const countriesWithEta = cnCountries.filter(country => (country.eta));
  const countriesWithVisto = cnCountries.filter(country => (country.visto));

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Header Interativo de Serviços */}
      <Features 
        features={services}
        onFeatureChange={handleServiceChange}
      />

      {/* Conteúdo Condicional baseado no serviço selecionado */}
      {selectedService === 0 && (
        <>
          {/* Vitrine de Destinos - apenas para Vistos */}
          <CountryShowcase 
            onCountrySelect={(countriesWithVisto) => {
              setSelectedCountryFromShowcase(countriesWithVisto);
              scrollToVisaSelector();
            }}
            filteredCountries={countriesWithVisto}
          />

          {/* Seção Interativa de Planos - apenas para Vistos */}
          <div id="visa-selector">
            <VisaSelector 
              selectedCountryProp={selectedCountryFromShowcase}
              showWhatsAppButton={true}
            />
          </div>

          {/* FAQ Dinâmico - apenas para Vistos */}
          <VisaFAQ selectedCountryFromSelector={selectedCountryFromShowcase} />
        </>
      )}

      {selectedService === 1 && (
        /* Conteúdo para Autorização Eletrônica (ETA) */
        <>
          {/* Vitrine de Destinos - apenas para Vistos */}
          <CountryShowcase 
            onCountrySelect={(countriesWithVisto) => {
              setSelectedCountryFromShowcase(countriesWithVisto);
              scrollToVisaSelector();
            }}
            filteredCountries={countriesWithEta}
          />

          {/* Seção Interativa de Planos - apenas para ETA */}
          <div id="visa-selector">
            <VisaSelector 
              selectedCountryProp={selectedCountryFromShowcase}
              showWhatsAppButton={true}
            />
          </div>

          {/* FAQ Dinâmico - apenas para ETA */}
          <VisaFAQ selectedCountryFromSelector={selectedCountryFromShowcase} />
        </>
      )}

      {selectedService === 2 && (
        /* Conteúdo para Representação Consular */
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-secondary mb-6">
              Representação Consular
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
              Nossa equipe representa você nos consulados, cuidando de todos os trâmites burocráticos e garantindo que sua documentação seja processada corretamente.
            </p>
            <Button 
              size="lg" 
              className="bg-primary hover:bg-secondary text-white px-8 py-4 text-lg"
              onClick={() => window.open('https://wa.me/5548998231163', '_blank')}
            >
              Contratar Representação
            </Button>
          </div>
        </section>
      )}

      {/* CTA Final */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-secondary mb-4">
            Ainda não encontrou o que procurava?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Nossa equipe especializada está pronta para ajudar você com qualquer dúvida sobre vistos.
          </p>
          <Button 
            size="lg" 
            className="bg-primary hover:bg-secondary text-white px-8 py-4 text-lg"
            onClick={() => window.open('https://wa.me/5548998231163', '_blank')}
          >
            <FontAwesomeIcon icon={faWhatsapp} /> Fale com nossa equipe
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Vistos;
