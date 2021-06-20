import { Button, Checkbox, Container, Grid, ListItemText, makeStyles, MenuItem, Select, TextField, Typography } from '@material-ui/core';
import axios from 'axios';
import React, { useState } from 'react';
// import Loader from '../components/Loader';
// import PageHeader from '../components/PageHeader';
// import PagePaper from '../components/PagePaper';
// import AdminSidebar from '../components/Sidebar/AdminSidebar';
// import { useMyContext } from '../context';

const useStyles = makeStyles((theme) => ({
    textArea: {
        width: '100%',
        background: 'transparent',
        borderRadius: 3,
        fontFamily: 'inherit',
        fontSize: 17,
        padding: 9,
        paddingLeft: 13,
        paddingTop: 15,
        border: '1px solid #ccc',
        outline: 0,
        resize: 'vertical',
        color: theme.palette.text.primary,
        '&::placeholder': {
            color: theme.palette.text.secondary,
        },
        '&:hover': {
            borderColor: theme.palette.text.primary
        },
        '&:focus': {
            // outline: theme.palette.primary.main,
            border: '2px solid',
            paddingTop: 14,
            paddingLeft: 12,
            borderColor: theme.palette.primary.main,
            color: theme.palette.text.primary,
        },
    }

}))
const skillList = ['HTML', 'CSS', 'Javascript', 'React']
const tagList = ['web development', 'React developer', 'Front-end developer', 'Back-end developer']
const PostNewJob = () => {
    const { textArea } = useStyles();
    // const { skills } = useMyContext();
    const [loading, setLoading] = useState(false);
    const [skills, setSkills] = useState([]);
    const [tags, setTags] = useState([])
    const [formData, setFormData] = useState({})
    const blurHandler = (e) => {
        const newFormData = { ...formData }
        newFormData[e.target.name] = e.target.value;
        setFormData(newFormData);
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        const jobData = {
            ...formData,
            skills,
            tags,
            status: 'pending'
        }
        axios.post('http://localhost:4000/addJob', jobData)
            .then(res => {
                console.log(res.data);
                res.data && e.target.reset();
                setLoading(false)
            })
            .catch(err => {
                console.log(err);
            });
    };


    return (
        <Container style={{ marginTop: 20 }}>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                    <Grid item lg={6} xs={12}>
                        <Typography color="primary" variant="h5">Job Title</Typography>
                        <TextField
                            fullWidth
                            name="title"
                            onBlur={blurHandler}
                            variant="outlined"
                            placeholder="Enter job title"
                            required
                        />
                    </Grid>
                    <Grid item lg={6} xs={12}>
                        <Typography color="primary" variant="h5">Employer Name</Typography>
                        <TextField
                            fullWidth
                            name="name"
                            onBlur={blurHandler}
                            variant="outlined"
                            placeholder="Enter employer name"
                            required
                        />
                    </Grid>
                    <Grid item lg={4} xs={12}>
                        <Typography color="primary" variant="h5">Job Location</Typography>
                        <TextField
                            fullWidth
                            name="location"
                            onBlur={blurHandler}
                            variant="outlined"
                            placeholder="Enter job location"
                            required
                        />
                    </Grid>
                    <Grid item lg={4} xs={12}>
                        <Typography color="primary" variant="h5">Experience</Typography>
                        <TextField
                            fullWidth
                            name="experience"
                            onBlur={blurHandler}
                            variant="outlined"
                            placeholder="Enter required experience"
                            required
                        />
                    </Grid>
                    <Grid item lg={4} xs={12}>
                        <Typography color="primary" variant="h5">Salary Range</Typography>
                        <TextField
                            fullWidth
                            name="salary"
                            onBlur={blurHandler}
                            variant="outlined"
                            placeholder="Enter salary range"
                            required
                        />
                    </Grid>
                    <Grid item lg={6} xs={12}>
                        <Typography color="primary" variant="h5">Select Required Skill</Typography>                                        <Select
                            multiple
                            fullWidth
                            variant="outlined"
                            value={skills}
                            onChange={(e) => setSkills(e.target.value)}
                            renderValue={(selected) => selected.join(', ')}
                            required
                        >
                            {skillList.map(skill => (
                                <MenuItem key={skill} value={skill}>
                                    <Checkbox color="primary" checked={skills.indexOf(skill) > -1} />
                                    <ListItemText primary={skill} />
                                </MenuItem>
                            ))}
                        </Select>
                    </Grid>
                    <Grid item lg={6} xs={12}>
                        <Typography color="primary" variant="h5">Select Tags</Typography>                                        <Select
                            multiple
                            fullWidth
                            variant="outlined"
                            value={tags}
                            onChange={(e) => setTags(e.target.value)}
                            renderValue={(selected) => selected.join(', ')}
                            required
                        >
                            {tagList.map(tag => (
                                <MenuItem key={tag} value={tag}>
                                    <Checkbox color="primary" checked={tags.indexOf(tag) > -1} />
                                    <ListItemText primary={tag} />
                                </MenuItem>
                            ))}
                        </Select>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography color="primary" variant="h5">Description</Typography>
                        <textarea
                            className={textArea}
                            rows={5}
                            name="description"
                            onBlur={blurHandler}
                            placeholder="Enter project description"
                        />
                    </Grid>



                    <Grid item xs={12} style={{ textAlign: 'center' }}>
                        <Button type="submit" disabled={loading} variant="contained" size="large" color="primary" style={{ margin: '10px auto' }}>Post The Job</Button>
                    </Grid>
                </Grid>

                {/* {loading && <Loader />} */}
            </form>
        </Container>
    );
};

export default PostNewJob;