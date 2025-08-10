import { useState, useEffect } from 'react';
import axios from '../api/axios';

const EmployeeLoader = ({ onEmployeeSelect }) => {
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState('');

  useEffect(() => {
    const fetchEmployees = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get('/employee/getAll');
        setEmployees(Array.isArray(response.data?.employees) ? response.data.employees : []);
      } catch (err) {
        setError('Failed to load employees');
        console.error('Error fetching employees:', err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchEmployees();
  }, []);

  const handleEmployeeChange = (e) => {
    const employeeId = e.target.value;
    setSelectedEmployee(employeeId);
    
    if (employeeId && onEmployeeSelect) {
      const selected = employees.find(emp => emp._id === employeeId);
      onEmployeeSelect(selected);
    } else {
      onEmployeeSelect(null);
    }
  };

  return (
    <div className="form-group">
      <label>Select Employee:</label>
      <select
        className="employee-select"
        value={selectedEmployee}
        onChange={handleEmployeeChange}
        disabled={isLoading}
      >
        <option value="">--- Select Employee ---</option>
        {employees.map((employee) => (
          <option key={employee._id} value={employee._id}>
            {employee.username} ({employee.whathappNo || 'No WhatsApp'})
          </option>
        ))}
      </select>
      {isLoading && <div className="loading">Loading employees...</div>}
      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default EmployeeLoader;