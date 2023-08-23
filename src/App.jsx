import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import Home from "./assets/page/Home";
import Details from "./assets/page/Details";
import Offer from "./assets/page/Offer";
import Header from "./components/Header";

function App() {
  return (
    <Router>
      {/* Mon Header apparait sur toutes les pages */}
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/details" element={<Details />} />
        <Route path="/offer/:id" element={<Offer />} />
      </Routes>
    </Router>
  );
}

export default App;
