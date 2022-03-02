import { Button, Grid, MenuItem, Paper, Select, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import Constants from '../../Constants';
import API from '../../Network';

const AskQuestion = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [tag, setTag] = useState('Javascript');

    function handlePost() {
        if (!title || !body) {
            return;
        }

        const token = localStorage.getItem('token');
        API(token)
            .post(title, body, tag)
            .then(res => {
                setTitle('');
                setBody('');
                setTag('Javascript');
            })
            .catch(err => {
                console.log(err);
            });

    }
    return (
        <Box
            sx={{
                padding: 2,
                backgroundColor: Constants.colors.background,
                height: '100vh'
            }}>
            <Grid container justifyContent="center">
                <Paper
                    sx={{
                        width: '60%',
                        padding: 2,
                    }}>
                    <Grid item xs={12}>
                        <Typography sx={{ fontWeight: 'bold' }} variant="h7">
                            Title
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h7">
                            Be specific and imagine you're asking a question to another person
                        </Typography>
                    </Grid>
                    <Box sx={{ marginTop: 1 }} />
                    <Grid item xs={12}>
                        <TextField
                            onChange={(event) => setTitle(event.target.value)}
                            value={title}
                            fullWidth
                            placeholder="e.g. Is there an R function for finding the index of an element in a vector"
                            variant="outlined" />
                    </Grid>
                    <Box sx={{ marginTop: 2 }} />
                    <Grid item xs={12}>
                        <Typography sx={{ fontWeight: 'bold' }} variant="h7">
                            Body
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h7">
                            Include all the information someone would need to answer your question
                        </Typography>
                    </Grid>
                    <Box sx={{ marginTop: 1 }} />
                    <Grid item xs={12}>
                        <TextField
                            onChange={(event) => setBody(event.target.value)}
                            value={body}
                            fullWidth
                            multiline
                            rows={10}
                            variant="outlined" />
                    </Grid>
                    <Box sx={{ marginTop: 2 }} />
                    <Grid item xs={12}>
                        <Typography sx={{ fontWeight: 'bold' }} variant="h7">
                            Tag
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h7">
                            Choose a tag
                        </Typography>
                    </Grid>
                    <Box sx={{ marginTop: 1 }} />
                    <Grid item xs={12}>
                        <Select
                            fullWidth
                            value={tag}
                            onChange={(event) => setTag(event.target.value)}
                        >
                            <MenuItem value={"Javascript"}>Javascript</MenuItem>
                            <MenuItem value={"Ruby"}>Ruby</MenuItem>
                            <MenuItem value={"Java"}>Java</MenuItem>
                            <MenuItem value={"MySQL"}>MySQL</MenuItem>
                            <MenuItem value={"Python"}>Python</MenuItem>
                        </Select>
                    </Grid>
                    <Box sx={{ marginTop: 2 }} />
                    <Button onClick={handlePost} variant="contained">Post your question</Button>
                </Paper>
            </Grid>
        </Box>
    );
};

export default AskQuestion;