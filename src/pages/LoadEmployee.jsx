import { useEffect, useState } from "react";
import axios from "../api/axios";

function LoadEmp() {
    const [employees, setEmployees] = useState([]);
    const [filterEmployees, setFilterEmployees] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [Error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');


    const fetchEmployees = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get('/employee/getAll');
            const employeesData = Array.isArray(response.data?.employees)
                ? response.data.employees
                : [];
            setEmployees(employeesData);
            setFilterEmployees(employeesData);
        } catch (error) {
            console.error('Error fetching employees:', error);
            setError('Failed to load employees');


        } finally {
            setIsLoading(false); // Moved setIsLoading to finally block
        }

    }

    useEffect(() => {
        fetchEmployees();
    }, []);

    useEffect(() => {
        if (!searchTerm.trim()) {
            setFilterEmployees(employees);
            return;
        }
        const term = searchTerm.toLowerCase();
        const filtered = employees.filter((employee) => {
            return (
                employee.username.toLowerCase().includes(term) ||
                employee.description.toLowerCase().includes(term) ||
                employee.location_id?.city.toLowerCase().includes(term)
            )
        });

        setFilterEmployees(filtered);
    }, [searchTerm, employees]);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    }

    return (
        <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
                <h3>All Employees</h3>
                <div className="col-md-4">
                    <div className="input-group">
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
                </div>
            </div>
            <div className="card-body">
                {isLoading ? (
                    <div className="text-center py-4">
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                ) : Error ? (
                    <div className="alert alert-danger" role="alert">
                        {Error}
                    </div>
                ) : (
                    <>
                        {searchTerm && (
                            <p className="text-muted">
                                Showing {filterEmployees.length} of {employees.length} employees
                            </p>
                        )}
                        <table className="table table-hover align-middle mb-0">
                            <thead className="bg-light">
                                <tr>
                                    <th>Username</th>
                                    <th>Full Name</th>
                                    <th>Description</th>
                                    <th>WhatsApp No</th>
                                    <th>City</th>
                                    <th>Working Location</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filterEmployees.length > 0 ? (
                                    filterEmployees.map((employee) => (
                                        <tr key={employee._id}>
                                            <td>{employee.username}</td>
                                            <td>{employee.full_name}</td>
                                            <td>{employee.description}</td>
                                            <td>{employee.whathappNo}</td>
                                            <td>{employee.city}</td>
                                            <td>{employee.location_id?.city || "N/A"}</td>
                                           
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="7" className="text-center py-4">
                                            No employees found
                                            {searchTerm && ` matching "${searchTerm}"`}
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </>
                )}
            </div>
        </div>
    );
}


export default LoadEmp;