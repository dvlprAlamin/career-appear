import { Container, Grid, Radio, Typography } from '@material-ui/core';
import React from 'react';
import { useMyContext } from '../../context';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from './PaymentForm';
import CreditCardIcon from '@material-ui/icons/CreditCard';
const PaymentProcess = () => {
    const { paymentSignupToggler, setPaymentSignupToggler } = useMyContext();
    const stripePromise = loadStripe('pk_test_51Igx21EC9cEhbZos93ciYpaYBEYNtdTzdlqeH7luPXmuhdFNUfE7j5QIWL6On98Nh6X2pSSCJxb2RSR2brm8aHZa00qZhejvTt');

    return (
        <>
            <Container className='sidebarContainer'>
                <div style={{ maxWidth: 800, margin: '20px auto', padding: 20 }}>
                    <Grid container spacing={3}>
                        <Grid item lg={12} xs={12}>
                            <Typography variant="caption">Setup payment method</Typography>
                            <Typography variant="h5"><Radio checked color="primary" /><CreditCardIcon /> Credit Card</Typography>
                        </Grid>
                        <Grid item lg={12} xs={12}>
                            <Elements stripe={stripePromise}>
                                <PaymentForm
                                    paymentSignupToggler={paymentSignupToggler}
                                    setPaymentSignupToggler={setPaymentSignupToggler}
                                />
                            </Elements>
                        </Grid>
                    </Grid>
                </div>
            </Container>
        </>
    );
};

export default PaymentProcess;