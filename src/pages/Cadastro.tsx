import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { UserRegistration } from "@/components/UserRegistration";

const Cadastro = () => {
   return (
     <div className="min-h-screen flex flex-col">
       <Navbar />
       <UserRegistration />
       <div className="flex-1" />
       <Footer />
     </div>
   );
 };
 
 export default Cadastro;