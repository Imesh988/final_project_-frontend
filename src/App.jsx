import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EmRegistration from "./pages/EmRegistration.jsx";
import Login from "./pages/Login.jsx";
import SaveLocation from "./pages/Location";
import CusRegistration from "./pages/CusRegistration";
import CusLogin from "./pages/CusLogin.jsx";
import WhatsAppSender from "./WhatsAppSender/WhatsAppSender.jsx";
import Appointment from "./pages/Appointment.jsx";  
import LocationLoad from "./pages/LocationLoad.jsx";
import SaveFeedback from "./pages/Feedback.jsx";
import ImageProcessor from "./pages/ImageProcessor.jsx";
import LoadAppointment from "./pages/LoadAppointment.jsx";
import ImageUpload from "./componrnts/ImageUpload.jsx";
import LoadEmp from "./pages/LoadEmployee.jsx";
import CustomerDashboard from "./pages/customerDashboard.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import CustomerDetails from "./pages/CustomerDetails.jsx";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/employee" element={<EmRegistration />} />
        <Route path="/location" element={<SaveLocation />} />
        <Route path="/customer" element={<CusRegistration />} />
        <Route path="/cuslogin" element={<CusLogin />} />
        <Route path="/whatsapp/:username/:phone/:appointmentId" element={<WhatsAppSender />} />
        {/* <Route path="/locationLoad" element={<LocationLoad />} /> */}
        <Route path="/appointment" element={<Appointment />} />
        <Route path="/feedback" element={<SaveFeedback />} />
        <Route path="/imageProcessor" element={<ImageProcessor />} />
        <Route path="/loadAppointment" element={<LoadAppointment />} />
        <Route path="/imageUpload" element={<ImageUpload />} />
        <Route path="/loadEmployee" element={<LoadEmp />} />
        <Route path="/" element={<CustomerDashboard />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/customer-details" element={<CustomerDetails />} />   
        

      </Routes>

    </Router>
  )
}

export default App; 