import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Paper } from '@material-ui/core';
import { useHistory, useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { useMyContext } from '../../context';
import Packages from './Packages';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import PaymentProcess from '../Payment/PaymentProcess';
import axios from 'axios';


const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(1),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.primary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function LoginSignup() {
    const classes = useStyles();
    const { signUp, login, googleSignIn, paymentSignupToggler, paymentSuccess } = useMyContext();
    const history = useHistory();
    const location = useLocation();
    const { pathname } = location;
    const { from } = location.state || { from: { pathname: "/" } };
    const [user, setUser] = useState({})
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const [accountType, setAccountType] = useState('')
    const [selectPackage, setSelectPackage] = useState(false)

    const [packageName, setPackageName] = useState('')
    const onBlurHandler = (e) => {
        const newUser = { ...user };
        newUser[e.target.name] = e.target.value;
        setUser(newUser);
    }
    const handleUser = (role) => {
        let newUserData = {};
        if (role === 'employer') {
            newUserData = {
                name: user.name,
                email: user.email,
                role,
                package: packageName,
                paymentId: paymentSuccess

            }
        } else if (role === 'jobSeeker') {
            newUserData = {
                name: user.name,
                email: user.email,
                role
            }
        }
        axios.post('http://localhost:4000/newUser', newUserData)
            .then(res => {
                console.log(res);
            })
    }
    const signUpHandler = async e => {
        e.preventDefault();
        try {
            setError('')
            setLoading(true)
            await signUp(user.email, user.password)
            handleUser(accountType);
            history.replace(from)
        } catch {
            setError('Failed to create account')
        }
        setLoading(false)
    }
    const loginHandler = async e => {
        e.preventDefault();
        try {
            setError('')
            setLoading(true)
            await login(user.email, user.password)
            history.replace(from)
        } catch {
            setError('Failed to login')
        }
        setLoading(false)
    }
    const googleSignInHandler = async () => {
        try {
            setError('')
            setLoading(true)
            await googleSignIn();
            history.replace(from)
        } catch (error) {
            setError('Failed to login')
        }
    }

    return (
        <Container component="main" maxWidth={pathname === '/signup' ? 'sm' : 'xs'}>
            <Paper elevation={3} style={{ padding: 15, margin: '20px auto' }}>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar} />
                    <Typography component="h1" variant="h5">
                        {pathname === '/signup' ? 'Sign up' : 'Log in'}
                    </Typography>

                    <form className={classes.form} onSubmit={pathname === '/signup' ? signUpHandler : loginHandler}>
                        {
                            pathname === '/signup' &&
                            <RadioGroup onChange={(e) => setAccountType(e.target.value)} row aria-label="position" name="position" defaultValue="top" style={{ justifyContent: 'center' }}>
                                <FormControlLabel value="employer" control={<Radio color="primary" required />} label="For Employer" />
                                <FormControlLabel value="jobSeeker" control={<Radio color="primary" required />} label="For Job seeker" />
                            </RadioGroup>
                        }
                        <Grid container spacing={2}>
                            {pathname === '/signup' &&
                                <Grid item xs={12}>
                                    <TextField
                                        autoComplete="name"
                                        onBlur={onBlurHandler}
                                        name="name"
                                        variant="standard"
                                        required
                                        fullWidth
                                        id="name"
                                        label="Full Name"
                                        autoFocus
                                    />
                                </Grid>}
                            <Grid item xs={12}>
                                <TextField
                                    onBlur={onBlurHandler}
                                    variant="standard"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    onBlur={onBlurHandler}
                                    variant="standard"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                />
                            </Grid>
                        </Grid>


                        {pathname === '/login' ?
                            <Button
                                // onClick={loginHandler}
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Log In
                            </Button> :
                            accountType === 'employer' ?
                                <Button
                                    disabled={!paymentSignupToggler}
                                    // onClick={signUpHandler}
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                >
                                    Sign Up
                                </Button> :
                                <Button
                                    disabled={loading}
                                    // onClick={signUpHandler}
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                >
                                    Sign Up
                                </Button>}

                    </form>
                    {
                        (pathname === '/signup' && accountType === 'employer') &&
                        <>
                            <Packages setSelectPackage={setSelectPackage} setPackageName={setPackageName} />
                            {selectPackage && <PaymentProcess />}
                        </>
                    }
                    {pathname === '/signup' ?
                        <span>Already have an account? <Link to="/login">
                            Log in
                        </Link></span> :
                        <span>Don't have an account? <Link to="/signup">
                            Sign Up
                        </Link></span>}
                    <Typography variant="h6">-OR-</Typography>
                    <Button style={{ marginTop: 10, background: '#202C45', color: '#fff' }} onClick={googleSignInHandler} variant="contained">Continue with Google</Button>
                </div>
            </Paper>
        </Container>
    );
}