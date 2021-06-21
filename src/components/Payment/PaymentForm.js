import { Button, Typography } from '@material-ui/core';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useState } from 'react';
import { useMyContext } from '../../context';

const PaymentForm = ({ paymentOrderToggler, setPaymentOrderToggler }) => {
    const { setPaymentSuccess } = useMyContext();
    const stripe = useStripe();
    const elements = useElements();
    const [paymentError, setPaymentError] = useState('')
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }
        const cardElement = elements.getElement(CardElement);
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
        });

        if (error) {
            setPaymentSuccess('')
            setPaymentError(error.message)
        } else {
            setPaymentError('')
            setPaymentSuccess(paymentMethod.id)
            setPaymentOrderToggler(true);
            event.target.reset();
        }
    };
    return (
        <>
            <form onSubmit={handleSubmit}>
                <CardElement />
                <Button
                    style={{ marginTop: 20 }}
                    variant="contained"
                    color="secondary"
                    type="submit"
                    disabled={!stripe || paymentOrderToggler}>
                    {!paymentOrderToggler ? 'Pay' : 'Paid'}
                </Button>
            </form>
            {paymentError && <Typography color="secondary" variant="body1">{paymentError}</Typography>}
            {paymentOrderToggler && <Typography style={{ color: '#008000' }} variant="body1">Payment successful</Typography>}
        </>
    );
};

export default PaymentForm;