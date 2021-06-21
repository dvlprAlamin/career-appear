import { Button, Container, Grid, Paper, Radio, Select, TextField, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useMyContext } from '../../context';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from './PaymentForm';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import axios from 'axios';
import { useHistory } from 'react-router';
const PaymentProcess = () => {
    const history = useHistory();
    const { loggedInUser, paymentSuccess, setSelectedService } = useMyContext();
    const stripePromise = loadStripe('pk_test_51Igx21EC9cEhbZos93ciYpaYBEYNtdTzdlqeH7luPXmuhdFNUfE7j5QIWL6On98Nh6X2pSSCJxb2RSR2brm8aHZa00qZhejvTt');
    const [paymentOrderToggler, setPaymentOrderToggler] = useState(false)
    const [services, setServices] = useState([]);



    const orderSubmitHandler = () => {
        const orderData = {
            name: loggedInUser.displayName,
            email: loggedInUser.email,
            // service: selectedService.title,
            // fee: selectedService.fee,
            paymentId: paymentSuccess,
            status: 'Pending',
            date: new Date()
        };

        axios.post('https://arcane-sands-09318.herokuapp.com/addOrder', orderData)
            .then(res => {
                if (res.data) {
                    history.push('/my-order');
                    setPaymentOrderToggler(false)
                }
            })
    }
    return (
        <>
            <Container className='sidebarContainer'>
                <Paper elevation={3} style={{ maxWidth: 800, margin: '20px auto', padding: 20 }}>
                    <Grid container spacing={3}>


                        <Grid item lg={12} xs={12}>
                            <Typography variant="caption">Pay with</Typography>
                            <Typography variant="h5"><Radio checked /><CreditCardIcon /> Credit Card</Typography>
                        </Grid>
                        <Grid item lg={12} xs={12}>
                            <Elements stripe={stripePromise}>
                                <PaymentForm
                                    paymentOrderToggler={paymentOrderToggler}
                                    setPaymentOrderToggler={setPaymentOrderToggler}
                                />
                            </Elements>
                        </Grid>
                    </Grid>
                    {/* <div style={{ textAlign: 'center' }}>
                        <Button
                            onClick={orderSubmitHandler}
                            disabled={!paymentOrderToggler}
                            style={{ marginTop: 20 }}
                            variant="contained"
                            color="secondary">
                            Place Order</Button>
                    </div> */}
                </Paper>
            </Container>
        </>
    );
};

export default PaymentProcess;