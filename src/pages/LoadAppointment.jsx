import { useEffect, useState } from "react";
import axios from "../api/axios";
import { Link } from "react-router-dom";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useNavigate } from 'react-router-dom';
import '../style/LoadAppointment.css';

const SearchComponent = (
  { searchTerm,
    setSearchTerm,
    searchCategory,
    setSearchCategory,
    searchDate,
    setSearchDate,
    searchTime,
    setSearchTime,

    onSearch }
) => {
  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchTerm, searchCategory, searchDate, searchTime);
  };

  return (
    <div className="col-12 p-4">
      <div className="card shadow-sm search-component-card">
        <div className="card-body">
          <h5 className="card-title mb-3 text-white">Find Appointments</h5>
          <form className="d-flex flex-column flex-md-row gap-2" role="search" onSubmit={handleSearch}>
            <div className="flex-grow-1">
              <input
                className="form-control"
                type="search"
                placeholder="Search appointments by keyword..."
                aria-label="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div style={{ maxWidth: '180px' }}>
              <select
                className="custom-select form-select"
                value={searchCategory}
                onChange={(e) => setSearchCategory(e.target.value)}
              >
                <option value="username">Username</option>
                <option value="category">Category</option>
                <option value="employee">Employee</option>
                <option value="location">Location</option>
                <option value="date">Date</option>
                <option value="time">Time</option>
              </select>

            </div>

            {searchCategory === 'date' && (
              <div style={{ maxWidth: '180px' }}>
                <input
                  className="form-control"
                  type="date"
                  value={searchDate}
                  onChange={(e) => setSearchDate(e.target.value)}
                />
              </div>
            )}

            {searchCategory === 'time' && (
              <div style={{ maxWidth: '180px' }}>
                <input
                  className="form-control"
                  type="time"
                  value={searchTime}
                  onChange={(e) => setSearchTime(e.target.value)}
                />
              </div>
            )}

            <div>
              <button className="btn btn-primary w-100" type="submit">
                <i className="bi bi-search"></i>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};


function LoadAppointment() {
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchCategory, setSearchCategory] = useState('username');
  const [searchDate, setSearchDate] = useState('');
  const [searchTime, setSearchTime] = useState('');
  const navigate = useNavigate();

  const fetchAppointment = async () => {
    try {
      const response = await axios.get('/appointment/getAll');

      if (response.data && Array.isArray(response.data.appointments)) {
        const sentAppointmentIds = JSON.parse(localStorage.getItem('whatsAppSentAppointmentIds') || '[]');

        const updatedAppointments = response.data.appointments.map(app => ({
          ...app,
          isWhatsAppSent: sentAppointmentIds.includes(app._id)
        }));
        setAppointments(updatedAppointments);
        setFilteredAppointments(updatedAppointments);
      } else {
        console.warn("Invalid response format:", response.data);
        setAppointments([]);
        setFilteredAppointments([]);
      }
    } catch (error) {
      setError('Failed to load appointments');
      console.error('Error fetching appointments:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteAppointment = async (id) => {
    try {
      if (window.confirm("Are you sure you want to delete this appointment?")) {
        await axios.delete(`/appointment/delete/${id}`);
        const sentAppointmentIds = JSON.parse(localStorage.getItem('whatsAppSentAppointmentIds') || '[]');
        const updatedSentIds = sentAppointmentIds.filter(sentId => sentId !== id);
        localStorage.setItem('whatsAppSentAppointmentIds', JSON.stringify(updatedSentIds));

        fetchAppointment();
      }

    } catch (error) {
      console.error("Error deleting appointment:", error);
      alert("Failed to delete appointment");
    }
  }

  const filterAppointments = (term, category, date, time) => {
    if (!term.trim() && !date && !time) {
      setFilteredAppointments(appointments);
      return;
    }

    const filtered = appointments.filter(appointment => {

      
     if (term.trim() && category !== 'date' && category !== 'time') {
        const searchValue = term.toLowerCase();
        
        switch (category) {
          case 'username':
            return appointment.username?.toLowerCase().includes(searchValue);
          case 'category':
            return appointment.category?.toLowerCase().includes(searchValue);
          case 'employee':
            const employeeName = appointment.employee_id?.username || '';
            return employeeName.toLowerCase().includes(searchValue);
          case 'location':
            const locationName = appointment.location_id?.city || '';
            return locationName.toLowerCase().includes(searchValue);
          default:
            return true;
        }
      }
      
      if (category === 'date' && date) {
        const appointmentDate = new Date(appointment.date).toISOString().split('T')[0];
        return appointmentDate === date;
      }
      
      if (category === 'time' && time) {
        const normalizeTime = (timeStr) => {
          return timeStr.split(':').slice(0, 2).join(':');
        };
        
        return normalizeTime(appointment.time) === normalizeTime(time);
      }
      
      return true;
    });

    setFilteredAppointments(filtered);
  };

  const handleSearch = (term, category, date, time) => {
    filterAppointments(term, category, date, time);
  };



  useEffect(() => {
    fetchAppointment();
  }, []);

  useEffect(() => {
    setFilteredAppointments(appointments);
  }, [appointments]);


  const handleWhatsAppClick = (appointmentId, username, tp) => {
    const phoneNumberToSend = String(tp).startsWith('0') ? String(tp) : '0' + String(tp);
    navigate(`/whatsapp/${encodeURIComponent(username)}/${encodeURIComponent(phoneNumberToSend)}/${appointmentId}`);
  };

  return (
    <div className="load-appointment-container">
      <SearchComponent
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        searchCategory={searchCategory}
        setSearchCategory={setSearchCategory}
        searchDate={searchDate}
        setSearchDate={setSearchDate}
        searchTime={searchTime}
          setSearchTime={setSearchTime}
        onSearch={handleSearch}
      />
      <div className="card mb-4 appointments-main-card">

        <div className="card-body">
          {loading && <p>Loading appointments...</p>}
          {error && <p className="text-danger">{error}</p>}
          {!loading && !error && filteredAppointments.length === 0 && <p>No appointments found.</p>}

          {!loading && !error && filteredAppointments.length > 0 && (

            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-5 g-4">
              {filteredAppointments.map((appointment) => (
                <div className="col appointment-card" key={appointment._id}>
                  <div className="card h-100 shadow-sm">
                    <div className="card-body">
                      <h5 className="card-title">
                        {appointment.username}
                      </h5>
                      <p className="card-text mb-1"><strong>Date:</strong> {new Date(appointment.date).toLocaleDateString()}</p>
                      <p className="card-text mb-1"><strong>Time:</strong> {appointment.time}</p>
                      <p className="card-text mb-1"><strong>Category:</strong> {appointment.category}</p>
                      <p className="card-text mb-1"><strong>Telephone Number:</strong> {appointment.tp}</p>
                      <p className="card-text mb-1"><strong>Employee:</strong> {appointment.employee_id?.username || ' (N/A)'}</p>
                      <p className="card-text mb-3"><strong>Location:</strong> {appointment.location_id?.city || ' (N/A)'}</p>

                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <button
                            onClick={() => handleWhatsAppClick(appointment._id, appointment.username, appointment.tp)}
                            className="btn btn-outline-success btn-sm me-2"
                            title="Send WhatsApp"
                          >
                            <i className="bi bi-whatsapp"></i>
                          </button>
                          <button
                            onClick={() => deleteAppointment(appointment._id)}
                            className="btn btn-outline-danger btn-sm"
                            title="Delete"
                          >
                            <i className="bi bi-trash3-fill"></i>
                          </button>
                        </div>
                        {appointment.isWhatsAppSent && (
                          <i className="bi bi-check-circle-fill text-success fs-4"></i>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default LoadAppointment;