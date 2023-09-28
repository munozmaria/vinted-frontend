import "./App.css";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Header from "./components/Header";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Cookies from "js-cookie";
import Publish from "./pages/Publish";
import Payment from "./pages/Payment";

import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [token, setToken] = useState(Cookies.get("token") || null);
  const [rangePriceOffers, setRangePriceOffers] = useState([0, 10000]);
  const [productDetailsSearch, setProductDetailsSearch] = useState("");
  const [sortedPrice, setSortedPrice] = useState("price-asc");
  const [dataId, setDataId] = useState("");
  const [signupModal, setSignupModal] = useState(false);
  const [loginModal, setLoginModal] = useState(false);

  const handleSingupButton = () => {
    if (!token) {
      setLoginModal(false);
      setSignupModal(true);
      document.body.style.overflow = "hidden";
    }
  };

  const handleLoginButton = () => {
    if (!token) {
      setSignupModal(false);
      setLoginModal(true);
      document.body.style.overflow = "hidden";
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
      Cookies.remove("id");
      setToken(null);
    }
  };

  const handleCloseModals = () => {
    setLoginModal(false);
    setSignupModal(false);
    document.body.style.overflow = "auto";
    //console.log("heee")
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
          handleCloseModals={() => {
            handleCloseModals();
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
        productDetailsSearch={productDetailsSearch}
        setProductDetailsSearch={setProductDetailsSearch}
        setSortedPrice={setSortedPrice}
        sortedPrice={sortedPrice}
        setLoginModal={setLoginModal}
        setSignupModal={setSignupModal}
        setRangePriceOffers={setRangePriceOffers}
        rangePriceOffers={rangePriceOffers}
      />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              rangePriceOffers={rangePriceOffers}
              sortedPrice={sortedPrice}
              setSortedPrice={setSortedPrice}
              productDetailsSearch={productDetailsSearch}
              setProductDetailsSearch={setProductDetailsSearch}
              setRangePriceOffers={setRangePriceOffers}
            />
          }
        />
        <Route path="/offer/:id" element={<Offer token={token} />} />

        <Route
          path="/publish"
          element={<Publish token={token} setLoginModal={setLoginModal} />}
        />
        <Route
          path="/payment"
          element={
            <Payment
              dataId={dataId}
              token={token}
              setLoginModal={setLoginModal}></Payment>
          }
        />
      </Routes>
      <ToastContainer />
    </Router>
  );
}

export default App;
