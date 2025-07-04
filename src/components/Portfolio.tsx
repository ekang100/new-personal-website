
import { ExternalLink, Github, TrendingUp, Users, FileText, Lightbulb } from "lucide-react";

const Portfolio = () => {
  const projects = [
    {
      title: "Capital One Account Flow",
      company: "Capital One",
      impact: "Saved $5M in deposits by redesigning account application flow",
      description: "Redesigned the entire user onboarding experience, reducing drop-off rates by 35% through simplified forms and progressive disclosure.",
      tags: ["Research", "Wireframes", "PM Strategy"],
      icon: TrendingUp,
      gradient: "from-blue-500 to-blue-600",
      cta: "See PRD →"
    },
    {
      title: "Community Connect Platform",
      company: "Personal Project",
      impact: "Connected 2,000+ users across 15 cities through local events",
      description: "Built a platform bridging digital and physical interactions, focusing on authentic community building and local engagement.",
      tags: ["Product Design", "Community", "Growth"],
      icon: Users,
      gradient: "from-matcha to-matcha-dark",
      cta: "View Case Study →"
    },
    {
      title: "Matcha Discovery App",
      company: "Side Project",
      impact: "Featured 500+ matcha shops with 4.8★ user rating",
      description: "Mobile-first experience helping matcha enthusiasts discover local shops and connect with fellow tea lovers.",
      tags: ["Mobile Design", "Location", "Social"],
      icon: Lightbulb,
      gradient: "from-sage to-matcha-light",
      cta: "Try It →"
    },
    {
      title: "PM Strategy Toolkit",
      company: "Open Source",
      impact: "Downloaded 10K+ times by product teams worldwide",
      description: "Created comprehensive templates and frameworks for product discovery, prioritization, and stakeholder alignment.",
      tags: ["Templates", "Strategy", "Tools"],
      icon: FileText,
      gradient: "from-brown to-brown-dark",
      cta: "Download →"
    }
  ];

  const microPosts = [
    "Trying a new Notion CRM for personal relationships.",
    "Obsessed with Beli's growth loops.",
    "Reading 'Hooked' for the 3rd time.",
    "Testing new matcha spots in Brooklyn."
  ];

  return (
    <section id="portfolio" className="py-20 bg-gradient-to-b from-white to-sage/10 relative overflow-hidden">
      {/* Bouncing matcha balls as dividers */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-matcha rounded-full animate-bounce"></div>
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 translate-x-8 w-6 h-6 bg-brown rounded-full animate-bounce delay-300"></div>
      <div className="absolute top-2 left-1/2 transform -translate-x-1/2 -translate-x-6 w-4 h-4 bg-sage rounded-full animate-bounce delay-500"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Bold section header */}
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-6">
              My <span className="bg-gradient-to-r from-matcha to-brown bg-clip-text text-transparent">Work</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              It's not what I built, it's <em>why</em> I built it and what I learned.
            </p>
            <div className="text-lg font-semibold text-brown mt-4">
              My superpower: translating chaos into clarity.
            </div>
          </div>

          {/* Project grid */}
          <div className="grid lg:grid-cols-2 gap-8 mb-20">
            {projects.map((project, index) => (
              <div 
                key={index}
                className="group bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-4 border border-gray-100"
              >
                {/* Project header with gradient */}
                <div className={`bg-gradient-to-r ${project.gradient} p-8 relative overflow-hidden`}>
                  <div className="absolute top-4 right-4 w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                    <project.icon size={28} className="text-white" />
                  </div>
                  <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-white/10 rounded-full"></div>
                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {project.title}
                    </h3>
                    <div className="text-white/90 font-medium">
                      {project.company}
                    </div>
                  </div>
                </div>

                {/* Project content */}
                <div className="p-8">
                  {/* Impact statement */}
                  <div className="bg-sage/20 rounded-2xl p-4 mb-6">
                    <div className="text-brown font-bold text-lg mb-2">Impact</div>
                    <p className="text-gray-800 font-semibold">
                      {project.impact}
                    </p>
                  </div>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {project.description}
                  </p>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag, tagIndex) => (
                      <span 
                        key={tagIndex}
                        className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <button className="group/btn flex items-center gap-2 text-brown font-bold hover:text-brown-dark transition-colors">
                    {project.cta}
                    <ExternalLink size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* What I'm into lately section */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              What I'm into lately ✨
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {microPosts.map((post, index) => (
                <div 
                  key={index}
                  className="bg-gradient-to-r from-sage/20 to-matcha-light/20 rounded-2xl p-4 hover:scale-105 transition-transform cursor-pointer"
                >
                  <p className="text-gray-700 font-medium">"{post}"</p>
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

export default Portfolio;
