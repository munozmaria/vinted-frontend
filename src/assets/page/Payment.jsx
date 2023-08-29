import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../../components/CheckoutForm";


const stripePromise = loadStripe(
  "pk_test_51NkPpBEdxkwFd5Me1qO3ENdiGiCAv653ILss6K2UqaGeS6j1BFlMwAqUSxd01NWQ6AIlO9QzZRxDV1REwrEfpLrG00oZgQVyb6"
);

const Payment = ({dataId}) => {
   


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
                <span>1€</span>
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
                  <span>1.3€</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="text">
          <div className="content">
            Il ne vous reste plus qu'un étape pour vous offrir <span>aa</span>.
            Vous allez payer <span>1.3 €</span> (frais de protection et frais de
            port inclus).
          
        <div className="line"></div>
        
          <CheckoutForm dataId={dataId}   />
         
       
        </div>
        </div>
      </div>
      </div>
    </Elements>
  );
};

export default Payment;
