import { Button, Typography } from '@material-ui/core';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useState } from 'react';
import { useMyContext } from '../../context';

const PaymentForm = ({ paymentSignupToggler, setPaymentSignupToggler }) => {
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
            setPaymentSignupToggler(true);
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
                    color="primary"
                    type="submit"
                    disabled={!stripe || paymentSignupToggler}>
                    {!paymentSignupToggler ? 'Ok' : 'Done'}
                </Button>
            </form>
            {paymentError && <Typography color="secondary" variant="body1">{paymentError}</Typography>}
            {paymentSignupToggler && <Typography style={{ color: '#008000' }} variant="body1">Success</Typography>}
        </>
    );
};

export default PaymentForm;