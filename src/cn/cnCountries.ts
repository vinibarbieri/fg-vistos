export interface Country {
  name: string;
  flag: string;
  emoji: string;
}

export const cnCountries: Country[] = [
  { name: 'Estados Unidos', flag: 'us', emoji: '🇺🇸' },
  { name: 'Canadá', flag: 'ca', emoji: '🇨🇦' },
  { name: 'Reino Unido', flag: 'gb', emoji: '🇬🇧' },
  { name: 'Alemanha', flag: 'de', emoji: '🇩🇪' },
  { name: 'França', flag: 'fr', emoji: '🇫🇷' },
  { name: 'Austrália', flag: 'au', emoji: '🇦🇺' },
];

// Função utilitária para obter país por nome
export const getCountryByName = (name: string): Country | undefined => {
  return cnCountries.find(country => country.name === name);
};

// Função utilitária para obter país por código de bandeira
export const getCountryByFlag = (flag: string): Country | undefined => {
  return cnCountries.find(country => country.flag === flag);
};

// Função utilitária para verificar se um país existe
export const isValidCountry = (name: string): boolean => {
  return cnCountries.some(country => country.name === name);
}; 

// Função utilitária para receber a imagem da bandeira
export const getFlagImage = (country: Country): string => {
  return `https://flagcdn.com/${country.flag}.svg`
}