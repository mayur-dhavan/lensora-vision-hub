import SEOHead from "@/components/seo/SEOHead";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Clock, MapPin, Phone } from "lucide-react";
import AppointmentForm from "@/components/appointment/AppointmentForm";
import { BRAND_NAME, BUSINESS_INFO } from "@/lib/constants";

const EyeTest = () => {
  return (
    <>
      <SEOHead
        title="Eye Test Appointment - Professional Eye Care in Pune"
        description={`Book your comprehensive eye examination at ${BRAND_NAME} in ${BUSINESS_INFO.address.city}. Professional eye tests, vision screening, and personalized eyewear solutions.`}
        keywords={`eye test, eye examination, vision screening, ${BRAND_NAME}, ${BUSINESS_INFO.address.city}, eyewear, optometrist`}
        url="/eye-test"
      />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">
              Professional Eye Care Services
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience comprehensive eye examinations and personalized vision care at {BRAND_NAME}, 
              {BUSINESS_INFO.address.city}'s trusted destination for complete eye care solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Services Info */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2 text-primary" />
                    Our Eye Care Services
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-3">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <h4 className="font-semibold">Comprehensive Eye Examination</h4>
                      <p className="text-sm text-gray-600">Complete vision screening and eye health assessment</p>
                    </div>
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <h4 className="font-semibold">Contact Lens Fitting</h4>
                      <p className="text-sm text-gray-600">Professional contact lens consultation and fitting</p>
                    </div>
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <h4 className="font-semibold">Frame Selection Consultation</h4>
                      <p className="text-sm text-gray-600">Expert guidance for choosing the perfect frames</p>
                    </div>
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <h4 className="font-semibold">Prescription Renewal</h4>
                      <p className="text-sm text-gray-600">Quick prescription updates and verification</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MapPin className="w-5 h-5 mr-2 text-primary" />
                    Visit Our Store
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <h4 className="font-semibold">{BUSINESS_INFO.name}</h4>
                    <p className="text-gray-600">
                      {BUSINESS_INFO.address.street}<br />
                      {BUSINESS_INFO.address.area}<br />
                      {BUSINESS_INFO.address.city} - {BUSINESS_INFO.address.pincode}<br />
                      {BUSINESS_INFO.address.state}, {BUSINESS_INFO.address.country}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4 text-primary" />
                    <span>{BUSINESS_INFO.contact.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-primary" />
                    <span>{BUSINESS_INFO.hours.weekdays}</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Appointment Form */}
            <div>
              <AppointmentForm />
            </div>
          </div>

          {/* Why Choose Us */}
          <Card>
            <CardHeader>
              <CardTitle className="text-center">Why Choose {BRAND_NAME}?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Experienced Optometrists</h3>
                  <p className="text-sm text-gray-600">
                    Our certified eye care professionals have years of experience in comprehensive eye examinations.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Clock className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Latest Technology</h3>
                  <p className="text-sm text-gray-600">
                    State-of-the-art equipment for accurate diagnosis and comprehensive eye health assessment.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MapPin className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Convenient Location</h3>
                  <p className="text-sm text-gray-600">
                    Located in the heart of {BUSINESS_INFO.address.city} with easy access and ample parking facilities.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default EyeTest;