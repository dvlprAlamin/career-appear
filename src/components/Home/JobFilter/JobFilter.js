import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { Typography, IconButton, makeStyles } from '@material-ui/core';
import FilterListIcon from '@material-ui/icons/FilterList';
const useStyle = makeStyles(theme => ({
    filterContainer: {
        border: `1px solid ${theme.palette.primary.main}`,
        padding: 20,
        margin: '20px 0',
        boxShadow: '0 0 10px rgba(0,0,0,.2)',
        position: 'sticky',
        top: 25
    },
}))
const JobFilter = () => {
    const { filterContainer } = useStyle()
    const [tag, setTag] = React.useState('default');
    const handleChange = (event) => {
        setTag(event.target.value);
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
                value={tag}
                onChange={handleChange}
                fullWidth
            >
                <MenuItem value='default' disabled>Filter by Tag</MenuItem>
                <MenuItem value='React js'>React js</MenuItem>
                <MenuItem value='Vue js'>Vue js</MenuItem>
                <MenuItem value='Angular js'>Angular js</MenuItem>
            </Select>
        </div>
    );
};

export default JobFilter;