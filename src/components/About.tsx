import FeatureGrid from "./FeatureGrid";

const About = () => {

  return (
    <section id="about" className="py-20 bg-cream relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-32 h-32 bg-matcha-light rounded-full opacity-10 animate-float"></div>
        <div className="absolute top-1/3 right-20 w-24 h-24 bg-brown-light rounded-full opacity-15 animate-float delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-20 h-20 bg-matcha rounded-full opacity-20 animate-float delay-500"></div>
        <div className="absolute bottom-1/3 right-10 w-28 h-28 bg-brown rounded-full opacity-10 animate-float delay-700"></div>
        <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-sage rounded-full opacity-25 animate-float delay-300"></div>
        <div className="absolute top-[15%] left-[55%] w-24 h-24 bg-matcha-light rounded-full opacity-10 animate-float delay-200"></div>
        <div className="absolute bottom-[15%] right-[30%] w-20 h-20 bg-sage rounded-full opacity-20 animate-float delay-600"></div>
        <div className="absolute top-[60%] left-[10%] w-14 h-14 bg-brown-light rounded-full opacity-15 animate-float delay-900"></div>
        <div className="absolute top-[25%] right-[10%] w-16 h-16 bg-matcha-light rounded-full opacity-15 animate-float delay-400"></div>
        <div className="absolute bottom-[5%] left-[5%] w-18 h-18 bg-brown rounded-full opacity-10 animate-float delay-700"></div>
        <div className="absolute bottom-[10%] right-[5%] w-14 h-14 bg-sage rounded-full opacity-20 animate-float delay-1000"></div>
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
              inspire IRL connections and community.
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
              <p className="text-lg text-gray-700 leading-relaxed">
                Right now, I’m a PM at Capital One, working on digital products for 
                small business owners. I focus on making our experiences feel intuitive and seamless
                by deep-diving on customer behavior and building to solve pain points.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Outside of work, I’m curious about products that blur the line between 
                online and offline. I'm especially interested in AI-powered solutions that help people discover 
                new places, form genuine communities, or just generally lead better lives.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-1">
                When I’m not doing product stuff, you can find me:
                <ul className="text-lg text-gray-700 leading-relaxed list-disc list-inside mt-1">
                  <li>learning a new exercise in the gym</li>
                  <li>planning food-based travel itineraries</li>
                  <li>browsing Uniqlo's online sales</li>
                  <li>trying and ranking every matcha latte in NYC</li>
                </ul>
              </p>


            </div>
          </div>

          {/* Values Section */}
          <div>
            <h3 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">           
              Inside My Brain
            </h3>
            <FeatureGrid />
          </div>
          

        </div>
      </div>
    </section>
  );
};

export default About;
