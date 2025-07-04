
import { ExternalLink, Github, Lightbulb, Users, Zap } from "lucide-react";

const Portfolio = () => {
  const projects = [
    {
      title: "Community Connect",
      description: "A platform that bridges digital and physical interactions, helping people build meaningful connections in their local communities.",
      category: "Community Building",
      technologies: ["React", "Node.js", "MongoDB"],
      impact: "Connected 2,000+ users across 15 cities",
      gradient: "gradient-matcha",
      icon: Users,
      links: {
        live: "#",
        github: "#"
      }
    },
    {
      title: "Matcha Finder",
      description: "Mobile-first web app that helps matcha enthusiasts discover the best local tea shops and connect with fellow matcha lovers.",
      category: "Product Design",
      technologies: ["React Native", "Firebase", "Maps API"],
      impact: "Featured 500+ matcha shops nationwide",
      gradient: "gradient-sage",
      icon: Lightbulb,
      links: {
        live: "#",
        github: "#"
      }
    },
    {
      title: "Real Connect",
      description: "Startup concept focused on reducing digital noise and promoting authentic in-person interactions through smart event matching.",
      category: "Startup Strategy",
      technologies: ["Figma", "User Research", "Product Strategy"],
      impact: "Validated with 100+ user interviews",
      gradient: "gradient-brown",
      icon: Zap,
      links: {
        live: "#",
        github: "#"
      }
    }
  ];

  return (
    <section id="portfolio" className="relative py-20 bg-sage/20">
      <div className="absolute inset-0 z-0 pointer-events-none">
      <div className="absolute top-10 left-10 w-32 h-32 bg-matcha-light rounded-full opacity-10 animate-float"></div>
      <div className="absolute top-1/3 right-20 w-24 h-24 bg-brown-light rounded-full opacity-15 animate-float delay-1000"></div>
      <div className="absolute bottom-20 left-1/4 w-20 h-20 bg-matcha rounded-full opacity-20 animate-float delay-500"></div>
      <div className="absolute bottom-1/3 right-10 w-28 h-28 bg-brown rounded-full opacity-10 animate-float delay-700"></div>
    </div>
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Product Portfolio
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              A collection of projects that showcase my passion for building products 
              that bring people together and create meaningful real-world impact.
            </p>
          </div>

          {/* Projects grid */}
          <div className="grid lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div 
                key={index}
                className="floating-card bg-white rounded-2xl overflow-hidden border border-gray-100 group"
              >
                {/* Project header */}
                <div className={`${project.gradient} p-6 relative overflow-hidden`}>
                  <div className="absolute top-4 right-4 w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <project.icon size={20} className="text-white" />
                  </div>
                  <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-white/10 rounded-full"></div>
                  <div className="relative z-10">
                    <span className="inline-block bg-white/20 text-white text-xs font-medium px-3 py-1 rounded-full mb-3">
                      {project.category}
                    </span>
                    <h3 className="text-xl font-bold text-white mb-2">
                      {project.title}
                    </h3>
                  </div>
                </div>

                {/* Project content */}
                <div className="p-6">
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {project.description}
                  </p>
                  
                  {/* Technologies */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, techIndex) => (
                        <span 
                          key={techIndex}
                          className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-md"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Impact */}
                  <div className="mb-6">
                    <span className="text-sm font-semibold text-brown mb-1 block">Impact</span>
                    <p className="text-sm text-gray-600">{project.impact}</p>
                  </div>

                  {/* Links */}
                  <div className="flex gap-3">
                    <a
                      href={project.links.live}
                      className="flex items-center gap-2 text-sm text-matcha hover:text-matcha-dark transition-colors"
                    >
                      <ExternalLink size={16} />
                      View Project
                    </a>
                    <a
                      href={project.links.github}
                      className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
                    >
                      <Github size={16} />
                      Code
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Portfolio CTA */}
          <div className="text-center mt-16">
            <div className="inline-block bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Interested in my work?
              </h3>
              <p className="text-gray-600 mb-6 max-w-2xl">
                I'm always excited to discuss product opportunities, share insights about 
                community building, or collaborate on projects that bring people together.
              </p>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 bg-brown text-white px-6 py-3 rounded-full font-semibold hover:bg-brown-dark transition-colors duration-200"
              >
                Let's collaborate
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
