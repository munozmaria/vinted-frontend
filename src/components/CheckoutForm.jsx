import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

import axios from "axios";
import { useState } from "react";

const CheckoutForm = ({dataId, title, amount}) => {
  //console.log(dataId)

  const [isLoading, setIsLoading] = useState(false);
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try{
      setIsLoading(true);
        const cardElement = elements.getElement(CardElement);

        const stripeResponse = await stripe.createToken(cardElement, {
          name: dataId,
        });
        //console.log(stripeResponse);
        const stripeToken = stripeResponse.token.id;
        //console.log(stripeToken);

        const response = await axios.post('https://lereacteur-vinted-api.herokuapp.com/payment', {
            token: stripeToken,
            title: title,
            amount: amount
        })
        console.log(response.data);
        setIsLoading(false);
        if (response.data.status === "succeeded") {
          setPaymentCompleted(true);
        }


        

    } catch(error){
        console.error(error.response.data);
    }
    
  };

  return (
    <>
      <form className="formPurchase" onSubmit={handleSubmit}>
        <div className="formPurchase-component">
        <CardElement />

        </div>
        {paymentCompleted == true ? (
          <p>Payment done</p>
        ) : (<button type="submit" disabled={isLoading}>Valider</button>)}
        
      </form>
    </>
  );
};

export default CheckoutForm;
