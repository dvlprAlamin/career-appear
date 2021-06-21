import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import { useMyContext } from '../../../context';
import { Typography } from '@material-ui/core';


const ProfileDialog = ({ onClose, selectedValue, open }) => {

    const { loggedInUser, logOut } = useMyContext();
    const handleClose = () => {
        onClose(selectedValue);
    };
    const logOutHandler = async e => {
        try {
            await logOut();
            console.log('log out successfully');
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <Dialog onClose={handleClose} open={open} style={{ padding: 10 }}>
            <div style={{ textAlign: 'center', padding: 10 }}>
                <img src={loggedInUser.photoURL} width="100" style={{ borderRadius: '50%' }} alt="" />
                <Typography variant="h5">{loggedInUser.displayName}</Typography>
                <Typography variant="body1">{loggedInUser.email}</Typography>
            </div>
            <Button onClick={logOutHandler} variant="contained" color="primary" size="large">Logout</Button>
        </Dialog>
    );
}
export default ProfileDialog;
