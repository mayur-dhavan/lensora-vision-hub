
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

const categories = [
  {
    id: 1,
    name: "Prescription Glasses",
    image: "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    link: "/shop/prescription%20glasses",
    description: "Stylish prescription eyewear for clear vision"
  },
  {
    id: 2,
    name: "Sunglasses",
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    link: "/shop/sunglasses",
    description: "Premium sunglasses with UV protection"
  },
  {
    id: 3,
    name: "Reading Glasses",
    image: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    link: "/shop/reading%20glasses",
    description: "Comfortable reading glasses for enhanced near vision"
  },
  {
    id: 4,
    name: "Blue Light Glasses",
    image: "https://images.unsplash.com/photo-1556306535-38febf6782e7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    link: "/shop/blue%20light%20glasses",
    description: "Computer glasses with blue light filtering"
  }
];

const CategoryHighlights = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-2">Shop By Category</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our wide range of eyewear products designed for your style and vision needs
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link to={category.link} key={category.id}>
              <Card className="overflow-hidden transition-transform hover:scale-105 border-0 shadow-md h-full">
                <div className="h-48 overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform hover:scale-110"
                  />
                </div>
                <CardContent className="p-4 text-center bg-white">
                  <h3 className="font-semibold text-lg">{category.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{category.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryHighlights;
