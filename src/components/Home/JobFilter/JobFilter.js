import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { Typography, IconButton, makeStyles } from '@material-ui/core';
import FilterListIcon from '@material-ui/icons/FilterList';
import { useMyContext } from '../../../context';
const useStyle = makeStyles(theme => ({
    filterContainer: {
        border: `1px solid ${theme.palette.primary.main}`,
        padding: 20,
        boxShadow: '0 0 10px rgba(0,0,0,.2)',
        position: 'sticky',
        top: 25
    },
}))
const JobFilter = () => {
    const { filterContainer } = useStyle()
    const { filterTag, setFilterTag } = useMyContext();
    // const [tag, setTag] = React.useState('default');
    const handleChange = (event) => {
        setFilterTag(event.target.value);
    };
    return (
        <div className={filterContainer}>
            <Typography variant="h4">Filter
                <IconButton>
                    <FilterListIcon color="primary" style={{ fontSize: 36 }} />
                </IconButton>
            </Typography>
            <Select
                variant="outlined"
                value={filterTag}
                onChange={handleChange}
                fullWidth
            >
                <MenuItem value='all' disabled>Filter by Tag</MenuItem>
                {
                    [
                        "Front-end development",
                        "React developer",
                        "MERN stack",
                        "Full stack",
                        "Back-end development",
                        "Web development",
                        "App development"
                    ].map(item => <MenuItem value={item} key={item}>{item}</MenuItem>)
                }
            </Select>
        </div>
    );
};

export default JobFilter;