import React from 'react';
import { ExternalLink, Github, Calendar, Star, Heart, Newspaper, Hand, Brain, Activity, Shield } from 'lucide-react';
import { ScrollAnimation } from './ScrollAnimations';

const Projects: React.FC = () => {
  const projects = [
    {
      title: "Diabetes Prediction System",
      description: "Machine learning system achieving 87% accuracy using classification algorithms. Preprocessed PIMA Indians Diabetes dataset with feature scaling and correlation analysis.",
      logo: (
        <div className="w-20 h-20 bg-gradient-to-br from-red-400 via-pink-500 to-red-600 rounded-2xl flex items-center justify-center shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-300">
          <Heart className="w-10 h-10 text-white animate-pulse" />
        </div>
      ),
      tags: ["Python", "Scikit-learn", "Random Forest", "Logistic Regression"],
      github: "https://github.com/anmolairi03/diabetes",
      demo: "https://github.com/anmolairi03/diabetes",
      year: "2024",
      gradient: "from-red-500/20 to-pink-500/20",
      borderGradient: "from-red-400 to-pink-400"
    },
    {
      title: "Fake News Detection",
      description: "NLP-based machine learning system achieving 90% classification accuracy. Streamlined text preprocessing with tokenization, lemmatization, and stop-word removal.",
      logo: (
        <div className="w-20 h-20 bg-gradient-to-br from-blue-400 via-indigo-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-2xl transform -rotate-3 hover:rotate-0 transition-transform duration-300">
          <Newspaper className="w-10 h-10 text-white" />
        </div>
      ),
      tags: ["NLP", "Python", "Naive Bayes", "SVM"],
      github: "https://github.com/anmolairi03/Projects/tree/main/Fake_News_Detection",
      demo: "https://github.com/anmolairi03/Projects/tree/main/Fake_News_Detection",
      year: "2024",
      gradient: "from-blue-500/20 to-indigo-500/20",
      borderGradient: "from-blue-400 to-indigo-400"
    },
    {
      title: "Sign Language Detection",
      description: "Deep learning system recognizing sign language gestures with 85% accuracy. Used MediaPipe for landmark extraction and LSTM networks for sequence modeling.",
      logo: (
        <div className="w-20 h-20 bg-gradient-to-br from-purple-400 via-violet-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-300">
          <Hand className="w-10 h-10 text-white animate-wave" />
        </div>
      ),
      tags: ["TensorFlow", "LSTM", "MediaPipe", "Computer Vision"],
      github: "https://github.com/anmolairi03/sign-language-detection",
      demo: "https://github.com/anmolairi03/sign-language-detection",
      year: "2023",
      gradient: "from-purple-500/20 to-violet-500/20",
      borderGradient: "from-purple-400 to-violet-400"
    },
    {
      title: "Credit Card Fraud Detection",
      description: "Advanced ML system for real-time fraud detection with 95% accuracy. Implemented ensemble methods and anomaly detection algorithms for financial security.",
      logo: (
        <div className="w-20 h-20 bg-gradient-to-br from-green-400 via-emerald-500 to-green-600 rounded-2xl flex items-center justify-center shadow-2xl transform -rotate-2 hover:rotate-0 transition-transform duration-300">
          <Shield className="w-10 h-10 text-white" />
        </div>
      ),
      tags: ["Python", "Anomaly Detection", "Ensemble Methods", "Real-time"],
      github: "https://github.com/anmolairi03/fraud-detection",
      demo: "https://github.com/anmolairi03/fraud-detection",
      year: "2024",
      gradient: "from-green-500/20 to-emerald-500/20",
      borderGradient: "from-green-400 to-emerald-400"
    },
    {
      title: "Neural Network Visualizer",
      description: "Interactive web application for visualizing neural network architectures and training processes. Built with React and D3.js for educational purposes.",
      logo: (
        <div className="w-20 h-20 bg-gradient-to-br from-orange-400 via-amber-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-2xl transform rotate-1 hover:rotate-0 transition-transform duration-300">
          <Brain className="w-10 h-10 text-white animate-pulse" />
        </div>
      ),
      tags: ["React", "D3.js", "Neural Networks", "Visualization"],
      github: "https://github.com/anmolairi03/neural-viz",
      demo: "https://github.com/anmolairi03/neural-viz",
      year: "2023",
      gradient: "from-orange-500/20 to-amber-500/20",
      borderGradient: "from-orange-400 to-amber-400"
    },
    {
      title: "Health Monitoring System",
      description: "IoT-based health monitoring system with real-time data analysis. Integrates wearable sensors with machine learning for predictive health insights.",
      logo: (
        <div className="w-20 h-20 bg-gradient-to-br from-cyan-400 via-teal-500 to-cyan-600 rounded-2xl flex items-center justify-center shadow-2xl transform -rotate-1 hover:rotate-0 transition-transform duration-300">
          <Activity className="w-10 h-10 text-white animate-bounce" />
        </div>
      ),
      tags: ["IoT", "Machine Learning", "Real-time", "Health Tech"],
      github: "https://github.com/anmolairi03/health-monitor",
      demo: "https://github.com/anmolairi03/health-monitor",
      year: "2023",
      gradient: "from-cyan-500/20 to-teal-500/20",
      borderGradient: "from-cyan-400 to-teal-400"
    }
  ];

  return (
    <section id="projects" className="py-20 bg-slate-800 relative overflow-hidden px-10">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <ScrollAnimation animationType="fadeUp">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Featured 
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent"> Projects</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              AI/ML solutions I've built
            </p>
          </div>
        </ScrollAnimation>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ScrollAnimation key={index} animationType="scale" delay={index * 150}>
              <div className="group relative h-full">
                {/* Glow Effect */}
                <div className={`absolute inset-0 bg-gradient-to-r ${project.gradient} rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                
                <div className="relative bg-slate-700 rounded-2xl overflow-hidden hover:bg-slate-600 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 h-full flex flex-col">
                  {/* Header with Logo */}
                  <div className={`relative p-8 bg-gradient-to-br ${project.gradient} border-b border-slate-600`}>
                    <div className="flex items-center justify-between mb-4">
                      {project.logo}
                      <span className="text-sm text-gray-400 bg-slate-800/50 px-3 py-1 rounded-full">
                        {project.year}
                      </span>
                    </div>
                    
                    {/* Hover Overlay with Links */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="flex space-x-4">
                        <a 
                          href={project.github} 
                          target="_blank" 
                          className="p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-all duration-200 transform hover:scale-110"
                        >
                          <Github size={20} />
                        </a>
                        <a 
                          href={project.demo} 
                          target="_blank" 
                          className="p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-all duration-200 transform hover:scale-110"
                        >
                          <ExternalLink size={20} />
                        </a>
                      </div>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-blue-400 transition-colors duration-200">
                      {project.title}
                    </h3>
                    <p className="text-gray-300 text-sm mb-6 leading-relaxed flex-1">
                      {project.description}
                    </p>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, tagIndex) => (
                        <span 
                          key={tagIndex} 
                          className={`px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${project.borderGradient} text-white hover:scale-105 transition-transform duration-200`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* Bottom Border Gradient */}
                  <div className={`h-1 bg-gradient-to-r ${project.borderGradient}`}></div>
                </div>
              </div>
            </ScrollAnimation>
          ))}
        </div>

        {/* Call to Action */}
        <ScrollAnimation animationType="fadeUp" delay={600}>
          <div className="text-center mt-16">
            <a 
              href="https://github.com/anmolairi03" 
              target="_blank"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 shadow-lg hover:shadow-xl"
            >
              <Github className="w-5 h-5" />
              <span>View All Projects</span>
            </a>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
};

export default Projects;