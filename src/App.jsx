import "./App.css";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import Home from "./assets/page/Home";
import Offer from "./assets/page/Offer";
import Header from "./components/Header";
import Signup from "./assets/page/Signup";
import Login from "./assets/page/Login";
import Cookies from "js-cookie";
import Publish from "./assets/page/Publish";
import Payment from "./assets/page/Payment";
import axios from "axios";

function App() {
  const [token, setToken] = useState(Cookies.get("token") || null);
  const [rangePriceOffers, setRangePriceOffers] = useState([0, 10000]);
  const [search, setSearch] = useState("");
  const [sortedPrice, setSortedPrice] = useState("price-asc");
  const [dataId, setDataId] = useState("");

  const handleToken = (token, dataId) => {
    if (token) {
      Cookies.set("token", token, { expires: 7 });
      Cookies.set("id", dataId, { expires: 7 });
      setToken(token);
      setDataId(dataId);
    } else {
      Cookies.remove("token");
      setToken(null);
    }
  };



  return (
    <Router>
      <Header
        token={token}
        handleToken={handleToken}
        search={search}
        setSearch={setSearch}
        setSortedPrice={setSortedPrice}
        sortedPrice={sortedPrice}
        setRangePriceOffers={setRangePriceOffers}
        rangePriceOffers={rangePriceOffers}
      />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              rangePriceOffers={rangePriceOffers}
              search={search}
              sortedPrice={sortedPrice}
            />
          }
        />
        <Route path="/offer/:id" element={<Offer />} />
        <Route
          path="/signup"
          element={<Signup token={token} handleToken={handleToken} />}
        />
        <Route
          path="/login"
          element={<Login handleToken={handleToken} setDataId={setDataId} />}
        />
        <Route path="/publish" element={<Publish token={token} />} />
        <Route path="/payment" element={<Payment dataId={dataId}></Payment>} />
      </Routes>
    </Router>
  );
}

export default App;
