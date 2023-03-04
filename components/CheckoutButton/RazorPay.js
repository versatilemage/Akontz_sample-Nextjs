import React from "react";
import baseUrl from "@/utils/baseUrl";
import Swal from 'sweetalert2';
// import { parseCookies } from 'nookies'

const PaymentButton = ({ user, price, cartItems, onClearCart }) => {
  console.log(user)
  // const { token } = parseCookies()

  const total = Number((price * 100).toFixed(2));

const makePayment = async () => {
  const res = await initializeRazorpay();
  if (!res) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: "Razorpay Failed to load",
    });
    return;
  }

  const options = {
    key: 'rzp_test_NRSClsMgMg8fwL',
    amount: total,
    currency: 'INR',
    name: 'Test',
    description: 'Thank you for your test donation',
    image: '/images/newlogo1.png',
    prefill: {
      name: user.name,
      email: user.email,
      contact: user.phone,
    },
    handler: function (response) {
      // Send the token to your server to create a charge
      const checkoutData = {
        paymentData: {
          email: user.email,
          id: response.razorpay_payment_id,
          razorpaySignature: response.razorpay_signature,
          stripeTotal: total,
          courseId: cartItems[0].id,
          userId: user.id
        },
      };
      fetch(`${baseUrl}/api/v1/courses/razorpayCheckout`, {
        method: 'POST',
        body: JSON.stringify(checkoutData),
        headers: {
          'Content-Type': 'application/json'
        //   Authorization: `Bearer ${auth?.token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          Swal.fire('Payment successful!', '', 'success');
          onClearCart();
        })
        .catch((error) => {
          console.error(error);
          Swal.fire('Error processing payment', '', 'error');
        });
    },
  };

  const paymentObject = new window.Razorpay(options);
  paymentObject.open();
};

const initializeRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
};

  return (
    <div>
      <div className="payment-box">
        <button className="default-btn" id="payment-button" onClick={makePayment}>
          <i className="flaticon-shopping-cart"></i> Make Payment{" "}
          <span></span>
        </button>
      </div>
    </div>
  );
};

export default PaymentButton;
