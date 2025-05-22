
import { useState } from "react";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  quote: string;
  image: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Priya Sharma",
    role: "Customer",
    quote: "The quality of frames and lenses from LensHub is exceptional. The staff was extremely helpful in finding the perfect pair for my face shape. I've never seen so clearly!",
    image: "https://randomuser.me/api/portraits/women/24.jpg",
    rating: 5
  },
  {
    id: 2,
    name: "Rahul Patel",
    role: "Customer",
    quote: "I had my eye test here and was very impressed with the thoroughness and professionalism. The digital eye scanning technology they use is state-of-the-art.",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 5
  },
  {
    id: 3,
    name: "Aisha Khan",
    role: "Customer",
    quote: "After struggling with uncomfortable frames for years, the team at LensHub helped me find glasses that fit perfectly. I forget I'm even wearing them!",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 4
  }
];

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  return (
    <section className="py-16 md:py-24 bg-navy-800 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-3">
            What Our Customers Say
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Don't just take our word for it - hear from our satisfied customers
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${activeIndex * 100}%)` }}
              >
                {testimonials.map((testimonial) => (
                  <div 
                    key={testimonial.id} 
                    className="w-full flex-shrink-0 px-4"
                  >
                    <div className="text-center">
                      <div className="mb-6">
                        <img 
                          src={testimonial.image} 
                          alt={testimonial.name} 
                          className="w-20 h-20 rounded-full mx-auto object-cover border-4 border-navy-500"
                        />
                      </div>
                      <div className="flex justify-center mb-4">
                        {[...Array(5)].map((_, i) => (
                          <svg 
                            key={i} 
                            className={`w-5 h-5 ${i < testimonial.rating ? 'text-gold-400' : 'text-gray-500'}`}
                            fill="currentColor" 
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <blockquote className="text-xl font-medium mb-4">"{testimonial.quote}"</blockquote>
                      <div className="font-semibold text-lg">{testimonial.name}</div>
                      <div className="text-sm text-gray-300">{testimonial.role}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Navigation buttons */}
            <button 
              onClick={handlePrev}
              className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-2 bg-navy-700 hover:bg-navy-600 text-white rounded-full p-2"
              aria-label="Previous testimonial"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button 
              onClick={handleNext}
              className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-2 bg-navy-700 hover:bg-navy-600 text-white rounded-full p-2"
              aria-label="Next testimonial"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          
          {/* Indicators */}
          <div className="flex justify-center mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`mx-1 w-3 h-3 rounded-full ${
                  activeIndex === index ? 'bg-white' : 'bg-navy-600 hover:bg-navy-500'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
