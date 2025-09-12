import React, { useState, useRef, useEffect } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "axios";
import {
    Navbar,
    Nav,
    Container,
    Button,
    Carousel,
    Row,
    Col,
    Card,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";
import { GiAutoRepair } from "react-icons/gi";
import { FaPhoneAlt, FaClock } from "react-icons/fa"; 
import { useNavigate } from "react-router-dom"; 
import "../style/CusDashboard.css";

// Image imports
import hero1 from "../assets/hero1.jpg";
import hero2 from "../assets/hero2.jpg";
import engineImage from "../assets/engine.jpg";
import washImage from "../assets/wosh.jpg";
import oilImage from "../assets/oil.jpg";
import tireImage from "../assets/tire.jpg";
import toyotaImage from "../assets/toyota.jpg";
import nissanImage from "../assets/nissan.jpg";
import hondaImage from "../assets/honda.jpg";
import benzImage from "../assets/benz.jpg";
import audi from "../assets/audi.jpg";
import bmw from "../assets/images (4).jpg";


const NavbarComponent = () => {

      const navigate = useNavigate();


    return (
        <Navbar expand="lg" sticky="top" className="custom-navbar" variant="dark">
        <Container>

            <Link className="navbar-brand logo-container" to="/">
                <GiAutoRepair className="logo-icon" />
                <span className="logo-text">SD AutoCare </span>
            </Link>

            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ms-auto align-items-center">


                    <div className="contact-box d-flex align-items-center me-3">
                        <div className="contact-item">
                            <FaPhoneAlt className="icon" />
                            <span className="text">+94 77 123 4567</span>
                        </div>
                        <div className="divider"></div>
                        <div className="contact-item">
                            <FaClock className="icon" />
                            <span className="text">24 x 7 : 8:30 AM - 6:30 PM</span>
                        </div>
                    </div>


                    <Button 
                    onClick={() => navigate("/cuslogin")} 
                    className="book-now-btn">Book Now</Button>
                </Nav>
            </Navbar.Collapse>
        </Container>
        <button 
        onClick={() => navigate("/login")}
         className="profile-button" 
         title="Customer Profile">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor"
                className="bi bi-person-video3" viewBox="0 0 16 16">
                <path d="M14 9.5a2 2 0 1 1-4 0 2 2 0 0 1 4 0m-6 5.7c0 .8.8.8.8.8h6.4s.8 0 .8-.8-.8-3.2-4-3.2-4 2.4-4 3.2" />
                <path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h5.243c.122-.326.295-.668.526-1H2a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v7.81c.353.23.656.496.91.783Q16 12.312 16 12V4a2 2 0 0 0-2-2z" />
            </svg>
        </button>

    </Navbar>
    )
};

const AllLocationTable = () => {
    const [location, setLocation] = useState([]);

    const fetchLocation = async () => {
        try {
            const response = await axios.get("http://localhost:5000/location/getAll");
            setLocation(response.data?.location || []);
        } catch (error) {
            console.error("Error fetching Location:", error);
            setLocation([]);
        }
    };

    useEffect(() => {
        fetchLocation();
    }, []);

    if (location.length === 0) {
        return (
            <div className="p-3 text-center text-white bg-dark rounded">
                Location Not Found
            </div>
        );
    }

    return (
        <div className="container mt-3">
            <div className="row">
                {location.map((loc) => (
                    <div key={loc._id} className="col-md-4">
                        <div
                            className="card mb-4 shadow rounded-3"
                            style={{ backgroundColor: "#1c1c1c", color: "#fff" }}
                        >
                            <div className="card-body">
                                <p>
                                    <i className="bi bi-geo-alt-fill"></i>{" "}
                                    <strong>City</strong> : {loc.city}
                                </p>
                                <p>
                                    <strong>Address</strong> : {loc.address}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};


const CreFeedback = () => {
    const [form, setForm] = useState({
        rating: "",
        feedback: "",
        email: ""
    });
    const [errors, setErrors] = useState({});

    const StarRating = ({ rating, setRating }) => {
        const [hover, setHover] = useState(0);

        return (
            <div className="star-rating mb-2">
                {[...Array(5)].map((_, index) => {
                    index += 1;
                    return (
                        <button
                            type="button"
                            key={index}
                            className={index <= (hover || rating) ? "star-btn on" : "star-btn off"}
                            onClick={() => setRating(index)}
                            onMouseEnter={() => setHover(index)}
                            onMouseLeave={() => setHover(rating)}
                            style={{
                                background: "transparent",
                                border: "none",
                                cursor: "pointer",
                                fontSize: "1.5rem",
                                color: index <= (hover || rating) ? "#FFD700" : "#ccc"
                            }}
                        >
                            ★
                        </button>
                    );
                })}
            </div>
        );
    };

    const createFeedback = async () => {
        try {
            const formData = {
                ...form,
                rating: parseInt(form.rating) || 0
            };

            await axios.post("http://localhost:5000/feedback/create", formData);

            setForm({ rating: "", feedback: "", email: "" });
        } catch (error) {
            console.error(error);
            alert("Failed to submit feedback ❌");
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = {};

        if (!form.rating || form.rating < 1) newErrors.rating = "Please select a rating";
        if (!form.feedback.trim()) newErrors.feedback = "Please provide your feedback";
        if (!form.email.trim()) {
            newErrors.email = "Please enter your email address";
        } else if (!/\S+@\S+\.\S+/.test(form.email)) {
            newErrors.email = "Please enter a valid email address";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        createFeedback();
    };

    return (
        <div className="service-feedback-container mt-4">
            <div className="service-feedback-card p-4 shadow rounded bg-light">
                <div className="service-header d-flex align-items-center mb-3">
                    <GiAutoRepair size={32} style={{ marginRight: "10px", color: "#FF8C00" }} />
                    <h4 className="m-0">We value your feedback</h4>

                </div>

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Rate your experience</label>
                        <StarRating
                            rating={parseInt(form.rating) || 0}
                            setRating={(rating) => setForm({ ...form, rating: rating.toString() })}
                        />
                        {errors.rating && <p className="text-danger">{errors.rating}</p>}
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Your feedback</label>
                        <textarea
                            name="feedback"
                            value={form.feedback}
                            onChange={(e) => setForm({ ...form, feedback: e.target.value })}
                            className="form-control"
                            rows="3"
                            placeholder="Share your thoughts..."
                        />
                        {errors.feedback && <p className="text-danger">{errors.feedback}</p>}
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Email address</label>
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            className="form-control"
                            placeholder="Your email"
                        />
                        {errors.email && <p className="text-danger">{errors.email}</p>}
                    </div>

                    <button type="submit" className="btn btn-success w-100 fw-bold">
                        Submit Feedback
                    </button>
                </form>
            </div>
        </div>
    );
};

const HeroSection = () => (
    <Carousel fade interval={5000}>
        {[hero1, hero2].map((img, idx) => (
            <Carousel.Item key={idx}>
                <div className="hero-slide">
                    <img src={img} alt={`Slide ${idx + 1}`} className="hero-image" />
                    <div className="overlay"></div>

                    <div className="hero-content">
                        <h1>
                            {idx === 0
                                ? "MECHANICAL REPAIR SERVICES"
                                : "QUALITY SERVICE GUARANTEED"}
                        </h1>
                        <p className="subtitle">
                            {idx === 0
                                ? "We understand your car and its technology"
                                : "Professional car care by experts"}
                        </p>

                        <div className="service-box">
                            {idx === 0 ? (
                                <p>
                                    From engine diagnostics to suspension repair, we provide
                                    complete mechanical solutions with guaranteed quality.
                                </p>
                            ) : (
                                <p>
                                    Our certified team ensures reliable service, genuine
                                    parts, and customer satisfaction every single time.
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </Carousel.Item>
        ))}
    </Carousel>
);


const services = [
    { title: "Engine Repair", desc: "Expert engine repair services", img: engineImage },
    { title: "Car Wash", desc: "Premium car cleaning", img: washImage },
    { title: "Oil Change", desc: "Quick & reliable service", img: oilImage },
    { title: "Tire Service", desc: "Tire replacement & alignment", img: tireImage },
];

const ServicesSection = () => (
    <Container className="my-5">
        <h2 className="section-title text-center mb-4">
            Our <span>Services</span>
        </h2>
        <Row>
            {services.map((service, index) => (
                <Col md={3} sm={6} xs={12} key={index} className="mb-4">
                    <Card className="service-card h-100 text-center">
                        <div className="card-img-wrapper">
                            <Card.Img variant="top" src={service.img} className="card-img" />
                        </div>
                        <Card.Body>
                            <Card.Title className="service-title">{service.title}</Card.Title>
                            <div className="title-underline"></div>
                            <Card.Text className="service-desc">{service.desc}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            ))}
        </Row>
    </Container>
);


const vehicles = [
    { name: "Toyota", img: toyotaImage },
    { name: "Nissan", img: nissanImage },
    { name: "Honda", img: hondaImage },
    { name: "Mercedes-Benz", img: benzImage },
    { name: "Audi", img: audi },
    { name: "BMW", img: bmw },
];

const VehicleBatchSection = () => {
    const scrollRef = useRef(null);

    // Manual scroll handler
    const scroll = (direction) => {
        if (scrollRef.current) {
            const { scrollLeft, clientWidth } = scrollRef.current;
            const scrollAmount = direction === "left" ? -clientWidth : clientWidth;
            scrollRef.current.scrollTo({
                left: scrollLeft + scrollAmount,
                behavior: "smooth",
            });
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            if (scrollRef.current) {
                scroll("right");
            }
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    return (
        <Container className="my-5">
            <h2 className="text-center mb-4 section-title">
                Vehicle Batches We Service
            </h2>

            <div className="d-flex justify-content-between align-items-center mb-3">
                <Button className="scroll-btn" onClick={() => scroll("left")}>
                    ‹
                </Button>
                <Button className="scroll-btn" onClick={() => scroll("right")}>
                    ›
                </Button>
            </div>

            <div ref={scrollRef} className="vehicle-slider">
                {vehicles.map((vehicle, index) => (
                    <Card key={index} className="vehicle-card">
                        <Card.Img variant="top" src={vehicle.img} className="vehicle-img" />
                        <Card.Body className="text-center">
                            <Card.Title className="vehicle-title">
                                {vehicle.name}
                            </Card.Title>
                        </Card.Body>
                    </Card>
                ))}
            </div>
        </Container>
    );
};


const Footer = () => (
    <footer className="custom-footer">
        <Container>
            <div className="footer-top">
                <h3 className="footer-logo">SD AutoCare</h3>
                <p className="footer-tagline">
                    We keep your vehicle running smoothly 🚗✨
                </p>
            </div>

            <Row className="footer-sections">
                <Col md={6} className="footer-col glass-card">
                    <h5 className="footer-heading">📍 Our Locations</h5>
                    <AllLocationTable />
                </Col>

                <Col md={6} className="footer-col glass-card">
                    <h5 className="footer-heading">💬 Share Your Feedback</h5>
                    <CreFeedback />
                </Col>
            </Row>

            <div className="footer-bottom">
                <p>© 2025 SD AutoCare. All Rights Reserved.</p>
            </div>
        </Container>
    </footer>
);



const CustomerDashboard = () => (
    <div>
        <NavbarComponent />
        <section id="home">
            <HeroSection />
        </section>
        <section id="services">
            <ServicesSection />
        </section>
        <section id="vehicles">
            <VehicleBatchSection />
        </section>
        <section id="branches"></section>
        <section id="footer">
            <Footer />
        </section>
    </div>
);

export default CustomerDashboard;
