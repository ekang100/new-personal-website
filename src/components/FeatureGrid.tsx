import { cn } from "@/lib/utils";
import { Heart, Users, Coffee, Lightbulb, Target, Sparkles, Dumbbell, Pizza, Brain } from "lucide-react";
import { IconBallBasketball } from "@tabler/icons-react";


export default function FeatureGrid() {
  const features = [
    {
      title: "People First",
      description: "I believe the best products, ideas, and pursuits come from understanding and building human connection.",
      icon: <Users />
    },
    {
      title: "Empathy-Driven",
      description: "For me, every product (life!!) decision starts with people empathy and real-world problem solving.",
      icon: <Heart />
    },
    {
      title: "Innovation Mindset", 
      description: "Exploring how technology, espcially AI, can facilitate meaningful online and offline interactions.",
      icon: <Lightbulb />
    },
    {
      title: "Product Craft",
      description: "Passionate about the intersection of beautiful design, seamless UX, and meaningful user outcomes.",
      icon: <Sparkles />
    },
    {
      title: "Active Life",
      description: "Taking care of my body helps me become my best self, so you can find me on walks, lifting, or playing pickleball.",
      icon: <Dumbbell />
    }, 
    {
      title: "Duke Basketball",
      description: "Slept in a tent to beat UNC. Slept in a tent to lose to UNC. Lost twice in the Final Four. Still love The Brotherhood.",
      icon: <IconBallBasketball />
    },
    {
      title: "Always Learning",
      description: "There are so many interesting things to learn about, so let's read, listen, and watch together!",
      icon: <Brain />
    }, 
    {
      title: "Live to Eat",
      description: "Always on the hunt for the perfect matcha latte. Or the perfect bagel. Or the perfect jajangmyeon.",
      icon: <Pizza />
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 relative z-10 py-10 max-w-7xl mx-auto">
      {features.map((feature, index) => (
        <Feature key={feature.title} {...feature} index={index} />
      ))}
    </div>
  );
}

const Feature = ({
  title,
  description,
  icon,
  index,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col border-[#d6bfa8] lg:border-r py-10 relative group/feature",
        (index === 0 || index === 4) && "lg:border-l",
        index < 4 && "lg:border-b"
      )}
    >
      {index < 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-[#D8EACB] to-transparent pointer-events-none" />
      )}
      {index >= 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-[#D8EACB] to-transparent pointer-events-none" />
      )}
      <div className="mb-4 relative z-10 px-10 text-[#7d5a3b]">
        {icon}
      </div>
      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-[#d6bfa8] group-hover/feature:bg-matcha-light
 transition-all duration-200 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-[#3a2a1b]">
          {title}
        </span>
      </div>
      <p className="text-sm text-[#7d5a3b] max-w-xs relative z-10 px-10">
        {description}
      </p>
    </div>
  );
};
