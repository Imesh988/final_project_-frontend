import { useState, useEffect } from "react";
import axios from "../api/axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap-icons/font/bootstrap-icons.css';
import "../style/Customer.css";
import Navbar from "../layout/Naviation.jsx";

const CreateCustomerForm = ({ form, setForm, createCustomer, isLoading }) => {
  const [errors, setErrors] = useState({});

  const validateNIC = (nic) => {
    const oldNicPattern = /^[0-9]{9}[VXvx]?$/;
    const newNicPattern = /^[0-9]{12}$/;
    return oldNicPattern.test(nic) || newNicPattern.test(nic);
  };

  const validatePhoneNumber = (number) => {
    const phonePattern = /^[0-9]{10}$/;
    return phonePattern.test(number);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});

    const newErrors = {};

    if (!form.nic) {
      newErrors.nic = 'NIC is required';
    } else if (!validateNIC(form.nic)) {
      newErrors.nic = 'Please enter a valid NIC number (9 digits with V/X or 12 digits)';
    }

    if (!form.username) {
      newErrors.username = 'Username is required';
    } else if (form.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters long';
    }

    if (!form.full_name) {
      newErrors.full_name = 'Full name is required';
    }

    if (!form.password) {
      newErrors.password = 'Password is required';
    }


    if (!form.password) {
      newErrors.password = 'Password is required';
    } else if (form.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
    }

    if (!form.tp) {
      newErrors.tp = 'Telephone number is required';
    } else if (!validatePhoneNumber(form.tp.toString())) {
      newErrors.tp = 'Please enter a valid 10-digit phone number';
    }

    if (form.whathappNo && !validatePhoneNumber(form.whathappNo.toString())) {
      newErrors.whathappNo = 'Please enter a valid 10-digit phone number';
    }

    if (!form.city) {
      newErrors.city = 'City is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    createCustomer();
  };

  return (
    <div className="card mb-4 shadow-lg border-0 animate__animated animate__fadeIn">
      <div className="card-header-sm bg-dark text-white py-3" style={{ backgroundColor: '#343a40' }}>
        <h3 className="mb-0 p-2">
          <div className="icon-center">
            <i className="bi bi-person-plus me-2 "></i>
            Customer
          </div>

        </h3>
      </div>
      <div className="card-body p-4">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6">
              <div className="mb-3">
                <label className="form-label fw-bold">
                  <i className="bi bi-card-checklist me-2"></i>
                  NIC
                </label>
                <input
                  type="text"
                  name="nic"
                  className={`form-control ${errors.nic ? 'is-invalid' : ''}`}
                  placeholder="Enter NIC number"
                  value={form.nic}
                  onChange={handleInputChange}
                />
                {errors.nic && <div className="invalid-feedback">{errors.nic}</div>}
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold">
                  <i className="bi bi-person-circle me-2"></i>
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                  placeholder="Enter username"
                  value={form.username}
                  onChange={handleInputChange}
                />
                {errors.username && <div className="invalid-feedback">{errors.username}</div>}
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold">
                  <i className="bi bi-person-vcard me-2"></i>
                  Full Name
                </label>
                <input
                  type="text"
                  name="full_name"
                  className={`form-control ${errors.full_name ? 'is-invalid' : ''}`}
                  placeholder="Enter full name"
                  value={form.full_name}
                  onChange={handleInputChange}
                />
                {errors.full_name && <div className="invalid-feedback">{errors.full_name}</div>}
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold">
                  <i className="bi bi-lock me-2"></i>
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                  placeholder="Enter password"
                  value={form.password}
                  onChange={handleInputChange}
                />
                {errors.password && <div className="invalid-feedback">{errors.password}</div>}
              </div>
            </div>

            <div className="col-md-6">
              <div className="mb-3">
                <label className="form-label fw-bold">
                  <i className="bi bi-telephone me-2"></i>
                  Telephone Number
                </label>
                <input
                  type="number"
                  name="tp"
                  className={`form-control ${errors.tp ? 'is-invalid' : ''}`}
                  placeholder="Enter telephone number"
                  value={form.tp}
                  onChange={handleInputChange}
                />
                {errors.tp && <div className="invalid-feedback">{errors.tp}</div>}
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold">
                  <i className="bi bi-whatsapp me-2"></i>
                  WhatsApp Number
                </label>
                <input
                  type="number"
                  name="whathappNo"
                  className={`form-control ${errors.whathappNo ? 'is-invalid' : ''}`}
                  placeholder="Enter WhatsApp number"
                  value={form.whathappNo}
                  onChange={handleInputChange}
                />
                {errors.whathappNo && <div className="invalid-feedback">{errors.whathappNo}</div>}
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold">
                  <i className="bi bi-geo-alt me-2"></i>
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  className={`form-control ${errors.city ? 'is-invalid' : ''}`}
                  placeholder="Enter city"
                  value={form.city}
                  onChange={handleInputChange}
                />
                {errors.city && <div className="invalid-feedback">{errors.city}</div>}
              </div>

              <div className="mb-3 mt-4 pt-2">
                <button
                  type="submit"
                  className="btn btn-dark btn-lg w-100 d-flex align-items-center justify-content-center"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                      Creating...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-plus-circle me-2"></i>
                      {/* Create Customer */}
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

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
    setSelectedCustomer(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div
      className={`modal fade ${showModal ? "show d-block" : ""}`}
      style={{ backgroundColor: "rgba(0,0,0,0.7)" }}
    >
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
            ></button>
          </div>

          <div className="modal-body p-4 bg-white">
            <form>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label fw-bold">
                    <i className="bi bi-card-checklist me-2"></i> NIC
                  </label>
                  <input
                    type="text"
                    name="nic"
                    className="form-control border-dark"
                    placeholder="NIC"
                    value={selectedCustomer.nic}
                    readOnly
                  />
                  <small className="text-muted">NIC cannot be changed</small>
                </div>


                <div className="col-md-6">
                  <label className="form-label fw-bold">
                    <i className="bi bi-person-circle me-2"></i> Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    className="form-control border-dark"
                    placeholder="Username"
                    value={selectedCustomer.username}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-bold">
                    <i className="bi bi-person-vcard me-2"></i> Full Name
                  </label>
                  <input
                    type="text"
                    name="full_name"
                    className="form-control border-dark"
                    placeholder="Full Name"
                    value={selectedCustomer.full_name}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-bold">
                    <i className="bi bi-telephone me-2"></i> Telephone
                  </label>
                  <input
                    type="number"
                    name="tp"
                    className="form-control border-dark"
                    placeholder="Telephone Number"
                    value={selectedCustomer.tp}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-bold">
                    <i className="bi bi-whatsapp me-2"></i> WhatsApp
                  </label>
                  <input
                    type="number"
                    name="whathappNo"
                    className="form-control border-dark"
                    placeholder="WhatsApp No"
                    value={selectedCustomer.whathappNo}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-bold">
                    <i className="bi bi-geo-alt me-2"></i> City
                  </label>
                  <input
                    type="text"
                    name="city"
                    className="form-control border-dark"
                    placeholder="City"
                    value={selectedCustomer.city}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </form>
          </div>

          <div className="modal-footer bg-light border-top border-dark rounded-bottom-3">
            <button
              type="button"
              className="btn btn-outline-dark px-4"
              onClick={() => setShowModal(false)}
            >
              <i className="bi bi-x-circle me-2"></i> Close
            </button>
            <button
              type="button"
              className="btn btn-dark px-4"
              onClick={updateCustomer}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                  ></span>
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

function CusRegistration() {
  const [lastCreatedCustomer, setLastCreatedCustomer] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    nic: '',
    username: '',
    full_name: '',
    password: '',
    tp: '',
    whathappNo: '',
    city: ''
  });

  const [selectedCustomer, setSelectedCustomer] = useState({
    _id: '',
    nic: '',
    username: '',
    full_name: '',
    password: '',
    tp: '',
    whathappNo: '',
    city: ''
  });

  const openUpdateModal = (customer) => {
    setSelectedCustomer(customer);
    setShowModal(true);
  };

  const createCustomer = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post("/customer/create", form);
      setLastCreatedCustomer(response.data.customer);
      setForm({
        nic: '',
        username: '',
        full_name: '',
        password: '',
        tp: '',
        whathappNo: '',
        city: ''
      });
      alert("Customer Created Successfully");
    } catch (error) {
      console.error("Error creating customer:", error?.response || error);
      if (error.response?.data?.message === 'Customer already exists') {
        alert("Customer with this NIC already exists");
      } else {
        alert("Failed to create customer");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const updateCustomer = async () => {
    setIsLoading(true);
    try {
      await axios.put(`/customer/update/${selectedCustomer._id}`, selectedCustomer);
      setLastCreatedCustomer(selectedCustomer);
      setShowModal(false);
      alert("Customer Updated Successfully !!");
    } catch (error) {
      console.error("Error updating customer:", error);
      alert("Failed to update customer");
    } finally {
      setIsLoading(false);
    }
  };

  const deleteCustomer = async (id) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      try {
        await axios.delete(`/customer/delete/${id}`);
        setLastCreatedCustomer(null);
      } catch (error) {
        console.error("Error deleting customer:", error);
        alert("Failed to delete customer");
      }
    }
  };

  const LastCustomerTable = () => {

    

    if (!lastCreatedCustomer) {
      return (
        <div className="card mt-4 shadow-sm border-0 animate__animated animate__fadeIn">
          <div className="card-body text-center py-5">
            <i className="bi bi-people display-4 text-muted mb-3"></i>
            <p className="text-muted mb-0">No customer has been created yet.</p>
          </div>
        </div>
      );
    }

    return (
      <div className="card mt-4 shadow-lg border-dark rounded-3 animate__animated animate__fadeInUp">
        {/* <div className="card-header bg-dark text-white py-3 rounded-top-3 d-flex align-items-center">
      <h3 className="mb-0 fw-bold">
        <i className="bi bi-person-check me-2"></i>
        Last Created Customer
      </h3>
    </div> */}

        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-dark text-white">
                <tr>
                  <th><i className="bi bi-person-circle me-1"></i> Username</th>
                  <th><i className="bi bi-person-vcard me-1"></i> Full Name</th>
                  <th><i className="bi bi-telephone me-1"></i> Telephone</th>
                  <th><i className="bi bi-whatsapp me-1"></i> WhatsApp</th>
                  <th><i className="bi bi-geo-alt me-1"></i> City</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody>
                <tr key={lastCreatedCustomer._id} className="table-light">
                  <td className="fw-bold">{lastCreatedCustomer.username}</td>
                  <td>{lastCreatedCustomer.full_name}</td>
                  <td>{lastCreatedCustomer.tp}</td>
                  <td>{lastCreatedCustomer.whathappNo || "-"}</td>
                  <td>{lastCreatedCustomer.city}</td>
                  <td className="text-end">
                    <button
                      onClick={() => openUpdateModal(lastCreatedCustomer)}
                      className="btn btn-outline-warning btn-sm me-2 rounded-pill px-3"
                    >
                      <i className="bi bi-pencil me-1 bg-warning"></i>
                    </button>
                    <button
                      onClick={() => deleteCustomer(lastCreatedCustomer._id)}
                      className="btn btn-outline-danger btn-sm rounded-pill px-3"
                    >
                      <i className="bi bi-trash me-1"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );

  };

  return (
   <div>
    <Navbar />
     <div className="container mb-4 mt-4">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <CreateCustomerForm
            form={form}
            setForm={setForm}
            createCustomer={createCustomer}
            isLoading={isLoading}
          />

          <LastCustomerTable />

          <UpdateCustomerModal
            showModal={showModal}
            setShowModal={setShowModal}
            selectedCustomer={selectedCustomer}
            setSelectedCustomer={setSelectedCustomer}
            updateCustomer={updateCustomer}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
   </div>
  );
}

export default CusRegistration;