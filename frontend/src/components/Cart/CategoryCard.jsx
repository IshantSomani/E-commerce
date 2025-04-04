import React from 'react'
import { FiArrowRight } from 'react-icons/fi';

const CategoryCard = ({ category, onSelect }) => (
    <div
        onClick={() => onSelect(category.id)}
        className="relative group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer aspect-square"
    >
        <div className="aspect-[3/4] w-full overflow-hidden">
            <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
            />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent flex flex-col justify-end p-6">
            <h3 className="text-white text-2xl font-bold mb-1 transition-transform duration-300 group-hover:translate-y-1">
                {category.name}
            </h3>
            <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-white/80 text-sm">Shop Collection</span>
                <FiArrowRight className="ml-2 text-white/80 w-4 h-4" />
            </div>
        </div>
    </div>
);

export default CategoryCard