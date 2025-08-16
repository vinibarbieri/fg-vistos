import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Users, Award, Heart, Globe, MessageCircle, Plane, MapPin, Clock, Shield, Star, CheckCircle, TrendingUp, Building2 } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useEffect, useState } from 'react';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SobreNos = () => {
  const [counters, setCounters] = useState({
    vistos: 0,
    destinos: 0,
    cidades: 0
  });

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Animar contadores
          animateCounters();
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('numbers-section');
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  const animateCounters = () => {
    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      
      setCounters({
        vistos: Math.floor(3000 * progress),
        destinos: Math.floor(100 * progress),
        cidades: Math.floor(2 * progress)
      });

      if (currentStep >= steps) {
        clearInterval(timer);
        setCounters({
          vistos: 3000,
          destinos: 100,
          cidades: 2
        });
      }
    }, stepDuration);
  };

  const values = [
    {
      icon: Shield,
      title: 'Transparência Total',
      description: 'Transparência em cada etapa do processo, mantendo o cliente informado sobre tudo.',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Clock,
      title: 'Agilidade Garantida',
      description: 'Agilidade sem perder a qualidade, sempre buscando a melhor estratégia para aprovação.',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: Award,
      title: 'Compromisso Real',
      description: 'Compromisso com resultados reais, focando em soluções sob medida para cada viajante.',
      color: 'from-yellow-500 to-yellow-600'
    },
    {
      icon: Heart,
      title: 'Respeito ao Cliente',
      description: 'Respeito ao cliente e sua história, com atendimento próximo e humanizado.',
      color: 'from-pink-500 to-pink-600'
    }
  ];

  const differentials = [
    {
      icon: Clock,
      title: 'Atendimento 100% Contínuo',
      description: 'Acompanhamos o cliente do começo ao fim do processo, sem deixar dúvidas para trás.',
      highlight: '24/7'
    },
    {
      icon: Users,
      title: 'Autonomia para o Cliente',
      description: 'Liberdade para escolher os melhores horários para reuniões, respeitando a rotina de cada um.',
      highlight: 'Flexível'
    },
    {
      icon: Star,
      title: 'Soluções Personalizadas',
      description: 'Buscamos sempre a melhor estratégia para aprovação, com agilidade e cuidado.',
      highlight: 'Sob Medida'
    },
    {
      icon: Globe,
      title: 'Cobertura Global',
      description: 'Especialistas em vistos para todos os destinos — EUA, Canadá, Europa, Austrália, Ásia e muito mais.',
      highlight: 'Mundial'
    },
    {
      icon: Heart,
      title: 'Raízes Familiares',
      description: 'Valores de confiança, proximidade e compromisso herdados desde o primeiro dia.',
      highlight: 'Família'
    }
  ];

  const team = [
    {
      name: 'Franciele',
      role: 'Fundadora & Especialista Consular',
      experience: '18+ anos de experiência',
      description: 'Mais de 18 anos de experiência em assessoria de vistos. Começou como vendedora, conhece as dores reais do cliente e faz questão de manter um atendimento próximo e humanizado.',
      specialties: ['Vistos EUA', 'Vistos Europa', 'Assessoria Consular'],
      avatar: '👩‍💼'
    },
    {
      name: 'Gabriel',
      role: 'Especialista em Vistos',
      experience: 'Gestão Estratégica',
      description: 'Apaixonado por viagens e atendimento ao cliente. Responsável pela gestão estratégica da FG Vistos, sempre buscando inovar para melhorar a experiência dos viajantes.',
      specialties: ['Gestão Estratégica', 'Inovação', 'Atendimento ao Cliente'],
      avatar: '👨‍💼'
    }
  ];

  const milestones = [
    { 
      year: '2005', 
      event: 'Fundação da FG Vistos',
      description: 'Início da jornada com foco em atendimento humanizado',
      icon: Building2
    },
    { 
      year: '2009', 
      event: 'Expansão de vistos',
      description: 'Ampliação da carteira de destinos atendidos',
      icon: Globe
    },
    { 
      year: '2022', 
      event: 'Expansão para Santos',
      description: 'Abertura da segunda unidade em São Paulo',
      icon: MapPin
    },
    { 
      year: '2024', 
      event: 'Digitalização dos processos',
      description: 'Modernização e otimização dos serviços',
      icon: TrendingUp
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main>
        {/* Hero Section Aprimorado */}
        <section className="relative bg-gradient-to-br from-primary to-secondary py-16 sm:py-20 md:py-24 overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-20 -right-20 sm:-top-40 sm:-right-40 w-40 h-40 sm:w-80 sm:h-80 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-20 -left-20 sm:-bottom-40 sm:-left-40 w-40 h-40 sm:w-80 sm:h-80 bg-white/10 rounded-full blur-3xl"></div>
          </div>
          
          <div className="container mx-auto px-4 sm:px-6 relative z-10">
            <div className="max-w-5xl mx-auto text-center text-white">
              <div className="flex justify-center mb-4 sm:mb-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-white/20 rounded-full blur-xl"></div>
                  <Plane className="w-12 h-12 sm:w-16 sm:h-16 text-white relative z-10 animate-pulse" />
                </div>
              </div>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 sm:mb-6 leading-tight px-2">
                Sobre a{' '}
                <span className="bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                  FG Vistos
                </span>
              </h1>
              
              <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 sm:px-6 sm:py-3 mb-6 sm:mb-8 mx-2">
                <Plane className="w-4 h-4 sm:w-5 sm:h-5 text-white mr-2" />
                <span className="text-sm sm:text-lg font-medium">Há quase 20 anos realizando sonhos de viagem</span>
              </div>
              
              <p className="text-lg sm:text-xl md:text-2xl opacity-90 leading-relaxed max-w-4xl mx-auto px-2">
                A FG Vistos é uma empresa de assessoria consular com{' '}
                <span className="font-semibold text-yellow-200">raízes familiares</span>, dedicada a
                transformar o processo de tirar vistos em algo{' '}
                <span className="font-semibold text-yellow-200">simples, seguro e acessível</span>.
              </p>
            </div>
          </div>
        </section>

        {/* Nossa História com Timeline Visual */}
        <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12 sm:mb-16">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-secondary mb-4 sm:mb-6 px-2">
                  📜 Nossa História
                </h2>
                <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-2">
                  Uma jornada de quase duas décadas transformando sonhos de viagem em realidade
                </p>
              </div>
              
              {/* Timeline Visual - Responsiva */}
              <div className="relative hidden md:block">
                {/* Linha central */}
                <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-gradient-to-b from-primary via-secondary to-primary"></div>
                
                <div className="space-y-16">
                  {milestones.map((milestone, index) => (
                    <div key={index} className={`relative flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                      {/* Conteúdo */}
                      <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                        <div className={`bg-white p-4 sm:p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 ${index % 2 === 0 ? 'hover:-translate-y-1' : 'hover:-translate-y-1'}`}>
                          <div className="flex items-center mb-3">
                            <milestone.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary mr-2" />
                            <span className="text-xl sm:text-2xl font-bold text-primary">{milestone.year}</span>
                          </div>
                          <h3 className="text-lg sm:text-xl font-semibold text-secondary mb-2">{milestone.event}</h3>
                          <p className="text-gray-600 text-xs sm:text-sm">{milestone.description}</p>
                        </div>
                      </div>
                      
                      {/* Círculo central */}
                      <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 sm:w-8 sm:h-8 bg-white border-4 border-primary rounded-full shadow-lg flex items-center justify-center">
                        <div className="w-2 h-2 sm:w-3 sm:h-3 bg-primary rounded-full"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Timeline Mobile - Cards empilhados */}
              <div className="md:hidden space-y-6">
                {milestones.map((milestone, index) => (
                  <div key={index} className="bg-white p-4 sm:p-6 rounded-2xl shadow-lg border border-gray-100">
                    <div className="flex items-center mb-3">
                      <milestone.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary mr-3" />
                      <span className="text-xl sm:text-2xl font-bold text-primary">{milestone.year}</span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold text-secondary mb-2">{milestone.event}</h3>
                    <p className="text-gray-600 text-sm">{milestone.description}</p>
                  </div>
                ))}
              </div>
              
              {/* História em texto */}
              <div className="mt-12 sm:mt-16 md:mt-20 bg-white rounded-2xl sm:rounded-3xl shadow-xl p-6 sm:p-8 md:p-12">
                <div className="grid md:grid-cols-2 gap-8 sm:gap-12 items-center">
                  <div className="space-y-4 sm:space-y-6">
                    <p className="text-gray-700 leading-relaxed text-base sm:text-lg">
                      Em <span className="font-semibold text-primary">2005</span>, Francielle deu início à sua trajetória no mercado como vendedora em uma
                      agência, aprendendo na prática as dores e dificuldades dos clientes que buscavam viajar
                      para o exterior.
                    </p>
                    <p className="text-gray-700 leading-relaxed text-base sm:text-lg">
                      Foi nesse ambiente que nasceu a <span className="font-semibold text-secondary">FG Vistos</span>, fruto da vontade de oferecer um
                      atendimento mais humano, transparente e especializado.
                    </p>
                    <p className="text-gray-700 leading-relaxed text-base sm:text-lg">
                      Desde o começo, <span className="font-semibold text-secondary">atendemos todos os destinos </span> com o mesmo cuidado: orientando o
                      cliente em cada etapa, esclarecendo dúvidas e garantindo a segurança no processo.
                    </p>
                  </div>
                  <div className="space-y-4 sm:space-y-6">
                    <p className="text-gray-700 leading-relaxed text-base sm:text-lg">
                      Em <span className="font-semibold text-primary">2022</span>, expandimos nossas operações para <span className="font-semibold text-secondary">Santos</span>. Nosso início na cidade não foi
                      fácil, mas superamos os desafios com trabalho sério e comprometido.
                    </p>
                    <p className="text-gray-700 leading-relaxed text-base sm:text-lg">
                      Conquistamos a confiança dos clientes por meio de <span className="font-semibold text-secondary">atendimento de qualidade, ágil e personalizado</span>.
                    </p>
                    <p className="text-gray-700 leading-relaxed text-base sm:text-lg">
                      Hoje, somamos mais de <span className="font-bold text-2xl sm:text-4xl text-primary">3.000</span> <span className="font-semibold text-secondary">vistos aprovados</span> e uma trajetória que continua
                      crescendo, sempre focada em oferecer <span className="font-semibold text-secondary">soluções sob medida para cada viajante.</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Nossos Diferenciais Aprimorados */}
        <section className="py-12 sm:py-16 md:py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-12 sm:mb-16">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-secondary mb-4 sm:mb-6 px-2">
                  🌟 Nossos Diferenciais
                </h2>
                <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-2">
                  O que nos torna únicos no mercado de assessoria consular
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {differentials.map((differential, index) => (
                  <Card key={index} className="group relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-gradient-to-br from-white to-gray-50">
                    <CardContent className="p-6 sm:p-8 relative z-10">
                      {/* Badge de destaque */}
                      <div className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-primary text-white text-xs font-bold px-2 py-1 sm:px-3 sm:py-1 rounded-full">
                        {differential.highlight}
                      </div>
                      
                      <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-primary to-secondary rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
                        <differential.icon className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                      </div>
                      
                      <h3 className="text-lg sm:text-xl font-bold text-secondary mb-3 sm:mb-4 text-center">
                        {differential.title}
                      </h3>
                      
                      <p className="text-gray-600 leading-relaxed text-sm sm:text-base text-center">
                        {differential.description}
                      </p>
                    </CardContent>
                    
                    {/* Background gradient on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Nossa Missão com Visual Aprimorado */}
        <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-gray-50 via-white to-gray-50">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-5xl mx-auto text-center">
              <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-8 sm:p-12 md:p-16 relative overflow-hidden">
                {/* Background decoration */}
                <div className="absolute top-0 right-0 w-20 h-20 sm:w-32 sm:h-32 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full -translate-y-8 translate-x-8 sm:-translate-y-16 sm:translate-x-16"></div>
                <div className="absolute bottom-0 left-0 w-16 h-16 sm:w-24 sm:h-24 bg-gradient-to-br from-secondary/10 to-primary/10 rounded-full translate-y-6 -translate-x-6 sm:translate-y-12 sm:-translate-x-12"></div>
                
                <div className="relative z-10">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-primary to-secondary rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-6 sm:mb-8">
                    <Globe className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                  </div>
                  
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-secondary mb-6 sm:mb-8 px-2">
                    🗺 Nossa Missão
                  </h2>
                  
                  <p className="text-lg sm:text-xl md:text-2xl text-gray-700 leading-relaxed max-w-4xl mx-auto px-2">
                    Facilitar o acesso a viagens internacionais, oferecendo assessoria consular{' '}
                    <span className="font-semibold text-primary">confiável, humana e de qualidade</span>, 
                    para transformar sonhos em realidade.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Nossos Valores Aprimorados */}
        <section className="py-12 sm:py-16 md:py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-12 sm:mb-16">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-secondary mb-4 sm:mb-6 px-2">
                  💡 Nossos Valores
                </h2>
                <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-2">
                  Os princípios que guiam nossa atuação no mercado
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                {values.map((value, index) => (
                  <Card key={index} className="group text-center border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 overflow-hidden">
                    <CardContent className="p-6 sm:p-8 relative">
                      <div className={`w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-primary to-secondary rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300`}>
                        <value.icon className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                      </div>
                      
                      <h3 className="text-lg sm:text-xl font-bold text-secondary mb-3 sm:mb-4">
                        {value.title}
                      </h3>
                      
                      <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                        {value.description}
                      </p>
                      
                      {/* Hover effect */}
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Nossos Números com Contadores Animados */}
        <section id="numbers-section" className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-primary to-secondary relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-32 h-32 sm:w-64 sm:h-64 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-32 h-32 sm:w-64 sm:h-64 bg-white/10 rounded-full blur-3xl"></div>
          </div>
          
          <div className="container mx-auto px-4 sm:px-6 relative z-10">
            <div className="max-w-5xl mx-auto text-center text-white">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-12 sm:mb-16 px-2">
                📈 Nossos Números
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12 mb-8 sm:mb-12">
                <div className="text-center group">
                  <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
                    +{counters.vistos.toLocaleString()}
                  </div>
                  <div className="text-lg sm:text-xl opacity-90">Vistos aprovados</div>
                  <div className="w-12 h-1 sm:w-16 bg-white/30 mx-auto mt-3 sm:mt-4 group-hover:w-20 sm:group-hover:w-24 transition-all duration-300"></div>
                </div>
                
                <div className="text-center group">
                  <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
                    {counters.destinos}%
                  </div>
                  <div className="text-lg sm:text-xl opacity-90">Cobertura de destinos</div>
                  <div className="w-12 h-1 sm:w-16 bg-white/30 mx-auto mt-3 sm:mt-4 group-hover:w-20 sm:group-hover:w-24 transition-all duration-300"></div>
                </div>
                
                <div className="text-center group">
                  <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
                    {counters.cidades}
                  </div>
                  <div className="text-lg sm:text-xl opacity-90">Cidades atendidas</div>
                  <div className="w-12 h-1 sm:w-16 bg-white/30 mx-auto mt-3 sm:mt-4 group-hover:w-20 sm:group-hover:w-24 transition-all duration-300"></div>
                </div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-white/20">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 text-center">
                  <div>
                    <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-300 mx-auto mb-2 sm:mb-3" />
                    <p className="text-base sm:text-lg">Atendemos todos os destinos desde a fundação</p>
                  </div>
                  <div>
                    <MapPin className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-300 mx-auto mb-2 sm:mb-3" />
                    <p className="text-base sm:text-lg">Presença consolidada em Florianópolis/SC e Santos/SP</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Nossa Equipe Aprimorada */}
        <section className="py-12 sm:py-16 md:py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-12 sm:mb-16">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-secondary mb-4 sm:mb-6 px-2">
                  👥 Quem Somos
                </h2>
                <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-2">
                  Conheça a equipe que faz a diferença na sua jornada
                </p>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
                {team.map((member, index) => (
                  <Card key={index} className="group border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden">
                    <CardContent className="p-6 sm:p-8">
                      <div className="text-center mb-6">
                        <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-primary to-secondary rounded-2xl sm:rounded-3xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                          <span className="text-3xl sm:text-4xl">{member.avatar}</span>
                        </div>
                        
                        <h3 className="text-xl sm:text-2xl font-bold text-secondary mb-2">
                          {member.name}
                        </h3>
                        
                        <div className="text-primary font-semibold text-base sm:text-lg mb-2">
                          {member.role}
                        </div>
                        
                        <div className="text-sm text-gray-500 mb-4 bg-gray-100 px-3 py-1 rounded-full inline-block">
                          {member.experience}
                        </div>
                      </div>
                      
                      <p className="text-gray-600 leading-relaxed mb-6 text-center text-sm sm:text-base">
                        {member.description}
                      </p>
                    
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section Aprimorado */}
        <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-r from-primary to-secondary relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-48 h-48 sm:w-96 sm:h-96 bg-white/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-48 h-48 sm:w-96 sm:h-96 bg-white/5 rounded-full blur-3xl"></div>
          </div>
          
          <div className="container mx-auto px-4 sm:px-6 relative z-10">
            <div className="max-w-5xl mx-auto text-center text-white">
              <div className="flex justify-center mb-4 sm:mb-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-white/20 rounded-full blur-xl"></div>
                  <Plane className="w-12 h-12 sm:w-16 sm:h-16 text-white relative z-10 animate-bounce" />
                </div>
              </div>
              
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 px-2">
                ✈ Pronto para transformar seu sonho em realidade?
              </h2>
              
              <p className="text-lg sm:text-xl mb-8 sm:mb-10 opacity-90 max-w-3xl mx-auto leading-relaxed px-2">
                Fale agora com nossa equipe e descubra como é simples viajar com a segurança de ter
                especialistas ao seu lado em cada etapa.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
                <Button 
                  size="lg" 
                  className="bg-white text-primary hover:bg-gray-100 hover:scale-105 transition-all duration-300 text-base sm:text-lg px-6 py-3 sm:px-8 sm:py-4 rounded-xl shadow-lg hover:shadow-xl"
                >
                  <FontAwesomeIcon icon={faWhatsapp} className="mr-2 sm:mr-3" />
                  Solicitar Assessoria Agora
                </Button>
                
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="text-primary hover:text-primary hover:scale-105 transition-all duration-300 text-base sm:text-lg px-6 py-3 sm:px-8 sm:py-4 rounded-xl"
                >
                  Ver Nossos Serviços
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default SobreNos;
