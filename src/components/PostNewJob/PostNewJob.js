import { Button, Checkbox, Container, Grid, ListItemText, makeStyles, MenuItem, Select, TextField, Typography } from '@material-ui/core';
import axios from 'axios';
import React, { useState } from 'react';

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
            border: '2px solid',
            paddingTop: 14,
            paddingLeft: 12,
            borderColor: theme.palette.primary.main,
            color: theme.palette.text.primary,
        },
    }

}))
const skillList = [
    "HTML",
    "CSS",
    "Javascript",
    "React",
    "React Native",
    "Java",
    "Node",
    "Express",
    "MongoDB",
    "Redux",
    "Bootstrap",
    "Material UI",
    "PHP",
    "Python",
    "Laravel",
    "C",
    "C++",
    "C#",
    ".Net",
    "Django",
    "Vue",
    "Angular"
];
const tagList = [
    "Front-end development",
    "React developer",
    "MERN stack",
    "Full stack",
    "Back-end development",
    "Web development",
    "App development"
];
const PostNewJob = () => {
    const { textArea } = useStyles();
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
        axios.post('https://pacific-garden-69982.herokuapp.com/addJob', jobData)
            .then(res => {
                res.data && e.target.reset();
                setLoading(false)
            })
            .catch(err => {
                console.log(err);
            });
    };


    return (
        <Container style={{ marginTop: 20 }}>
            <Typography variant="h3" style={{ textAlign: 'center', margin: '15px 0' }}>Post a job</Typography>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                    <Grid item lg={4} md={6} xs={12}>
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
                    <Grid item lg={4} md={6} xs={12}>
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
                    <Grid item lg={4} md={6} xs={12}>
                        <Typography color="primary" variant="h5">Company Name</Typography>
                        <TextField
                            fullWidth
                            name="company"
                            onBlur={blurHandler}
                            variant="outlined"
                            placeholder="Enter company name"
                            required
                        />
                    </Grid>
                    <Grid item lg={4} md={6} xs={12}>
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
                    <Grid item lg={4} md={6} xs={12}>
                        <Typography color="primary" variant="h5">Experience</Typography>
                        <TextField
                            fullWidth
                            name="experience"
                            onBlur={blurHandler}
                            variant="outlined"
                            placeholder="Enter experience range in year"
                            required
                        />
                    </Grid>
                    <Grid item lg={4} md={6} xs={12}>
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
                        <Button type="submit" disabled={loading} variant="contained" size="large" color="primary" style={{ margin: '10px auto' }}>Post</Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
};

export default PostNewJob;