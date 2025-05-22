
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { toast } from "@/components/ui/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { Home, CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/clerk-react";
import { supabase } from "@/integrations/supabase/client";

const timeSlots = [
  "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", 
  "3:00 PM", "4:00 PM", "5:00 PM", "6:00 PM"
];

const EyeTest = () => {
  const { user, isSignedIn } = useUser();
  const [date, setDate] = useState<Date>();
  const [timeSlot, setTimeSlot] = useState<string>("");
  const [testType, setTestType] = useState<string>("comprehensive");
  const [notes, setNotes] = useState("");
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  
  const handleSubmit = async () => {
    if (!isSignedIn || !user) {
      toast({
        title: "Please Sign In",
        description: "You need to be signed in to book an eye test appointment.",
        variant: "destructive"
      });
      return;
    }

    if (!date || !timeSlot) {
      toast({
        title: "Incomplete Information",
        description: "Please select a date and time for your appointment.",
        variant: "destructive"
      });
      return;
    }

    setSubmitting(true);
    
    try {
      // Combine the date and time slot
      const [hours, minutes] = timeSlot.split(':');
      const isPM = timeSlot.includes('PM');
      let hour = parseInt(hours);
      if (isPM && hour !== 12) hour += 12;
      if (!isPM && hour === 12) hour = 0;
      
      const appointmentDate = new Date(date);
      appointmentDate.setHours(hour);
      appointmentDate.setMinutes(parseInt(minutes));
      
      // Save appointment to Supabase
      const { error } = await supabase
        .from('appointments')
        .insert({
          user_id: user.id,
          appointment_date: appointmentDate.toISOString(),
          status: 'scheduled',
          notes: `Test Type: ${testType}${notes ? `. Notes: ${notes}` : ''}`
        });
      
      if (error) throw error;
      
      toast({
        title: "Appointment Booked",
        description: `Your eye test is scheduled for ${format(appointmentDate, "MMMM d, yyyy 'at' h:mm a")}.`,
      });
      
      // Reset form
      setDate(undefined);
      setTimeSlot("");
      setTestType("comprehensive");
      setNotes("");
      setStep(1);
      
    } catch (error) {
      console.error('Error booking appointment:', error);
      toast({
        title: "Booking Failed",
        description: "There was an error booking your appointment. Please try again.",
        variant: "destructive"
      });
    } finally {
      setSubmitting(false);
    }
  };

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
            <BreadcrumbLink>Eye Test</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <h1 className="text-3xl font-bold mb-6">Book an Eye Test</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-6 border-b">
              <div className="flex items-center space-x-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step >= 1 ? "bg-primary text-white" : "bg-gray-200"
                }`}>
                  1
                </div>
                <h2 className="text-xl font-semibold">Select Appointment Date & Time</h2>
              </div>
              
              {step === 1 && (
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <Label>Select Date</Label>
                    <div className="border rounded-md">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !date && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? format(date, "PPP") : <span>Pick a date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            initialFocus
                            disabled={(date) => 
                              date < new Date(new Date().setHours(0, 0, 0, 0)) || // Disable past dates
                              date > new Date(new Date().setMonth(new Date().getMonth() + 2)) // Allow booking up to 2 months in advance
                            }
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <Label>Select Time</Label>
                    <div>
                      <Select value={timeSlot} onValueChange={setTimeSlot}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select time slot" />
                        </SelectTrigger>
                        <SelectContent>
                          {timeSlots.map((slot) => (
                            <SelectItem key={slot} value={slot}>{slot}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    {date && timeSlot && (
                      <div className="mt-4 p-3 bg-green-50 text-green-700 rounded-md text-sm">
                        You've selected an appointment for {format(date, "MMMM d, yyyy")} at {timeSlot}.
                      </div>
                    )}
                  </div>
                  
                  <div className="md:col-span-2 mt-4 flex justify-end">
                    <Button 
                      onClick={() => setStep(2)}
                      disabled={!date || !timeSlot}
                    >
                      Continue
                    </Button>
                  </div>
                </div>
              )}
            </div>
            
            <div className="p-6 border-b">
              <div className="flex items-center space-x-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step >= 2 ? "bg-primary text-white" : "bg-gray-200"
                }`}>
                  2
                </div>
                <h2 className="text-xl font-semibold">Additional Information</h2>
              </div>
              
              {step === 2 && (
                <div className="mt-6 space-y-6">
                  <div className="space-y-4">
                    <Label>Type of Eye Test</Label>
                    <RadioGroup value={testType} onValueChange={setTestType}>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="comprehensive" id="comprehensive" />
                        <Label htmlFor="comprehensive">Comprehensive Eye Exam</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="prescription" id="prescription" />
                        <Label htmlFor="prescription">Prescription Update</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="contact-lens" id="contact-lens" />
                        <Label htmlFor="contact-lens">Contact Lens Fitting</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="notes">Additional Notes (Optional)</Label>
                    <Textarea
                      id="notes"
                      placeholder="Any specific concerns or information you'd like to share"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                    />
                  </div>
                  
                  <div className="flex justify-between">
                    <Button variant="outline" onClick={() => setStep(1)}>
                      Back
                    </Button>
                    <Button onClick={handleSubmit} disabled={submitting}>
                      {submitting ? "Booking..." : "Book Appointment"}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div>
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">About Our Eye Tests</h3>
              
              <div className="space-y-4 text-sm">
                <div>
                  <h4 className="font-semibold">Comprehensive Eye Exam</h4>
                  <p className="text-gray-600">
                    A thorough examination of your eye health and vision, including tests for glaucoma, 
                    cataracts, and other eye conditions.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold">Prescription Update</h4>
                  <p className="text-gray-600">
                    A quick check to update your current prescription for glasses or contact lenses.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold">Contact Lens Fitting</h4>
                  <p className="text-gray-600">
                    Specialized assessment to determine the right contact lens prescription and fit for your eyes.
                  </p>
                </div>
                
                <div className="pt-4 border-t">
                  <h4 className="font-semibold">Duration</h4>
                  <p className="text-gray-600">30-45 minutes depending on the test type</p>
                </div>
                
                <div>
                  <h4 className="font-semibold">What to Bring</h4>
                  <ul className="list-disc pl-5 text-gray-600">
                    <li>Current glasses or contact lenses</li>
                    <li>List of current medications</li>
                    <li>Previous prescription (if available)</li>
                    <li>Health insurance information (if applicable)</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-6 pt-4 border-t">
                <p className="text-sm text-gray-500">
                  Need to reschedule? Contact us at least 24 hours before your appointment.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EyeTest;
