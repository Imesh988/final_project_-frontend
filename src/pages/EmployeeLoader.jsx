import { useState, useEffect } from 'react';
import axios from '../api/axios';

const EmployeeLoader = ({ onSelect, selectedId, error }) => {
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      setIsLoading(true);
      setFetchError(null);
      try {
        const response = await axios.get('/employee/getAll');
        setEmployees(Array.isArray(response.data?.employees) ? response.data.employees : []);
      } catch (err) {
        setFetchError('Failed to load employees');
        console.error('Error fetching employees:', err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchEmployees();
  }, []);

  const handleChange = (e) => {
    const employeeId = e.target.value;
    onSelect && onSelect(employeeId);
  };

  return (
    <div className="form-group">
      <label>Select Employee:</label>
      <select
        className={`form-control ${error ? 'is-invalid' : ''}`}
        value={selectedId}
        onChange={handleChange}
        disabled={isLoading}
      >
        <option value="">--- Select Employee ---</option>
        {employees.map((employee) => (
          <option key={employee._id} value={employee._id}>
            {employee.username} 
          </option>
        ))}
      </select>
      {isLoading && <div className="loading">Loading employees...</div>}
      {fetchError && <div className="text-danger">{fetchError}</div>}
      {error && <div className="invalid-feedback d-block">{error}</div>}
    </div>
  );
};

export default EmployeeLoader;
