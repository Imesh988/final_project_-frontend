import { useState, useEffect } from "react";
import axios from "../api/axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import EmployeeLoader from "./EmployeeLoader";
import LocationLoad from "./LocationLoad";
import Navbar from "../layout/Naviation";


  const UpdateAppointmentModal = ({
    showModal,
    setShowModal,
    selectedAppointment,
    setSelectedAppointment,
    updateAppointment
  }) => {
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setSelectedAppointment(prev => ({
        ...prev,
        [name]: value
      }));
    };

    if (!selectedAppointment) return null;

    return (
      <div className={`modal fade ${showModal ? 'show d-block' : ''}`} style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Update Appointment</h5>
              <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="row">
                  <div className="col-md-12">
                    <div className="mb-3">
                      <label className="form-label">Username</label>
                      <input
                        type="text"
                        name="username"
                        className="form-control"
                        placeholder="Username"
                        value={selectedAppointment.username || ''}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Date</label>
                      <input
                        type="date"
                        name="date"
                        className="form-control"
                        placeholder="Date"
                        value={selectedAppointment.date || ''}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Time</label>
                      <input
                        type="time"
                        name="time"
                        className="form-control"
                        placeholder="Time"
                        value={selectedAppointment.time || ''}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-group mb-3">
                      <select
                        name="category"
                        className="form-control"
                        value={selectedAppointment.category || ''}
                        onChange={handleInputChange}
                      >
                        <option value="">Select Category</option>
                        <option value="Wosh">Body Wosh</option>
                        <option value="Full">Full Service</option>
                        <option value="Mechanical">Mechanical</option>
                        <option value="MechanicalWosh">Mechanical and Body Wosh</option>
                        <option value="MechanicalFull">Mechanical and Full Service</option>
                      </select>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Telephone</label>
                      <input
                        type="number"
                        name="tp"
                        className="form-control"
                        placeholder="Telephone"
                        value={selectedAppointment.tp || ''}
                        onChange={handleInputChange}
                      />
                    </div>
                    
                    <div className="form-group mb-3">
                      <EmployeeLoader
                        onSelect={(employeeId) => {
                          setSelectedAppointment(prev => ({
                            ...prev,
                            employeeId: employeeId
                          }));
                        }}
                        selectedId={selectedAppointment.employeeId}
                      />
                    </div>

                    <div className="form-group mb-3">
                      <LocationLoad
                        onSelect={(locationId) => {
                          setSelectedAppointment(prev => ({
                            ...prev,
                            locationId: locationId
                          }));
                        }}
                        selectedId={selectedAppointment.locationId}
                      />
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                Close
              </button>
              <button type="button" className="btn btn-primary" onClick={updateAppointment}>
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

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

  const [showModal, setShowModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState({
    _id: '',
    username: '',
    date: '',
    time: '',
    category: '',
    tp: '',
    city: '',
    employeeId: '',
    locationId: ''
  });


  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("/appointment/getAll");
      setAppointments(response.data?.appointments || []);
    } catch (error) {
      console.error("Error fetching appointments:", error);
      setAppointments([]);
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
        fetchData();
      } else {
        throw new Error(response.data.msg || "Failed to create appointment");
      }
    } catch (error) {
      console.error("Submission error:", error);
      console.error("Error details:", error.response?.data);
      let errorMessage = error.response?.data?.message ||
        error.message ||
        "Failed to create appointment. Please try again.";
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



  const deleteAppointment = async (id) => {
    if (window.confirm("Are you sure you want to delete this appointment?")) {
      try {
        await axios.delete(`/appointment/delete/${id}`);
        fetchData();
      } catch (error) {
        console.error("Error deleting appointment:", error);
        alert("Failed to delete appointment");
      }
    }
  }



  const updateAppointment = async () => {
    try {
      const updateData = {
        username: selectedAppointment.username,
        date: selectedAppointment.date,
        time: selectedAppointment.time,
        category: selectedAppointment.category,
        tp: selectedAppointment.tp,
        employee_id: selectedAppointment.employeeId,
        location_id: selectedAppointment.locationId
      };

      await axios.put(`/appointment/update/${selectedAppointment._id}`, updateData);
      setShowModal(false);
      
      alert("Appointment Updated Successfully !!");
      fetchData();
    } catch (error) {
      console.error("Error updating appointment:", error);
      alert("Failed to update appointment");
    }
  }

  const openUpdateModal = (appointment) => {
    setSelectedAppointment({
      _id: appointment._id,
      username: appointment.username,
      date: appointment.date,
      time: appointment.time,
      category: appointment.category,
      tp: appointment.tp,
      city: appointment.location_id?.city || '',
      employeeId: appointment.employee_id?._id || '',
      locationId: appointment.location_id?._id || ''
    });
    setShowModal(true);
  };

  const AllAppointmentTable = () => {
    return (
      <div className="card mb-4">
        <Navbar />
        <div className="card-header">
          <h2>All Appointments</h2>
        </div>
        <div className="card-body">
          <table className="table table-hover align-middle mb-0">
            <thead className="bg-light">
              <tr>
                <th>Username</th>
                <th>Date</th>
                <th>Time</th>
                <th>Category</th>
                <th>Telephone Number</th>
                <th>Employee</th>
                <th>Location</th>
                <td className="text-end">Action</td>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment) => (
                <tr key={appointment._id}>
                  <td>{appointment.username}</td>
                  <td>{new Date(appointment.date).toLocaleDateString()}</td>
                  <td>{appointment.time}</td>
                  <td>{appointment.category}</td>
                  <td>{appointment.tp}</td>
                  <td>
                    {appointment.employee_id?.username || 'N/A'}
                  </td>
                  <td>
                    {appointment.location_id?.city || 'N/A'}
                  </td>
                  <td className="text-end">
                    <button
                      onClick={() => openUpdateModal(appointment)}
                      className="btn btn-outline-warning btn-sm me-2"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => deleteAppointment(appointment._id)}
                      className="btn btn-outline-danger btn-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container mt-4">
      <AllAppointmentTable />
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
                <option value="Full">Full Service</option>
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

      <UpdateAppointmentModal
        showModal={showModal}
        setShowModal={setShowModal}
        selectedAppointment={selectedAppointment}
        setSelectedAppointment={setSelectedAppointment}
        updateAppointment={updateAppointment}
      />

    </div>
  );
}

export default Appointment;