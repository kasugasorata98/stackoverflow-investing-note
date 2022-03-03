import { Button, Divider, Grid, MenuItem, Paper, Select, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useCallback, useEffect, useState } from 'react';
import Constants from '../../Constants';
import API from '../../Network';
import { useLocation } from "react-router-dom";
import Comment from '../../Components/Comment';

const ViewQuestion = () => {
    const location = useLocation();
    const { id } = location.state;

    const [post, setPost] = useState({
        _id: '',
        user: {
            _id: '',
            username: '',
        },
        title: '',
        body: '',
        tag: '',
    });

    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);
    const [isOwner, setIsOwner] = useState(false);
    const [owner, setOwner] = useState('');

    useEffect(() => {
        API(null)
            .getOnePost(id)
            .then(res => {
                setPost(res.post);
            })
            .catch(err => {
                console.log(err);
            });
    }, [id]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        API(token)
            .getPostOwnership(id)
            .then(res => {
                console.log("Owner? :", res.ownership);
                setIsOwner(res.ownership);
                setOwner(res.owner);
            })
            .catch(err => {
                console.log(err);
            });
    }, [id]);

    const getComments = useCallback(() => {
        API(null)
            .getComments(id)
            .then(res => {
                console.log(res);
                setComments(res.comments);
            })
            .catch(err => {
                console.log(err);
            });
    }, [id]);

    useEffect(() => {
        getComments();
    }, [id, getComments]);

    function keyPress(e) {
        if (e.keyCode === 13 && !e.shiftKey) {
            e.preventDefault();
            const token = localStorage.getItem('token');
            API(token)
                .comment(post._id, comment)
                .then(res => {
                    console.log(res);
                    setComment('');
                    getComments();
                })
                .catch(err => {
                    console.log(err);
                });
        }
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
                        <Typography sx={{ fontWeight: 'bold' }} variant="h6">
                            {post.title}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography sx={{ fontSize: 12, fontWeight: 'bold' }} variant="h7">
                            {`${post.user.username} `}
                        </Typography>
                        <Typography sx={{ fontSize: 12 }} variant="h7">
                            asked at {new Date(post.createdAt).toLocaleString()}
                        </Typography>
                    </Grid>
                    <Divider sx={{ width: '100%', mt: 1, mb: 1 }} />
                    <Grid item xs={12}>
                        <Typography variant="h7">
                            <pre style={{ overflow: 'auto' }}>{post.body}</pre>
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            onChange={(event) => setComment(event.target.value)}
                            placeholder="Write a comment.. to make new line, press SHIFT+ENTER key"
                            fullWidth
                            value={comment}
                            multiline
                            onKeyDown={keyPress}
                            variant="outlined" />
                    </Grid>
                    <Grid sx={{ mt: 1 }} item xs={12}>
                        {
                            comments.map((comment, index) => {
                                return <Comment key={index} owner={owner} isOwner={isOwner} comment={comment} />;
                            })
                        }
                    </Grid>
                </Paper>
            </Grid>
        </Box>
    );
};

export default ViewQuestion;