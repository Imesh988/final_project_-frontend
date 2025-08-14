import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EmRegistration from "./pages/EmRegistration.jsx";
import Login from "./pages/Login";
import SaveLocation from "./pages/Location";
import CusRegistration from "./pages/CusRegistration";
import CusLogin from "./pages/CusLogin.jsx";
import WhatsAppSender from "./WhatsAppSender/WhatsAppSender.jsx";
import Appointment from "./pages/Appointment.jsx";  
// import LocationLoad from "./pages/LocationLoad.jsx";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/employee" element={<EmRegistration />} />
        <Route path="/location" element={<SaveLocation />} />
        <Route path="/customer" element={<CusRegistration />} />
        <Route path="/cuslogin" element={<CusLogin />} />
        <Route path="/whatsapp" element={<WhatsAppSender />} />
        {/* <Route path="/locationLoad" element={<LocationLoad />} /> */}
        <Route path="/appointment" element={<Appointment />} />
        

      </Routes>

    </Router>
  )
}

export default App; 