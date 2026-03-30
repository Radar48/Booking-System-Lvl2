import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import API from '../services/api';

export default function CheckoutButton({ eventId, ticketId }) {
    const stripe = useStripe();
    const elements = useElements();

    const handleCheckout = async () => {
        if (!stripe || !elements) return;

        try {
        // payment intent from backend
        const { data } = await API.post(`/payments/checkout`, { eventId, ticketId });

        const result = await stripe.confirmCardPayment(data.clientSecret, {
            payment_method: {
            card: elements.getElement(CardElement),
            },
        });

        if (result.error) {
            alert(`Payment failed: ${result.error.message}`);
        } else if (result.paymentIntent.status === 'succeeded') {
            alert('🎉 Payment successful! Ticket booked.');
            // Optionally refresh tickets or redirect
        }
        } catch (err) {
            alert('❌ Payment request failed. Please try again.');
        }
    };

    return (
        <div className="checkout-container">
            <CardElement className="card-element" />
            <button onClick={handleCheckout} disabled={!stripe} className="btn-primary">
                Pay Now
            </button>
        </div>
    );
}