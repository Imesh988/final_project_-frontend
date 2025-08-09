import { useState, useEffect } from "react";
import axios from "../api/axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import '../style/Employee.css';

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
    <div className="card mb-4">
      <div className="card-header">
        <h3>Create New Employee</h3>
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
                  placeholder="Employee NIC (e.g. 123456789V or 200012345678)"
                  value={form.nic}
                  onChange={handleInputChange}
                />
                {errors.nic && (
                  <div className="invalid-feedback">
                    {errors.nic}
                  </div>
                )}
              </div>
              <div className="mb-3">
                <label className="form-label">Username</label>
                <input
                  type="text"
                  name="username"
                  className="form-control"
                  placeholder="Username"
                  value={form.username}
                  onChange={handleInputChange}
                />
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
              </div>
              <div className="mb-3">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  name="full_name"
                  className="form-control"
                  placeholder="Full Name"
                  value={form.full_name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Description</label>
                <input
                  type="text"
                  name="description"
                  className="form-control"
                  placeholder="description"
                  value={form.description}
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
                  value={form.whathappNo}
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
                  value={form.city}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <button type="submit" className="btn btn-primary">
                  Create Employee
                </button>
              </div>
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
          <div className="modal-header">
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
                <label className="form-label">Username</label>
                <input
                  type="text"
                  name="username"
                  className="form-control"
                  value={selectedEmployee.username}
                  onChange={handleInputChange}
                />
              </div>
              {/* <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  value={selectedEmployee.password}
                  onChange={handleInputChange}
                />
              </div> */}
              <div className="mb-3">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  name="full_name"
                  className="form-control"
                  value={selectedEmployee.full_name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Telephone</label>
                <input
                  type="text"
                  name="description"
                  className="form-control"
                  value={selectedEmployee.description}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">WhatsApp</label>
                <input
                  type="text"
                  name="whathappNo"
                  className="form-control"
                  value={selectedEmployee.whathappNo}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">City</label>
                <input
                  type="text"
                  name="city"
                  className="form-control"
                  value={selectedEmployee.city}
                  onChange={handleInputChange}
                />
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
              onClick={updateEmployee}
            >
              Save Changes
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
    city: ""
  });
  const [selectedEmployee, setSelectedEmployee] = useState({
    _id: "",
    nic: "",
    username: "",
    password: "",
    full_name: "",
    description: "",
    whathappNo: "",
    city: ""
  });

  const openUpdateModal = (employee) => {
    setSelectedEmployee(employee);
    setShowModal(true);
  };

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
      await axios.post("/employee/create", form);
      fetchEmployees();
      setForm({
        nic: "",
        username: "",
        password: "",
        full_name: "",
        description: "",
        whathappNo: "",
        city: ""
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

  useEffect(() => {
    fetchEmployees();
  }, []);

  const AllEmployeesTable = () => {
    if (!Array.isArray(employees)) {
      return <div>Loading...</div>;
    }
    if (employees.length === 0) {
      return <div>No employees found.</div>;
    }

    return (
      <div className="card">
        <div className="card-header">
          <h3>All Employees</h3>
        </div>
        <div className="card-body">
          <table className="table table-hover align-middle mb-0">
            <thead className="bg-light">
              <tr>
                <th>Username</th>
                <th>Full Name</th>
                <th>Description</th>
                <th>WhatsApp No</th>
                <th>City</th>
                <th className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr key={employee._id}>
                  <td>{employee.username}</td>
                  <td>{employee.full_name}</td>
                  <td>{employee.description}</td>
                  <td>{employee.whathappNo}</td>
                  <td>{employee.city}</td>
                  <td className="text-end">
                    <button
                      onClick={() => openUpdateModal(employee)}
                      className="btn btn-outline-warning btn-sm me-2"
                    >
                      <i className="bi bi-pencil-square me-1"></i>Update
                    </button>
                    <button
                      onClick={() => deleteEmployee(employee._id)}
                      className="btn btn-outline-danger btn-sm"
                    >
                      <i className="bi bi-trash me-1"></i>Delete
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

  return (
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
  );
}

export default EmRegistration;