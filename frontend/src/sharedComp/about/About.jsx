import React from 'react';
import { FaLeaf, FaAward, FaHandsHelping, FaShippingFast } from 'react-icons/fa';
import { FiUsers, FiShoppingBag } from 'react-icons/fi';
import teamImage from '../../assets/team.jpg';
import aboutHero from '../../assets/about-hero.jpg';

const About = () => {
  const stats = [
    { value: '10,000+', label: 'Happy Customers', icon: <FiUsers className="w-8 h-8" /> },
    { value: '5+', label: 'Years in Business', icon: <FiShoppingBag className="w-8 h-8" /> },
    { value: '100%', label: 'Satisfaction Guarantee', icon: <FaAward className="w-8 h-8" /> },
    { value: '24/7', label: 'Customer Support', icon: <FaHandsHelping className="w-8 h-8" /> },
  ];

  const values = [
    {
      title: 'Sustainability',
      description: 'We source eco-friendly materials and implement sustainable practices throughout our supply chain.',
      icon: <FaLeaf className="w-6 h-6 text-green-500" />,
    },
    {
      title: 'Quality Craftsmanship',
      description: 'Each product is carefully crafted with attention to detail and built to last.',
      icon: <FaAward className="w-6 h-6 text-indigo-500" />,
    },
    {
      title: 'Fast Shipping',
      description: 'We process and ship orders within 24 hours to get your products to you quickly.',
      icon: <FaShippingFast className="w-6 h-6 text-blue-500" />,
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <div className="relative bg-gray-50 min-h-52 max-h-96 w-full overflow-hidden">
        <img
          src={aboutHero}
          alt="Our Story"
          className="w-full aspect-auto object-cover"
          loading='lazy'
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="text-center px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Our Story</h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              From humble beginnings to becoming your favorite shopping destination
            </p>
          </div>
        </div>
      </div>

      {/* Our Mission */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">Our Mission</h2>
          <div className="w-24 h-1 bg-black mx-auto mb-8"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We're on a mission to revolutionize your shopping experience by offering high-quality products,
            exceptional customer service, and a seamless online shopping journey. Our goal is to make fashion
            accessible, sustainable, and enjoyable for everyone.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center p-6 bg-gray-50 rounded-xl hover:shadow-sm hover:border transition-shadow">
              <div className="flex justify-center text-indigo-500 mb-4">
                {stat.icon}
              </div>
              <h3 className="text-3xl font-bold text-neutral-900 mb-2">{stat.value}</h3>
              <p className="text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Our Team */}
        <div className="flex flex-col md:flex-row items-center gap-9 sm:gap-12 mb-16">
          <div className="md:w-1/2">
            <img
              src={teamImage}
              alt="Our Team"
              className="rounded-xl shadow-lg w-full"
              loading='lazy'
            />
          </div>
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold text-neutral-900 mb-6">Meet Our Team</h2>
            <p className="text-gray-600 mb-6">
              Behind every great brand is a passionate team. Our diverse group of designers, customer service
              specialists, and logistics experts work tirelessly to bring you the best products and shopping
              experience.
            </p>
            <p className="text-gray-600">
              We believe in collaboration, creativity, and putting our customers first. Each team member brings
              unique skills and perspectives that help us innovate and grow.
            </p>
          </div>
        </div>

        {/* Our Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-neutral-900 mb-12 text-center">Our Core Values</h2>
          <div className="grid md:grid-cols-3 gap-4 sm:gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                <div className="flex items-center mb-4">
                  <div className="mr-4">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-neutral-900">{value.title}</h3>
                </div>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gray-50 rounded p-8 md:p-12 text-center text-black">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to experience the difference?</h2>
          <p className="text-black/90 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust us for their fashion needs.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="px-8 py-3 bg-blue-900 text-white font-medium rounded-lg hover:bg-blue-950 transition-colors">
              Shop Now
            </button>
            <button className="px-8 py-3 border border-black text-black font-medium rounded-lg hover:bg-white/50 transition-colors">
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;