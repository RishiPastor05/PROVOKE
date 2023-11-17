import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StripeCheckout from 'react-stripe-checkout';
import toast from 'react-hot-toast';

const PaymentForm = () => {
  const [amount, setAmount] = useState(0);
  const [sessionId, setSessionId] = useState(null);
  const [data, setData] = useState([]);
  const [activeCard, setActiveCard] = useState(0); // Default to the first card

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get('/api/v1/getsubs');
        if (res.data.success) {
          setData(res.data.data);
          // Set the default amount to the price of the first card
          if (res.data.data.length > 0) {
            setAmount(res.data.data[0].price);
          }
        }
      } catch (error) {
        toast.error('An error occurred fetching the subscription data');
      }
    }
    fetchData();
  }, []);

  const createPaymentSession = async () => {
    try {
      const response = await axios.post('/api/v1/payment', { amount });
      setSessionId(response.data.sessionId);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-10 p-10 bg-gray-100">
      <h2 className="text-4xl font-bold leading-8">Buy Our Subscription</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data.length === 0 ? (
          <div className="text-lg">Loading...</div>
        ) : (
          data.map((subsData, index) => (
            <div
              key={index}
              className={`bg-white rounded-lg p-4 hover:shadow-md transition duration-300 flex flex-col items-center justify-center gap-4 ${
                activeCard === index ? 'border border-blue-500' : ''
              }`}
            >
              <p className="text-lg capitalize font-bold">{subsData.name}</p>
              <h1 className="text-xl font-bold leading-6">{subsData.price}</h1>
              <div
                className={`mt-2 py-2 px-4 bg-blue-500 text-white rounded-md cursor-pointer hover:bg-blue-600 transition duration-300 ${
                  activeCard === index ? 'bg-blue-500' : ''
                }`}
                onClick={() => {
                  setAmount(subsData.price);
                  setActiveCard(index);
                }}
              >
                Select Plan
              </div>
            </div>
          ))
        )}
      </div>

      <button
        onClick={createPaymentSession}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md transition duration-300"
      >
        Create Payment Session
      </button>

      {sessionId && (
        <StripeCheckout
          token={() => {
            alert('Payment successful!');
          }}
          stripeKey="pk_test_51ODJjXSIZbfYCnS2eRPdFckCSHlt32rIFqz3PjmIXjNL2nl22XJWSshMfQBPLyak7xfzA1rLWLOCaz5dCafqCq4B00w4eRu3wH"
          amount={amount * 100}
          currency="INR"
          name="Your Product Name"
          description="Payment Description"
        />
      )}
    </div>
  );
};

export default PaymentForm;
