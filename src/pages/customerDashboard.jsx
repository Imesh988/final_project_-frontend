import React from "react";
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
import hero1 from "../assets/hero1.jpg";
import hero2 from "../assets/hero2.jpg";

// Fixed image imports
import engineImage from "../assets/engine.jpg";
import washImage from "../assets/wosh.jpg";
import oilImage from "../assets/oil.jpg";
import tireImage from "../assets/tire.jpg";

// ✅ Vehicle batch images
import toyotaImage from "../assets/toyota.jpg";
import nissanImage from "../assets/nissan.jpg";
import hondaImage from "../assets/honda.jpg";
import benzImage from "../assets/benz.jpg";
import audi from "../assets/audi.jpg";
import bmw from "../assets/images (4).jpg";

// =====================
// Navbar Component
// =====================
const NavbarComponent = () => (
    <Navbar
        expand="lg"
        sticky="top"
        style={{
            background: "rgba(0,0,0,0.45)",
            backdropFilter: "blur(12px)",
            boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
            padding: "0.8rem 1rem",
        }}
        variant="dark"
    >
        <Container>
            <Link
                className="navbar-brand d-flex align-items-center"
                to="/"
                style={{ fontWeight: "bold", fontSize: "1.5rem", color: "#fff" }}
            >
                <GiAutoRepair style={{ marginRight: "8px", fontSize: "2rem", color: "#FFD700" }} />
                SD AutoCare
            </Link>

            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ms-auto align-items-center">
                    {[
                        { label: "Home", link: "#home" },
                        { label: "Our Services", link: "#services" },
                        { label: "Vehicle Batches", link: "#vehicles" },
                        { label: "Branches", link: "#" },
                        { label: "Offers", link: "#" },
                        { label: "Education", link: "#" },
                        { label: "Events", link: "#" },
                        { label: "Media", link: "#" },
                        { label: "About", link: "#" },
                        { label: "Contact", link: "#" },
                    ].map((item, idx) => (
                        <Nav.Link
                            key={idx}
                            href={item.link}
                            style={{ color: "#fff", margin: "0 0.5rem", fontWeight: "500" }}
                        >
                            {item.label}
                        </Nav.Link>
                    ))}

                    <Button
                        variant="warning"
                        style={{
                            borderRadius: "50px",
                            padding: "0.6rem 1.8rem",
                            fontWeight: "bold",
                            marginLeft: "0.5rem",
                            background: "linear-gradient(90deg, #FFD700, #FF8C00)",
                            border: "none",
                        }}
                    >
                        Book Now
                    </Button>
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
);

// =====================
// Hero Section
// =====================
const HeroSection = () => (
    <Carousel fade interval={5000}>
        {[hero1, hero2].map((img, idx) => (
            <Carousel.Item key={idx}>
                <div style={{ position: "relative", width: "100%", height: "80vh" }}>
                    <img src={img} alt={`Slide ${idx + 1}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0,0,0,0.4)" }} />
                    <div
                        style={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            color: "#fff",
                            textAlign: "center",
                            maxWidth: "600px",
                        }}
                    >
                        <h1 style={{ fontSize: "3rem", fontWeight: "bold" }}>
                            {idx === 0 ? "MECHANICAL REPAIR SERVICES" : "QUALITY SERVICE GUARANTEED"}
                        </h1>
                        <p style={{ fontSize: "1.2rem" }}>
                            {idx === 0 ? "We understand your car and its technology" : "Professional car care by experts"}
                        </p>
                        <Button variant="danger" style={{ padding: "0.6rem 2rem", fontWeight: "bold" }}>
                            Get Started
                        </Button>
                    </div>
                </div>
            </Carousel.Item>
        ))}
    </Carousel>
);

// =====================
// Services Section
// =====================
const services = [
    { title: "Engine Repair", desc: "Expert engine repair services", img: engineImage },
    { title: "Car Wash", desc: "Premium car cleaning", img: washImage },
    { title: "Oil Change", desc: "Quick & reliable service", img: oilImage },
    { title: "Tire Service", desc: "Tire replacement & alignment", img: tireImage },
];

const ServicesSection = () => (
    <Container className="my-5">
        <h2 className="text-center mb-4" style={{ fontWeight: "bold" }}>
            Our Services
        </h2>
        <Row>
            {services.map((service, index) => (
                <Col md={3} sm={6} xs={12} key={index} className="mb-4">
                    <Card className="h-100 shadow-sm">
                        <Card.Img variant="top" src={service.img} style={{ height: "150px", objectFit: "cover" }} />
                        <Card.Body className="text-center">
                            <Card.Title style={{ fontWeight: "bold" }}>{service.title}</Card.Title>
                            <Card.Text>{service.desc}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            ))}
        </Row>
    </Container>
);

// =====================
// Vehicle Batch Section (Horizontal Scroll)
// =====================
const vehicles = [
    { name: "Toyota", img: toyotaImage },
    { name: "Nissan", img: nissanImage },
    { name: "Honda", img: hondaImage },
    { name: "Mercedes-Benz", img: benzImage },
    { name: "Audi", img: audi },
    { name: "BMW", img: bmw },
];

const VehicleBatchSection = () => (
    <Container className="my-5">
        <h2 className="text-center mb-4" style={{ fontWeight: "bold" }}>
            Vehicle Batches We Service
        </h2>
        <div
            style={{
                display: "flex",
                overflowX: "auto",
                gap: "20px",
                paddingBottom: "10px",
                scrollbarWidth: "thin",
            }}
        >
            {vehicles.map((vehicle, index) => (
                <Card
                    key={index}
                    style={{
                        minWidth: "200px",
                        flex: "0 0 auto",
                        borderRadius: "10px",
                        boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
                        transition: "transform 0.3s ease",
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                    onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
                >
                    <Card.Img variant="top" src={vehicle.img} style={{ height: "120px", objectFit: "contain", background: "#f9f9f9" }} />
                    <Card.Body className="text-center">
                        <Card.Title style={{ fontWeight: "bold" }}>{vehicle.name}</Card.Title>
                    </Card.Body>
                </Card>
            ))}
        </div>
    </Container>
);

// =====================
// Footer & WhatsApp
// =====================
const Footer = () => (
    <footer className="bg-dark text-white text-center py-3">
        <Container>
            <p>© 2025 SD AutoCare. All Rights Reserved.</p>
        </Container>
    </footer>
);

const WhatsAppButton = () => (
    <a
        href="https://wa.me/94117600800"
        target="_blank"
        rel="noreferrer"
        style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            backgroundColor: "#25D366",
            color: "white",
            padding: "14px",
            borderRadius: "50%",
            fontSize: "26px",
            zIndex: 1000,
        }}
    >
        <FaWhatsapp />
    </a>
);

// =====================
// Main Dashboard
// =====================
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
        <section id="footer">
            <Footer />
        </section>
        <WhatsAppButton />
    </div>
);

export default CustomerDashboard;
