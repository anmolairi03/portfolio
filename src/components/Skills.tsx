import React, { useEffect, useRef } from 'react';
import { Database, Globe, Palette, Server, Smartphone, Zap, Brain, Code, Wrench } from 'lucide-react';
import { ScrollAnimation } from './ScrollAnimations';

const Skills: React.FC = () => {
  const skillCategories = [
    {
      icon: <Code className="w-8 h-8 text-blue-400" />,
      title: "Programming Languages",
      skills: [
        { name: "Python", level: 90, color: "from-blue-500 to-cyan-500" },
        { name: "JavaScript", level: 85, color: "from-yellow-500 to-orange-500" },
        { name: "C/C++", level: 80, color: "from-purple-500 to-pink-500" },
        { name: "Java", level: 75, color: "from-red-500 to-orange-500" }
      ]
    },
    {
      icon: <Brain className="w-8 h-8 text-green-400" />,
      title: "AI/ML Frameworks",
      skills: [
        { name: "TensorFlow", level: 85, color: "from-orange-500 to-red-500" },
        { name: "Scikit-learn", level: 90, color: "from-blue-500 to-indigo-500" },
        { name: "Pandas", level: 88, color: "from-green-500 to-teal-500" },
        { name: "NumPy", level: 85, color: "from-purple-500 to-violet-500" }
      ]
    },
    {
      icon: <Wrench className="w-8 h-8 text-purple-400" />,
      title: "Tools & Technologies",
      skills: [
        { name: "Git", level: 85, color: "from-gray-600 to-gray-800" },
        { name: "VS Code", level: 90, color: "from-blue-600 to-blue-800" },
        { name: "Jupyter", level: 88, color: "from-orange-500 to-yellow-500" },
        { name: "SQL", level: 80, color: "from-teal-500 to-cyan-500" }
      ]
    }
  ];

  return (
    <section id="skills" className="py-20 bg-slate-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-green-500/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <ScrollAnimation animationType="fadeUp">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Skills & 
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent"> Expertise</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Technologies I work with
            </p>
          </div>
        </ScrollAnimation>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <ScrollAnimation key={index} animationType="fadeUp" delay={index * 200}>
              <div className="group relative">
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative bg-slate-800 p-8 rounded-xl border border-slate-700 hover:border-slate-600 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2">
                  <div className="flex items-center mb-6">
                    <div className="p-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg mr-4">
                      {category.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-white">{category.title}</h3>
                  </div>
                  
                  <div className="space-y-6">
                    {category.skills.map((skill, skillIndex) => (
                      <SkillBar 
                        key={skillIndex} 
                        skill={skill} 
                        delay={skillIndex * 100}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </section>
  );
};

interface SkillBarProps {
  skill: {
    name: string;
    level: number;
    color: string;
  };
  delay: number;
}

const SkillBar: React.FC<SkillBarProps> = ({ skill, delay }) => {
  const progressRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = React.useState(false);
  const [hasAnimated, setHasAnimated] = React.useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setIsVisible(true);
            setHasAnimated(true);
          } else if (!entry.isIntersecting && entry.boundingClientRect.top > 0) {
            // Reset when scrolling back up
            setIsVisible(false);
            setHasAnimated(false);
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: '-50px 0px -50px 0px'
      }
    );

    if (progressRef.current) {
      observer.observe(progressRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <div className="skill-item group/skill">
      <div className="flex justify-between items-center mb-3">
        <span className="text-gray-300 font-medium group-hover/skill:text-white transition-colors duration-200">
          {skill.name}
        </span>
        <span className="text-blue-400 text-sm font-semibold">
          {skill.level}%
        </span>
      </div>
      
      <div className="relative">
        {/* Background Bar */}
        <div className="w-full bg-slate-700 rounded-full h-3 overflow-hidden">
          {/* Progress Bar */}
          <div 
            ref={progressRef}
            className={`h-full bg-gradient-to-r ${skill.color} rounded-full relative overflow-hidden transition-all duration-1000 ease-out transform`}
            style={{ 
              width: isVisible ? `${skill.level}%` : '0%',
              transitionDelay: `${delay}ms`
            }}
          >
            {/* Shimmer Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 animate-shimmer"></div>
            
            {/* Glow Effect */}
            <div className={`absolute inset-0 bg-gradient-to-r ${skill.color} blur-sm opacity-50`}></div>
          </div>
        </div>
        
        {/* Skill Level Indicator */}
        <div 
          className={`absolute top-0 h-3 w-1 bg-white rounded-full transform transition-all duration-1000 ease-out shadow-lg`}
          style={{ 
            left: isVisible ? `${skill.level}%` : '0%',
            transitionDelay: `${delay + 500}ms`,
            transform: 'translateX(-50%)'
          }}
        >
          <div className="absolute -top-1 -left-1 w-3 h-3 bg-white rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default Skills;