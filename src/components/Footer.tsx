import { Logo } from "@/assets/images";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Mail, MapPin, MessageCircle } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-secondary text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <img 
              src={Logo} 
              alt="FG Vistos"
              className="h-12 w-auto mb-4 brightness-0 invert"
            />
            <p className="text-gray-300 text-sm">
              Mais de 20 anos realizando sonhos através de vistos aprovados.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Serviços</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><a href="/vistos?service=0" className="hover:text-white transition-colors">Vistos Consulares</a></li>
              <li><a href="/vistos?service=1" className="hover:text-white transition-colors">Autorização Eletrônica (ETA)</a></li>
              <li><a href="/vistos?service=2" className="hover:text-white transition-colors">Representação Consular</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Empresa</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><a href="/sobre-nos" className="hover:text-white transition-colors">Sobre Nós</a></li>
              <li><a href="/contato" className="hover:text-white transition-colors">Contato</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Contato</h3>
            <div className="space-y-2 text-sm text-gray-300">
              <p><FontAwesomeIcon icon={faWhatsapp} /> WhatsApp: (48) 99823-1163</p>
              <div className="flex items-center space-x-2">
                <Mail size={14} />
                <p>contato@fgvistos.com.br</p>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin size={14} />
                <p>Florianópolis, SC</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-600 mt-8 pt-8 text-center text-sm text-gray-300">
          <p>&copy; 2025 FG Vistos. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
