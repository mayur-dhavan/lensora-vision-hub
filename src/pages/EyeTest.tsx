
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { Home, Clock, Calendar as CalendarIcon, Check } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useUser } from "@clerk/clerk-react";
import { format, addDays, setHours, setMinutes, isSameDay, isBefore, addMonths } from "date-fns";

const EyeTest = () => {
  const { user, isSignedIn } = useUser();
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [timeSlot, setTimeSlot] = useState<string | null>(null);
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState(1);

  // Generate time slots (10 AM to 6 PM with 1-hour intervals)
  const generateTimeSlots = (selectedDate: Date) => {
    const slots = [];
    const startHour = 10; // 10 AM
    const endHour = 18;   // 6 PM
    
    for (let hour = startHour; hour < endHour; hour++) {
      const slotTime = setMinutes(setHours(new Date(selectedDate), hour), 0);
      
      // Don't show past time slots for today
      if (isSameDay(selectedDate, new Date()) && isBefore(slotTime, new Date())) {
        continue;
      }
      
      slots.push({
        time: format(slotTime, "h:mm a"),
        value: format(slotTime, "HH:mm")
      });
    }
    
    return slots;
  };

  const timeSlots = date ? generateTimeSlots(date) : [];

  const handleBookAppointment = async () => {
    if (!isSignedIn || !date || !timeSlot) return;
    
    setIsSubmitting(true);
    
    try {
      // Convert date and time slot to a single timestamp
      const [hours, minutes] = timeSlot.split(':').map(Number);
      const appointmentDate = new Date(date);
      appointmentDate.setHours(hours, minutes, 0, 0);
      
      // Insert appointment into database
      const { data, error } = await supabase
        .from('appointments')
        .insert({
          user_id: user.id,
          appointment_date: appointmentDate.toISOString(),
          notes: notes,
          status: 'scheduled'
        });
        
      if (error) throw error;
      
      toast({
        title: "Appointment Booked",
        description: `Your eye test is scheduled for ${format(appointmentDate, "MMMM d, yyyy 'at' h:mm a")}`,
      });
      
      // Reset form and go to confirmation step
      setStep(3);
    } catch (error) {
      console.error('Error booking appointment:', error);
      toast({
        title: "Booking Failed",
        description: "There was an error booking your appointment. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const disabledDays = {
    before: addDays(new Date(), 1),
    after: addMonths(new Date(), 3),
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink as={Link} to="/">
              <Home className="h-4 w-4" />
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink>Book Eye Test</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-4">Book Your Eye Test</h1>
          <p className="text-gray-600">
            Schedule a comprehensive eye examination with our expert optometrists.
          </p>
        </div>

        {/* Booking Form */}
        <div className="bg-white rounded-lg shadow">
          {/* Progress Steps */}
          <div className="border-b">
            <div className="flex">
              <div className={`flex-1 text-center p-4 ${step >= 1 ? 'text-primary border-b-2 border-primary' : ''}`}>
                <span className="font-medium">1. Select Date & Time</span>
              </div>
              <div className={`flex-1 text-center p-4 ${step >= 2 ? 'text-primary border-b-2 border-primary' : ''}`}>
                <span className="font-medium">2. Your Details</span>
              </div>
              <div className={`flex-1 text-center p-4 ${step >= 3 ? 'text-primary border-b-2 border-primary' : ''}`}>
                <span className="font-medium">3. Confirmation</span>
              </div>
            </div>
          </div>

          <div className="p-6">
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold mb-4 flex items-center">
                    <CalendarIcon className="mr-2 h-5 w-5" /> Select a Date
                  </h2>
                  <div className="flex justify-center">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      disabled={disabledDays}
                      className="rounded border"
                    />
                  </div>
                </div>

                {date && (
                  <div>
                    <h2 className="text-xl font-bold mb-4 flex items-center">
                      <Clock className="mr-2 h-5 w-5" /> Select a Time Slot
                    </h2>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {timeSlots.map((slot) => (
                        <button
                          key={slot.value}
                          type="button"
                          className={`p-3 text-center border rounded-md hover:border-primary hover:bg-primary/5 ${
                            timeSlot === slot.value
                              ? "bg-primary text-primary-foreground"
                              : "bg-white"
                          }`}
                          onClick={() => setTimeSlot(slot.value)}
                        >
                          {slot.time}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex justify-end mt-6">
                  <Button 
                    onClick={() => setStep(2)} 
                    disabled={!date || !timeSlot}
                  >
                    Continue
                  </Button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold mb-4">Additional Information</h2>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="notes">Do you have any specific concerns or requirements?</Label>
                      <Textarea
                        id="notes"
                        placeholder="E.g., I'm experiencing headaches when reading, I need an updated prescription, etc."
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        rows={4}
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-md">
                  <h3 className="font-bold mb-2">Appointment Details</h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>Date:</div>
                    <div className="font-medium">{date ? format(date, "MMMM d, yyyy") : ""}</div>
                    <div>Time:</div>
                    <div className="font-medium">
                      {timeSlot ? format(setHours(new Date(), parseInt(timeSlot.split(':')[0])), "h:mm a") : ""}
                    </div>
                  </div>
                </div>

                <div className="flex justify-between mt-6">
                  <Button variant="outline" onClick={() => setStep(1)}>
                    Back
                  </Button>
                  <Button 
                    onClick={handleBookAppointment}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Booking..." : "Confirm Booking"}
                  </Button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="text-center py-8">
                <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                  <Check className="h-8 w-8 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Appointment Confirmed!</h2>
                <p className="text-gray-600 mb-6">
                  Your eye test has been scheduled for {date ? format(date, "MMMM d, yyyy") : ""} at{" "}
                  {timeSlot ? format(setHours(new Date(), parseInt(timeSlot.split(':')[0])), "h:mm a") : ""}.
                </p>
                <div className="space-y-4">
                  <p className="text-sm text-gray-500">
                    Please arrive 10 minutes before your appointment. You will receive a confirmation email with more details.
                  </p>
                  <Button asChild>
                    <Link to="/profile">View in My Appointments</Link>
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Info Section */}
        {step !== 3 && (
          <div className="mt-12 grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-2">What to Expect</h3>
                <p className="text-gray-600 text-sm">
                  Our comprehensive eye test takes approximately 30 minutes and includes vision assessment, eye health check, and personalized recommendations.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-2">Bring with You</h3>
                <p className="text-gray-600 text-sm">
                  Please bring your current eyeglasses or contact lenses, and any eye medication you may be using.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-2">Cancellation Policy</h3>
                <p className="text-gray-600 text-sm">
                  You can reschedule or cancel your appointment up to 24 hours before your scheduled time without any charge.
                </p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default EyeTest;
