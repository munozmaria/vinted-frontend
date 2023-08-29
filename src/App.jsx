import "./App.css";
import { useState } from "react";
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

function App() {
  const [token, setToken] = useState(Cookies.get("token") || null);
  const [rangePriceOffers, setRangePriceOffers] = useState([0, 10000]);
  const [search, setSearch] = useState("");
  const [sortedPrice, setSortedPrice] = useState("price-asc");
  const [dataId, setDataId] = useState("");
  const [signupModal, setSignupModal] = useState(false);
  const [loginModal, setLoginModal] = useState(false);

  const handleSingupButton = () => {
    if (!token) {
      setLoginModal(false);
      setSignupModal(true);
    }
  };

  const handleLoginButton = () => {
    if (!token) {
      setSignupModal(false);
      setLoginModal(true);
    }
  };

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

  const handleCloseModals = () => {
    setLoginModal(false);
    setSignupModal(false);
    console.log("heee")
  };

  const switchModals = () => {
    setLoginModal(!loginModal);
    setSignupModal(!signupModal);
  };

  return (
    <Router>
      {signupModal ? (
        <Signup
          token={token}
          handleToken={handleToken}
          handleSingupButton={handleSingupButton}
          handleCloseModals={handleCloseModals}
          switchModals={switchModals}
        />
      ) : (
        ""
      )}
      {loginModal ? (
        <Login
          handleToken={handleToken}
          setDataId={setDataId}
          handleLoginButton={handleLoginButton}
          handleCloseModals={()=>{
            console.log('toto')
            handleCloseModals()
          }}
          switchModals={switchModals}
        />
      ) : (
        ""
      )}
      <Header
        handleSingupButton={handleSingupButton}
        handleLoginButton={handleLoginButton}
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
        {/* <Route
          path="/signup"
          element={<Signup token={token} handleToken={handleToken} />}
        /> */}
        {/* <Route
          path="/login"
          element={<Login handleToken={handleToken} setDataId={setDataId} />}
        /> */}
        <Route path="/publish" element={<Publish token={token} setLoginModal={setLoginModal} />} />
        <Route path="/payment" element={<Payment dataId={dataId}></Payment>} />
      </Routes>
    </Router>
  );
}

export default App;
