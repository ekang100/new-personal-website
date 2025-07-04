
import { Mail, Linkedin, Github, ArrowUpRight, Coffee, Sparkles, Heart, BookOpen, Star, Camera, Smile, Leaf, Music, Cloud } from "lucide-react";

const Contact = () => {
  const links = [
    {
      name: "Email",
      icon: Mail,
      href: "mailto:ekangster1@gmail.com",
      description: "Let's chat"
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      href: "https://www.linkedin.com/in/elianne-kang/",
      description: "Let's connect"
    },
    {
      name: "GitHub",
      icon: Github,
      href: "https://github.com/ekang100",
      description: "Let's code"
    },
    {
      name: "Beli",
      icon: Coffee, // You can replace this with a better icon if available
      href: "https://beliapp.co/app/generellie", 
      description: "Let's eat"
    }
    
  ];

  return (
    <section id="contact" className="relative py-20 gradient-brown text-white">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">

          {/* Header */}
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Let's Connect
          </h2>
          <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed">
            I'm always excited to discuss product opportunities, community building, 
            or just chat about good eats.
          </p>

          {/* Contact links */}
          <div className="grid md:grid-cols-4 gap-6 mb-12">
          {links.map((link, index) => (
            <a
              key={index}
              href={link.href}
              className="group relative bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all duration-200 hover-lift border border-white/20"
              target="_blank"
              rel="noopener noreferrer"
            >
              {/* Top-right hover arrow */}
              <ArrowUpRight
                size={16}
                className="absolute top-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity"
              />

              {/* Icon + Text */}
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center shrink-0">
                  <link.icon size={18} className="text-white" />
                </div>

                <div className="flex flex-col justify-center text-left">
                  <h3 className="text-lg font-semibold text-white leading-tight">
                    {link.name}
                  </h3>
                  <p className="text-sm text-white/80 leading-snug">
                    {link.description}
                  </p>
                </div>
              </div>
            </a>
          ))}
          </div>

          {/* CTA */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <h3 className="text-2xl font-semibold mb-4">
              Working on something interesting?
            </h3>
            <p className="text-white/90 mb-6">
              I'm particularly interested in companies focused on real-life interactions, 
              community-driven platforms, and products that bring people together like Beli and Series.
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
      <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute top-[15%] left-[18%] opacity-20 animate-float delay-300 transition-transform duration-300 hover:scale-125">
            <Mail size={28} className="text-white" />
          </div>
          <div className="absolute bottom-[50%] right-[12%] opacity-20 animate-float delay-600 transition-transform duration-300 hover:scale-125">
            <Linkedin size={28} className="text-white/70" />
          </div>
          <div className="absolute top-[25%] right-[20%] opacity-20 animate-float delay-500 transition-transform duration-300 hover:scale-125">
            <Github size={30} className="text-white/60" />
          </div>
          <div className="absolute bottom-[20%] left-[18%] opacity-20 animate-float delay-800 transition-transform duration-300 hover:scale-125">
            <Coffee size={26} className="text-white/70" />
          </div>
          <div className="absolute top-[30%] left-[5%] opacity-20 animate-float delay-400 transition-transform duration-300 hover:scale-125">
          <Sparkles size={30} className="text-white/70" />
        </div>
        <div className="absolute bottom-[28%] right-[18%] opacity-20 animate-float delay-500 transition-transform duration-300 hover:scale-125">
          <Heart size={28} className="text-white/80" />
        </div>
        <div className="absolute top-[10%] right-[12%] opacity-20 animate-float delay-300 transition-transform duration-300 hover:scale-125">
          <Star size={26} className="text-white/60" />
        </div>
        <div className="absolute bottom-[8%] left-[6%] opacity-20 animate-float delay-700 transition-transform duration-300 hover:scale-125">
          <Music size={30} className="text-white/70" />
        </div>
        <div className="absolute top-[50%] right-[86%] opacity-20 animate-float delay-600 transition-transform duration-300 hover:scale-125">
          <Leaf size={28} className="text-white/60" />
        </div>
        <div className="absolute bottom-[15%] right-[5%] opacity-20 animate-float delay-800 transition-transform duration-300 hover:scale-125">
          <Smile size={28} className="text-white/70" />
        </div>
        </div>
    </section>
  );
};

export default Contact;
