import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Navbar from "../layout/Naviation";

// Modal for updating customer
const UpdateCustomerModal = ({
    showModal,
    setShowModal,
    selectedCustomer,
    setSelectedCustomer,
    updateCustomer,
    isLoading
}) => {
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSelectedCustomer(prev => ({
            ...prev,
            [name]: value
        }));
    };

    if (!selectedCustomer) return null;

    return (
        <div
            className={`modal fade ${showModal ? "show d-block" : ""}`}
            style={{ backgroundColor: "rgba(0,0,0,0.7)" }}
        >
            <div className="modal-dialog modal-dialog-centered modal-lg">
                <div className="modal-content border border-dark shadow-lg rounded-3">
                    <div className="modal-header bg-dark text-white rounded-top-3">
                        <h5 className="modal-title fw-bold d-flex align-items-center">
                            <i className="bi bi-pencil-square me-2"></i> Edit Customer
                        </h5>
                        <button
                            type="button"
                            className="btn-close btn-close-white"
                            onClick={() => setShowModal(false)}
                        ></button>
                    </div>

                    <div className="modal-body p-4 bg-white">
                        <form>
                            <div className="row g-3">
                                <div className="col-md-6">
                                    <label className="form-label fw-bold">
                                        <i className="bi bi-card-checklist me-2"></i> NIC
                                    </label>
                                    <input
                                        type="text"
                                        name="nic"
                                        className="form-control border-dark"
                                        placeholder="NIC"
                                        value={selectedCustomer.nic}
                                        readOnly
                                    />
                                    <small className="text-muted">NIC cannot be changed</small>
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label fw-bold">
                                        <i className="bi bi-person-circle me-2"></i> Username
                                    </label>
                                    <input
                                        type="text"
                                        name="username"
                                        className="form-control border-dark"
                                        placeholder="Username"
                                        value={selectedCustomer.username}
                                        onChange={handleInputChange}
                                    />
                                </div>

                                
                                <div className="col-md-6">
                                    <label className="form-label fw-bold">
                                        <i className="bi bi-telephone me-2"></i> Telephone
                                    </label>
                                    <input
                                        type="number"
                                        name="tp"
                                        className="form-control border-dark"
                                        placeholder="Telephone Number"
                                        value={selectedCustomer.tp}
                                        onChange={handleInputChange}
                                    />
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label fw-bold">
                                        <i className="bi bi-whatsapp me-2"></i> WhatsApp
                                    </label>
                                    <input
                                        type="number"
                                        name="whathappNo"
                                        className="form-control border-dark"
                                        placeholder="WhatsApp No"
                                        value={selectedCustomer.whathappNo}
                                        onChange={handleInputChange}
                                    />
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label fw-bold">
                                        <i className="bi bi-geo-alt me-2"></i> City
                                    </label>
                                    <input
                                        type="text"
                                        name="city"
                                        className="form-control border-dark"
                                        placeholder="City"
                                        value={selectedCustomer.city}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                        </form>
                    </div>

                    <div className="modal-footer bg-light border-top border-dark rounded-bottom-3">
                        <button
                            type="button"
                            className="btn btn-outline-secondary btn-sm me-2 rounded-pill px-3"
                            onClick={() => setShowModal(false)}
                        >
                            <i className="bi bi-x-circle me-2"></i> Close
                        </button>
                        <button
                            type="button"
                            className="btn btn-dark px-4"
                            onClick={updateCustomer}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <span
                                        className="spinner-border spinner-border-sm me-2"
                                        role="status"
                                    ></span>
                                    Updating...
                                </>
                            ) : (
                                <>
                                    <i className="bi bi-check-circle me-2"></i> Save Changes
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

function CustomerDetails() {
    const [customer, setCustomer] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const updateCustomer = async () => {
        if (!selectedCustomer) return;
        try {
            setIsLoading(true);
            await axios.put(`/customer/update/${selectedCustomer._id}`, selectedCustomer);
            alert("Customer Updated Successfully !!");
            setCustomer(selectedCustomer);
            setShowModal(false);
        } catch (error) {
            console.error("Error updating customer:", error);
            alert("Failed to update customer");
        } finally {
            setIsLoading(false);
        }
    };

    const deleteCustomer = async (id) => {
        if (window.confirm("Are you sure you want to delete this customer?")) {
            try {
                await axios.delete(`/customer/delete/${id}`);
                alert("Customer Deleted Successfully !!");
                // Optional: log out or navigate away
                localStorage.removeItem("userData");
                navigate("/cusLogin");
            } catch (error) {
                console.error("Error deleting customer:", error);
                alert("Failed to delete customer");
            }
        }
    };


    const openUpdateModal = (cust) => {
        setSelectedCustomer(cust);
        setShowModal(true);
    };

    useEffect(() => {
        const fetchCustomer = async () => {
            const userData = JSON.parse(localStorage.getItem("userData"));
            console.log("Fetched userData from localStorage:", userData);

            if (!userData?.id) {
                navigate("/cusLogin");
                return;
            }

            try {
                setLoading(true);
                const res = await axios.get(`http://localhost:5000/customer/${userData.id}`);
                console.log("Fetched customer data:", res.data);
                // adjust according to your backend response structure
                setCustomer(res.data.customer || res.data);
            } catch (err) {
                console.error(err);
                setError("Failed to fetch customer details");
            } finally {
                setLoading(false);
            }
        };


        fetchCustomer();
    }, [navigate]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;

    return (
        <div>
            <Navbar />
            <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
                <div className="card shadow-lg border-0" style={{ width: '28rem', borderRadius: '1rem' }}>
                    <div
                        className="card-header bg-dark text-white text-center"
                        style={{ borderTopLeftRadius: '1rem', borderTopRightRadius: '1rem' }}
                    >
                        <h3 className="mb-0">
                            <i className="bi bi-person-circle me-2"></i> Customer Details
                        </h3>
                    </div>
                    <div className="card-body bg-white text-dark">
                        <div className="mb-3 d-flex align-items-center">
                            <i className="bi bi-person-fill me-2 text-dark fs-5"></i>
                            <p className="mb-0">
                                <strong>Username:</strong> {customer?.username}
                            </p>
                        </div>

                        <div className="mb-3 d-flex align-items-center">
                            <i className="bi bi-credit-card-2-front me-2 text-dark fs-5"></i>
                            <p className="mb-0">
                                <strong>NIC:</strong> {customer?.nic}
                            </p>
                        </div>

                        <div className="mb-3 d-flex align-items-center">
                            <i className="bi bi-telephone-fill me-2 text-dark fs-5"></i>
                            <p className="mb-0">
                                <strong>Phone:</strong> {customer?.tp}
                            </p>
                        </div>

                        <div className="mb-3 d-flex align-items-center">
                            <i className="bi bi-geo-alt-fill me-2 text-dark fs-5"></i>
                            <p className="mb-0">
                                <strong>City:</strong> {customer?.city}
                            </p>
                        </div>
                       <div className="mb-4 p-2">
                         <button
                            className="btn btn-outline-warning btn-sm me-2 rounded-pill px-3"
                            onClick={() => openUpdateModal(customer)}
                        >
                            <i className="bi bi-pencil-square me-2"></i> 
                        </button>
                        <button
                            className="btn btn-outline-danger btn-sm me-2 rounded-pill px-3"
                            onClick={() => deleteCustomer(customer?._id)}
                        >
                            <i className="bi bi-trash3-fill me-2"></i> Delete Your Account
                        </button>
                       </div>
                    </div>
                </div>
            </div>

            <UpdateCustomerModal
                showModal={showModal}
                setShowModal={setShowModal}
                selectedCustomer={selectedCustomer}
                setSelectedCustomer={setSelectedCustomer}
                updateCustomer={updateCustomer}
                isLoading={isLoading}
            />
        </div>
    );
}

export default CustomerDetails;

