
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Appointment } from "@/types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const AdminAppointments = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const { data, error } = await supabase
          .from("appointments")
          .select(`
            *,
            user_profiles:user_id (
              email,
              first_name,
              last_name,
              phone
            )
          `)
          .order("appointment_date", { ascending: true });

        if (error) throw error;
        setAppointments(data || []);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const updateAppointmentStatus = async (appointmentId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from("appointments")
        .update({ status: newStatus })
        .eq("id", appointmentId);

      if (error) throw error;      setAppointments(
        appointments.map((appointment) =>
          appointment.id === appointmentId
            ? { ...appointment, status: newStatus as Appointment['status'] }
            : appointment
        )
      );
    } catch (error) {
      console.error("Error updating appointment status:", error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "scheduled":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Eye Test Appointments</h1>

      {loading ? (
        <div className="grid gap-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-24 rounded-lg bg-gray-100 animate-pulse"></div>
          ))}
        </div>
      ) : (
        <>
          {appointments.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-gray-500">No appointments scheduled</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b">
                    <th className="p-4 text-left">Date & Time</th>
                    <th className="p-4 text-left">Customer</th>
                    <th className="p-4 text-left">Contact</th>
                    <th className="p-4 text-left">Status</th>
                    <th className="p-4 text-left">Notes</th>
                    <th className="p-4 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.map((appointment) => (
                    <tr key={appointment.id} className="border-b hover:bg-gray-50">
                      <td className="p-4 font-medium">
                        {new Date(appointment.appointment_date).toLocaleDateString()}{" "}
                        {new Date(appointment.appointment_date).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </td>
                      <td className="p-4">
                        {appointment.user_profiles?.first_name}{" "}
                        {appointment.user_profiles?.last_name}
                      </td>
                      <td className="p-4">
                        <div>{appointment.user_profiles?.email}</div>
                        <div>{appointment.user_profiles?.phone}</div>
                      </td>
                      <td className="p-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${getStatusColor(
                            appointment.status
                          )}`}
                        >
                          {appointment.status}
                        </span>
                      </td>
                      <td className="p-4 truncate max-w-[200px]">
                        {appointment.notes || "No notes"}
                      </td>
                      <td className="p-4">
                        <div className="flex space-x-2">
                          <Select
                            defaultValue={appointment.status}
                            onValueChange={(value) =>
                              updateAppointmentStatus(appointment.id, value)
                            }
                          >
                            <SelectTrigger className="w-[120px]">
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="scheduled">Scheduled</SelectItem>
                              <SelectItem value="completed">Completed</SelectItem>
                              <SelectItem value="cancelled">Cancelled</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AdminAppointments;
