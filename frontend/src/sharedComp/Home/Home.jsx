import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import CategoryCard from '../../components/Cart/CategoryCard';
import banner from '../../assets/banner.png'
import sarees from '../../assets/sarees.jpg'
import kurtasets from '../../assets/kurtasets.jpg'
import jumpsuit from '../../assets/jumpsuit.jpg'
import co_ords from '../../assets/co_ords.jpg'
import skirts from '../../assets/skirts.jpg'

// const banner = 'https://img.freepik.com/premium-photo/photo-full-length-image-young-asian-woman-posing_575980-30405.jpg?w=900';
// const banner = 'https://img.freepik.com/premium-photo/charming-call-center-woman-grinned-while-working-giving-customers-courteous-attentive-service-front-laptop-with-lens-flare-bokeh-office-with-soft-dark-tone-generative-ai_722401-5222.jpg?w=900';

const categories = [
    { name: 'Sarees', image: sarees, id: 'sarees' },
    { name: 'Kurta Sets', image: kurtasets, id: 'kurtasets' },
    { name: 'Jumpsuit', image: jumpsuit, id: 'jumpsuit' },
    { name: 'Co-Ords', image: co_ords, id: 'co_ords' },
    { name: 'Skirts', image: skirts, id: 'skirts' },
];

const Home = () => {
    const navigate = useNavigate();

    const handleCategorySelect = (categoryId) => {
        navigate(`/products/${categoryId}`);
    };

    return (
        <div className='bg-gray-50'>
            <div className="relative flex flex-col md:flex-row border border-black/50 mb-12">
                {/* Text Content - Left Side */}
                <div className="w-full md:w-1/2 flex items-center justify-center p-8 md:p-12 lg:p-16 bg-gray-50">
                    <div className="max-w-2xl space-y-6 text-center md:text-left">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black tracking-tight">
                            Elevate Your Style
                        </h1>
                        <p className="text-lg md:text-xl text-black/90 font-light">
                            Discover curated collections that celebrate your unique fashion sense
                        </p>
                        <Link
                            to="/products"
                            className="inline-flex items-center px-8 py-3 bg-blue-900 text-white font-medium rounded hover:bg-blue-950 transition-all duration-300 mt-6"
                        >
                            Shop Now
                            <FiArrowRight className="ml-2 w-5 h-5" />
                        </Link>
                    </div>
                </div>

                {/* Image - Right Side (or bottom on mobile) */}
                <div className="w-full md:w-1/2 md:h-auto order-first md:order-none">
                    <img 
                        src={banner} 
                        alt="Fashion Store" 
                        className="w-full object-cover object-center"
                        loading="eager"
                    />
                </div>
            </div>

            {/* Categories Section */}
            <div className="m-auto my-16">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Shop by Category
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto px-3">
                        Explore our handpicked collections for every occasion
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mx-8">
                    {categories.map((category, index) => (
                        <CategoryCard 
                            key={index} 
                            category={category} 
                            onSelect={handleCategorySelect} 
                        />
                    ))}
                </div>

                <div className="text-center mt-16">
                    <Link
                        to="/products"
                        className="inline-flex items-center text-gray-900 font-medium hover:text-gray-700 transition-colors group"
                    >
                        <span className="border-b border-transparent group-hover:border-gray-900 transition-all duration-300">
                            View All Collections
                        </span>
                        <FiArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Home;