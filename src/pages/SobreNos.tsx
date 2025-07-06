
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Users, Award, Heart, Globe, MessageCircle } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const SobreNos = () => {
  const values = [
    {
      icon: Heart,
      title: 'Atendimento Humano',
      description: 'Cada cliente é único. Por isso, oferecemos atendimento personalizado e direto, sem robôs ou chatbots.'
    },
    {
      icon: Award,
      title: 'Experiência Comprovada',
      description: 'Mais de 20 anos no mercado com mais de 5.000 vistos aprovados. Nossa expertise é sua garantia.'
    },
    {
      icon: Globe,
      title: 'Cobertura Global',
      description: 'Especialistas em vistos para os principais destinos: EUA, Canadá, Europa, Austrália e muito mais.'
    },
    {
      icon: Users,
      title: 'Equipe Especializada',
      description: 'Consultores especializados e atualizados com as constantes mudanças nas legislações consulares.'
    }
  ];

  const team = [
    {
      name: 'Fernando Garcia',
      role: 'Fundador & CEO',
      experience: '25 anos de experiência',
      description: 'Especialista em legislação consular internacional com formação em Relações Internacionais.'
    },
    {
      name: 'Marina Silva',
      role: 'Diretora de Operações',
      experience: '18 anos de experiência',
      description: 'Responsável pela coordenação de todos os processos consulares e treinamento da equipe.'
    },
    {
      name: 'Carlos Mendes',
      role: 'Especialista em Vistos EUA',
      experience: '15 anos de experiência',
      description: 'Especialista em vistos americanos com centenas de casos de sucesso em entrevistas consulares.'
    },
    {
      name: 'Ana Rodriguez',
      role: 'Consultora Europa/Canadá',
      experience: '12 anos de experiência',
      description: 'Especialista em processos para Europa (Schengen) e Canadá, incluindo vistos de trabalho e estudo.'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary to-secondary py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Sobre a FG Vistos
              </h1>
              <p className="text-xl md:text-2xl mb-8 opacity-90">
                Há mais de 20 anos transformando sonhos de viagem em realidade
              </p>
              <p className="text-lg opacity-80 leading-relaxed">
                Somos uma empresa especializada em assessoria consular, dedicada a simplificar 
                o complexo processo de obtenção de vistos internacionais. Nossa missão é tornar 
                suas viagens possíveis através de um serviço humano, especializado e confiável.
              </p>
            </div>
          </div>
        </section>

        {/* Nossa História */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center text-secondary mb-12">
                Nossa História
              </h2>
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-2xl font-semibold text-secondary mb-4">
                    Desde 2003 facilitando viagens
                  </h3>
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    A FG Vistos nasceu da necessidade de oferecer um serviço especializado 
                    e humanizado na área de assessoria consular. Fundada por Fernando Garcia, 
                    profissional com vasta experiência em Relações Internacionais.
                  </p>
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    Ao longo dos anos, expandimos nossa expertise para cobrir os principais 
                    destinos internacionais, sempre mantendo nosso compromisso com a 
                    excelência e o atendimento personalizado.
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary">+20</div>
                      <div className="text-sm text-gray-600">Anos de experiência</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary">+5000</div>
                      <div className="text-sm text-gray-600">Vistos aprovados</div>
                    </div>
                  </div>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-lg">
                  <h4 className="text-xl font-semibold text-secondary mb-4">
                    Marcos Importantes
                  </h4>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-3 h-3 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <div className="font-medium">2003</div>
                        <div className="text-sm text-gray-600">Fundação da FG Vistos</div>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-3 h-3 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <div className="font-medium">2008</div>
                        <div className="text-sm text-gray-600">Expansão para vistos europeus</div>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-3 h-3 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <div className="font-medium">2015</div>
                        <div className="text-sm text-gray-600">Especialização em vistos canadenses</div>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-3 h-3 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <div className="font-medium">2020</div>
                        <div className="text-sm text-gray-600">Digitalização completa dos processos</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Nossos Valores */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center text-secondary mb-12">
                Nossos Valores
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {values.map((value, index) => (
                  <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <value.icon className="w-8 h-8 text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold text-secondary mb-3">
                        {value.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {value.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Nossa Equipe */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center text-secondary mb-12">
                Nossa Equipe
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {team.map((member, index) => (
                  <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                        <Users className="w-10 h-10 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold text-secondary mb-1">
                        {member.name}
                      </h3>
                      <div className="text-primary font-medium mb-2">
                        {member.role}
                      </div>
                      <div className="text-sm text-gray-500 mb-3">
                        {member.experience}
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {member.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-primary to-secondary">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Pronto para realizar sua viagem?
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Nossa equipe especializada está pronta para transformar seu sonho de viagem em realidade.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-primary hover:bg-gray-100">
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Fale Conosco
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
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
