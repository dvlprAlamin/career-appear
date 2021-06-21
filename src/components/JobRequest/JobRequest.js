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
        axios.get('http://localhost:4000/pendingJobs')
            .then(res => {
                setJobs(res.data)
            })
    }, [])
    console.log(jobs);
    const handleJobApprove = id => {
        axios.patch(`http://localhost:4000/updateStatus/${id}`, { status: 'approved' })
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
                    jobs.map(job => <SingleJobPost job={job} handleJobApprove={handleJobApprove} />)
            }
        </Container>
    );
};

export default JobRequest;