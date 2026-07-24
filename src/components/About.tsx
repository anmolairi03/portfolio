import React from 'react';
import { Code, Coffee, Lightbulb, Users, GraduationCap } from 'lucide-react';
import { ScrollAnimation } from './ScrollAnimations';

const About: React.FC = () => {
  const highlights = [
    {
      icon: <Code className="w-8 h-8 text-blue-400" />,
      title: "Clean Code",
      description: "Writing maintainable, scalable code that follows best practices"
    },
    {
      icon: <Lightbulb className="w-8 h-8 text-blue-400" />,
      title: "Problem Solving",
      description: "Turning complex challenges into elegant, user-friendly solutions"
    },
    {
      icon: <Users className="w-8 h-8 text-blue-400" />,
      title: "Collaboration",
      description: "Working effectively with cross-functional teams and stakeholders"
    },
    {
      icon: <Coffee className="w-8 h-8 text-blue-400" />,
      title: "Continuous Learning",
      description: "Staying updated with the latest technologies and industry trends"
    }
  ];

  return (
    <section id="about" className="py-20 bg-slate-800">
      <div className="container mx-auto px-10">
        <ScrollAnimation animationType="fadeUp">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">About Me</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Passionate about AI and Innovation
            </p>
          </div>
        </ScrollAnimation>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <ScrollAnimation animationType="fadeLeft">
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-white mb-4">My Journey</h3>
              <p className="text-gray-300 leading-relaxed">
                I'm a dynamic third-year Computer Science student at Maharaja Agrasen Institute of Technology, 
                specializing in machine learning and frontend web development. I engineer AI-driven solutions 
                for fraud detection and health diagnostics, leveraging Python and TensorFlow.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Beyond academics, I'm a National-level Yoga and Rope Skipping champion, blending discipline 
                with creativity as a graphic designer and video editor for college cultural initiatives.
              </p>
              <div className="flex flex-wrap gap-4 mt-6">
                <span className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm">8.4 GPA</span>
                <span className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm">5+ Projects</span>
                <span className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm">National Champion</span>
              </div>
            </div>
          </ScrollAnimation>

          <ScrollAnimation animationType="fadeRight">
            <div className="space-y-6">
              <div className="bg-slate-700 p-6 rounded-lg">
                <div className="flex items-center gap-4 mb-4">
                  <GraduationCap className="w-8 h-8 text-blue-400" />
                  <h3 className="text-xl font-semibold text-white">Education</h3>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">B.Tech Computer Science</h4>
                  <p className="text-gray-300 mb-2">Maharaja Agrasen Institute of Technology</p>
                  <p className="text-sm text-gray-400">2022 - 2026</p>
                  <p className="text-sm text-blue-400 font-semibold">GPA: 8.4/10</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {highlights.map((highlight, index) => (
                  <ScrollAnimation key={index} animationType="scale" delay={index * 100}>
                    <div className="bg-slate-700 p-4 rounded-lg hover:bg-slate-600 transition-colors duration-200">
                      <div className="mb-3">{highlight.icon}</div>
                      <h4 className="text-sm font-semibold text-white mb-2">{highlight.title}</h4>
                      <p className="text-gray-300 text-xs leading-relaxed">{highlight.description}</p>
                    </div>
                  </ScrollAnimation>
                ))}
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  );
};

export default About;