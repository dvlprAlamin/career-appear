import { Container, Paper, Typography, Button, IconButton, makeStyles } from '@material-ui/core';
import React, { useEffect } from 'react';
import Pagination from '@material-ui/lab/Pagination';
import { jobsList } from '../../../fakeData';
import SingleJobPost from '../SingleJobPost/SingleJobPost';
import JobFilter from '../JobFilter/JobFilter';
import { useState } from 'react';
import { Grid } from '@material-ui/core';
import axios from 'axios';
import { useMyContext } from '../../../context';
const useStyle = makeStyles(theme => ({

}))
const Home = () => {
    const { currentJobs, pageNumber, paginate, currentPage, setCurrentPage, jobsOnPaginate } = useMyContext();
    const [jobs, setJobs] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:4000/allJobs')
            .then(res => {
                setJobs(res.data)
            })
    }, [])
    // const [page, setPage] = React.useState(1);

    const handleChange = (event, value) => {
        setCurrentPage(value);
        paginate(value)
    };


    return (
        <>
            <Container>
                <Grid container spacing={3}>
                    <Grid item lg={3}>
                        <JobFilter />
                    </Grid>
                    <Grid item lg={9}>

                        {
                            jobsOnPaginate.map((job, i) => <SingleJobPost job={job} key={i} />)
                        }
                    </Grid>
                </Grid>
                <Pagination style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }} color="primary" count={pageNumber} page={currentPage} onChange={handleChange} />
            </Container>
        </>
    );
};

export default Home;