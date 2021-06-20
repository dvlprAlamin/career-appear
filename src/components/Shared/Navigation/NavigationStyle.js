import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 200;
export const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        background: theme.palette.primary.main,
        height: 64,
        [theme.breakpoints.down('sm')]: {
            background: 'transparent'
        },
    },
    link: {
        textDecoration: 'none',
        color: theme.palette.text.primary,
    },
    navLogoText: {
        // color: theme.palette.primary.main,
        textAlign: 'center',
        margin: '1rem .3rem'
    },
    logoImg: {
        padding: '1rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    drawer: {
        [theme.breakpoints.up('md')]: {
            width: drawerWidth,
            flexShrink: 0,
            display: 'none'
        },
    },
    navbar: {
        [theme.breakpoints.down('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
            display: 'none'
        },
        minHeight: 64,
        display: 'flex',
        alignItems: 'center',
    },
    appBar: {
        [theme.breakpoints.up('md')]: {
            width: '100%',
            display: 'none',
        },
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    navItem: {
        borderBottom: '2px solid transparent',
        color: '#fff',
        transition: '.3s',
        '&:hover': {
            borderColor: '#FFF',
        }
    },
    navItemDrawer: {
        display: 'flex',
        alignItems: 'center',
        transition: '.3s linear',
        color: '#202C45',
        borderRight: '4px solid transparent',
        '&:hover': {
            borderColor: theme.palette.primary.main,
            color: theme.palette.primary.main,
        },
    },
    userAvatar: {
        position: 'absolute',
        right: 0,
        top: 0
    }
}));