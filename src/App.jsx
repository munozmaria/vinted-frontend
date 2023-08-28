import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import Home from "./assets/page/Home";
import Offer from "./assets/page/Offer";
import Header from "./components/Header";
import Signup from "./assets/page/Signup";
import Login from "./assets/page/Login";
import Cookies from "js-cookie";
import { useState } from "react";
import Publish from "./assets/page/Publish";


function App() {


  const [token, setToken] = useState(Cookies.get('token')|| null)

  const handleToken = (token) => {

    if(token) {
      Cookies.set('token', token, {expires: 7})
      setToken(token)
    } else{
      Cookies.remove('token')
      setToken(null)
    }

  }
 

  return (
    <Router>
      <Header token={token} handleToken={handleToken} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/offer/:id" element={<Offer />} />
        <Route path="/signup" element={<Signup token={token} handleToken={handleToken}/>} />
        <Route path="/login" element={<Login handleToken={handleToken} />} />
        <Route path="/publish" element={<Publish token={token}/>} />
      </Routes>
    </Router>
  );
}

export default App;
