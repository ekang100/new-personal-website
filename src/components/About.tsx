
import { Heart, Users, Coffee, Lightbulb, Target, Sparkles } from "lucide-react";

const About = () => {
  const values = [
    {
      icon: Users,
      title: "Community First",
      description: "I believe the best products emerge from understanding and nurturing authentic human connections."
    },
    {
      icon: Heart,
      title: "Empathy-Driven",
      description: "Every feature decision starts with deep user empathy and real-world problem solving."
    },
    {
      icon: Lightbulb,
      title: "Innovation Mindset", 
      description: "Constantly exploring how technology can facilitate meaningful offline interactions."
    }
  ];

  const interests = [
    {
      icon: Coffee,
      title: "Matcha Obsessed",
      description: "Always on the hunt for the perfect matcha latte and cozy coffee shops for deep work sessions."
    },
    {
      icon: Target,
      title: "Real-Life Connections",
      description: "Fascinated by startups like Beli and Series that bridge digital and physical community experiences."
    },
    {
      icon: Sparkles,
      title: "Product Craft",
      description: "Passionate about the intersection of beautiful design, seamless UX, and meaningful user outcomes."
    }
  ];

  return (
    <section id="about" className="py-20 bg-cream relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-32 h-32 bg-matcha-light rounded-full opacity-10 animate-float"></div>
        <div className="absolute top-1/3 right-20 w-24 h-24 bg-brown-light rounded-full opacity-15 animate-float delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-20 h-20 bg-matcha rounded-full opacity-20 animate-float delay-500"></div>
        <div className="absolute bottom-1/3 right-10 w-28 h-28 bg-brown rounded-full opacity-10 animate-float delay-700"></div>
        <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-sage rounded-full opacity-25 animate-float delay-300"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              About Me
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              I'm a product manager who believes the best digital experiences 
              inspire real-world connections and community building.
            </p>
          </div>

          {/* Photo and Bio Section */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-matcha-light to-brown-light rounded-2xl transform rotate-3"></div>
              <img 
                src="/lovable-uploads/5c7e29ef-2661-4d55-9193-8b3114a8f68d.png"
                alt="Ellie Kang"
                className="relative w-full h-[500px] object-cover rounded-2xl shadow-xl"
              />
            </div>
            <div className="space-y-6">
              <h3 className="text-3xl font-bold text-gray-900">
                Building products that matter
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                As a product manager based in New York City, I specialize in creating digital experiences 
                that foster authentic human connections. My approach combines data-driven decision making 
                with deep empathy for user needs.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                I'm particularly drawn to startups that facilitate real-life interactions - companies 
                like Beli, which connects people through local experiences, and Series, which builds 
                community through shared interests and activities.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                When I'm not crafting product strategies, you'll find me exploring NYC's matcha scene, 
                attending community events, or brainstorming how technology can bring people together 
                in meaningful ways.
              </p>
            </div>
          </div>

          {/* Values section */}
          <div className="mb-16">
            <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
              What Drives Me
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              {values.map((value, index) => (
                <div key={index} className="floating-card bg-white rounded-2xl p-8 shadow-lg border border-gray-100 group">
                  <div className="w-16 h-16 bg-gradient-matcha rounded-full flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                    <value.icon size={36} className="text-[#a47148]" />
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-4 text-center">
                    {value.title}
                  </h4>
                  <p className="text-gray-600 text-center leading-relaxed">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Interests section */}
          <div>
            <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Beyond Product
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              {interests.map((interest, index) => (
                <div key={index} className="floating-card bg-white rounded-2xl p-8 shadow-lg border border-gray-100 group">
                  <div className="w-16 h-16 bg-gradient-brown rounded-full flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                    <interest.icon size={36} className="text-[#a47148]" />
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-4 text-center">
                    {interest.title}
                  </h4>
                  <p className="text-gray-600 text-center leading-relaxed">
                    {interest.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
