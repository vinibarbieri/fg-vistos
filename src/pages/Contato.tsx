
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useToast } from '@/hooks/use-toast';

const Contato = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    assunto: '',
    mensagem: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder - aqui seria integrado com o backend
    toast({
      title: "Mensagem enviada!",
      description: "Entraremos em contato em breve.",
    });
    setFormData({
      nome: '',
      email: '',
      telefone: '',
      assunto: '',
      mensagem: ''
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Telefone',
      content: '+55 (11) 3456-7890',
      link: 'tel:+551134567890'
    },
    {
      icon: Mail,
      title: 'E-mail',
      content: 'contato@fgvistos.com.br',
      link: 'mailto:contato@fgvistos.com.br'
    },
    {
      icon: MapPin,
      title: 'Endereço',
      content: 'Av. Paulista, 1000 - Sala 1501\nBela Vista, São Paulo - SP\nCEP: 01310-100',
      link: '#'
    },
    {
      icon: Clock,
      title: 'Horário de Atendimento',
      content: 'Segunda a Sexta: 9h às 18h\nSábado: 9h às 13h',
      link: '#'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary to-secondary py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Entre em Contato
              </h1>
              <p className="text-xl opacity-90">
                Estamos aqui para transformar seu sonho de viagem em realidade. 
                Entre em contato conosco e descubra como podemos ajudá-lo.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Form & Info */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12">
                
                {/* Contact Form */}
                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-2xl text-secondary">
                      Envie sua Mensagem
                    </CardTitle>
                    <p className="text-gray-600">
                      Preencha o formulário abaixo e nossa equipe entrará em contato em breve.
                    </p>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="nome">Nome Completo *</Label>
                          <Input
                            id="nome"
                            name="nome"
                            value={formData.nome}
                            onChange={handleChange}
                            required
                            placeholder="Seu nome completo"
                          />
                        </div>
                        <div>
                          <Label htmlFor="telefone">Telefone *</Label>
                          <Input
                            id="telefone"
                            name="telefone"
                            value={formData.telefone}
                            onChange={handleChange}
                            required
                            placeholder="(11) 99999-9999"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="email">E-mail *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          placeholder="seu@email.com"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="assunto">Assunto *</Label>
                        <Input
                          id="assunto"
                          name="assunto"
                          value={formData.assunto}
                          onChange={handleChange}
                          required
                          placeholder="Sobre qual serviço você gostaria de falar?"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="mensagem">Mensagem *</Label>
                        <Textarea
                          id="mensagem"
                          name="mensagem"
                          value={formData.mensagem}
                          onChange={handleChange}
                          required
                          placeholder="Conte-nos mais detalhes sobre sua necessidade..."
                          rows={5}
                        />
                      </div>
                      
                      <Button type="submit" size="lg" className="w-full">
                        Enviar Mensagem
                      </Button>
                    </form>
                  </CardContent>
                </Card>

                {/* Contact Info */}
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-secondary mb-6">
                      Outras Formas de Contato
                    </h2>
                    <div className="grid gap-6">
                      {contactInfo.map((info, index) => (
                        <Card key={index} className="hover:shadow-md transition-shadow">
                          <CardContent className="p-6">
                            <div className="flex items-start space-x-4">
                              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                                <info.icon className="w-6 h-6 text-primary" />
                              </div>
                              <div>
                                <h3 className="font-semibold text-secondary mb-2">
                                  {info.title}
                                </h3>
                                <p className="text-gray-600 whitespace-pre-line">
                                  {info.content}
                                </p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>

                  {/* WhatsApp CTA */}
                  <Card className="bg-green-50 border-green-200">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                          <MessageCircle className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-green-800 mb-1">
                            Atendimento Imediato
                          </h3>
                          <p className="text-green-700 text-sm">
                            Fale conosco agora pelo WhatsApp
                          </p>
                        </div>
                        <Button 
                          asChild
                          className="bg-green-500 hover:bg-green-600"
                        >
                          <a 
                            href="https://wa.me/5511999999999" 
                            target="_blank" 
                            rel="noopener noreferrer"
                          >
                            WhatsApp
                          </a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center text-secondary mb-8">
                Nossa Localização
              </h2>
              <div className="bg-gray-100 rounded-lg h-96 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <MapPin className="w-16 h-16 mx-auto mb-4" />
                  <p className="text-lg font-medium">Mapa Interativo</p>
                  <p className="text-sm">
                    Av. Paulista, 1000 - Bela Vista, São Paulo - SP
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center text-secondary mb-12">
                Dúvidas Frequentes sobre Contato
              </h2>
              <div className="space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-secondary mb-2">
                      Qual o prazo de resposta para mensagens?
                    </h3>
                    <p className="text-gray-600">
                      Respondemos todas as mensagens em até 24 horas úteis. Para atendimento imediato, 
                      utilize nosso WhatsApp durante o horário comercial.
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-secondary mb-2">
                      Posso agendar uma consulta presencial?
                    </h3>
                    <p className="text-gray-600">
                      Sim! Entre em contato conosco para agendar uma consulta presencial em nosso 
                      escritório na Av. Paulista. Também oferecemos consultoria online via videochamada.
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-secondary mb-2">
                      Vocês atendem em fins de semana?
                    </h3>
                    <p className="text-gray-600">
                      Nosso atendimento presencial é de segunda a sexta das 9h às 18h, e sábados das 9h às 13h. 
                      No WhatsApp, respondemos também aos domingos para casos urgentes.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contato;
