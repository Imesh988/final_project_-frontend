import { useState, useEffect } from "react";
import axios from "../api/axios";
import { GiAutoRepair } from "react-icons/gi";
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../style/Feedback.css';

const StarRating = ({ rating, setRating }) => {
    const [hover, setHover] = useState(0);

    return (
        <div className="star-rating">
            {[...Array(5)].map((star, index) => {
                index += 1;
                return (
                    <button
                        type="button"
                        key={index}
                        className={index <= (hover || rating) ? "star-btn on" : "star-btn off"}
                        onClick={() => setRating(index)}
                        onMouseEnter={() => setHover(index)}
                        onMouseLeave={() => setHover(rating)}
                    >
                        <span className="star">&#9733;</span>
                    </button>
                );
            })}
        </div>
    );
};

const CreateFeedback = ({ form, setForm, createFeedback }) => {
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });

        if (errors[name]) {
            setErrors({ ...errors, [name]: '' });
        }
    };

    const handleRatingChange = (rating) => {
        setForm({ ...form, rating: rating.toString() });

        if (errors.rating) {
            setErrors({ ...errors, rating: '' });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const newErrors = {};

        if (!form.rating || form.rating < 1) {
            newErrors.rating = 'Please select a rating';
        }

        if (!form.feedback || form.feedback.trim() === '') {
            newErrors.feedback = 'Please provide your feedback';
        }

        if (!form.email || form.email.trim() === '') {
            newErrors.email = 'Please enter your email address';
        } else if (!/\S+@\S+\.\S+/.test(form.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        createFeedback();
    }

    return (
        <div className="service-feedback-container">
            <div className="service-feedback-card">
                <div className="service-header">
                    <div className="service-icon">
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2L15 7L21 7.5L17 11L18 17L12 14L6 17L7 11L3 7.5L9 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <div className="logo-container">
                        <GiAutoRepair className="logo-icon" />
                        <span className="logo-text">AutoCare Pro</span>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="service-feedback-form">
                    <div className="service-form-group">
                        <label htmlFor="rating">Rate your experience</label>
                        <div className="service-rating-container">
                            <StarRating
                                rating={parseInt(form.rating) || 0}
                                setRating={handleRatingChange}
                            />
                            <input
                                type="hidden"
                                name="rating"
                                value={form.rating || ''}
                            />
                        </div>
                        {errors.rating && <p className="service-error-message">{errors.rating}</p>}
                    </div>

                    <div className="service-form-group">
                        <label htmlFor="feedback">Your feedback</label>
                        <textarea
                            name="feedback"
                            value={form.feedback || ''}
                            onChange={handleChange}
                            className={errors.feedback ? 'service-error' : ''}
                            rows="4"
                            placeholder="Please share your thoughts on service improvements you would like to see..."
                        />
                        {errors.feedback && <p className="service-error-message">{errors.feedback}</p>}
                    </div>

                    <div className="service-form-group">
                        <label htmlFor="email">Email address</label>
                        <input
                            type="email"
                            name="email"
                            value={form.email || ''}
                            onChange={handleChange}
                            className={errors.email ? 'service-error' : ''}
                            placeholder="Your email address"
                        />
                        {errors.email && <p className="service-error-message">{errors.email}</p>}
                    </div>

                    <div className="service-form-submit">
                        <button type="submit" className="service-submit-btn">
                            <span>Submit Feedback</span>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4 12H20M20 12L14 6M20 12L14 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const AllFeedback = ({ feedback , deleteFeedback }) => {
    if (!feedback || feedback.length === 0) {
        return <div className="container-fluid p-4">No Customer Feedback Available</div>;
    }

    return (
        <div className="container-fluid p-4">
            <div className="card shadow-sm">
                <div className="card-body p-0">
                    <div className="table-responsive">
                        <table className="table table-hover align-middle">
                            <thead className="table-light">
                                <tr>
                                    <th scope="col" className="ps-4">Rating</th>
                                    <th scope="col">Comment</th>
                                    <th scope="col">Email</th>
                                    <th scope="col" className="text-end pe-4">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {feedback.map((item) => (
                                    <tr key={item._id}>
                                        <td className="ps-4 fw-semibold">
                                            <div className="d-flex align-items-center">
                                                {item.rating} 
                                                <span className="ms-1 text-warning">★</span>
                                            </div>
                                        </td>
                                        <td className="text-muted" style={{ maxWidth: "300px" }}>
                                            <div className="text-truncate">{item.feedback}</div>
                                        </td>
                                        <td>
                                            <div className="text-truncate">{item.email}</div>
                                        </td>
                                        <td className="pe-4">
                                            <div className="d-flex justify-content-end gap-2">
                                               <button 
                                                onClick={() => deleteFeedback(item._id)}
                                                className="btn btn-outline-danger btn-sm"
                                               ><i class="bi bi-trash-fill"></i></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

function SaveFeedback() {
    const [feedback, setFeedback] = useState([]);
    const [loading, setLoading] = useState(true);

    const [form, setForm] = useState({
        rating: '',
        feedback: '',
        email: ''
    });

    const fetchFeedback = async () => {
        try {
            const response = await axios.get('/feedback/getAll');
            setFeedback(response.data?.feedback || []);
        } catch (error) {
            console.error(error);
            setFeedback([]);
        } finally {
            setLoading(false);
        }
    };

    const deleteFeedback = async (id) => {
       if(window.confirm("Are you sure you want to delete this feedback?")) {
           try {
            await axios.delete(`/feedback/delete/${id}`);
            fetchFeedback();
            alert("Feedback Deleted Successfully !!");
           } catch (error) {
            console.error("Error deleting feedback:", error);
            alert("Failed to delete feedback");
            
           }
       }
    }

    const createFeedback = async () => {
        try {
            const formData = {
                ...form,
                rating: parseInt(form.rating) || 0
            };

            await axios.post('/feedback/create', formData);
            fetchFeedback();
            setForm({
                rating: '',
                feedback: '',
                email: ''
            });
            alert('Feedback submitted successfully');
        } catch (error) {
            console.error(error);
            alert('Failed to submit feedback');
        }
    }

    useEffect(() => {
        fetchFeedback();
    }, []);

    if (loading) {
        return <div className="container-fluid p-4">Loading feedback...</div>;
    }

    return (
        <div className="service-app-container">
            <CreateFeedback
                form={form}
                setForm={setForm}
                createFeedback={createFeedback}
            />

            <AllFeedback
             feedback={feedback} 
             deleteFeedback={deleteFeedback}/>
        </div>
    )
}

export default SaveFeedback;