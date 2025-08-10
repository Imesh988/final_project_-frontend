import React, { useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import {
  validateSriLankanPhone,
  generateWhatsAppLink
} from './utils';
import '../style/WhatsAppSender.css';
// import EmployeeLoader from '../pages/EmployeeLoader';

const WhatsAppSender = () => {
  const [formData, setFormData] = useState({
    name: '',
    messageType: '',
    phone: '',
    message: ''
  });
  const [status, setStatus] = useState('');
  // const [selectedEmployeeID, setSelectedEmployeeID] = useState(null);
  // const [employees, setEmployees] = useState([]);

  const fetchData = async () => {
    try {
      const [regRes, empRes] = await Promise.all([
        axios.get('/employee/getAll'),
      ]);
      setEmployees(Array.isArray(regRes.data) ? regRes.data : []);
    } catch (error) {
      console.error('Error fetching data:', error);
      alert('Failed to fetch data. Please try again.');
    }
  }

  const options = [
    { value: 'greeting', label: 'Greeting' },
    { value: 'reminder', label: 'Reminder' },
    { value: 'notification', label: 'Notification' },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateSriLankanPhone(formData.phone)) {
      setStatus('Invalid phone number. Please use 94771234567 or 0771234567 format');
      return;
    }

    if (!formData.message.trim()) {
      setStatus('Please enter a message');
      return;
    }



    const selectedOption = options.find(option => option.value === formData.messageType);

    const whatsappLink = generateWhatsAppLink(
      formData.phone,
      `Hello ${formData.name},\n${formData.messageType},\n${formData.message}`
    );

    window.open(whatsappLink, '_blank');
    setStatus('WhatsApp message ready! Check your phone!');
    setFormData({ name: '', messageType: '', phone: '', message: '' });
  };

  return (
    <div className="whatsapp-container">
      <h2><FaWhatsapp /> Send WhatsApp Message</h2>

      {status && <div className="status">{status}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Recipient's name"
          />
        </div>

        {/* <EmployeeLoader /> */}

        <div className="form-group">
          <label>Message Type:</label>
          <select
            name="messageType"
            value={formData.messageType}
            onChange={handleChange}
            required
            className="message-type-select"
          >
            <option value="">-- Select message type --</option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Phone Number:</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="94771234567 or 0771234567"
            required
          />
        </div>

        

        <div className="form-group">
          <label>Message:</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="4"
            placeholder="Type your message here..."
            required
          />
        </div>

        <button type="submit" className="send-button">
          <FaWhatsapp /> Send via WhatsApp
        </button>
      </form>
    </div>
  );
};

export default WhatsAppSender;