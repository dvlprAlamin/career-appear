import axios from 'axios';
import React from 'react';
import { Container } from '@material-ui/core';
import { useEffect } from 'react';
import { useState } from 'react';
import SingleJobPost from '../Home/SingleJobPost/SingleJobPost';
const JobRequest = () => {
    const [jobs, setJobs] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:4000/allJobs')
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
            {
                jobs.filter(job => job.status === 'pending').map(job => <SingleJobPost job={job} handleJobApprove={handleJobApprove} />)
            }
        </Container>
    );
};

export default JobRequest;