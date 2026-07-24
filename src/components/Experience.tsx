import React from 'react';
import { Calendar, MapPin, Award, Trophy, Star, Briefcase, Users, Target, TrendingUp } from 'lucide-react';
import { ScrollAnimation } from './ScrollAnimations';

const Experience: React.FC = () => {
  const experiences = [
    {
      title: "AI/ML Intern",
      company: "Brainwave Matrix Solutions",
      period: "Aug 2024",
      location: "Remote",
      type: "internship",
      achievements: [
        "Executed data preprocessing and feature engineering, boosting model performance by 15%",
        "Engineered ML pipelines using Python, Pandas, and TensorFlow",
        "Enhanced credit card fraud detection accuracy by 20% through supervised learning",
        "Deployed diabetes prediction models achieving 85% accuracy"
      ],
      tags: ["Python", "TensorFlow", "Machine Learning"],
      metrics: { performance: 15, accuracy: 20, models: 3 },
      icon: <Briefcase className="w-6 h-6" />
    },
    {
      title: "Content & Design Lead",
      company: "Expressions, MAIT",
      period: "2023-2025",
      location: "Delhi, India",
      type: "leadership",
      achievements: [
        "Crafted 10+ event posters and social media campaigns",
        "Increased engagement by 30% through creative design",
        "Led team of designers for college cultural initiatives",
        "Managed creative workflow for 50+ college events"
      ],
      tags: ["Leadership", "Design", "Marketing"],
      metrics: { engagement: 30, projects: 10, team: 5 },
      icon: <Users className="w-6 h-6" />
    },
    {
      title: "National Championships",
      company: "Sports Achievements",
      period: "2019-2020",
      location: "India",
      type: "achievement",
      achievements: [
        "CBSE National Rope Skipping Champion (2019)",
        "National-Level Yoga Competitor (2020)",
        "Champion at National Science Congress for 'Karma Reborn' Project",
        "Represented state in multiple national competitions"
      ],
      tags: ["Leadership", "Discipline", "Excellence"],
      metrics: { championships: 2, competitions: 8, awards: 5 },
      icon: <Trophy className="w-6 h-6" />
    }
  ];

  const stats = [
    { label: "Projects Completed", value: "15+", icon: <Target className="w-8 h-8" />, color: "from-blue-500 to-cyan-500" },
    { label: "Model Accuracy", value: "90%", icon: <TrendingUp className="w-8 h-8" />, color: "from-green-500 to-emerald-500" },
    { label: "Team Leadership", value: "3", icon: <Users className="w-8 h-8" />, color: "from-purple-500 to-pink-500" },
    { label: "National Awards", value: "5", icon: <Award className="w-8 h-8" />, color: "from-orange-500 to-red-500" }
  ];

  return (
    <section id="experience" className="py-20 bg-slate-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <ScrollAnimation animationType="fadeUp">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Experience & 
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent"> Achievements</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              My professional journey and accomplishments
            </p>
          </div>
        </ScrollAnimation>

        {/* Stats Section */}
        <ScrollAnimation animationType="fadeUp" delay={200}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {stats.map((stat, index) => (
              <ScrollAnimation key={index} animationType="scale" delay={index * 100}>
                <div className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl blur-xl" 
                       style={{background: `linear-gradient(to right, ${stat.color.split(' ')[1]}, ${stat.color.split(' ')[3]})`}}></div>
                  <div className={`relative bg-slate-800 p-6 rounded-xl border border-slate-700 hover:border-slate-600 transition-all duration-300 transform hover:scale-105 hover:-translate-y-2`}>
                    <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center mb-4 text-white`}>
                      {stat.icon}
                    </div>
                    <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                  </div>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </ScrollAnimation>

        {/* Timeline */}
        <div className="relative max-w-6xl mx-auto">
          {/* Animated Timeline Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 via-purple-500 to-cyan-500 transform md:-translate-x-1/2">
            <div className="absolute inset-0 bg-gradient-to-b from-blue-500 via-purple-500 to-cyan-500 animate-pulse"></div>
          </div>
          
          {experiences.map((exp, index) => (
            <ScrollAnimation key={index} animationType={index % 2 === 0 ? "fadeLeft" : "fadeRight"} delay={index * 300}>
              <div className={`relative flex items-center mb-16 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                {/* Timeline Node */}
                <div className="absolute left-6 md:left-1/2 w-6 h-6 transform md:-translate-x-1/2 z-10">
                  <div className={`w-full h-full rounded-full bg-gradient-to-r ${
                    exp.type === 'internship' ? 'from-blue-500 to-cyan-500' :
                    exp.type === 'leadership' ? 'from-purple-500 to-pink-500' :
                    'from-orange-500 to-red-500'
                  } animate-pulse shadow-lg`}>
                    <div className="absolute inset-0 rounded-full bg-white/20 animate-ping"></div>
                  </div>
                </div>
                
                {/* Content Card */}
                <div className={`ml-20 md:ml-0 ${index % 2 === 0 ? 'md:mr-8' : 'md:ml-8'} md:w-5/12 group`}>
                  <div className="relative">
                    {/* Glow Effect */}
                    <div className={`absolute inset-0 bg-gradient-to-r ${
                      exp.type === 'internship' ? 'from-blue-500/20 to-cyan-500/20' :
                      exp.type === 'leadership' ? 'from-purple-500/20 to-pink-500/20' :
                      'from-orange-500/20 to-red-500/20'
                    } rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                    
                    <div className="relative bg-slate-800 p-8 rounded-xl border border-slate-700 hover:border-slate-600 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-6">
                        <div className="flex items-center space-x-3">
                          <div className={`p-3 rounded-lg bg-gradient-to-r ${
                            exp.type === 'internship' ? 'from-blue-500 to-cyan-500' :
                            exp.type === 'leadership' ? 'from-purple-500 to-pink-500' :
                            'from-orange-500 to-red-500'
                          } text-white`}>
                            {exp.icon}
                          </div>
                          <div>
                            <h3 className="text-xl font-semibold text-white mb-1">{exp.title}</h3>
                            <h4 className="text-lg text-blue-400">{exp.company}</h4>
                          </div>
                        </div>
                        <div className="text-right text-sm text-gray-400">
                          <div className="flex items-center mb-1">
                            <Calendar className="w-4 h-4 mr-1" />
                            {exp.period}
                          </div>
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-1" />
                            {exp.location}
                          </div>
                        </div>
                      </div>
                      
                      {/* Metrics */}
                      <div className="grid grid-cols-3 gap-4 mb-6">
                        {Object.entries(exp.metrics).map(([key, value], metricIndex) => (
                          <div key={metricIndex} className="text-center p-3 bg-slate-700 rounded-lg">
                            <div className="text-lg font-bold text-white">{value}{typeof value === 'number' ? (key === 'performance' || key === 'accuracy' || key === 'engagement' ? '%' : '') : ''}</div>
                            <div className="text-xs text-gray-400 capitalize">{key}</div>
                          </div>
                        ))}
                      </div>
                      
                      {/* Achievements */}
                      <ul className="space-y-3 mb-6">
                        {exp.achievements.map((achievement, achIndex) => (
                          <li key={achIndex} className="text-gray-300 flex items-start group/item">
                            <Star className="w-4 h-4 text-yellow-400 mr-3 mt-0.5 group-hover/item:animate-spin" />
                            <span className="group-hover/item:text-white transition-colors duration-200">{achievement}</span>
                          </li>
                        ))}
                      </ul>
                      
                      {/* Tags */}
                      <div className="flex flex-wrap gap-2">
                        {exp.tags.map((tag, tagIndex) => (
                          <span key={tagIndex} className={`px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r ${
                            exp.type === 'internship' ? 'from-blue-500/20 to-cyan-500/20 text-blue-300' :
                            exp.type === 'leadership' ? 'from-purple-500/20 to-pink-500/20 text-purple-300' :
                            'from-orange-500/20 to-red-500/20 text-orange-300'
                          } border border-current/20 hover:scale-105 transition-transform duration-200`}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollAnimation>
          ))}
        </div>

        {/* Call to Action */}
        <ScrollAnimation animationType="fadeUp" delay={600}>
          <div className="text-center mt-16">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 shadow-lg hover:shadow-xl">
              <Award className="w-5 h-5" />
              <span>View All Achievements</span>
            </div>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
};

export default Experience;