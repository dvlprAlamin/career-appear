import AppBar from '@material-ui/core/AppBar';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Toolbar from '@material-ui/core/Toolbar';
import { useState } from 'react';
import { Link } from "react-router-dom";
import { Button, Container } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { useStyles } from './NavigationStyle';
import { useMyContext } from '../../../context';
import { Avatar } from '@material-ui/core';
import logo from '../../../image/logo.png'
import logoBlack from '../../../image/logo-black.png'
import ProfileDialog from './ProfileDialog';

const Navigation = () => {
    const { root, appBar, menuButton, drawerPaper, navbar, navItem, link, navItemDrawer, userAvatar, profileDialogStyle } = useStyles()
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    const { loggedInUser, userRole } = useMyContext();
    // Profile dialog
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const drawer = (
        <div style={{ textAlign: 'center' }}>
            <img src={logoBlack} style={{ maxWidth: '90%', margin: '20px auto' }} alt="Logo" />
            <Divider />
            <Link to='/' className={link}>
                <ListItem button
                    className={navItemDrawer}
                >
                    <ListItemText primary={'Jobs'} />
                </ListItem>
            </Link>
            <Divider />
            <Link to='/dashboard' className={link}>
                <ListItem button
                    className={navItemDrawer}
                >
                    <ListItemText primary={'Dashboard'} />
                </ListItem>
            </Link>
            <Divider />
        </div>
    );
    return (
        <div className={root}>
            <AppBar className={appBar}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        className={menuButton}
                    >
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <nav>
                <Hidden mdUp implementation="css">
                    <Drawer
                        variant="temporary"
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        classes={{
                            paper: drawerPaper,
                        }}
                        ModalProps={{
                            keepMounted: true,
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
            </nav>

            <Container className={navbar}>
                <div style={{ flex: 1 }}>
                    <img src={logo} style={{ maxHeight: 60, width: 'auto' }} alt="Logo" />
                </div>
                <div style={{ flex: 3, textAlign: 'right', position: 'relative' }}>
                    <span>
                        <Link className={link} to='/'>
                            <Button>
                                <span className={navItem}>Home</span>
                            </Button>
                        </Link>
                        {
                            loggedInUser ?
                                <>

                                    <Link className={link} to='/dashboard' style={{ marginRight: 50 }}>
                                        {userRole !== 'jobSeeker' &&
                                            <Button>
                                                <span className={navItem}>Dashboard</span>
                                            </Button>
                                        }
                                    </Link>
                                    <ProfileDialog className={profileDialogStyle} open={open} onClose={handleClose} />
                                    <div className={userAvatar} >
                                        <Avatar onClick={handleClickOpen} src={loggedInUser.photoURL} />
                                    </div>
                                </> :
                                <>
                                    <Link className={link} to='/signup'>
                                        <Button>
                                            <span className={navItem}>Sign up</span>
                                        </Button>
                                    </Link>
                                    <Link className={link} to='/login'>
                                        <Button>
                                            <span className={navItem}>Login</span>
                                        </Button>
                                    </Link>
                                </>
                        }

                    </span>
                </div>
            </Container>
        </div>
    );
}


export default Navigation;