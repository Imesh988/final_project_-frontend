import { useState, useEffect } from "react";
import axios from "../api/axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';


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

        setErrors({});
        
        const newErrors = {};
        
        if (!form.city ) {
            newErrors.city = 'City is required';
        }
        
        if (!form.address ) {
            newErrors.address = 'Address is required';
        }
        
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        createLocation();
    };

    return (
        <div className="card-mb-4">
            <div className="card-heard">
                <h2>Create Location</h2>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-md-12">
                        <div className="mb-4">
                            <input type="text"
                                name="city"
                                className={`form-control ${errors.city ? 'is-invalid' : ''}`}
                                placeholder="Enter the city"
                                value={form.city}
                                onChange={handleInputChange}
                            />
                             {errors.city && <div className="invalid-feedback">{errors.city}</div>}
                        </div>

                        <div className="mb-4">
                            <input type="text"
                                name="address"
                                className={`form-control ${errors.address ? 'is-invalid' : ''}`}
                                placeholder="Enter the address"
                                value={form.address}
                                onChange={handleInputChange}
                            />
                             {errors.address && <div className="invalid-feedback">{errors.address}</div>}
                        </div>
                        <div className="mb-4">
                            <button type="submit" className="btn btn-primary">
                                Add the Location
                            </button>
                        </div>
                    </div>
                </div>
            </form>
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
        setSelectedLocation(prev => ({
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
                        <h5 className="modal-title">Update Location</h5>
                        <button
                            type="button"
                            className="btn-close"
                            onClick={() => setShowModal(false)}
                        ></button>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="mb-4">
                                <input type="text"
                                    name="city"
                                    className="form-control"
                                    placeholder="Enter the city"
                                    value={selectedLocation.city}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="mb-4">
                                <input type="text"
                                    name="address"
                                    className="form-control"
                                    placeholder="Enter the address"
                                    value={selectedLocation.address}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="mb-4">
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={() => updateLocation(selectedLocation)}
                                >
                                    Update Location
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

function SaveLocation() {
    const [location, setLocation] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const [form, setForm] = useState({
        city: "",
        address: ""
    })

    const [selectedLocation, setSelectedLocation] = useState({
        _id: "",
        city: "",
        address: ""
    });

    const openUpdateModal = (location) => {
        setSelectedLocation(location);
        setShowModal(true);
    }

    const fetchLocation = async (req, res) => {
        try {
            const response = await axios.get('/location/getAll');
            setLocation(response.data?.location || [])
        } catch (error) {
            console.error("Error fetching Location:", error);
            setLocation([]);
        }
    }

    const createLocation = async () => {
        try {
            await axios.post("/location/create", form);
            fetchLocation();
            setForm({
                city: "",
                address: ""
            });
            alert("Location Add Sucessfull !!");
        } catch (error) {
            console.error("Error creating location :", error?.response || error);
        }
    };

    const deleteLocation = async (id) => {
        if (window.confirm("Are you sure you want to delete this location?")) {
            try {
                await axios.delete(`/location/delete/${id}`);
                fetchLocation();
                alert("Location Deleted Successfully !!");
            } catch (error) {
                console.error("Error deleting location:", error);
                alert("Failed to delete location");
            }
        }

    };

    const updateLocation = async () => {
        try {
            await axios.put(`/location/update/${selectedLocation._id}`, selectedLocation);
            setShowModal(false);
            fetchLocation();
            alert("Location Updated Successfully !!");
        } catch (error) {
            console.error("Error updating location:", error);
            alert("Failed to update location");

        }
    }


    const AllLocationTable = () => {
        if (location.length === 0) {
            return <div>Location Not Found</div>

        }

        return (
            <div className="card">
                <div className="card-header">
                    <h2>All Location</h2>
                </div>
                <div className="card-body">
                    <table className="table table-hover align-middle mb-0">
                        <thead className="bg-light">
                            <tr>
                                <th>City</th>
                                <th>Address</th>
                                <td>Action</td>
                            </tr>
                        </thead>
                        <tbody>
                            {location.map((loc) => (
                                <tr key={loc._id}>
                                    <td>{loc.city}</td>
                                    <td>{loc.address}</td>
                                    <td className="text-end">
                                        <button
                                            onClick={() => openUpdateModal(loc)}
                                            className="btn btn-outline-warning btn-sm me-2"
                                        >
                                            <i className="bi bi-pencil-square me-1"></i>Update
                                        </button>
                                        <button
                                            onClick={() => deleteLocation(loc._id)}
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
        )
    }

    useEffect(() => {
        fetchLocation();
    }, []);


    return (
        <div className="conatiner mb-4">
            <CreateLocation
                form={form}
                setForm={setForm}
                createLocation={createLocation}
            />
            <AllLocationTable />
            <UpdateLocationModal
                showModal={showModal}
                setShowModal={setShowModal}
                selectedLocation={selectedLocation}
                setSelectedLocation={setSelectedLocation}
                updateLocation={updateLocation}
            />
        </div>
    )

}

export default SaveLocation;

