
import { ArrowRight, MapPin, Coffee, Sparkles, Heart, Users, StickyNote, BarChart3 } from "lucide-react";
import { useState, useEffect } from "react";

const Hero = () => {
  const [currentRole, setCurrentRole] = useState(0);
  const [showTooltip, setShowTooltip] = useState(false);
  
  const roles = [
    "Product Manager",
    "Community Builder", 
    "Matcha Enthusiast",
    "Connection Catalyst"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const floatingIcons = [
    { Icon: Users, delay: "0s", position: "top-20 left-20" },
    { Icon: StickyNote, delay: "1s", position: "top-32 right-32" },
    { Icon: BarChart3, delay: "2s", position: "bottom-40 left-40" },
    { Icon: Coffee, delay: "0.5s", position: "bottom-20 right-20" },
    { Icon: Heart, delay: "1.5s", position: "top-1/2 left-10" },
    { Icon: Sparkles, delay: "2.5s", position: "top-1/4 right-1/4" }
  ];

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-cream via-sage/30 to-matcha-light/20">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-72 h-72 bg-matcha/10 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-brown/8 rounded-full animate-float"></div>
        <div className="absolute top-1/3 right-1/3 w-40 h-40 bg-sage/15 rounded-full animate-bounce delay-1000"></div>
      </div>

      {/* Floating interactive icons */}
      {floatingIcons.map(({ Icon, delay, position }, index) => (
        <div
          key={index}
          className={`absolute ${position} w-12 h-12 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg animate-float hover:scale-110 transition-transform cursor-pointer`}
          style={{ animationDelay: delay }}
        >
          <Icon size={20} className="text-brown" />
        </div>
      ))}
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Massive typography hero */}
          <div className="text-center mb-12">
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black mb-8 leading-none">
              <span className="block text-gray-900 animate-fade-in">Hi, I'm</span>
              <span className="block bg-gradient-to-r from-matcha-dark via-brown to-matcha bg-clip-text text-transparent animate-fade-in delay-300">
                Ellie Kang
              </span>
            </h1>

            {/* Bold subheader with rotating text */}
            <div className="text-2xl md:text-4xl font-bold text-gray-800 mb-8 animate-fade-in delay-500">
              <span>I design product systems that turn </span>
              <span className="bg-gradient-to-r from-matcha to-brown bg-clip-text text-transparent">
                matcha-fueled ideas
              </span>
              <span> into reality.</span>
            </div>

            {/* Interactive role with tooltip */}
            <div className="relative inline-block mb-12 animate-fade-in delay-700">
              <div
                className="text-xl md:text-2xl font-semibold text-brown cursor-pointer hover:text-brown-dark transition-colors"
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
              >
                {roles[currentRole]}
              </div>
              
              {showTooltip && (
                <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-brown text-white px-4 py-2 rounded-lg text-sm whitespace-nowrap animate-fade-in">
                  But secretly a UX snob ☕️
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-brown"></div>
                </div>
              )}
            </div>

            {/* One-liner */}
            <p className="text-xl md:text-2xl text-gray-700 mb-12 max-w-4xl mx-auto leading-relaxed animate-fade-in delay-900">
              I build joyful tools for real-world connections.
            </p>

            {/* Personal details with enhanced styling */}
            <div className="flex flex-wrap items-center justify-center gap-6 mb-12 animate-fade-in delay-1000">
              <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <MapPin size={18} className="text-brown" />
                <span className="font-medium">New York City</span>
              </div>
              <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <Coffee size={18} className="text-matcha" />
                <span className="font-medium">Matcha Powered</span>
              </div>
              <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <Heart size={18} className="text-brown" />
                <span className="font-medium">Real Connections</span>
              </div>
            </div>

            {/* Enhanced CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in delay-1200">
              <button 
                onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
                className="group relative overflow-hidden bg-brown text-white px-10 py-5 rounded-full text-xl font-bold shadow-2xl hover:shadow-brown/25 transition-all duration-300 hover:-translate-y-2"
              >
                <span className="relative z-10 flex items-center gap-3">
                  View my work
                  <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-brown-dark to-brown opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </button>
              
              <button 
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="group bg-white/90 backdrop-blur-sm text-brown border-3 border-brown px-10 py-5 rounded-full text-xl font-bold hover:bg-brown hover:text-white transition-all duration-300 hover:-translate-y-2 shadow-xl hover:shadow-2xl"
              >
                Let's connect
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Matcha gradient strip */}
      <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-matcha via-sage to-matcha-light"></div>
    </section>
  );
};

export default Hero;
