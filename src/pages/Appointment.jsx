import { useState, useEffect } from "react";
import axios from "../api/axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import EmployeeLoader from "./EmployeeLoader";
import LocationLoad from "./LocationLoad";
import Navbar from "../layout/Naviation";
import LoadEmp from "./LoadEmployee.jsx";
import "../style/Appointment.css";

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
                    <label className="form-label">Category</label>
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
                    <label className="form-label">Employee</label>
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
                    <label className="form-label">Location</label>
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
  const [lastCreatedAppointment, setLastCreatedAppointment] = useState(null);
  const [customerId, setCustomerId] = useState(null);
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
    employeeId: '',
    locationId: ''
  });

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
    if (formData.telephone.length !== 10) newErrors.telephone = "Telephone must be 10 digits";
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
        customer_id: customerId,
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
        setLastCreatedAppointment(response.data.appointment);
        setFormData({
          userName: "",
          date: "",
          time: "",
          category: "",
          telephone: "",
          employeeId: "",
          locationId: ""
        });
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
    if (errors.employeeId) {
      setErrors((prev) => ({ ...prev, employeeId: "" }));
    }
  };

  const handleLocationSelect = (locationId) => {
    setFormData((prev) => ({ ...prev, locationId }));
    if (errors.locationId) {
      setErrors((prev) => ({ ...prev, locationId: "" }));
    }
  };

  const deleteAppointment = async (id) => {
    if (window.confirm("Are you sure you want to delete this appointment?")) {
      try {
        await axios.delete(`/appointment/delete/${id}`);
        setLastCreatedAppointment(null);
        alert("Appointment deleted successfully!");
      } catch (error) {
        console.error("Error deleting appointment:", error);
        alert("Failed to delete appointment");
      }
    }
  }

  const updateAppointment = async () => {
    if (!selectedAppointment) return;

    try {
      console.log("Starting update for appointment:", selectedAppointment._id);

      const updateData = {
        username: selectedAppointment.username,
        date: selectedAppointment.date,
        time: selectedAppointment.time,
        category: selectedAppointment.category,
        tp: selectedAppointment.tp,
        employee_id: selectedAppointment.employeeId,
        location_id: selectedAppointment.locationId
      };

      console.log("Update data:", updateData);

      const response = await axios.put(`/appointment/update/${selectedAppointment._id}`, updateData);

      console.log("Update successful, response:", response.data);

      if (response.data && response.data.appointment) {
        setLastCreatedAppointment(response.data.appointment);
        setShowModal(false);
        alert("Appointment Updated Successfully !!");
      } else {
        throw new Error("Update failed or server did not return updated data.");
      }

    } catch (error) {
      console.error("Error updating appointment:", error);
      console.error("Error response:", error.response);
      alert("Failed to update appointment: " + (error.response?.data?.msg || error.message));
    }
  }

  const openUpdateModal = (appointment) => {
    setSelectedAppointment({
      _id: appointment._id,
      username: appointment.username,
      date: appointment.date.split('T')[0],
      time: appointment.time,
      category: appointment.category,
      tp: appointment.tp,
      employeeId: appointment.employee_id?._id || appointment.employee_id,
      locationId: appointment.location_id?._id || appointment.location_id
    });
    setShowModal(true);
  };
  useEffect(() => {
    const loadUser = () => {
      try {
        const storedUserData = localStorage.getItem('userData');
        if (storedUserData) {
          const userData = JSON.parse(storedUserData);
          setCustomerId(userData._id || userData.id);
          setFormData(prevFormData => ({
            ...prevFormData,
            userName: userData.username || ""
          }));
        }
      } catch (err) {
        console.error("Failed to load userData from localStorage", err);
      }
    };

    // called when storage changes in other tabs/windows
    const onStorage = (e) => {
      if (!e || e.key === 'userData') {
        loadUser();
      }
    };

    loadUser(); // initial load
    window.addEventListener('user-updated', loadUser); // custom event from CustomerDetails
    window.addEventListener('storage', onStorage); // cross-tab updates

    return () => {
      window.removeEventListener('user-updated', loadUser);
      window.removeEventListener('storage', onStorage);
    };
  }, []);

  const LastAppointmentDetails = ({ appointment, onUpdate, onDelete }) => {
    if (!appointment) {
      return null;
    }

    console.log("Appointment details:", appointment);

    return (
      <div className="card mb-4 shadow">
        <div className="card-header bg-success text-white">
          <h3>Appointment Created Successfully!</h3>
        </div>
        <div className="card-body">
          <p><strong>Username:</strong> {appointment.username}</p>
          <p><strong>Date:</strong> {new Date(appointment.date).toLocaleDateString()}</p>
          <p><strong>Time:</strong> {appointment.time}</p>
          <p><strong>Category:</strong> {appointment.category}</p>
          <p><strong>Telephone:</strong> {appointment.tp}</p>
          <p><strong>Assigned Employee: </strong>
            {appointment.employee_id?.username || 'N/A'}
          </p>
          <p><strong>Location: </strong>
            {appointment.location_id?.city || 'N/A'}
          </p>
          <p>
            <button
              onClick={() => onUpdate(appointment)}
              className="btn btn-outline-warning btn-sm me-2"
            >
              Update
            </button>
            <button
              onClick={() => onDelete(appointment._id)}
              className="btn btn-outline-danger btn-sm"
            >
              Delete
            </button>
          </p>
        </div>
      </div>
    );
  };

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <div className="mb-4">
          <LoadEmp />
        </div>

        <LastAppointmentDetails
          appointment={lastCreatedAppointment}
          onUpdate={openUpdateModal}
          onDelete={deleteAppointment}
        />

        <div className="card p-3 shadow">
          <div className="card-header">
            <h3 className="card-title text-center">Add Appointment</h3>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group mb-3">
                <label className="form-label">Username</label>
                <input
                  type="text"
                  name="userName"
                  className={`form-control ${errors.userName ? "is-invalid" : ""}`}
                  placeholder="User Name"
                  value={formData.userName}
                  onChange={handleChange}
                  readOnly
                />
                {errors.userName && <div className="invalid-feedback">{errors.userName}</div>}
              </div>

              <div className="form-group mb-3">
                <label className="form-label">Date</label>
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
                <label className="form-label">Time</label>
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
                <label className="form-label">Category</label>
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
                <label className="form-label">Telephone</label>
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
                <label className="form-label">Employee</label>
                <EmployeeLoader
                  onSelect={handleEmployeeSelect}
                  selectedId={formData.employeeId}
                  error={errors.employeeId}
                />
                {errors.employeeId && <div className="invalid-feedback d-block">{errors.employeeId}</div>}
              </div>

              <div className="form-group mb-3">
                <label className="form-label">Location</label>
                <LocationLoad
                  onSelect={handleLocationSelect}
                  selectedId={formData.locationId}
                  error={errors.locationId}
                />
                {errors.locationId && <div className="invalid-feedback d-block">{errors.locationId}</div>}
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
    </>
  );
}

export default Appointment;