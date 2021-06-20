import { Paper, Typography, Button, IconButton, makeStyles, Box } from '@material-ui/core';
import React from 'react';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';

const useStyle = makeStyles(theme => ({
    jobSingleContainer: {
        border: `1px solid ${theme.palette.primary.main}`,
        padding: 20,
        margin: '20px 0',
        boxShadow: '0 0 10px rgba(0,0,0,.2)'
    },
    iconInfo: {
        display: 'inline-flex',
        alignItems: 'center',
        marginRight: 20
    },
    technologyItem: {
        border: `1px solid ${theme.palette.primary.main}`,
        color: theme.palette.primary.main,
        margin: '3px 6px 3px 0',
        padding: '2px 5px'
    }
}))
const SingleJobPost = ({ job }) => {
    console.log(job);
    const { jobSingleContainer, iconInfo, technologyItem } = useStyle();
    const { title, company, location, experience, salary, summary, skillSet } = job || {};
    return (
        <div className={jobSingleContainer}>
            <Typography variant="h4" color="primary">{title}</Typography>
            <Typography variant="h6">{company}</Typography>
            <Typography variant="body1">
                <span className={iconInfo}>
                    <IconButton>
                        <LocationOnIcon color="primary" />
                    </IconButton>
                    {location}
                </span>
                <span className={iconInfo}>
                    <IconButton>
                        <BusinessCenterIcon color="primary" />
                    </IconButton>
                    {experience} Years
                </span>
                <span className={iconInfo}>
                    <IconButton>
                        <AttachMoneyIcon color="primary" />
                    </IconButton>
                    {salary}
                </span>
            </Typography>
            <Typography variant="body1">
                {summary}
            </Typography>
            <Box my={2}>
                {
                    skillSet.map(item => <span key={item} className={technologyItem}>{item}</span>)
                }
            </Box>
            <Button variant="contained" color="primary">Apply Now</Button>
        </div>
    );
};

export default SingleJobPost;