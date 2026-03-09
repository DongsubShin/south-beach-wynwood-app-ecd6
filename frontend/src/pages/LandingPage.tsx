import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage: React.FC = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section id="home" className="pt-32 pb-20 lg:pt-48 lg:pb-32 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block px-4 py-1.5 mb-6 text-sm font-bold tracking-wider text-[#1E3A5F] uppercase bg-amber-50 rounded-full">
                Miami's Finest Grooming
              </span>
              <h1 className="text-5xl lg:text-6xl font-bold text-slate-900 leading-tight mb-6">
                Precision Cuts for the <span className="text-[#ED1C24]">Modern Gentleman</span>
              </h1>
              <p className="text-lg text-slate-600 mb-10 max-w-lg">
                Experience the perfect blend of traditional barbering and contemporary style at South Beach Cuts & Wynwood Barbers.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link 
                  to="/book" 
                  className="bg-[#ED1C24] text-white px-8 py-4 rounded-md font-bold text-lg hover:bg-opacity-90 transition shadow-lg"
                >
                  Book Appointment
                </Link>
                <Link 
                  to="/queue" 
                  className="bg-white text-slate-900 border-2 border-slate-200 px-8 py-4 rounded-md font-bold text-lg hover:bg-slate-50 transition"
                >
                  Join Live Queue
                </Link>
              </div>
            </div>
            <div className="hidden lg:block relative">
              <div className="aspect-square bg-slate-200 rounded-2xl overflow-hidden shadow-2xl">
                {/* Placeholder for Hero Image */}
                <div className="w-full h-full bg-gradient-to-br from-slate-300 to-slate-400 flex items-center justify-center text-slate-500">
                  <span className="iconify text-8xl" data-icon="lucide:scissors"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section id="services" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-12">Our Signature Services</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {['Classic Cut', 'Beard Grooming', 'Hot Towel Shave'].map((service) => (
              <div key={service} className="p-8 border border-slate-100 rounded-xl hover:shadow-md transition">
                <div className="w-12 h-12 bg-red-50 text-[#ED1C24] rounded-lg flex items-center justify-center mx-auto mb-6">
                  <span className="iconify text-2xl" data-icon="lucide:check-circle"></span>
                </div>
                <h3 className="text-xl font-bold mb-4">{service}</h3>
                <p className="text-slate-600">Premium grooming experience tailored to your unique style and preference.</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;