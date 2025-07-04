
import { Mail, Linkedin, Github, ArrowUpRight } from "lucide-react";

const Contact = () => {
  const links = [
    {
      name: "Email",
      icon: Mail,
      href: "mailto:ekangster1@gmail.com",
      description: "Let's start a conversation"
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      href: "https://www.linkedin.com/in/elianne-kang/",
      description: "Connect professionally"
    },
    {
      name: "GitHub",
      icon: Github,
      href: "https://github.com/ekang100",
      description: "Check out my code"
    }
  ];

  return (
    <section id="contact" className="py-20 gradient-brown text-white">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          {/* Header */}
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Let's Connect
          </h2>
          <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed">
            I'm always excited to discuss product opportunities, community building, 
            or just chat about great matcha spots over coffee.
          </p>

          {/* Contact links */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {links.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="group bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all duration-200 hover-lift border border-white/20"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <link.icon size={20} />
                  </div>
                  <ArrowUpRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <h3 className="text-lg font-semibold mb-1">{link.name}</h3>
                <p className="text-white/80 text-sm">{link.description}</p>
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <h3 className="text-2xl font-semibold mb-4">
              Working on something interesting?
            </h3>
            <p className="text-white/90 mb-6">
              I'm particularly interested in startups focused on real-life interactions, 
              community-driven platforms, and products that bring people together like Beli and Series.
            </p>
            <a
              href="mailto:ekangster1@gmail.com"
              className="inline-flex items-center gap-2 bg-white text-brown px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-200"
            >
              <Mail size={18} />
              Start a conversation
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
