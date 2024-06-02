import React, { useEffect, useRef } from 'react';

const PayPalButton = () => {
  const paypalRef = useRef();

  useEffect(() => {
    const loadPayPalScript = () => {
      return new Promise((resolve, reject) => {
        if (document.getElementById('paypal-script')) {
          return resolve();
        }
        const script = document.createElement('script');
        script.id = 'paypal-script';
        script.src = 'https://www.paypal.com/sdk/js?client-id=sb&vault=true&intent=subscription';
        script.setAttribute('data-sdk-integration-source', 'button-factory');
        script.async = true;
        script.onload = resolve;
        script.onerror = reject;
        document.body.appendChild(script);
      });
    };

    const renderPayPalButton = () => {
      if (window.paypal && paypalRef.current) {
        window.paypal.Buttons({
          style: {
            shape: 'rect',
            color: 'gold',
            layout: 'vertical',
            label: 'subscribe',
          },
          createSubscription: (data, actions) => {
            return actions.subscription.create({
              plan_id: 'P-8R920298L5863443KMZMWUMI',
            });
          },
          onApprove: (data, actions) => {
            alert(data.subscriptionID); // Optional success message for the subscriber
          },
          onError: (err) => {
            console.error('PayPal Button Error:', err);
          }
        }).render(paypalRef.current).catch((err) => {
          console.error('PayPal Button Render Error:', err);
        });
      }
    };

    loadPayPalScript()
      .then(renderPayPalButton)
      .catch((err) => {
        console.error('PayPal Script Load Error:', err);
      });

    return () => {
      const buttonContainer = paypalRef.current;
      if (buttonContainer) {
        buttonContainer.innerHTML = ''; // Clear the PayPal button container
      }
    };
  }, []);

  return <div ref={paypalRef}></div>;
};

export default PayPalButton;
