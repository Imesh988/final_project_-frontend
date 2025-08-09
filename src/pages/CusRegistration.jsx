import { useState, useEffect } from "react";
import axios from "../api/axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

const CreateCustomerForm = ({ form, setForm, createCustomer }) => {
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
    
    // Clear error when user starts typing
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
    <div className="card mb-4">
      <div className="card-header">
        <h3>Create New Customer</h3>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-12">
              <div className="mb-3">
                <label className="form-label">NIC</label>
                <input
                  type="text"
                  name="nic"
                  className={`form-control ${errors.nic ? 'is-invalid' : ''}`}
                  placeholder="NIC"
                  value={form.nic}
                  onChange={handleInputChange}
                />
                {errors.nic && <div className="invalid-feedback">{errors.nic}</div>}
              </div>
              <div className="mb-3">
                <label className="form-label">Username</label>
                <input
                  type="text"
                  name="username"
                  className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                  placeholder="Username"
                  value={form.username}
                  onChange={handleInputChange}
                />
                {errors.username && <div className="invalid-feedback">{errors.username}</div>}
              </div>
              <div className="mb-3">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  name="full_name"
                  className={`form-control ${errors.full_name ? 'is-invalid' : ''}`}
                  placeholder="Full Name"
                  value={form.full_name}
                  onChange={handleInputChange}
                />
                {errors.full_name && <div className="invalid-feedback">{errors.full_name}</div>}
              </div>
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  name="password"
                  className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                  placeholder="Password"
                  value={form.password}
                  onChange={handleInputChange}
                />
                {errors.password && <div className="invalid-feedback">{errors.password}</div>}
              </div>
              <div className="mb-3">
                <label className="form-label">Telephone Number</label>
                <input
                  type="number"
                  name="tp"
                  className={`form-control ${errors.tp ? 'is-invalid' : ''}`}
                  placeholder="Telephone Number"
                  value={form.tp}
                  onChange={handleInputChange}
                />
                {errors.tp && <div className="invalid-feedback">{errors.tp}</div>}
              </div>
              <div className="mb-3">
                <label className="form-label">WhatsApp Number</label>
                <input
                  type="number"
                  name="whathappNo"
                  className={`form-control ${errors.whathappNo ? 'is-invalid' : ''}`}
                  placeholder="WhatsApp No"
                  value={form.whathappNo}
                  onChange={handleInputChange}
                />
                {errors.whathappNo && <div className="invalid-feedback">{errors.whathappNo}</div>}
              </div>
              <div className="mb-3">
                <label className="form-label">City</label>
                <input
                  type="text"
                  name="city"
                  className={`form-control ${errors.city ? 'is-invalid' : ''}`}
                  placeholder="City"
                  value={form.city}
                  onChange={handleInputChange}
                />
                {errors.city && <div className="invalid-feedback">{errors.city}</div>}
              </div>
              <div className="mb-3">
                <button type="submit" className="btn btn-primary">
                  Create Customer
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
  updateCustomer
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
      className={`modal fade ${showModal ? 'show d-block' : ''}`}
      style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Update Customer</h5>
            <button
              type="button"
              className="btn-close"
              onClick={() => setShowModal(false)}
            ></button>
          </div>
          <div className="modal-body">
            <form >
              <div className="row">
                <div className="col-md-12">
                  <div className="mb-3">
                    <label className="form-label">NIC</label>
                    {/* <input
                  type="text"
                  name="nic"
                  className="form-control"
                  placeholder="NIC"
                  value={selectedCustomer.nic}
                  onChange={handleInputChange}
                /> */}

                  </div>
                  <div className="mb-3">
                    <label className="form-label">Username</label>
                    <input
                      type="text"
                      name="username"
                      className="form-control"
                      placeholder="Username"
                      value={selectedCustomer.username}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Full Name</label>
                    <input
                      type="text"
                      name="full_name"
                      className="form-control"
                      placeholder="Full Name"
                      value={selectedCustomer.full_name}
                      onChange={handleInputChange}
                    />
                  </div>
                  {/* <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  placeholder="Password"
                  value={selectedCustomer.password}
                  onChange={handleInputChange}
                />
              </div> */}

                  <div className="mb-3">
                    <label className="form-label">Telephone Number </label>
                    <input
                      type="number"
                      name="tp"
                      className="form-control"
                      placeholder="Telephone Number"
                      value={selectedCustomer.tp}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">WhatsApp Number</label>
                    <input
                      type="Number"
                      name="whathappNo"
                      className="form-control"
                      placeholder="WhatsApp No"
                      value={selectedCustomer.whathappNo}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">City</label>
                    <input
                      type="text"
                      name="city"
                      className="form-control"
                      placeholder="City"
                      value={selectedCustomer.city}
                      onChange={handleInputChange}
                    />
                  </div>

                </div>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={updateCustomer}
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function CusRegistration() {
  const [customers, setCustomers] = useState([]);
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
    try {
      await axios.post("/customer/create", form);
      setForm({
        nic: '',
        username: '',
        full_name: '',
        password: '',
        tp: '',
        whathappNo: '',
        city: ''
      })
      alert("Customer Created Successfully");
      fetchCustomers();
    } catch (error) {
      console.error("Error creating customer:", error?.response || error);
     
      if (error.response?.data?.message === 'Customer already exists') {
        alert("Employee with this NIC already exists");
      } else {
        alert("Failed to create employee");

      }
    }
  }

  const fetchCustomers = async () => {
    try {
      const response = await axios.get('/customer/getAll');
      setCustomers(response.data?.customers || []);
    } catch (error) {
      console.error("Error fetching customers:", error);
      setCustomers([]);

    }
  }

  const updateCustomer = async () => {
    try {
      await axios.put(`/customer/update/${selectedCustomer._id}`, selectedCustomer);
      setShowModal(false);
      fetchCustomers();
      alert("Customer Updated Successfully !!");
    } catch (error) {
      console.error("Error updating customer:", error);
      alert("Failed to update customer");

    }
  }

  const deleteCustomer = async (id) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      try {
        await axios.delete(`/customer/delete/${id}`);
        fetchCustomers();
      } catch (error) {
        console.error("Error deleting customer:", error);
        alert("Failed to delete customer");
      }
    }
  }

  const AllCustomerTable = () => {
    if (customers.length === 0) return <p>No customers found</p>;

    return (
      <div className="card">
        <div className="card-header">
          <h2>All Customers</h2>
        </div>
        <div className="card-body">
          <table className="table table-hover align-middle mb-0">
            <thead className="bg-light">
              <tr>
                <th>Username</th>
                <th>Full Name</th>
                <th>Telephone Number</th>
                <th>WhatsApp Number</th>
                <th>City</th>
                <td className="text-end">Action</td>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr key={customer._id}>
                  <td>{customer.username}</td>
                  <td>{customer.full_name}</td>
                  <td>{customer.tp}</td>
                  <td>{customer.whathappNo}</td>
                  <td>{customer.city}</td>
                  <td className="text-end">
                    <button
                      onClick={() => openUpdateModal(customer)}
                      className="btn btn-outline-warning btn-sm me-2"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => deleteCustomer(customer._id)}
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
    )
  }


  useEffect(() => {
    fetchCustomers();
  }, []);


  return (
    <div className="container mb-4">
      <CreateCustomerForm
        form={form}
        setForm={setForm}
        createCustomer={createCustomer}
      />
      <AllCustomerTable />
      <UpdateCustomerModal
        showModal={showModal}
        setShowModal={setShowModal}
        selectedCustomer={selectedCustomer}
        setSelectedCustomer={setSelectedCustomer}
        updateCustomer={updateCustomer}
      />
    </div>
  )

}

export default CusRegistration;