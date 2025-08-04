import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EmRegistration from "./pages/EmRegistration";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/employee" element={<EmRegistration />} />
      </Routes>
        
    </Router>
  )
}

export default App; 