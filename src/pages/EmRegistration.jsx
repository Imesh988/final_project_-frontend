import { useState, useEffect } from "react";
import axios from "../api/axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import '../style/Employee.css';
import LocationLoad from "./LocationLoad";
import Navbar from "../layout/Naviation.jsx";

const CreateEmployeeForm = ({ form, setForm, createEmployee }) => {
  const [errors, setErrors] = useState({});

  const validateNIC = (nic) => {
    const oldNicPattern = /^[0-9]{9}[VXvx]?$/;
    const newNicPattern = /^[0-9]{12}$/;
    return oldNicPattern.test(nic) || newNicPattern.test(nic);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    // Clear error when typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleLocationSelect = (locationId) => {
    setForm({ ...form, location_id: locationId });
    if (errors.location) {
      setErrors({ ...errors, location: '' });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.nic) {
      setErrors({ ...errors, nic: 'NIC is required' });
      return;
    }

    if (!validateNIC(form.nic)) {
      setErrors({ ...errors, nic: 'Please enter a valid NIC number (9 digits with V/X or 12 digits)' });
      return;
    }

    // Validate Password
    if (!form.password) {
      setErrors({ ...errors, password: 'Password is required' });
      return;
    }

    if (form.password.length < 6) {
      setErrors({ ...errors, password: 'Password must be at least 6 characters long' });
      return;
    }

    createEmployee();
  };

  return (
    <div className="card mb-4 employee-card shadow-sm rounded-3">
      <div className="card-header bg-dark text-white d-flex align-items-center justify-content-center">
        <h3 className="mb-0">
          <i className="bi bi-person-badge me-2"></i> Employee
        </h3>
      </div>
      <div className="card-body p-4">
        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-12">
              <label className="form-label fw-semibold">
                <i className="bi bi-person-badge me-2"></i> NIC
              </label>
              <input
                type="text"
                name="nic"
                className={`form-control ${errors.nic ? "is-invalid" : ""}`}
                placeholder="123456789V or 200012345678"
                value={form.nic}
                onChange={handleInputChange}
              />
              {errors.nic && <div className="invalid-feedback">{errors.nic}</div>}
            </div>

            <div className="col-12 col-md-6">
              <label className="form-label fw-semibold">
                <i className="bi bi-person me-2"></i> Username
              </label>
              <input
                type="text"
                name="username"
                className="form-control"
                placeholder="Username"
                value={form.username}
                onChange={handleInputChange}
              />
            </div>

            <div className="col-12 col-md-6">
              <label className="form-label fw-semibold">
                <i className="bi bi-lock me-2"></i> Password
              </label>
              <input
                type="password"
                name="password"
                className={`form-control ${errors.password ? "is-invalid" : ""}`}
                placeholder="Password"
                value={form.password}
                onChange={handleInputChange}
              />
            </div>

            <div className="col-12">
              <label className="form-label fw-semibold">
                <i className="bi bi-person-lines-fill me-2"></i> Full Name
              </label>
              <input
                type="text"
                name="full_name"
                className="form-control"
                placeholder="Full Name"
                value={form.full_name}
                onChange={handleInputChange}
              />
            </div>

            <div className="col-12">
              <label className="form-label fw-semibold">
                <i className="bi bi-card-text me-2"></i> Description
              </label>
              <input
                type="text"
                name="description"
                className="form-control"
                placeholder="Description"
                value={form.description}
                onChange={handleInputChange}
              />
            </div>

            <div className="col-12 col-md-6">
              <label className="form-label fw-semibold">
                <i className="bi bi-whatsapp me-2"></i> WhatsApp Number
              </label>
              <input
                type="number"
                name="whathappNo"
                className="form-control"
                placeholder="WhatsApp No"
                value={form.whathappNo}
                onChange={handleInputChange}
              />
            </div>

            <div className="col-12 col-md-6">
              <label className="form-label fw-semibold">
                <i className="bi bi-geo-alt me-2"></i> City
              </label>
              <input
                type="text"
                name="city"
                className="form-control"
                placeholder="City"
                value={form.city}
                onChange={handleInputChange}
              />
            </div>

            <div className="col-12">
              <LocationLoad
                onSelect={handleLocationSelect}
                selectedId={form.location_id}
                error={errors.location}
              />
            </div>

            <div className="col-12 mt-3 d-grid">
              <button
                type="submit"
                className="btn btn-dark btn-lg d-flex align-items-center justify-content-center gap-2"
              >
                <i className="bi bi-plus-circle"></i> Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

const UpdateEmployeeModal = ({
  showModal,
  setShowModal,
  selectedEmployee,
  setSelectedEmployee,
  updateEmployee
}) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedEmployee(prev => ({
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
          <div className="modal-header bg-dark text-white">
            <h5 className="modal-title">Update Employee</h5>
            <button
              type="button"
              className="btn-close"
              onClick={() => setShowModal(false)}
            ></button>
          </div>
          <div className="modal-body">
            <form>
              <div className="mb-3">
                <label className="form-label">
                  <i className="bi bi-person me-2"></i>
                  Username</label>
                <input
                  type="text"
                  name="username"
                  className="form-control"
                  value={selectedEmployee.username}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">
                  <i className="bi bi-person-lines-fill me-2"></i>
                  Full Name</label>
                <input
                  type="text"
                  name="full_name"
                  className="form-control"
                  value={selectedEmployee.full_name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">
                  <i className="bi bi-card-text me-2"></i>
                  Description</label>
                <input
                  type="text"
                  name="description"
                  className="form-control"
                  value={selectedEmployee.description}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">
                  <i className="bi bi-whatsapp me-2"></i>
                  WhatsApp</label>
                <input
                  type="text"
                  name="whathappNo"
                  className="form-control"
                  value={selectedEmployee.whathappNo}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">
                  <i className="bi bi-geo-alt me-2"></i>
                  City</label>
                <input
                  type="text"
                  name="city"
                  className="form-control"
                  value={selectedEmployee.city}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group mb-3">
                <LocationLoad
                  onSelect={(locationId) => {
                    setSelectedEmployee(prev => ({
                      ...prev,
                      location_id: locationId
                    }));
                  }}
                  selectedId={selectedEmployee.locationId}
                />
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary d-flex align-items-center "
              onClick={() => setShowModal(false)}
            >
              <i className="bi bi-x-circle me-2"></i> Close
            </button>
            <button
              type="button"
              className="btn btn-dark d-flex align-items-center"
              onClick={updateEmployee}
            >
              <i className="bi bi-save2 me-2"></i> Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

function EmRegistration() {
  const [employees, setEmployees] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    nic: "",
    username: "",
    password: "",
    full_name: "",
    description: "",
    whathappNo: "",
    city: "",
    location_id: ""
  });
  const [selectedEmployee, setSelectedEmployee] = useState({
    _id: "",
    nic: "",
    username: "",
    password: "",
    full_name: "",
    description: "",
    whathappNo: "",
    city: "",
    location_id: ""
  });

  const fetchEmployees = async () => {
    try {
      const response = await axios.get("/employee/getAll");
      setEmployees(response.data?.employees || []);
    } catch (error) {
      console.error("Error fetching employees:", error);
      setEmployees([]);
    }
  };

  const createEmployee = async () => {
    try {
      console.log("Form data:", form);
      const response = await axios.post("/employee/create", form);
      fetchEmployees();
      setForm({
        nic: "",
        username: "",
        password: "",
        full_name: "",
        description: "",
        whathappNo: "",
        city: "",
        location_id: ""
      });
      alert("Employee created successfully");
    } catch (error) {
      console.error("Error creating employee:", error?.response || error);

      if (error.response?.data?.message === 'Employee already exists') {
        alert("Employee with this NIC already exists");
      } else {
        alert("Failed to create employee");
      }
    }
  };

  const deleteEmployee = async (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      try {
        await axios.delete(`/employee/delete/${id}`);
        fetchEmployees();
      } catch (error) {
        console.error("Error deleting employee:", error);
        alert("Failed to delete employee");
      }
    }
  };

  const updateEmployee = async () => {
    try {
      await axios.put(`/employee/update/${selectedEmployee._id}`, selectedEmployee);
      setShowModal(false);
      fetchEmployees();
    } catch (error) {
      console.error("Error updating employee:", error);
      alert('Update failed');
    }
  };

  const openUpdateModal = (employee) => {
    setSelectedEmployee(employee);
    setShowModal(true);
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const AllEmployeesTable = () => {
    const [filterEmployees, setFilterEmployees] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
      if (!searchTerm.trim()) {
        setFilterEmployees(employees);
        return;
      }
      const term = searchTerm.toLowerCase();
      const filtered = employees.filter((employee) => {
        return (
          employee.username?.toLowerCase().includes(term) ||
          employee.description?.toLowerCase().includes(term) ||
          employee.location_id?.city?.toLowerCase().includes(term)
        );
      });

      setFilterEmployees(filtered);
    }, [searchTerm, employees]);

    const handleSearchChange = (e) => {
      setSearchTerm(e.target.value);
    };

    if (isLoading) {
      return (
        <div className="card">
          <div className="card-body text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-2">Loading employees...</p>
          </div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="card">
          <div className="card-body text-center text-danger">
            <i className="bi bi-exclamation-triangle-fill me-2"></i>
            {error}
            <button className="btn btn-sm btn-outline-primary ms-3" onClick={fetchEmployees}>
              Try Again
            </button>
          </div>
        </div>
      );
    }

    if (!Array.isArray(employees) || employees.length === 0) {
      return (
        <div className="card">
          <div className="card-body text-center">
            <i className="bi bi-people display-4 text-muted"></i>
            <p className="mt-3 text-muted">No employees found</p>
          </div>
        </div>
      );
    }

    return (
      <div className="card">
        <div className="card-header d-flex align-items-center bg-dark text-white">
          <i className="bi bi-people-fill me-2"></i>
          <h3 className="mb-0">All Employees</h3>
        </div>
        <div className="input-group p-3 border-bottom">
          <span className="input-group-text">
            <i className="bi bi-search"></i>
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Search by username, description, or location"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="bg-light">
                <tr>
                  <th><i className="bi bi-person-circle me-2"></i> Username</th>
                  <th><i className="bi bi-person-badge me-2"></i> Full Name</th>
                  <th><i className="bi bi-card-text me-2"></i> Description</th>
                  <th><i className="bi bi-whatsapp me-2"></i> WhatsApp No</th>
                  <th><i className="bi bi-geo-alt me-2"></i> City</th>
                  <th><i className="bi bi-building me-2"></i> Location</th>
                  <th className="text-end"><i className="bi bi-gear me-2"></i> Actions</th>
                </tr>
              </thead>
              <tbody>
                {filterEmployees.map((employee) => (
                  <tr key={employee._id}>
                    <td>{employee.username}</td>
                    <td>{employee.full_name}</td>
                    <td>{employee.description}</td>
                    <td>{employee.whathappNo}</td>
                    <td>{employee.city}</td>
                    <td>
                      {employee.location_id?.city || 'N/A'}
                    </td>
                    <td className="text-end">
                      <button
                        onClick={() => openUpdateModal(employee)}
                        className="btn btn-outline-warning btn-sm me-2"
                      >
                        <i className="bi bi-pencil-square me-1"></i>
                      </button>
                      <button
                        onClick={() => deleteEmployee(employee._id)}
                        className="btn btn-outline-danger btn-sm"
                      >
                        <i className="bi bi-trash me-1"></i>
                      </button>
                    </td>
                  </tr>
                ))}
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
      <div className="container mt-4">
        <CreateEmployeeForm
          form={form}
          setForm={setForm}
          createEmployee={createEmployee}
        />
        <AllEmployeesTable />
        <UpdateEmployeeModal
          showModal={showModal}
          setShowModal={setShowModal}
          selectedEmployee={selectedEmployee}
          setSelectedEmployee={setSelectedEmployee}
          updateEmployee={updateEmployee}
        />
      </div>
    </div>
  );
}

export default EmRegistration;