
import { ArrowRight, MapPin, Coffee } from "lucide-react";

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 gradient-cream opacity-50"></div>
      
      {/* Floating elements for visual interest */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-matcha-light rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute bottom-32 right-16 w-16 h-16 bg-matcha rounded-full opacity-30 animate-pulse delay-1000"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Status badge */}
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 mb-8 border shadow-sm">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-gray-700">Available for opportunities</span>
          </div>

          {/* Main heading */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="block text-gray-900">Product Manager</span>
            <span className="block text-matcha">& Community Builder</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            I craft meaningful products that bring people together in real life, 
            fueled by matcha and inspired by authentic human connections.
          </p>

          {/* Quick facts */}
          <div className="flex flex-wrap items-center justify-center gap-6 mb-12 text-gray-700">
            <div className="flex items-center gap-2">
              <MapPin size={18} className="text-matcha" />
              <span>San Francisco Bay Area</span>
            </div>
            <div className="flex items-center gap-2">
              <Coffee size={18} className="text-matcha" />
              <span>Matcha Enthusiast</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 bg-matcha rounded-full"></span>
              <span>Real-life Connections</span>
            </div>
          </div>

          {/* CTA Button */}
          <button className="group inline-flex items-center gap-2 bg-matcha text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-matcha-dark transition-all duration-200 hover-lift shadow-lg">
            Let's build something together
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
