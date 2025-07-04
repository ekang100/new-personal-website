import {
  Sparkles,
  Heart,
  BookOpen,
  Camera,
  Star,
  Coffee,
  Music,
  Pen,
  Flower2,
  Wand2,
  Sun,
  MapPin,
  ArrowRight,
  Moon,
  Cloud,
} from "lucide-react";

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 animate-gradient opacity-70 z-0"></div>

      {/* Signature video overlay */}
        <video
          autoPlay
          loop
          muted
          playsInline
          src="/signature.mp4"
          className="absolute inset-0 w-full h-full object-cover z-0 opacity-30 pointer-events-none mix-blend-screen"
        />

      
      {/* Floating Lucide icons */}
      {/* Existing icons */}
        <div className="absolute top-[40%] right-[20%] opacity-20 animate-float delay-600 transition-transform duration-300 hover:scale-125">
          <Sparkles size={34} className="text-brown-dark" />
        </div>
        <div className="absolute bottom-[35%] left-[25%] opacity-20 animate-float delay-400 transition-transform duration-300 hover:scale-125">
          <Heart size={34} className="text-brown-dark" />
        </div>
        <div className="absolute top-[10%] right-[25%] opacity-20 animate-float delay-500 transition-transform duration-300 hover:scale-125">
          <BookOpen size={30} className="text-brown-dark" />
        </div>
        <div className="absolute bottom-[18%] left-[18%] opacity-20 animate-float delay-700 transition-transform duration-300 hover:scale-125">
          <Camera size={34} className="text-brown-dark" />
        </div>
        <div className="absolute top-[30%] left-[15%] opacity-20 animate-float delay-900 transition-transform duration-300 hover:scale-125">
          <Star size={30} className="text-brown-dark" />
        </div>
        <div className="absolute top-[18%] left-[28%] opacity-20 animate-float delay-1000 transition-transform duration-300 hover:scale-125">
          <Coffee size={34} className="text-brown-dark" />
        </div>
        <div className="absolute bottom-[10%] right-[10%] opacity-20 animate-float delay-600 transition-transform duration-300 hover:scale-125">
          <Music size={34} className="text-brown-dark" />
        </div>
        <div className="absolute top-[25%] left-[65%] opacity-20 animate-float delay-800 transition-transform duration-300 hover:scale-125">
          <Pen size={30} className="text-brown-dark" />
        </div>
        <div className="absolute top-[65%] right-[25%] opacity-20 animate-float delay-900 transition-transform duration-300 hover:scale-125">
          <Flower2 size={32} className="text-brown-dark" />
        </div>
        <div className="absolute bottom-[8%] left-[45%] opacity-20 animate-float delay-1000 transition-transform duration-300 hover:scale-125">
          <Wand2 size={30} className="text-brown-dark" />
        </div>
        <div className="absolute top-[50%] left-[5%] opacity-20 animate-float delay-500 transition-transform duration-300 hover:scale-125">
          <Sun size={30} className="text-brown-dark" />
        </div>
        <div className="absolute bottom-[40%] right-[5%] opacity-20 animate-float delay-1200 transition-transform duration-300 hover:scale-125">
          <Moon size={30} className="text-brown-dark" />
        </div>
        <div className="absolute top-[70%] right-[40%] opacity-20 animate-float delay-600 transition-transform duration-300 hover:scale-125">
          <Cloud size={30} className="text-brown-dark" />
        </div>


      {/* Hero content */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-2xl md:text-3xl font-bold leading-tight">
          <span className="block text-gray-900">Hi, I'm</span>
          <span className="block text-brown text-7xl md:text-8xl">
            Ellie Kang
          </span>
        </h1>


          <div className="text-2xl md:text-3xl font-semibold text-matcha mb-6 mt-5 animate-fade-in delay-200">
            product manager & community builder
          </div>

          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed animate-fade-in delay-300">
            I craft meaningful products that bring people together in real life, 
            fueled by matcha and inspired by authentic human connections.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 mb-12 text-gray-700 animate-fade-in delay-400">
            <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm rounded-full px-4 py-2 hover:bg-white/80 transition-all duration-300 hover-lift">
              <MapPin size={18} className="text-brown" />
              <span>New York City</span>
            </div>
            <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm rounded-full px-4 py-2 hover:bg-white/80 transition-all duration-300 hover-lift">
              <Coffee size={18} className="text-matcha" />
              <span>Matcha Lover</span>
            </div>
            <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm rounded-full px-4 py-2 hover:bg-white/80 transition-all duration-300 hover-lift">
              <span className="w-4 h-4 bg-brown rounded-full"></span>
              <span>Real-life Connections</span>
            </div>
          </div>

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

