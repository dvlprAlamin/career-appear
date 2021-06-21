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
    const { currentJobs, pageNumber, paginate, currentPage, setCurrentPage, jobsOnPaginate, loggedInUser } = useMyContext();
    const [jobs, setJobs] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:4000/allJobs')
            .then(res => {
                setJobs(res.data)
            })
    }, [])

    const handleChange = (event, value) => {
        setCurrentPage(value);
        paginate(value)
    };

    const handleJobApply = id => {
        const applicationData = {
            jobId: id,
            email: loggedInUser.email,
        }
        axios.post('http://localhost:4000/apply', applicationData)
            .then(res => {
                console.log(res)
            })
    }
    return (
        <>
            <Container style={{ marginTop: 25 }}>
                <Grid container spacing={3}>
                    <Grid item lg={3} md={3} sm={12}>
                        <JobFilter />
                    </Grid>
                    <Grid item lg={9} md={9} sm={12}>

                        {
                            jobs.map((job, i) => <SingleJobPost job={job} key={i} handleJobApply={handleJobApply} admin={false} />)
                        }
                    </Grid>
                </Grid>
                <Pagination style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }} color="primary" count={pageNumber} page={currentPage} onChange={handleChange} />
            </Container>
        </>
    );
};

export default Home;