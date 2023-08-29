
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

import axios from "axios";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();



  const handleSubmit = async (event) => {
    event.preventDefault();
    const cardElement = elements.getElement(CardElement);

    const stripeResponse = await stripe.createToken(cardElement, {
      name: "L'id de l'acheteur",
    });
    console.log(stripeResponse);
    const stripeToken = stripeResponse.token.id;
   
    const response = await axios.post("https://lereacteur-vinted-api.herokuapp.com/payment", {
      stripeToken,
    });
    console.log(response.data);
    console.log(response.data.status)
 
  };

  return (
    <>
      
        <form className="formPurchase" onSubmit={handleSubmit}>
          <CardElement />
          
        </form>
     
    </>
  );
};

export default CheckoutForm;