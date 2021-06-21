import axios from 'axios';
import React from 'react';
import { Container } from '@material-ui/core';
import { useEffect } from 'react';
import { useState } from 'react';
import SingleJobPost from '../Home/SingleJobPost/SingleJobPost';
import { Typography } from '@material-ui/core';
const JobRequest = () => {
    const [jobs, setJobs] = useState([]);
    useEffect(() => {
        axios.get('https://pacific-garden-69982.herokuapp.com/pendingJobs')
            .then(res => {
                setJobs(res.data)
            })
    }, [])
    const handleJobApprove = id => {
        axios.patch(`https://pacific-garden-69982.herokuapp.com/updateStatus/${id}`, { status: 'approved' })
            .then(res => {
                console.log(res.data);
            })
    }
    return (
        <Container>
            <Typography variant="h3" style={{ margin: '15px 0', textAlign: 'center' }}>Job Request</Typography>
            {
                jobs.length === 0 ?
                    <div style={{ marginTop: '30vh', textAlign: 'center' }}>
                        <Typography variant="h4">No job requests are pending.</Typography>
                    </div> :
                    jobs.map(job => <SingleJobPost job={job} handleJobApprove={handleJobApprove} admin={true} />)
            }
        </Container>
    );
};

export default JobRequest;