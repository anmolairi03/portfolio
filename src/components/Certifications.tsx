import React from 'react';
import { Award, Calendar, ExternalLink, Star, Shield, Code, Brain, Database, Globe, CheckCircle } from 'lucide-react';
import { ScrollAnimation } from './ScrollAnimations';

const Certifications: React.FC = () => {
  const certifications = [
    {
      title: "Machine Learning Specialization",
      issuer: "Stanford University (Coursera)",
      date: "2024",
      credentialId: "ML-2024-001",
      status: "Verified",
      description: "Comprehensive course covering supervised learning, unsupervised learning, and neural networks",
      skills: ["Python", "TensorFlow", "Neural Networks", "Deep Learning"],
      icon: <Brain className="w-8 h-8" />,
      color: "from-blue-500 to-indigo-600",
      bgColor: "from-blue-500/20 to-indigo-500/20",
      verifyUrl: "#"
    },
    {
      title: "AWS Certified Cloud Practitioner",
      issuer: "Amazon Web Services",
      date: "2024",
      credentialId: "AWS-CCP-2024",
      status: "Active",
      description: "Foundational understanding of AWS Cloud services and architecture",
      skills: ["AWS", "Cloud Computing", "EC2", "S3"],
      icon: <Shield className="w-8 h-8" />,
      color: "from-orange-500 to-red-600",
      bgColor: "from-orange-500/20 to-red-500/20",
      verifyUrl: "#"
    },
    {
      title: "Python for Data Science",
      issuer: "IBM (Coursera)",
      date: "2023",
      credentialId: "IBM-PY-2023",
      status: "Completed",
      description: "Advanced Python programming for data analysis and machine learning applications",
      skills: ["Python", "Pandas", "NumPy", "Data Analysis"],
      icon: <Code className="w-8 h-8" />,
      color: "from-green-500 to-teal-600",
      bgColor: "from-green-500/20 to-teal-500/20",
      verifyUrl: "#"
    },
    {
      title: "Google Data Analytics Certificate",
      issuer: "Google (Coursera)",
      date: "2023",
      credentialId: "GOOGLE-DA-2023",
      status: "Verified",
      description: "Professional certificate in data analytics, visualization, and business intelligence",
      skills: ["SQL", "Tableau", "R", "Data Visualization"],
      icon: <Database className="w-8 h-8" />,
      color: "from-purple-500 to-pink-600",
      bgColor: "from-purple-500/20 to-pink-500/20",
      verifyUrl: "#"
    },
    {
      title: "React Developer Certification",
      issuer: "Meta (Facebook)",
      date: "2023",
      credentialId: "META-REACT-2023",
      status: "Active",
      description: "Professional certification in React development and modern frontend practices",
      skills: ["React", "JavaScript", "JSX", "Frontend Development"],
      icon: <Globe className="w-8 h-8" />,
      color: "from-cyan-500 to-blue-600",
      bgColor: "from-cyan-500/20 to-blue-500/20",
      verifyUrl: "#"
    },
    {
      title: "TensorFlow Developer Certificate",
      issuer: "TensorFlow (Google)",
      date: "2024",
      credentialId: "TF-DEV-2024",
      status: "Verified",
      description: "Professional certification in TensorFlow for machine learning and AI development",
      skills: ["TensorFlow", "Keras", "Deep Learning", "AI"],
      icon: <Brain className="w-8 h-8" />,
      color: "from-yellow-500 to-orange-600",
      bgColor: "from-yellow-500/20 to-orange-500/20",
      verifyUrl: "#"
    }
  ];

  const stats = [
    { label: "Certifications", value: "6+", icon: <Award className="w-6 h-6" />, color: "from-blue-500 to-cyan-500" },
    { label: "Verified Skills", value: "20+", icon: <CheckCircle className="w-6 h-6" />, color: "from-green-500 to-emerald-500" },
    { label: "Learning Hours", value: "500+", icon: <Star className="w-6 h-6" />, color: "from-purple-500 to-pink-500" },
    { label: "Active Status", value: "100%", icon: <Shield className="w-6 h-6" />, color: "from-orange-500 to-red-500" }
  ];

  return (
    <section id="certifications" className="py-20 bg-slate-800 relative overflow-hidden px-10">
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
              Certifications & 
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent"> Credentials</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Professional certifications and verified skills
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
                  <div className={`relative bg-slate-700 p-6 rounded-xl border border-slate-600 hover:border-slate-500 transition-all duration-300 transform hover:scale-105 hover:-translate-y-2`}>
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

        {/* Certifications Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certifications.map((cert, index) => (
            <ScrollAnimation key={index} animationType="scale" delay={index * 150}>
              <div className="group relative h-full">
                {/* Glow Effect */}
                <div className={`absolute inset-0 bg-gradient-to-r ${cert.bgColor} rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                
                <div className="relative bg-slate-700 rounded-2xl overflow-hidden hover:bg-slate-600 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 h-full flex flex-col">
                  {/* Header */}
                  <div className={`relative p-6 bg-gradient-to-br ${cert.bgColor} border-b border-slate-600`}>
                    <div className="flex items-start justify-between mb-4">
                      <div className={`p-3 bg-gradient-to-r ${cert.color} rounded-lg text-white shadow-lg`}>
                        {cert.icon}
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          cert.status === 'Verified' ? 'bg-green-500/20 text-green-300 border border-green-500/30' :
                          cert.status === 'Active' ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' :
                          'bg-gray-500/20 text-gray-300 border border-gray-500/30'
                        }`}>
                          {cert.status}
                        </span>
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors duration-200">
                      {cert.title}
                    </h3>
                    <p className="text-blue-400 font-medium mb-1">{cert.issuer}</p>
                    <div className="flex items-center text-sm text-gray-400">
                      <Calendar className="w-4 h-4 mr-1" />
                      {cert.date}
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col">
                    <p className="text-gray-300 text-sm mb-4 leading-relaxed flex-1">
                      {cert.description}
                    </p>
                    
                    {/* Credential ID */}
                    <div className="mb-4 p-3 bg-slate-800 rounded-lg">
                      <p className="text-xs text-gray-400 mb-1">Credential ID</p>
                      <p className="text-sm font-mono text-white">{cert.credentialId}</p>
                    </div>
                    
                    {/* Skills */}
                    <div className="mb-6">
                      <p className="text-sm font-medium text-gray-400 mb-3">Skills Covered</p>
                      <div className="flex flex-wrap gap-2">
                        {cert.skills.map((skill, skillIndex) => (
                          <span 
                            key={skillIndex} 
                            className={`px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${cert.color} text-white hover:scale-105 transition-transform duration-200`}
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    {/* Verify Button */}
                    <a 
                      href={cert.verifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center justify-center space-x-2 bg-gradient-to-r ${cert.color} text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-200 transform hover:scale-105`}
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Verify Certificate</span>
                    </a>
                  </div>
                  
                  {/* Bottom Border Gradient */}
                  <div className={`h-1 bg-gradient-to-r ${cert.color}`}></div>
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
              <span>View All Credentials</span>
            </div>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
};

export default Certifications;