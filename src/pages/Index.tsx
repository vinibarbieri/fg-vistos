
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import VisaSelector from '@/components/VisaSelector';
import WhyChooseUs from '@/components/WhyChooseUs';
import ProcessRoadmap from '@/components/ProcessRoadmap';
import Testimonials from '@/components/Testimonials';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <VisaSelector 
        showWhatsAppButton={true}
      />
      <WhyChooseUs />
      <ProcessRoadmap />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default Index;
