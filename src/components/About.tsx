
import { Heart, Users, Lightbulb, Target } from "lucide-react";

const About = () => {
  const interests = [
    {
      icon: Users,
      title: "Community Building",
      description: "Creating spaces where authentic connections flourish and people feel genuinely supported."
    },
    {
      icon: Heart,
      title: "Real-life Interactions",
      description: "Passionate about products like Beli and Series that prioritize in-person experiences."
    },
    {
      icon: Lightbulb,
      title: "Product Strategy",
      description: "Translating user needs into compelling product experiences that drive meaningful engagement."
    },
    {
      icon: Target,
      title: "Startup Ecosystem",
      description: "Fascinated by early-stage companies solving problems through human-centered design."
    }
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              About Me
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              I'm a product manager who believes the best digital experiences are those that 
              enhance our real-world connections rather than replace them.
            </p>
          </div>

          {/* Main content */}
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            {/* Left column - Story */}
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                My Journey
              </h3>
              <p className="text-gray-600 leading-relaxed">
                As a product manager, I've learned that the most impactful products are those that 
                understand human behavior at its core. My fascination with startups like Beli and Series 
                stems from their commitment to fostering genuine, real-world interactions.
              </p>
              <p className="text-gray-600 leading-relaxed">
                When I'm not crafting product strategies, you'll find me exploring local matcha spots, 
                attending community events, or diving deep into how technology can bring people closer 
                together rather than further apart.
              </p>
              <p className="text-gray-600 leading-relaxed">
                I believe the future of product management lies in creating experiences that are 
                deeply human, authentically connected, and purposefully designed to enhance our 
                offline lives.
              </p>
            </div>

            {/* Right column - Image placeholder */}
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-matcha-light to-matcha rounded-2xl p-8 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Coffee size={40} />
                  </div>
                  <p className="text-lg font-medium">Matcha-powered</p>
                  <p className="text-sm opacity-90">Product Management</p>
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-matcha-light rounded-full opacity-30"></div>
              <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-matcha rounded-full opacity-20"></div>
            </div>
          </div>

          {/* Interests grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {interests.map((interest, index) => (
              <div 
                key={index} 
                className="text-center group hover-lift bg-gray-50 rounded-xl p-6 transition-all duration-200 hover:shadow-md"
              >
                <div className="w-16 h-16 bg-matcha text-white rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-200">
                  <interest.icon size={24} />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  {interest.title}
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {interest.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
