import { useState, useEffect } from "react";
import axios from "../api/axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import EmployeeLoader from "./EmployeeLoader";
import LocationLoad from "./LocationLoad";

function Appointment() {
  const [appointments, setAppointments] = useState([]);
  const [formData, setFormData] = useState({
    userName: "",
    date: "",
    time: "",
    category: "",
    telephone: "",
    employeeId: "",
    locationId: ""
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const appointmentsRes = await axios.get("/appointment/getAll");
      setAppointments(appointmentsRes.data || []);
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Failed to fetch appointments. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.userName.trim()) newErrors.userName = "Username is required";
    if (!formData.date) newErrors.date = "Date is required";
    if (!formData.time) newErrors.time = "Time is required";
    if (!formData.category) newErrors.category = "Category is required";
    if (!formData.telephone) newErrors.telephone = "Telephone is required";
    if (!formData.employeeId) newErrors.employeeId = "Employee is required";
    if (!formData.locationId) newErrors.locationId = "Location is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validateForm()) return;

  setIsLoading(true);
  try {
    const appointmentData = {
      username: formData.userName.trim(), 
      date: formData.date,
      time: formData.time,
      category: formData.category,
      tp: formData.telephone, 
      employee_id: formData.employeeId, 
      location_id: formData.locationId  
    };

    console.log("Submitting data:", appointmentData);

    const response = await axios.post("/appointment/create", appointmentData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    console.log("Server response:", response.data);

    if (response.data.msg === 'Appointment created successfully') {
      alert("Appointment created successfully");
      setFormData({
        userName: "",
        date: "",
        time: "",
        category: "",
        telephone: "",
        employeeId: "",
        locationId: ""
      });
      // Refresh appointments
      fetchData();
    } else {
      throw new Error(response.data.msg || "Failed to create appointment");
    }
  } catch (error) {
    console.error("Submission error:", error);
    console.error("Error details:", error.response?.data);
    alert(errorMessage);
  } finally {
    setIsLoading(false);
  }
};

  const handleEmployeeSelect = (employeeId) => {
    setFormData((prev) => ({ ...prev, employeeId }));
  };

  const handleLocationSelect = (locationId) => {
    setFormData((prev) => ({ ...prev, locationId }));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container mt-4">
      <div className="card p-3 shadow">
        <div className="card-header">
          <h3 className="card-title text-center">Add Appointment</h3>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
              <input
                type="text"
                name="userName"
                className={`form-control ${errors.userName ? "is-invalid" : ""}`}
                placeholder="User Name"
                value={formData.userName}
                onChange={handleChange}
              />
              {errors.userName && <div className="invalid-feedback">{errors.userName}</div>}
            </div>

            <div className="form-group mb-3">
              <input
                type="date"
                name="date"
                className={`form-control ${errors.date ? "is-invalid" : ""}`}
                value={formData.date}
                onChange={handleChange}
              />
              {errors.date && <div className="invalid-feedback">{errors.date}</div>}
            </div>

            <div className="form-group mb-3">
              <input
                type="time"
                name="time"
                className={`form-control ${errors.time ? "is-invalid" : ""}`}
                value={formData.time}
                onChange={handleChange}
              />
              {errors.time && <div className="invalid-feedback">{errors.time}</div>}
            </div>

            <div className="form-group mb-3">
              <select
                name="category"
                className={`form-control ${errors.category ? "is-invalid" : ""}`}
                value={formData.category}
                onChange={handleChange}
              >
                <option value="">Select Category</option>
                <option value="Wosh">Body Wosh</option>
                <option value="Full">Full Service </option>
                <option value="Mechanical">Mechanical</option>
                <option value="MechanicalWosh">Mechanical and Body Wosh</option>
                <option value="MechanicalFull">Mechanical and Full Service</option>
              </select>
              {errors.category && <div className="invalid-feedback">{errors.category}</div>}
            </div>

            <div className="form-group mb-3">
              <input
                type="tel"
                name="telephone"
                className={`form-control ${errors.telephone ? "is-invalid" : ""}`}
                placeholder="Telephone"
                value={formData.telephone}
                onChange={handleChange}
              />
              {errors.telephone && <div className="invalid-feedback">{errors.telephone}</div>}
            </div>

            <div className="form-group mb-3">
              <EmployeeLoader
                onSelect={handleEmployeeSelect}
                selectedId={formData.employeeId}
                error={errors.employeeId}
              />
            </div>

            <div className="form-group mb-3">
              <LocationLoad
                onSelect={handleLocationSelect}
                selectedId={formData.locationId}
                error={errors.locationId}
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : "Add Appointment"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Appointment;
