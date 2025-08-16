import { Card, CardContent } from '@/components/ui/card';
import { useState } from 'react';
import { cnCountries, Country, getFlagImage } from '@/cn/cnCountries';

interface CountryShowcaseProps {
  onCountrySelect: (countryKey: string) => void;
  filteredCountries?: Country[];
}

const CountryShowcase = ({ onCountrySelect, filteredCountries }: CountryShowcaseProps) => {

  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});
  const handleImageError = (countryCode: string) => {
    setImageErrors(prevErrors => ({
      ...prevErrors,
      [countryCode]: true,
    }));
  };

  const countriesToShow = filteredCountries || cnCountries;

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">
            Para Onde Você Quer Viajar?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Selecione seu destino e descubra os planos especializados para cada país
          </p>
        </div>

        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 max-w-7xl mx-auto">
          {countriesToShow.map((country) => (
            <Card 
              key={country.name} 
              className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105"
              onClick={() => onCountrySelect(country.key)}
            >
              <CardContent className="p-6 text-center flex flex-col items-center justify-center h-full">
                {imageErrors[country.flag] ? (
                  <span className="text-4xl sm:text-5xl mb-2" role="img" aria-label={`Bandeira de ${country.name}`}>
                    {country.emoji}
                  </span>
                ) : (
                  <img
                    src={getFlagImage(country)}
                    alt={`Bandeira de ${country.name}`}
                    className='mx-auto mb-4 h-12 md:h-16 object-cover rounded-md'
                    onError={() => handleImageError(country.flag)} 
                  />
                )}
                <h3 className="font-medium text-gray-800 mt-auto text-sm md:text-base">{country.name}</h3>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CountryShowcase;
