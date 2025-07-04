
import { Heart, Users, Coffee, Lightbulb, Target, Sparkles } from "lucide-react";

const About = () => {
  const values = [
    {
      icon: Users,
      title: "Community First",
      description: "I believe the best products emerge from understanding and nurturing authentic human connections.",
      gradient: "from-blue-400 to-blue-600"
    },
    {
      icon: Heart,
      title: "Empathy-Driven",
      description: "Every feature decision starts with deep user empathy and real-world problem solving.",
      gradient: "from-red-400 to-pink-600"
    },
    {
      icon: Lightbulb,
      title: "Innovation Mindset", 
      description: "Constantly exploring how technology can facilitate meaningful offline interactions.",
      gradient: "from-yellow-400 to-orange-600"
    }
  ];

  const interests = [
    {
      icon: Coffee,
      title: "Matcha Obsessed",
      description: "Always on the hunt for the perfect matcha latte and cozy coffee shops for deep work sessions.",
      gradient: "from-matcha to-matcha-dark"
    },
    {
      icon: Target,
      title: "Real-Life Connections",
      description: "Fascinated by startups like Beli and Series that bridge digital and physical community experiences.",
      gradient: "from-purple-400 to-purple-600"
    },
    {
      icon: Sparkles,
      title: "Product Craft",
      description: "Passionate about the intersection of beautiful design, seamless UX, and meaningful user outcomes.",
      gradient: "from-brown to-brown-dark"
    }
  ];

  return (
    <section id="about" className="py-20 bg-gradient-to-b from-cream via-white to-sage/20 relative overflow-hidden">
      {/* Bouncing matcha balls as dividers */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-matcha rounded-full animate-bounce"></div>
      <div className="absolute top-3 left-1/2 transform -translate-x-1/2 translate-x-6 w-4 h-4 bg-brown rounded-full animate-bounce delay-300"></div>
      <div className="absolute top-1 left-1/2 transform -translate-x-1/2 -translate-x-4 w-3 h-3 bg-sage rounded-full animate-bounce delay-500"></div>

      {/* Enhanced floating background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-40 h-40 bg-matcha/10 rounded-full animate-float"></div>
        <div className="absolute top-1/3 right-20 w-32 h-32 bg-brown/15 rounded-full animate-float delay-1000"></div>
        <div className="absolute bottom-32 left-1/4 w-24 h-24 bg-sage/20 rounded-full animate-float delay-500"></div>
        <div className="absolute bottom-1/3 right-10 w-36 h-36 bg-brown/10 rounded-full animate-float delay-700"></div>
        <div className="absolute top-1/2 left-1/3 w-20 h-20 bg-matcha-light/25 rounded-full animate-float delay-300"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Bold header */}
          <div className="text-center mb-20 animate-fade-in">
            <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-6">
              About <span className="bg-gradient-to-r from-matcha to-brown bg-clip-text text-transparent">Me</span>
            </h2>
            <p className="text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-medium">
              I'm a product manager who believes the best digital experiences 
              inspire real-world connections and community building.
            </p>
          </div>

          {/* Enhanced photo and bio section */}
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-24 animate-fade-in delay-200">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-matcha-light via-brown-light to-sage rounded-3xl transform rotate-3 group-hover:rotate-6 transition-transform duration-500"></div>
              <div className="absolute inset-0 bg-gradient-to-tl from-brown via-matcha to-matcha-light rounded-3xl transform -rotate-2 group-hover:-rotate-4 transition-transform duration-700 opacity-70"></div>
              <img 
                src="/lovable-uploads/5c7e29ef-2661-4d55-9193-8b3114a8f68d.png"
                alt="Ellie Kang"
                className="relative w-full h-[600px] object-cover rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105"
              />
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-xl animate-pulse-glow">
                <Coffee size={32} className="text-matcha" />
              </div>
            </div>
            
            <div className="space-y-8">
              <h3 className="text-4xl font-black text-gray-900 leading-tight">
                Building products that <span className="bg-gradient-to-r from-matcha to-brown bg-clip-text text-transparent">matter</span>
              </h3>
              <p className="text-xl text-gray-700 leading-relaxed">
                As a product manager based in New York City, I specialize in creating digital experiences 
                that foster authentic human connections. My approach combines data-driven decision making 
                with deep empathy for user needs.
              </p>
              <p className="text-xl text-gray-700 leading-relaxed">
                I'm particularly drawn to startups that facilitate real-life interactions - companies 
                like Beli, which connects people through local experiences, and Series, which builds 
                community through shared interests and activities.
              </p>
              
              {/* Call-out quote */}
              <div className="bg-gradient-to-r from-matcha/20 to-brown/20 rounded-2xl p-6 border-l-4 border-brown">
                <p className="text-xl font-semibold text-gray-800 italic">
                  "When I'm not crafting product strategies, you'll find me exploring NYC's matcha scene, 
                  attending community events, or brainstorming how technology can bring people together."
                </p>
              </div>
            </div>
          </div>

          {/* Enhanced values section */}
          <div className="mb-20 animate-fade-in delay-400">
            <h3 className="text-4xl font-black text-center text-gray-900 mb-16">
              What <span className="bg-gradient-to-r from-matcha to-brown bg-clip-text text-transparent">Drives</span> Me
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              {values.map((value, index) => (
                <div key={index} className="group floating-card bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-100">
                  <div className={`bg-gradient-to-r ${value.gradient} p6 h-32 relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-black/10"></div>
                    <div className="absolute top-6 right-6 w-16 h-16 bg-white/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <value.icon size={32} className="text-white" />
                    </div>
                    <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-white/10 rounded-full"></div>
                  </div>
                  <div className="p-8">
                    <h4 className="text-2xl font-bold text-gray-900 mb-4">
                      {value.title}
                    </h4>
                    <p className="text-gray-600 leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Enhanced interests section */}
          <div className="animate-fade-in delay-600">
            <h3 className="text-4xl font-black text-center text-gray-900 mb-16">
              Beyond <span className="bg-gradient-to-r from-matcha to-brown bg-clip-text text-transparent">Product</span>
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              {interests.map((interest, index) => (
                <div key={index} className="group floating-card bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-100">
                  <div className={`bg-gradient-to-r ${interest.gradient} p-6 h-32 relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-black/10"></div>
                    <div className="absolute top-6 right-6 w-16 h-16 bg-white/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <interest.icon size={32} className="text-white" />
                    </div>
                    <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-white/10 rounded-full"></div>
                  </div>
                  <div className="p-8">
                    <h4 className="text-2xl font-bold text-gray-900 mb-4">
                      {interest.title}
                    </h4>
                    <p className="text-gray-600 leading-relaxed">
                      {interest.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Matcha gradient strip */}
      <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-matcha via-sage to-matcha-light"></div>
    </section>
  );
};

export default About;
