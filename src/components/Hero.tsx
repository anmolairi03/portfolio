import React, { useEffect, useState, useRef } from 'react';
import { ChevronDown, Github, Linkedin, Mail, Code, Download, Play, Sparkles, BarChart3, Zap, Database, Component, Brain, FileCode } from 'lucide-react';
import ThreeAvatar from './ThreeAvatar';

const Hero: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToAbout = () => {
    const element = document.getElementById('about');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const techStack = [
    { icon: FileCode, name: "Python", delay: 0, color: "text-yellow-400" },
    { icon: Brain, name: "AI/ML", delay: 1000, color: "text-purple-400" },
    { icon: Component, name: "React", delay: 2000, color: "text-blue-400" },
    { icon: Database, name: "Data", delay: 3000, color: "text-green-400" },
    { icon: Zap, name: "TensorFlow", delay: 4000, color: "text-orange-400" },
    { icon: BarChart3, name: "Analytics", delay: 5000, color: "text-pink-400" }
  ];

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden px-10">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
        {/* Animated Gradient Overlay */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(59, 130, 246, 0.3) 0%, transparent 50%)`
          }}
        />
        
        {/* Floating Particles */}
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-blue-400/30 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`
              }}
            />
          ))}
        </div>

        {/* Geometric Shapes */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-32 h-32 border border-blue-400/20 rounded-full animate-spin-slow"></div>
          <div className="absolute top-40 right-20 w-24 h-24 border border-purple-400/20 rotate-45 animate-pulse"></div>
          <div className="absolute bottom-32 left-20 w-40 h-40 border border-cyan-400/20 rounded-lg animate-float"></div>
          <div className="absolute bottom-20 right-10 w-20 h-20 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full animate-bounce"></div>
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Hero Content */}
          <div className="text-left space-y-8">
            {/* Greeting */}
            <div className={`transform transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'} mt-20`}>
              <p className="text-lg text-blue-400 mb-1 font-medium">Hi, I'm</p>
            </div>

            {/* Name */}
            <div className={`transform transition-all duration-1000 delay-300 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'} -mt-4`}>
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                <span className="bg-gradient-to-r from-white via-blue-200 to-cyan-200 bg-clip-text text-transparent">
                  Anmol
                </span>
                <br />
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  Airi
                </span>
              </h1>
            </div>

            {/* Title */}
            <div className={`transform transition-all duration-1000 delay-500 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <h2 className="text-2xl md:text-4xl text-gray-300 mb-6 font-medium">
                <span className="text-white">AI/ML Engineer</span> & 
                <br />
                <span className="text-blue-400">DATA ANALYST</span>
              </h2>
            </div>

            {/* Description */}
            <div className={`transform transition-all duration-1000 delay-700 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <p className="text-lg text-gray-300 mb-8 leading-relaxed max-w-2xl">
                Dynamic Computer Science student specializing in{' '}
                <span className="text-blue-400 font-semibold">machine learning</span> and{' '}
                <span className="text-purple-400 font-semibold">frontend development</span>. 
                Building AI-driven solutions with cutting-edge technologies.
              </p>
            </div>
            
            {/* Buttons */}
            <div className={`flex flex-col sm:flex-row gap-4 mb-8 transform transition-all duration-1000 delay-900 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <button 
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
              >
                <Play className="w-5 h-5 group-hover:animate-pulse" />
                <span>View Projects</span>
              </button>
              <button 
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="group border-2 border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
              >
                <Mail className="w-5 h-5 group-hover:animate-bounce" />
                <span>Get In Touch</span>
              </button>
            </div>
            
            {/* Social Links */}
            <div className={`flex space-x-6 transform transition-all duration-1000 delay-1100 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              {[
                { href: "https://github.com/anmolairi03/", icon: Github, label: "GitHub" },
                { href: "http://www.linkedin.com/in/anmol809", icon: Linkedin, label: "LinkedIn" },
                { href: "https://leetcode.com/u/zeus408809/", icon: Code, label: "LeetCode" },
                { href: "mailto:anmolandanay@gmail.com", icon: Mail, label: "Email" }
              ].map((social, index) => (
                <a 
                  key={index}
                  href={social.href} 
                  target="_blank" 
                  className="group relative p-3 bg-slate-800/50 border border-slate-700 rounded-full text-gray-400 hover:text-white hover:border-blue-400 transition-all duration-300 transform hover:scale-110 hover:-translate-y-1"
                  aria-label={social.label}
                >
                  <social.icon size={20} className="group-hover:animate-pulse" />
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </a>
              ))}
            </div>
          </div>

          {/* Hero Visual */}
          <div className="relative flex justify-center items-center">
            <div className={`relative transform transition-all duration-1500 delay-300 ${isLoaded ? 'scale-100 opacity-100' : 'scale-75 opacity-0'}`}>
              {/* 3D Character */}
              <ThreeAvatar 
                mousePosition={mousePosition} 
                onWave={() => console.log('Avatar is waving!')}
              />
              
              {/* Floating Tech Icons around character */}
              {techStack.map((tech, index) => {
                return (
                  <div
                    key={index}
                    className={`absolute w-14 h-14 bg-slate-800/80 border border-slate-600 rounded-full flex items-center justify-center backdrop-blur-sm transform transition-all duration-1000 hover:scale-125 hover:bg-blue-500/20 hover:border-blue-400 group cursor-pointer animate-orbit`}
                    style={{
                      left: '50%',
                      top: '50%',
                      marginLeft: '-1.75rem',
                      marginTop: '-1.75rem',
                      animationDelay: `${index * -3.33}s`, // Distribute icons evenly around the circle
                      animationDuration: '20s'
                    }}
                  >
                    <tech.icon className={`w-6 h-6 ${tech.color} group-hover:animate-bounce`} />
                    <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                      {tech.name}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <button
        onClick={scrollToAbout}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white hover:text-blue-400 transition-all duration-300 group animate-bounce"
      >
        <div className="flex flex-col items-center space-y-2">
          <span className="text-xs text-gray-400 group-hover:text-blue-400 transition-colors duration-300">Explore</span>
          <div className="w-6 h-10 border-2 border-gray-400 group-hover:border-blue-400 rounded-full flex justify-center transition-colors duration-300">
            <div className="w-1 h-3 bg-gray-400 group-hover:bg-blue-400 rounded-full mt-2 animate-pulse transition-colors duration-300"></div>
          </div>
        </div>
      </button>
    </section>
  );
};

export default Hero;