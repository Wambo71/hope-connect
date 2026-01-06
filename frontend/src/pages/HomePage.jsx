import { ArrowRight, Target, Users, TrendingUp, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

 function HomePage() {
  const partners = [
    { name: 'UNHCR', logo: 'UN Refugee Agency' },
    { name: 'IRC', logo: 'International Rescue Committee' },
    { name: 'Save the Children', logo: 'Save the Children' },
    { name: 'Norwegian Refugee Council', logo: 'NRC' },
    { name: 'World Food Programme', logo: 'WFP' },
  ];

  const stats = [
    { label: 'People Helped', value: '1.2M+' },
    { label: 'Active Projects', value: '150+' },
    { label: 'Partner Organizations', value: '25+' },
    { label: 'Countries Reached', value: '40+' },
  ];

  const impacts = [
    { icon: Target, title: 'Emergency Relief', description: 'Rapid response to humanitarian crises with essential supplies' },
    { icon: Users, title: 'Community Development', description: 'Long-term programs for sustainable growth and resilience' },
    { icon: TrendingUp, title: 'Livelihood Support', description: 'Skills training and economic empowerment initiatives' },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1727629660694-dca208e95f72?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWZ1Z2VlJTIwY2hpbGRyZW4lMjBob3BlfGVufDF8fHx8MTc2NTIyNDY0NXww&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Children in need"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white text-center">
          <h1 className="text-white mb-6 max-w-4xl mx-auto">
            Empowering Communities in Crisis, Building Hope for Tomorrow
          </h1>
          <p className="text-white mb-8 max-w-2xl mx-auto">
            We provide sustainable humanitarian aid to refugees and displaced communities worldwide, partnering with leading organizations to create lasting change.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              to="/donate"
              className="px-8 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors inline-flex items-center gap-2"
            >
              Donate Now
              <ArrowRight size={20} />
            </Link>
            <Link
              to="/stories"
              className="px-8 py-3 bg-white text-gray-900 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Read Stories
            </Link>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-gray-900 mb-6">Our Mission</h2>
            <p className="text-gray-600 mb-4">
              HopeConnect is dedicated to providing immediate humanitarian relief and sustainable development solutions to refugees, displaced persons, and vulnerable communities affected by conflict, persecution, and disaster.
            </p>
            <p className="text-gray-600">
              Through verified partnerships and transparent operations, we ensure that every contribution directly impacts lives, providing essential services including food security, shelter, healthcare, education, and livelihood support.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-red-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-red-600 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Areas */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-gray-900 mb-12">Our Impact</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {impacts.map((impact, index) => {
              const Icon = impact.icon;
              return (
                <div key={index} className="text-center p-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 text-red-600 mb-4">
                    <Icon size={32} />
                  </div>
                  <h3 className="text-gray-900 mb-3">{impact.title}</h3>
                  <p className="text-gray-600">{impact.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Verified Partners */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-gray-900 mb-4">Verified Partners</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We work in collaboration with world-renowned humanitarian organizations to ensure the highest standards of aid delivery and accountability.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            {partners.map((partner, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-6 shadow-sm flex items-center justify-center border border-gray-200"
              >
                <div className="text-center">
                  <CheckCircle className="text-green-600 mx-auto mb-2" size={24} />
                  <div className="text-gray-900">{partner.name}</div>
                  <div className="text-gray-500 text-sm">{partner.logo}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-red-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-white mb-4">Make a Difference Today</h2>
          <p className="text-white mb-8 max-w-2xl mx-auto">
            Your donation provides life-saving assistance to families in crisis. Every contribution, no matter the size, creates real impact.
          </p>
          <Link
            to="/donate"
            className="inline-flex items-center gap-2 px-8 py-3 bg-white text-red-600 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Start Donating
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
}

export default HomePage;