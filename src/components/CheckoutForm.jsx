import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

import axios from "axios";

const CheckoutForm = ({dataId}) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try{
        const cardElement = elements.getElement(CardElement);

        const stripeResponse = await stripe.createToken(cardElement, {
          name: dataId,
        });
        //console.log(stripeResponse);
        const stripeToken = stripeResponse.token.id;
        //console.log(stripeToken);

        const response = await axios.post('https://lereacteur-vinted-api.herokuapp.com/payment', {
            stripeToken
        })
        console.log(response.data);

    } catch(error){
        console.error(error.response.data);
    }
    
  };

  return (
    <>
      <form className="formPurchase" onSubmit={handleSubmit}>
        <CardElement />
        <button type="submit">Valider</button>
      </form>
    </>
  );
};

export default CheckoutForm;
