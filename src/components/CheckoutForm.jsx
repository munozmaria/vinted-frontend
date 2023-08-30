import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

import axios from "axios";
import { useState } from "react";

const CheckoutForm = ({ dataId, title, amount }) => {
  //console.log(dataId)

  // const [isLoading, setIsLoading] = useState(false);
  // const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(0);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setPaymentStatus(1);
      const cardElement = elements.getElement(CardElement);

      const stripeResponse = await stripe.createToken(cardElement, {
        name: dataId,
      });
      //console.log(stripeResponse);
      const stripeToken = stripeResponse.token.id;
      //console.log(stripeToken);

      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/payment",
        {
          token: stripeToken,
          title: title,
          amount: amount,
        }
      );
      console.log(response.data);

      if (response.data.status === "succeeded") {
        setPaymentStatus(2);
      }
    } catch (error) {
      console.error(error.response.data);
      setPaymentStatus(3);
    }
  };

  return (
    <>
      <form className="formPurchase" onSubmit={handleSubmit}>
        <div className="formPurchase-component">
          <CardElement />
        </div>
        {paymentStatus === 2  ? (
          <p style={{ color: "green" }}>Payment done</p>
        ) : (
          <>
          <button type="submit" disabled={paymentStatus === 1}>
            Valider
          </button>
          {paymentStatus === 3 && (
            <p style={{ color: "red" }}>
              Une erreur est survenue, veuillez réessayer ...
            </p>
          )}
          </>
        )}
      </form>
    </>
  );
};

export default CheckoutForm;
