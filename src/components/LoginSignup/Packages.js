import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Radio } from '@material-ui/core';
import RadioGroup from '@material-ui/core/RadioGroup';
const packageData = [
    {
        name: 'Basic',
        price: 10,
        time: 10
    },
    {
        name: 'Standard',
        price: 15,
        time: 20
    },
    {
        name: 'Premium',
        price: 20,
        time: 30
    },
]

const useStyle = makeStyles(theme => ({
    packageSingle: {
        border: `1px solid ${theme.palette.primary.main}`,
        padding: 10,
        textAlign: 'center',
        marginTop: 10
    }
}))

const Packages = ({ setSelectPackage, setPackageName }) => {
    const { packageSingle } = useStyle()
    return (
        <div>
            <Typography variant="h5" style={{ marginTop: 30, textAlign: 'center' }}>Choose a package for sign up</Typography>
            <RadioGroup row aria-label="position" name="position" defaultValue="top">
                <Grid container spacing={2}>
                    {
                        packageData.map(({ name, price, time }) => (
                            <Grid item xs={4}>
                                <div className={packageSingle}>
                                    <FormControlLabel
                                        onChange={e => {
                                            setSelectPackage(true)
                                            setPackageName(e.target.value)
                                        }}
                                        value={name}
                                        labelPlacement="top"
                                        control={<Radio color="primary" required />}
                                        label={<div>
                                            <Typography variant="h6">{name}</Typography>
                                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'baseline' }}>
                                                <Typography variant="h4" color="primary">${price}</Typography>
                                                <Typography variant="body1" color="textSecondary">/mo</Typography>
                                            </div>
                                            <Typography variant="body1">{time} hours</Typography>
                                        </div>} />
                                </div>
                            </Grid>
                        ))
                    }
                </Grid>
            </RadioGroup>
        </div>
    );
};

export default Packages;