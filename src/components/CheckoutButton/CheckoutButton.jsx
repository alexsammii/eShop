import React from "react";

const CheckoutButton = ({ cartItems }) => {
  const handleCheckout = async () => {
    const response = await fetch("https://us-central1-your-project.cloudfunctions.net/createCheckoutSession", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ items: cartItems }),
    });

    const data = await response.json();
    window.location.href = `https://checkout.stripe.com/pay/${data.id}`;
  };

  return <button onClick={handleCheckout}>Checkout</button>;
};

export default CheckoutButton;
