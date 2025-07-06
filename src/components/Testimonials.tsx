
import { TestimonialsSection } from '@/components/ui/testimonials-with-marquee';

const Testimonials = () => {
  const testimonials = [
    {
      author: {
        name: 'Maria Silva',
        handle: 'São Paulo, SP',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face'
      },
      text: 'Consegui meu visto americano na primeira tentativa! O atendimento foi excepcional e me senti segura durante todo o processo. Recomendo de olhos fechados!'
    },
    {
      author: {
        name: 'João Santos',
        handle: 'Rio de Janeiro, RJ',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
      },
      text: 'Profissionais muito competentes. Me ajudaram com o visto canadense e hoje moro aqui há 2 anos. Sem a FG Vistos, jamais teria conseguido.'
    },
    {
      author: {
        name: 'Ana Costa',
        handle: 'Belo Horizonte, MG',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face'
      },
      text: 'Atendimento humanizado e eficiente. Tiraram todas as minhas dúvidas e me prepararam muito bem para a entrevista. Visto aprovado!'
    },
    {
      author: {
        name: 'Carlos Oliveira',
        handle: 'Porto Alegre, RS',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
      },
      text: 'Excelente trabalho! Processo rápido e transparente. A equipe me acompanhou desde o início até a aprovação do visto. Super recomendo!'
    },
    {
      author: {
        name: 'Luciana Pereira',
        handle: 'Fortaleza, CE',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
      },
      text: 'Muito obrigada à equipe da FG Vistos! Consegui meu visto francês sem complicações. Profissionais sérios e comprometidos.'
    },
    {
      author: {
        name: 'Roberto Lima',
        handle: 'Salvador, BA',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face'
      },
      text: 'Serviço impecável! Me ajudaram com toda a documentação e preparação. Hoje estou morando na Austrália graças ao trabalho deles.'
    }
  ];

  return (
    <TestimonialsSection
      title="O que Nossos Clientes Dizem"
      description="Histórias reais de pessoas que realizaram seus sonhos conosco"
      testimonials={testimonials}
      className="bg-white"
    />
  );
};

export default Testimonials;
