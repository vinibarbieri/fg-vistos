export interface Country {
  name: string;
  key: string; // Optional key for easier reference
  flag: string;
  emoji: string;
}

export const cnCountries: Country[] = [
  { name: 'Estados Unidos', key: 'eua', flag: 'us', emoji: '🇺🇸' },
  { name: 'Canadá', key: 'can', flag: 'ca', emoji: '🇨🇦' },
  { name: 'México', key: 'mex', flag: 'mx', emoji: '🇲🇽' },
  { name: 'Reino Unido', key: 'rei', flag: 'gb', emoji: '🇬🇧' },
  { name: 'Portugal', key: 'por', flag: 'pt', emoji: '🇵🇹' },
  { name: 'China', key: 'chi', flag: 'cn', emoji: '🇨🇳' },
  { name: 'Coreia do Sul', key: 'cor', flag: 'kr', emoji: '🇰🇷' },
  { name: 'Índia', key: 'ind', flag: 'in', emoji: '🇮🇳' },
  { name: 'Austrália', key: 'aus', flag: 'au', emoji: '🇦🇺' },
  { name: 'Nova Zelândia', key: 'nzl', flag: 'nz', emoji: '🇳🇿' },
  { name: 'Outros Destinos', key: 'out', flag: 'zz', emoji: '🌍' },
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