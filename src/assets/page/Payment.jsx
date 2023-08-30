import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../../components/CheckoutForm";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const stripePromise = loadStripe(
  "pk_test_51HCObyDVswqktOkX6VVcoA7V2sjOJCUB4FBt3EOiAdSz5vWudpWxwcSY8z2feWXBq6lwMgAb5IVZZ1p84ntLq03H00LDVc2RwP"
);

const Payment = ({ dataId, token, setLoginModal }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { title } = location.state;
  const { amount } = location.state;

  useEffect(() => {
    if (!token) {
      navigate("/");
      setLoginModal(true);
      document.body.style.overflow = "hidden";
    }
  }, [token, setLoginModal, navigate]);

  return (
    <Elements stripe={stripePromise}>
      <div className="payment-wrapper">
        <div className="payment-container">
          <div className="payment-card summary">
            <h3>Résumé de la commande</h3>
            <div className="offerDetails">
              <ul>
                <li>
                  Commande
                  <span>{amount}€</span>
                </li>
                <li>
                  Frais protection acheteurs
                  <span>0.10€</span>
                </li>
                <li>
                  Frais de port
                  <span>0.20€</span>
                </li>
              </ul>
              <div className="line"></div>
              <div className="total">
                <ul>
                  <li>
                    Total
                    <span>{amount}€</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="text">
            <div className="content">
              Il ne vous reste plus qu'un étape pour vous offrir{" "}
              <span>{title}</span>. Vous allez payer <span>{amount} €</span>{" "}
              (frais de protection et frais de port inclus).
              <div className="line"></div>
              <CheckoutForm title={title} amount={amount} dataId={dataId} />
            </div>
          </div>
        </div>
      </div>
    </Elements>
  );
};

export default Payment;
