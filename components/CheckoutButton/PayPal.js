import React, { useEffect, useState } from "react";
import baseUrl from "@/utils/baseUrl";
import Swal from 'sweetalert2';
import { PayPalButton } from "react-paypal-button-v2";

const PayPalButtonWrapper = ({ user, price, cartItems, onClearCart }) => {
  const [sdkReady, setSdkReady] = useState(false);
  const total = Number(price);

  useEffect(() => {
    const addPayPalSdk = async () => {
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=ASJJ7sNVffV5I6CcMuHdIArw-oxEn2SMBsl0SIed3MSpWEFTDK_Wv2B65snUFoDmc7ebCqnthKWtVVf6&data-namespace=paypal_sdk`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      script.onerror = () => {
        throw new Error("PayPal SDK could not be loaded.");
      };
      document.body.appendChild(script);
    };

    addPayPalSdk();
  }, []);

  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: total.toFixed(2),
          },
        },
      ],
    });
  };

  const onApprove = (data, actions) => {
    return actions.order.capture().then(function (details) {
      const checkoutData = {
        paymentData: {
          email: user.email,
          id: details.id,
          paypalTotal: total.toFixed(2),
          courseId: cartItems[0].id,
          userId: user.id
        },
      };
      fetch(`${baseUrl}/api/v1/courses/paypalCheckout`, {
        method: 'POST',
        body: JSON.stringify(checkoutData),
        headers: {
          'Content-Type': 'application/json'
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
    });
  };

  if (!sdkReady) {
    return (
      <div>Loading PayPal button...</div>
    );
  }

  return (
    <div>
      <div className="payment-box">
        <PayPalButton createOrder={createOrder} onApprove={onApprove} />
      </div>
    </div>
  );
};

export default PayPalButtonWrapper;
