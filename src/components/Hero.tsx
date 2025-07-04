
import { ArrowRight, MapPin, Coffee, Sparkles, Heart } from "lucide-react";

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Enhanced background gradient with animation */}
      <div className="absolute inset-0 animate-gradient opacity-70 z-0"></div>
      
      {/* More floating elements for visual interest */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-matcha-light rounded-full opacity-20 animate-float"></div>
      <div className="absolute bottom-32 right-16 w-16 h-16 bg-brown-light rounded-full opacity-30 animate-float delay-1000"></div>
      <div className="absolute top-1/2 right-1/4 w-12 h-12 bg-brown rounded-full opacity-15 animate-float delay-500"></div>
      <div className="absolute top-1/4 left-1/4 w-24 h-24 bg-matcha rounded-full opacity-10 animate-float delay-700"></div>
      <div className="absolute bottom-1/4 left-20 w-18 h-18 bg-sage rounded-full opacity-25 animate-float delay-300"></div>
      <div className="absolute top-3/4 right-1/3 w-14 h-14 bg-brown-light rounded-full opacity-20 animate-float delay-1200"></div>
    
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main heading with enhanced animation */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight animate-fade-in">
            <span className="block text-gray-900">Hi, I'm</span>
            <span className="block text-brown hover:text-brown-dark transition-colors duration-300">Ellie Kang</span>
          </h1>

          {/* Role with animation */}
          <div className="text-2xl md:text-3xl font-semibold text-matcha mb-6 animate-fade-in delay-200">
            Product Manager & Community Builder
          </div>

          {/* Subtitle with animation */}
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed animate-fade-in delay-300">
            I craft meaningful products that bring people together in real life, 
            fueled by matcha and inspired by authentic human connections.
          </p>

          {/* Quick facts with enhanced styling */}
          <div className="flex flex-wrap items-center justify-center gap-6 mb-12 text-gray-700 animate-fade-in delay-400">
            <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm rounded-full px-4 py-2 hover:bg-white/80 transition-all duration-300 hover-lift">
              <MapPin size={18} className="text-brown" />
              <span>New York City</span>
            </div>
            <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm rounded-full px-4 py-2 hover:bg-white/80 transition-all duration-300 hover-lift">
              <Coffee size={18} className="text-matcha" />
              <span>Matcha Enthusiast</span>
            </div>
            <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm rounded-full px-4 py-2 hover:bg-white/80 transition-all duration-300 hover-lift">
              <span className="w-4 h-4 bg-brown rounded-full"></span>
              <span>Real-life Connections</span>
            </div>
          </div>

          {/* CTA Buttons with enhanced animations */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in delay-500">
            <button 
              onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
              className="group inline-flex items-center gap-2 bg-brown text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-brown-dark transition-all duration-200 hover-lift shadow-lg hover:shadow-xl"
            >
              View my work
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="group inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm text-brown border-2 border-brown px-8 py-4 rounded-full text-lg font-semibold hover:bg-brown hover:text-white transition-all duration-200 hover-lift hover:shadow-lg"
            >
              Let's connect
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
