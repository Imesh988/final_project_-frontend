import { useState, useEffect } from "react";
import axios from "../api/axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import "../style/location.css";
import Navbar from "../layout/Naviation.jsx";

const CreateLocation = ({ form, setForm, createLocation }) => {
    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });

        if (errors[name]) {
            setErrors({ ...errors, [name]: '' });
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = {};

        if (!form.city) newErrors.city = 'City is required';
        if (!form.address) newErrors.address = 'Address is required';

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        createLocation();
    };

    return (
        <div className="card mb-4 shadow-sm location-card">
            <div className="card-header bg-dark text-white d-flex align-items-center">
                <i className="bi bi-geo-alt-fill me-2"></i>
                <h5 className="mb-0">Add Location</h5>
            </div>
            <div className="card-body">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3 input-icon-wrapper">
                        <i className="bi bi-building input-icon"> </i>
                        City
                        <input
                            type="text"
                            name="city"
                            className={`form-control ${errors.city ? 'is-invalid' : ''} input-with-icon`}
                            placeholder="Enter the city"
                            value={form.city}
                            onChange={handleInputChange}
                        />
                        {errors.city && <div className="invalid-feedback">{errors.city}</div>}
                    </div>

                    <div className="mb-3 input-icon-wrapper">
                        <i className="bi bi-geo-alt input-icon"> </i>
                        Address
                        <textarea
                            name="address"
                            className={`form-control ${errors.address ? 'is-invalid' : ''} input-with-icon`}
                            placeholder="Enter the address"
                            value={form.address}
                            onChange={handleInputChange}
                        ></textarea>
                        {errors.address && <div className="invalid-feedback">{errors.address}</div>}
                    </div>

                    <button type="submit" className="btn btn-dark w-100 d-flex align-items-center justify-content-center">
                        <i className="bi bi-plus-circle me-2"></i>  Location
                    </button>
                </form>
            </div>
        </div>
    );
};

const UpdateLocationModal = ({
    showModal,
    setShowModal,
    selectedLocation,
    setSelectedLocation,
    updateLocation
}) => {
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSelectedLocation(prev => ({ ...prev, [name]: value }));
    };

    if (!selectedLocation) return null;

    return (
        <div className={`modal fade ${showModal ? 'show d-block' : ''}`} style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content modal-dark">
                    <div className="modal-header bg-secondary text-white">
                        <h5 className="modal-title"><i className="bi bi-pencil-square me-2"></i>Update Location</h5>
                    </div>
                    <div className="modal-body">
                        <div className="mb-3 input-icon-wrapper">
                            <i className="bi bi-building input-icon"></i>

                            <input
                                type="text"
                                name="city"
                                className="form-control input-with-icon"
                                placeholder="Enter the city"
                                value={selectedLocation.city}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="mb-3 input-icon-wrapper">
                            <i className="bi bi-geo-alt input-icon"></i>

                            <textarea
                                name="address"
                                className="form-control input-with-icon"
                                placeholder="Enter the address"
                                value={selectedLocation.address}
                                onChange={handleInputChange}
                            ></textarea>
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
                                onClick={() => updateLocation(selectedLocation)}
                            >
                                <i className="bi bi-save me-2"></i> Update Location
                            </button>
                        </div>

                       

                    </div>
                </div>
            </div>
        </div>
    );
};

function SaveLocation() {
    const [location, setLocation] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [form, setForm] = useState({ city: "", address: "" });
    const [selectedLocation, setSelectedLocation] = useState({ _id: "", city: "", address: "" });

    const fetchLocation = async () => {
        try {
            const response = await axios.get('/location/getAll');
            setLocation(response.data?.location || []);
        } catch (error) {
            console.error("Error fetching locations:", error);
            setLocation([]);
        }
    };

    const createLocation = async () => {
        try {
            await axios.post("/location/create", form);
            fetchLocation();
            setForm({ city: "", address: "" });
            alert("Location Added Successfully!");
        } catch (error) {
            console.error("Error creating location:", error);
        }
    };

    const deleteLocation = async (id) => {
        if (window.confirm("Are you sure you want to delete this location?")) {
            try {
                await axios.delete(`/location/delete/${id}`);
                fetchLocation();
                alert("Location Deleted Successfully!");
            } catch (error) {
                console.error("Error deleting location:", error);
            }
        }
    };

    const updateLocation = async () => {
        try {
            await axios.put(`/location/update/${selectedLocation._id}`, selectedLocation);
            setShowModal(false);
            fetchLocation();
            alert("Location Updated Successfully!");
        } catch (error) {
            console.error("Error updating location:", error);
        }
    };

    const openUpdateModal = (loc) => {
        setSelectedLocation(loc);
        setShowModal(true);
    };

    useEffect(() => {
        fetchLocation();
    }, []);

    return (
        <div>
            <Navbar />
            <div className="container my-4">
                <CreateLocation form={form} setForm={setForm} createLocation={createLocation} />

                <div className="card shadow-sm mb-4">
                    <div className="card-header bg-dark text-white">
                        <h5 className="mb-0"><i className="bi bi-geo-alt-fill me-2"></i>All Locations</h5>
                    </div>
                    <div className="card-body table-responsive">
                        {location.length === 0 ? (
                            <p>No locations found.</p>
                        ) : (
                            <table className="table table-hover text-white">
                                <thead className="table-light text-dark">
                                    <tr>
                                        <th><i className="bi bi-building me-1"></i>City</th>
                                        <th><i className="bi bi-geo-alt me-1"></i>Address</th>
                                        <th className="text-end"><i className="bi bi-gear me-1"></i>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {location.map(loc => (
                                        <tr key={loc._id}>
                                            <td>{loc.city}</td>
                                            <td>{loc.address}</td>
                                            <td className="text-end">
                                                <button
                                                    onClick={() => openUpdateModal(loc)}
                                                    className="btn btn-warning btn-sm me-2"
                                                >
                                                    <i className="bi bi-pencil-square"></i>
                                                </button>
                                                <button
                                                    onClick={() => deleteLocation(loc._id)}
                                                    className="btn btn-outline-danger btn-sm"
                                                >
                                                    <i className="bi bi-trash"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>

                <UpdateLocationModal
                    showModal={showModal}
                    setShowModal={setShowModal}
                    selectedLocation={selectedLocation}
                    setSelectedLocation={setSelectedLocation}
                    updateLocation={updateLocation}
                />
            </div>
        </div>
    );
}

export default SaveLocation;
