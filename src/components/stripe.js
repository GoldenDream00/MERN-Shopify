import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import Button from "./button";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (elements == null) {
      return;
    }
    // const { error, paymentMethod }
    await stripe
      .createPaymentMethod({
        type: "card",
        card: elements.getElement(CardElement),
      })
      .then((res) => console.log(res));
  };
  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <Button
        type="submit"
        text="Stripe"
        fcolor="white"
        color="#5D66DE"
        width="300px"
        fsize="18px"
        radius="4px"
        disabled={!stripe || !elements}
      />
    </form>
  );
};

const stripePromise = loadStripe("pk_test_6pRNASCoBOKtIshFeQd4XMUh");

const Stripe = () => (
  <Elements stripe={stripePromise}>
    <CheckoutForm />
  </Elements>
);

export default Stripe;
