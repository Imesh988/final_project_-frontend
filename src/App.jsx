import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EmRegistration from "./pages/EmRegistration.jsx";
import Login from "./pages/Login";
import SaveLocation from "./pages/Location";
import CusRegistration from "./pages/CusRegistration";
import CusLogin from "./pages/CusLogin.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/employee" element={<EmRegistration />} />
        <Route path="/location" element={<SaveLocation />} />
        <Route path="/customer" element={<CusRegistration />} />
        <Route path="/cuslogin" element={<CusLogin />} />
        

      </Routes>

    </Router>
  )
}

export default App; 