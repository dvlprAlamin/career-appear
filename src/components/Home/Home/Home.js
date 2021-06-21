import { Container } from '@material-ui/core';
import React from 'react';
import Pagination from '@material-ui/lab/Pagination';
import SingleJobPost from '../SingleJobPost/SingleJobPost';
import JobFilter from '../JobFilter/JobFilter';
import { Grid } from '@material-ui/core';
import axios from 'axios';
import { useMyContext } from '../../../context';
const Home = () => {
    const { currentJobs, pageNumber, paginate, currentPage, setCurrentPage, jobsOnPaginate, loggedInUser } = useMyContext();

    const handleChange = (event, value) => {
        setCurrentPage(value);
        paginate(value)
    };

    const handleJobApply = id => {
        const applicationData = {
            jobId: id,
            email: loggedInUser.email,
        }
        axios.post('https://pacific-garden-69982.herokuapp.com/apply', applicationData)
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
                            jobsOnPaginate.map((job, i) => <SingleJobPost job={job} key={i} handleJobApply={handleJobApply} admin={false} />)
                        }
                    </Grid>
                </Grid>
                <Pagination style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }} color="primary" count={pageNumber} page={currentPage} onChange={handleChange} />
            </Container>
        </>
    );
};

export default Home;