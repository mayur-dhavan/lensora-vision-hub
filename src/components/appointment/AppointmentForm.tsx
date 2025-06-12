
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useUser } from "@clerk/clerk-react";
import { cn } from "@/lib/utils";

const AppointmentForm = () => {
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState<Date>();
  const [formData, setFormData] = useState({
    appointment_type: 'eye_checkup',
    duration: 30,
    patient_name: '',
    patient_age: '',
    contact_number: '',
    symptoms: '',
    time: '',
    notes: ''
  });

  const appointmentTypes = [
    { value: 'eye_checkup', label: 'Eye Checkup', duration: 30 },
    { value: 'contact_lens_fitting', label: 'Contact Lens Fitting', duration: 45 },
    { value: 'frame_selection', label: 'Frame Selection', duration: 20 },
    { value: 'prescription_renewal', label: 'Prescription Renewal', duration: 15 },
    { value: 'consultation', label: 'General Consultation', duration: 30 }
  ];

  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '14:00', '14:30', '15:00', '15:30',
    '16:00', '16:30', '17:00', '17:30', '18:00'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !date || !formData.time) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      // Combine date and time
      const appointmentDateTime = new Date(date);
      const [hours, minutes] = formData.time.split(':').map(Number);
      appointmentDateTime.setHours(hours, minutes, 0, 0);

      const selectedType = appointmentTypes.find(type => type.value === formData.appointment_type);

      const appointmentData = {
        user_id: user.id,
        appointment_date: appointmentDateTime.toISOString(),
        appointment_type: formData.appointment_type,
        duration: selectedType?.duration || 30,
        patient_name: formData.patient_name || `${user.firstName} ${user.lastName}`,
        patient_age: formData.patient_age ? parseInt(formData.patient_age) : null,
        contact_number: formData.contact_number || user.phoneNumbers?.[0]?.phoneNumber,
        symptoms: formData.symptoms,
        notes: formData.notes,
        status: 'scheduled'
      };

      const { error } = await supabase
        .from('appointments')
        .insert(appointmentData);

      if (error) throw error;

      toast({
        title: "Appointment Booked",
        description: "Your appointment has been successfully booked. We'll contact you to confirm."
      });

      // Reset form
      setDate(undefined);
      setFormData({
        appointment_type: 'eye_checkup',
        duration: 30,
        patient_name: '',
        patient_age: '',
        contact_number: '',
        symptoms: '',
        time: '',
        notes: ''
      });
    } catch (error) {
      console.error('Error booking appointment:', error);
      toast({
        title: "Error",
        description: "Failed to book appointment. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Book an Eye Test Appointment</CardTitle>
        <p className="text-sm text-gray-600">
          Schedule your visit to Lenshub Eyewear in Pune for professional eye care services.
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="appointment_type">Service Type</Label>
            <Select
              value={formData.appointment_type}
              onValueChange={(value) => {
                const selectedType = appointmentTypes.find(type => type.value === value);
                setFormData({
                  ...formData,
                  appointment_type: value,
                  duration: selectedType?.duration || 30
                });
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select service type" />
              </SelectTrigger>
              <SelectContent>
                {appointmentTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label} ({type.duration} mins)
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Preferred Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    disabled={(date) => date < new Date() || date.getDay() === 0}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div>
              <Label htmlFor="time">Preferred Time</Label>
              <Select
                value={formData.time}
                onValueChange={(value) => setFormData({ ...formData, time: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map((time) => (
                    <SelectItem key={time} value={time}>
                      {time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="patient_name">Patient Name</Label>
              <Input
                id="patient_name"
                value={formData.patient_name}
                onChange={(e) => setFormData({ ...formData, patient_name: e.target.value })}
                placeholder={user ? `${user.firstName} ${user.lastName}` : "Enter patient name"}
              />
            </div>
            <div>
              <Label htmlFor="patient_age">Patient Age</Label>
              <Input
                id="patient_age"
                type="number"
                value={formData.patient_age}
                onChange={(e) => setFormData({ ...formData, patient_age: e.target.value })}
                placeholder="Enter age"
                min="1"
                max="120"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="contact_number">Contact Number</Label>
            <Input
              id="contact_number"
              value={formData.contact_number}
              onChange={(e) => setFormData({ ...formData, contact_number: e.target.value })}
              placeholder={user?.phoneNumbers?.[0]?.phoneNumber || "+91 9876543210"}
            />
          </div>

          <div>
            <Label htmlFor="symptoms">Current Eye Issues or Symptoms (Optional)</Label>
            <Textarea
              id="symptoms"
              value={formData.symptoms}
              onChange={(e) => setFormData({ ...formData, symptoms: e.target.value })}
              placeholder="Describe any vision problems, discomfort, or specific concerns..."
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="notes">Additional Notes (Optional)</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Any special requirements or additional information..."
              rows={2}
            />
          </div>

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? 'Booking...' : 'Book Appointment'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AppointmentForm;
