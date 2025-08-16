export interface Country {
  name: string;
  key: string; // Optional key for easier reference
  flag: string;
  emoji: string;
  visto: boolean;
  eta: boolean;
}

export const cnCountries: Country[] = [
  { name: 'Estados Unidos', key: 'eua', flag: 'us', emoji: '🇺🇸', visto: true, eta: true },
  { name: 'Canadá', key: 'can', flag: 'ca', emoji: '🇨🇦', visto: true, eta: true },
  { name: 'México', key: 'mex', flag: 'mx', emoji: '🇲🇽', visto: true, eta: false },
  { name: 'Reino Unido', key: 'rei', flag: 'gb', emoji: '🇬🇧', visto: false, eta: true },
  { name: 'Portugal', key: 'por', flag: 'pt', emoji: '🇵🇹', visto: true, eta: false },
  { name: 'China', key: 'chi', flag: 'cn', emoji: '🇨🇳', visto: true, eta: false },
  { name: 'Coreia do Sul', key: 'cor', flag: 'kr', emoji: '🇰🇷', visto: false, eta: true },
  { name: 'Índia', key: 'ind', flag: 'in', emoji: '🇮🇳', visto: true, eta: false },
  { name: 'Austrália', key: 'aus', flag: 'au', emoji: '🇦🇺', visto: true, eta: true },
  { name: 'Nova Zelândia', key: 'nzl', flag: 'nz', emoji: '🇳🇿', visto: true, eta: true },
  { name: 'Outros Destinos', key: 'out', flag: 'zz', emoji: '🌍', visto: true, eta: true },
];

// Função utilitária para obter país por nome
export const getCountryByName = (name: string): Country | undefined => {
  return cnCountries.find(country => country.name === name);
};

// Função utilitária para obter país por código de bandeira
export const getCountryByFlag = (flag: string): Country | undefined => {
  return cnCountries.find(country => country.flag === flag);
};

// Função utilitária para verificar se uma chave de país existe
export const isValidCountryKey = (key: string): boolean => {
  return cnCountries.some(country => country.key === key);
};

// Função utilitária para receber a imagem da bandeira
export const getFlagImage = (country: Country): string => {
  return `https://flagcdn.com/${country.flag}.svg`
}