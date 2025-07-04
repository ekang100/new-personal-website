
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Portfolio from "@/components/Portfolio";
import Contact from "@/components/Contact";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <About />
      <Portfolio />
      <Contact />
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-6">
          <div className="flex justify-center items-center">
            <p className="text-gray-400 text-center">
              © 2024 Ellie Kang. Crafted with care and matcha.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
