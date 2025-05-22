
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const CategoryHighlights = () => {
  const categories = [
    {
      id: "sunglasses",
      title: "Sunglasses",
      description: "Protect your eyes with style",
      image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80",
      link: "/shop?category=sunglasses"
    },
    {
      id: "prescription",
      title: "Prescription",
      description: "Crystal clear vision with comfort",
      image: "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80",
      link: "/shop?category=prescription"
    },
    {
      id: "reading",
      title: "Reading",
      description: "Enhance your reading experience",
      image: "https://images.unsplash.com/photo-1534361960057-19889db9621e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80",
      link: "/shop?category=reading"
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-3">
            Browse Categories
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our collection tailored to your specific needs and style preferences
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category) => (
            <Link 
              key={category.id}
              to={category.link}
              className="group overflow-hidden rounded-xl bg-white shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={category.image} 
                  alt={category.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6 text-white">
                  <h3 className="text-xl font-display font-bold mb-2">{category.title}</h3>
                  <p className="text-sm text-white/90 mb-4">{category.description}</p>
                  <span className="inline-flex items-center text-sm font-medium text-white group-hover:underline">
                    Shop Now <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryHighlights;
