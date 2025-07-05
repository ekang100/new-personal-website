
import { ExternalLink, Github, Lightbulb, Users, Zap, Mail } from "lucide-react";

const Portfolio = () => {
  const projects = [
    {
      title: "PLACEHOLDER",
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
      title: "PLACEHOLDER",
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
      title: "BabyBumps Surrogacy",
      description: "Startup focused on high-end surrogacy matchmaking, connecting top tier surrogates with future parents.",
      category: "Startup Strategy",
      technologies: ["Figma", "User Research", "Product Strategy"],
      impact: "Built and validated with 6+ user interviews",
      gradient: "gradient-brown",
      icon: Zap,
      links: {
        live: "https://helix-supply-e76.notion.site/BabyBumps-227b8db40ea98090a129d1f19c42f16f",
        github: "https://github.com/ekang100/BabyBumps"
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
              Project Portfolio
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
          <div className="mt-16 flex justify-center">
          <div className="bg-brown-light backdrop-blur-md rounded-2xl p-8 border border-white/30 max-w-2xl text-center">
            <h3 className="text-2xl font-semibold text-white mb-4">
              Working on something interesting?
            </h3>
            <p className="text-white/90 mb-6">
              I'm particularly interested in companies and people focused on real-life interactions, 
              community-driven platforms, and products that bring people together.
            </p>
            <a
              href="mailto:ekangster1@gmail.com"
              className="inline-flex items-center gap-2 bg-white text-brown px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-200"
            >
              <Mail size={18} />
              Grab a matcha with me
            </a>
          </div>
        </div>


        </div>
      </div>
    </section>
  );
};

export default Portfolio;
