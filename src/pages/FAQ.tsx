import { Link } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Home } from "lucide-react";

const FAQ = () => {
  const faqs = [
    {
      question: "How do I book an eye test appointment?",
      answer: "You can book an eye test appointment by visiting our 'Eye Test' page and filling out the appointment form. We'll contact you to confirm your preferred time slot."
    },
    {
      question: "What payment methods do you accept?",
      answer: "Currently, we accept Cash on Delivery (COD) for all orders. We're working on adding more payment options in the future."
    },
    {
      question: "Do you offer home delivery?",
      answer: "Yes, we offer home delivery within Pune and surrounding areas. Delivery charges may apply based on your location."
    },
    {
      question: "What is your return policy?",
      answer: "We offer a 30-day return policy for all products. Items must be in original condition with all packaging. Prescription glasses may have different return conditions."
    },
    {
      question: "How long does it take to prepare prescription glasses?",
      answer: "Prescription glasses typically take 3-7 business days to prepare, depending on the complexity of your prescription and frame selection."
    },
    {
      question: "Do you provide warranty on eyewear?",
      answer: "Yes, we provide a 1-year warranty on frames and 6 months warranty on lenses against manufacturing defects."
    },
    {
      question: "Can I try frames before purchasing?",
      answer: "Absolutely! We encourage you to visit our store to try different frames. We also offer virtual try-on for selected frames on our website."
    },
    {
      question: "Do you accept insurance?",
      answer: "We can provide detailed bills that you can submit to your insurance provider for reimbursement. Please check with your insurance company for coverage details."
    },
    {
      question: "What if my prescription changes after purchase?",
      answer: "If your prescription changes within 30 days of purchase, we offer free lens replacement. After 30 days, lens replacement is available at a discounted rate."
    },
    {
      question: "How do I track my order?",
      answer: "Once your order is shipped, you'll receive a tracking ID via email/SMS. You can also track your order status in your account dashboard."
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">
              <Home className="h-4 w-4" />
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink>FAQ</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <h1 className="text-3xl font-bold mb-6">Frequently Asked Questions</h1>
      
      <div className="max-w-4xl">
        <p className="text-lg text-gray-600 mb-8">
          Find answers to common questions about our products, services, and policies.
        </p>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg px-4">
              <AccordionTrigger className="text-left font-medium">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 pb-4">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mt-12 bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Still have questions?</h2>
          <p className="text-gray-600 mb-4">
            If you couldn't find the answer you're looking for, feel free to contact us directly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              to="/contact" 
              className="inline-flex items-center justify-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
            >
              Contact Us
            </Link>
            <a 
              href="tel:+919876543210" 
              className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              Call: +91 9876543210
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;