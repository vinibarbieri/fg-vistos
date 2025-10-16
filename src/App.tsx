
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Vistos from "./pages/Vistos";
import SobreNos from "./pages/SobreNos";
import Contato from "./pages/Contato";
import NotFound from "./pages/NotFound";
import { PaymentSuccess } from "./pages/PaymentSuccess";
import Cadastro from "./pages/Cadastro";
import ScrollToTop from "./components/ScrollToTop";

const queryClient = new QueryClient();

const basename = import.meta.env.PROD ? "/fg-vistos/" : "/";

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter basename={basename}>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/vistos" element={<Vistos />} />
          <Route path="/sobre-nos" element={<SobreNos />} />
          <Route path="/contato" element={<Contato />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
