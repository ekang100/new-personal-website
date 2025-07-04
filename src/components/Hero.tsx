
import { ArrowRight, MapPin, Coffee } from "lucide-react";

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 gradient-sage opacity-40"></div>
      
      {/* Floating elements for visual interest */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-matcha-light rounded-full opacity-20 animate-float"></div>
      <div className="absolute bottom-32 right-16 w-16 h-16 bg-brown-light rounded-full opacity-30 animate-float delay-1000"></div>
      <div className="absolute top-1/2 right-1/4 w-12 h-12 bg-brown rounded-full opacity-15 animate-float delay-500"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main heading */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="block text-gray-900">Hi, I'm</span>
            <span className="block text-brown">Ellie Kang</span>
          </h1>

          {/* Role */}
          <div className="text-2xl md:text-3xl font-semibold text-matcha mb-6">
            Product Manager & Community Builder
          </div>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            I craft meaningful products that bring people together in real life, 
            fueled by matcha and inspired by authentic human connections.
          </p>

          {/* Quick facts */}
          <div className="flex flex-wrap items-center justify-center gap-6 mb-12 text-gray-700">
            <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm rounded-full px-4 py-2">
              <MapPin size={18} className="text-brown" />
              <span>New York City</span>
            </div>
            <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm rounded-full px-4 py-2">
              <Coffee size={18} className="text-matcha" />
              <span>Matcha Enthusiast</span>
            </div>
            <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm rounded-full px-4 py-2">
              <span className="w-4 h-4 bg-brown rounded-full"></span>
              <span>Real-life Connections</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
              className="group inline-flex items-center gap-2 bg-brown text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-brown-dark transition-all duration-200 hover-lift shadow-lg"
            >
              View my work
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="group inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm text-brown border-2 border-brown px-8 py-4 rounded-full text-lg font-semibold hover:bg-brown hover:text-white transition-all duration-200 hover-lift"
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
