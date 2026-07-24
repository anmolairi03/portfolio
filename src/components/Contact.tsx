import React, { useState } from 'react';
import { Mail, MapPin, Phone, Send, Github, Linkedin, Code, Download, FileText } from 'lucide-react';
import { ScrollAnimation } from './ScrollAnimations';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="py-20 bg-slate-800">
      <div className="container mx-auto px-10">
        <ScrollAnimation animationType="fadeUp">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Let's Work Together</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Get in touch for opportunities and collaborations
            </p>
          </div>
        </ScrollAnimation>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <ScrollAnimation animationType="fadeLeft">
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-semibold text-white mb-6">Let's Connect</h3>
                <p className="text-gray-300 mb-8 leading-relaxed">
                  Whether you're looking for a developer, have a question about my work, or just want to say hello, 
                  I'd love to hear from you. I typically respond within 24 hours.
                </p>
                
                {/* Resume Download Button */}
                <div className="mb-8">
                  <a 
                    href="/Anmol_Airi_Resume_Data_Analyst.pdf" 
                    download="Anmol_Airi_Resume.pdf"
                    className="inline-flex items-center bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 shadow-lg hover:shadow-xl group"
                  >
                    <Download className="w-5 h-5 mr-2 group-hover:animate-bounce" />
                    Download Resume
                  </a>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mr-4">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Email</p>
                    <a href="mailto:anmolandanay@gmail.com" className="text-gray-300 hover:text-blue-400 transition-colors">
                      anmolandanay@gmail.com
                    </a>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mr-4">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Phone</p>
                    <a href="tel:+918700048336" className="text-gray-300 hover:text-blue-400 transition-colors">
                      +91 8700048336
                    </a>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mr-4">
                    <Linkedin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-medium">LinkedIn</p>
                    <a href="http://www.linkedin.com/in/anmol809" target="_blank" className="text-gray-300 hover:text-blue-400 transition-colors">
                      linkedin.com/in/anmol809
                    </a>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mr-4">
                    <Github className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-medium">GitHub</p>
                    <a href="https://github.com/anmolairi03/" target="_blank" className="text-gray-300 hover:text-blue-400 transition-colors">
                      github.com/anmolairi03
                    </a>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mr-4">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Resume</p>
                    <a 
                      href="/Anmol_Airi_Resume_Data_Analyst.pdf" 
                      download="Anmol_Airi_Resume.pdf"
                      className="text-gray-300 hover:text-blue-400 transition-colors"
                    >
                      Download PDF
                    </a>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-white mb-4">Follow Me</h4>
                <div className="flex space-x-4">
                  <a href="https://github.com/anmolairi03/" target="_blank" className="text-gray-400 hover:text-white transition-colors duration-200 transform hover:scale-110">
                    <Github size={24} />
                  </a>
                  <a href="http://www.linkedin.com/in/anmol809" target="_blank" className="text-gray-400 hover:text-white transition-colors duration-200 transform hover:scale-110">
                    <Linkedin size={24} />
                  </a>
                  <a href="https://leetcode.com/u/zeus408809/" target="_blank" className="text-gray-400 hover:text-white transition-colors duration-200 transform hover:scale-110">
                    <Code size={24} />
                  </a>
                  <a href="mailto:anmolandanay@gmail.com" className="text-gray-400 hover:text-white transition-colors duration-200 transform hover:scale-110">
                    <Mail size={24} />
                  </a>
                  <a href="/Anmol_Airi_Resume_Data_Analyst.pdf" download="Anmol_Airi_Resume.pdf" className="text-gray-400 hover:text-white transition-colors duration-200 transform hover:scale-110" title="Download Resume">
                    <Download size={24} />
                  </a>
                </div>
              </div>
            </div>
          </ScrollAnimation>

          {/* Contact Form */}
          <ScrollAnimation animationType="fadeRight">
            <div className="bg-slate-700 p-8 rounded-lg">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-slate-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-slate-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-white mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-slate-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                    placeholder="Subject"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-white mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-slate-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors resize-none"
                    placeholder="Your message..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 flex items-center justify-center"
                >
                  Send Message
                  <Send size={20} className="ml-2" />
                </button>
              </form>
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  );
};

export default Contact;