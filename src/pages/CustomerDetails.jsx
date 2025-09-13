import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Navbar from "../layout/Naviation";

const UpdateCustomerModal = ({
  showModal,
  setShowModal,
  selectedCustomer,
  setSelectedCustomer,
  updateCustomer,
  isLoading
}) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedCustomer(prev => ({ ...prev, [name]: value }));
  };

  if (!selectedCustomer) return null;

  return (
    <div className={`modal fade ${showModal ? "show d-block" : ""}`}
         style={{ backgroundColor: "rgba(0,0,0,0.7)" }}>
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content border border-dark shadow-lg rounded-3">
          <div className="modal-header bg-dark text-white rounded-top-3">
            <h5 className="modal-title fw-bold d-flex align-items-center">
              <i className="bi bi-pencil-square me-2"></i> Edit Customer
            </h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={() => setShowModal(false)}
            />
          </div>

          <div className="modal-body p-4 bg-white">
            <form>
              <div className="row g-3">
                {/* NIC */}
                <div className="col-md-6">
                  <label className="form-label fw-bold">
                    <i className="bi bi-card-checklist me-2"></i> NIC
                  </label>
                  <input type="text" name="nic"
                         className="form-control border-dark"
                         value={selectedCustomer.nic}
                         readOnly />
                  <small className="text-muted">NIC cannot be changed</small>
                </div>

                {/* Username */}
                <div className="col-md-6">
                  <label className="form-label fw-bold">
                    <i className="bi bi-person-circle me-2"></i> Username
                  </label>
                  <input type="text" name="username"
                         className="form-control border-dark"
                         value={selectedCustomer.username}
                         onChange={handleInputChange} />
                </div>

                {/* Telephone */}
                <div className="col-md-6">
                  <label className="form-label fw-bold">
                    <i className="bi bi-telephone me-2"></i> Telephone
                  </label>
                  <input type="number" name="tp"
                         className="form-control border-dark"
                         value={selectedCustomer.tp}
                         onChange={handleInputChange} />
                </div>

                {/* WhatsApp */}
                <div className="col-md-6">
                  <label className="form-label fw-bold">
                    <i className="bi bi-whatsapp me-2"></i> WhatsApp
                  </label>
                  <input type="number" name="whatsappNo"
                         className="form-control border-dark"
                         value={selectedCustomer.whatsappNo}
                         onChange={handleInputChange} />
                </div>

                {/* City */}
                <div className="col-md-6">
                  <label className="form-label fw-bold">
                    <i className="bi bi-geo-alt me-2"></i> City
                  </label>
                  <input type="text" name="city"
                         className="form-control border-dark"
                         value={selectedCustomer.city}
                         onChange={handleInputChange} />
                </div>
              </div>
            </form>
          </div>

          <div className="modal-footer bg-light border-top border-dark rounded-bottom-3">
            <button type="button"
                    className="btn btn-outline-secondary btn-sm me-2 rounded-pill px-3"
                    onClick={() => setShowModal(false)}>
              <i className="bi bi-x-circle me-2"></i> Close
            </button>
            <button type="button"
                    className="btn btn-dark px-4"
                    onClick={updateCustomer}
                    disabled={isLoading}>
              {isLoading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                  Updating...
                </>
              ) : (
                <>
                  <i className="bi bi-check-circle me-2"></i> Save Changes
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const UpdateAppointmentModal = ({ showModal, setShowModal, selectedAppointment, updateAppointment }) => {
  const [formData, setFormData] = useState(selectedAppointment || {});
  useEffect(() => { setFormData(selectedAppointment || {}); }, [selectedAppointment]);
  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSave = () => {
    updateAppointment(selectedAppointment._id, formData);
    setShowModal(false);
  };

  if (!selectedAppointment) return null;

  return (
    <div className={`modal fade ${showModal ? "show d-block" : ""}`}
         style={{ backgroundColor: "rgba(0,0,0,0.7)" }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-body">
            <input type="date" name="date" value={formData.date || ''} onChange={handleChange} />
            <input type="time" name="time" value={formData.time || ''} onChange={handleChange} />
            {/* add other fields here */}
          </div>
          <div className="modal-footer">
            <button onClick={() => setShowModal(false)}>Close</button>
            <button onClick={handleSave}>Save changes</button>
          </div>
        </div>
      </div>
    </div>
  );
};

function CustomerDetails() {
  const [customer, setCustomer] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // appointment modal state
  const [showApptModal, setShowApptModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const navigate = useNavigate();

  const openUpdateAppointmentModal = (appt) => {
    setSelectedAppointment(appt);
    setShowApptModal(true);
  };

  const updateCustomer = async () => {
    if (!selectedCustomer) return;
    try {
      setIsLoading(true);
      const res = await axios.put(`/customer/update/${selectedCustomer._id}`, selectedCustomer);
      const updated = res.data.customer || res.data;
      alert("Customer Updated Successfully !!");
      setCustomer(updated);
      setShowModal(false);
    } catch (error) {
      console.error("Error updating customer:", error.response?.data || error);
      alert(error.response?.data?.msg || "Failed to update customer");
    } finally {
      setIsLoading(false);
    }
  };

  const deleteCustomer = async (id) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      try {
        await axios.delete(`/customer/delete/${id}`);
        alert("Customer Deleted Successfully !!");
        localStorage.removeItem("userData");
        navigate("/cusLogin");
      } catch (error) {
        console.error("Error deleting customer:", error);
        alert("Failed to delete customer");
      }
    }
  };

  const updateAppointment = async (apptId, updatedData) => {
    try {
      await axios.put(`/appointment/update/${apptId}`, updatedData);
      setAppointments(prev => prev.map(a => (a._id === apptId ? { ...a, ...updatedData } : a)));
      alert('Appointment updated successfully!');
    } catch (error) {
      console.error('Error updating appointment:', error.response?.data || error);
      alert(error.response?.data?.msg || 'Failed to update appointment');
    }
  };

  const deleteAppointment = async (apptId) => {
    if (window.confirm('Are you sure you want to delete this appointment?')) {
      try {
        await axios.delete(`/appointment/delete/${apptId}`);
        setAppointments(prev => prev.filter(a => a._id !== apptId));
        alert('Appointment deleted successfully!');
      } catch (error) {
        console.error('Error deleting appointment:', error.response?.data || error);
        alert(error.response?.data?.msg || 'Failed to delete appointment');
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const userData = JSON.parse(localStorage.getItem("userData"));
      if (!userData?.id) {
        navigate("/cusLogin");
        return;
      }
      try {
        setLoading(true);
        const custRes = await axios.get(`http://localhost:5000/customer/${userData.id}`);
        setCustomer(custRes.data.customer || custRes.data);

        const apptRes = await axios.get(`http://localhost:5000/appointment/cusAppointment/${userData.id}`);
        setAppointments(apptRes.data.appointments || apptRes.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [navigate]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <Navbar />
      <div className="container py-4">
        {/* Customer card */}
        <div className="card shadow-lg border-0 mb-4" style={{ borderRadius: '1rem' }}>
          <div className="card-header bg-dark text-white text-center">
            <h3 className="mb-0">
              <i className="bi bi-person-circle me-2"></i>
            </h3>
          </div>
          <div className="card-body bg-white text-dark">
            <p><strong>Username:</strong> {customer?.username}</p>
            <p><strong>NIC:</strong> {customer?.nic}</p>
            <p><strong>Phone:</strong> {customer?.tp}</p>
            <p><strong>City:</strong> {customer?.city}</p>

            <button className="btn btn-outline-warning btn-sm me-2 rounded-pill px-3"
                    onClick={() => { setSelectedCustomer(customer); setShowModal(true); }}>
              <i className="bi bi-pencil-square me-2"></i> Edit
            </button>
            <button className="btn btn-outline-danger btn-sm me-2 rounded-pill px-3"
                    onClick={() => deleteCustomer(customer?._id)}>
              <i className="bi bi-trash3-fill me-2"></i> Delete Account
            </button>
          </div>
        </div>

        {/* Appointments */}
        <div className="card shadow-lg border-0" style={{ borderRadius: '1rem' }}>
          <div className="card-header bg-secondary text-white">
            <h5 className="mb-0">Your Appointments</h5>
          </div>
          <div className="card-body bg-white text-dark">
            {appointments.length === 0 ? (
              <p>No appointments found</p>
            ) : (
              <ul className="list-group">
                {appointments.map(appt => (
                  <li key={appt._id} className="list-group-item d-flex justify-content-between align-items-center">
                    <div>
                      <span>{appt.date} - {appt.time}</span> |{" "}
                      <span>{appt.employee_id?.username || 'N/A'}</span> |{" "}
                      <span>{appt.category}</span> |{" "}
                      <span>{appt.location_id?.city || 'N/A'}</span>
                    </div>
                    <div>
                      <button className="btn btn-sm btn-outline-primary me-2"
                              onClick={() => openUpdateAppointmentModal(appt)}>
                        <i className="bi bi-pencil"></i>
                      </button>
                      <button className="btn btn-sm btn-outline-danger"
                              onClick={() => deleteAppointment(appt._id)}>
                        <i className="bi bi-trash"></i>
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
      <UpdateCustomerModal
        showModal={showModal}
        setShowModal={setShowModal}
        selectedCustomer={selectedCustomer}
        setSelectedCustomer={setSelectedCustomer}
        updateCustomer={updateCustomer}
        isLoading={isLoading}
      />

      <UpdateAppointmentModal
        showModal={showApptModal}
        setShowModal={setShowApptModal}
        selectedAppointment={selectedAppointment}
        updateAppointment={updateAppointment}
      />
    </div>
  );
}

export default CustomerDetails;
