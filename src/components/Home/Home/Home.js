import { Container, Paper, Typography, Button, IconButton, makeStyles } from '@material-ui/core';
import React, { useEffect } from 'react';
import Pagination from '@material-ui/lab/Pagination';
import { jobs } from '../../../fakeData';
import SingleJobPost from '../SingleJobPost/SingleJobPost';
import JobFilter from '../JobFilter/JobFilter';
import { useState } from 'react';
import { Grid } from '@material-ui/core';
import axios from 'axios';
const useStyle = makeStyles(theme => ({

}))
const Home = () => {
    const [jobs, setJobs] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:4000/allJobs')
            .then(res => {
                setJobs(res.data)
            })
    }, [])
    const [page, setPage] = React.useState(1);
    const jobsPerPage = 3;
    const defaultValue = jobs.slice(0, jobsPerPage)
    const [jobsOnPaginate, setJobsOnPaginate] = useState(defaultValue);
    const pageNumber = Math.ceil(jobs.length / jobsPerPage);

    const handleChange = (event, value) => {
        setPage(value);
        const indexOfLastJob = page * jobsPerPage;
        const indexOfFirstJob = indexOfLastJob - jobsPerPage;
        const newJob = jobs.slice(indexOfFirstJob, indexOfLastJob)
        setJobsOnPaginate(newJob)
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
                            jobs.filter(job => job.status === 'approved').map((job, i) => <SingleJobPost job={job} key={i} />)
                        }
                    </Grid>
                </Grid>
                <Pagination style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }} color="primary" count={pageNumber} page={page} onChange={handleChange} />
            </Container>
        </>
    );
};

export default Home;