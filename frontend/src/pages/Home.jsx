import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen">
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-24 md:py-32">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute left-0 top-0 w-full h-full opacity-10">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
              <path d="M0,0 L100,0 L100,100 L0,100 Z" fill="url(#grid)" />
            </svg>
            <defs>
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
          </div>
          <div className="absolute -right-40 -bottom-40 w-80 h-80 rounded-full bg-blue-500 opacity-20 blur-3xl"></div>
          <div className="absolute -left-20 -top-20 w-60 h-60 rounded-full bg-indigo-500 opacity-20 blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className={`md:w-1/2 text-center md:text-left mb-12 md:mb-0 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Create <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-pink-300">Beautiful Forms</span> in Minutes
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-lg">The easiest way to build, share, and analyze forms online. No coding required.</p>
              <div className="flex flex-col sm:flex-row justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
                <Link 
                  to="/register" 
                  className="bg-white text-blue-700 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  Get Started Free
                </Link>
                <Link 
                  to="/login" 
                  className="border-2 border-white bg-transparent text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition duration-300"
                >
                  Sign In
                </Link>
              </div>
            </div>
            
            <div className={`md:w-1/2 transition-all duration-1000 delay-300 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <div className="relative mx-auto w-full max-w-md">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-2xl transform rotate-3 scale-105 opacity-20 blur-lg"></div>
                <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden">
                  <div className="p-4 bg-gray-50 border-b">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="mb-4">
                      <div className="h-6 w-1/3 bg-gray-200 rounded mb-2"></div>
                      <div className="h-10 bg-gray-100 rounded"></div>
                    </div>
                    <div className="mb-4">
                      <div className="h-6 w-1/2 bg-gray-200 rounded mb-2"></div>
                      <div className="h-24 bg-gray-100 rounded"></div>
                    </div>
                    <div className="mb-4">
                      <div className="h-6 w-1/4 bg-gray-200 rounded mb-2"></div>
                      <div className="flex space-x-2">
                        <div className="h-5 w-5 bg-gray-300 rounded-full"></div>
                        <div className="h-5 w-1/3 bg-gray-200 rounded"></div>
                      </div>
                    </div>
                    <div className="h-10 w-1/3 bg-blue-500 rounded-lg mx-auto mt-6"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className={`flex justify-center mt-16 transition-all duration-1000 delay-500 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="flex items-center space-x-8">
              <p className="text-blue-100 font-medium">Trusted by:</p>
              <div className="flex space-x-8">
                <div className="h-8 w-24 bg-white/20 rounded"></div>
                <div className="h-8 w-24 bg-white/20 rounded"></div>
                <div className="h-8 w-24 bg-white/20 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Our Form Builder?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">Our platform provides everything you need to create, share, and analyze forms with ease.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: (
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                ),
                title: "Lightning Fast",
                description: "Create professional forms in minutes with our intuitive drag-and-drop interface."
              },
              {
                icon: (
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                ),
                title: "Mobile Responsive",
                description: "Forms automatically adapt to any device, ensuring a seamless experience for your users."
              },
              {
                icon: (
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                ),
                title: "Advanced Analytics",
                description: "Gain valuable insights from form submissions with our powerful analytics dashboard."
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-8 transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                <div className="text-blue-600 mb-5">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-6 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">Create and share forms in just three simple steps</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                number: "01",
                title: "Design Your Form",
                description: "Use our drag-and-drop builder to create beautiful forms with custom fields."
              },
              {
                number: "02",
                title: "Share With Anyone",
                description: "Get a unique link to share your form via email, social media, or embed on your website."
              },
              {
                number: "03",
                title: "Collect & Analyze",
                description: "View submissions in real-time and gain insights with our analytics tools."
              }
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-600 font-bold text-xl mb-5">
                  {step.number}
                </div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Users Say</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">Join thousands of satisfied users who love our platform</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                quote: "This form builder has completely transformed how we collect data. It's so easy to use and the analytics are fantastic!",
                author: "Sarah Johnson",
                role: "Marketing Director"
              },
              {
                quote: "I was able to create a complex survey in minutes. The interface is intuitive and the forms look great on mobile.",
                author: "Michael Chen",
                role: "Product Manager"
              },
              {
                quote: "The best form builder I've ever used. The customer support is excellent and they're constantly adding new features.",
                author: "Emily Rodriguez",
                role: "Small Business Owner"
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-lg">
                <div className="text-blue-600 mb-4">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>
                <p className="text-gray-700 mb-6">{testimonial.quote}</p>
                <div>
                  <p className="font-bold">{testimonial.author}</p>
                  <p className="text-gray-500 text-sm">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 px-6 bg-gradient-to-r from-blue-600 to-indigo-700 text-white overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -right-40 -bottom-40 w-80 h-80 rounded-full bg-blue-500 opacity-20 blur-3xl"></div>
          <div className="absolute -left-20 -top-20 w-60 h-60 rounded-full bg-indigo-500 opacity-20 blur-3xl"></div>
        </div>
        
        <div className="container mx-auto text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">Join thousands of users who are already creating beautiful forms with our platform.</p>
          <Link 
            to="/register" 
            className="bg-white text-blue-700 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Create Your First Form
          </Link>
          <p className="mt-6 text-blue-100">No credit card required • Free plan available</p>
        </div>
      </section>
    </div>
  );
};

export default Home; 