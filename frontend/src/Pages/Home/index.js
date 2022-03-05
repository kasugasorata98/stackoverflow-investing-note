import { Box, Grid, Paper, Typography, Divider, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Pagination from '../../Components/Pagination';
import PostList from '../../Components/PostList';
import Constants from '../../Constants';
import API from '../../Network';
import { useNavigate } from "react-router-dom";

const Home = React.memo(({ searchQuery, setAlert, username }) => {
    const navigate = useNavigate();
    const [data, setData] = useState({
        posts: [],
        hasNext: false,
        count: 0
    });
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(5);
    const [selectedTag, setSelectedTag] = useState('');

    const tags = [
        'Javascript',
        'Ruby',
        'Java',
        'MySQL',
        'Python',
        'Clear'
    ];

    useEffect(() => {
        const token = localStorage.getItem('token');
        API(token)
            .getPosts(page + 1, limit, searchQuery, selectedTag)
            .then(res => {
                setData({
                    posts: res.posts,
                    hasNext: res.hasNext,
                    count: res.count
                });
            })
            .catch(err => {
                console.log(err);
            });
    }, [page, limit, searchQuery, selectedTag]);

    return (
        <Box
            sx={{
                padding: 2,
            }}>
            <Grid container justifyContent="center">
                <Paper
                    sx={{
                        width: '60%',
                        padding: 2,
                    }}>
                    <Grid item>
                        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                            Welcome back, {username}
                        </Typography>
                    </Grid>
                    <Grid
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        container>
                        <Grid item>
                            <Typography variant="h5">
                                Questions
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Button onClick={() => {
                                const token = localStorage.getItem('token');
                                if (token) {
                                    navigate("/askQuestion");
                                }
                                else {
                                    setAlert(prevAlert => ({
                                        ...prevAlert,
                                        message: 'You must be logged in to ask a question',
                                        severity: 'error',
                                        open: true
                                    }));
                                }
                            }} sx={{ textTransform: 'none' }} color="inherit">Ask a question</Button>
                        </Grid>
                    </Grid>
                    <Grid sx={{
                        mb: 1
                    }} item>
                        <Typography variant="h7" sx={{
                            fontSize: 12,
                            textDecoration: 'underline',
                        }}>
                            Filter by tag
                        </Typography>
                    </Grid>
                    <Grid
                        container
                        item>
                        {
                            tags.map((tag, index) => {
                                return (
                                    <Grid key={index} item sx={{
                                        borderRadius: 2,
                                        mr: 0.5,
                                        mb: 0.5,
                                        ml: tag === 'Clear' ? 1 : null
                                    }}>
                                        <Typography
                                            onClick={() => {
                                                if (tag === "Clear") {
                                                    setSelectedTag('');
                                                }
                                                else {
                                                    setSelectedTag(tag);
                                                }
                                                setPage(0);
                                            }} component={'button'} variant="h7" sx={{
                                                fontSize: 12,
                                                backgroundColor: selectedTag === tag ? Constants.colors.selectedTag : Constants.colors.tag,
                                                color: selectedTag === tag ? 'white' : null
                                            }}>
                                            {tag}
                                        </Typography>
                                    </Grid>
                                );

                            })
                        }
                    </Grid>
                    {
                        data.posts.map((post, index) => {
                            return (
                                <div key={post._id}>
                                    <Divider sx={{ width: '100%' }} />
                                    <PostList post={post} />
                                    {
                                        index + 1 === limit ? <Divider sx={{ width: '100%' }} /> : null
                                    }
                                </div>
                            );
                        })
                    }
                    <Pagination data={data} page={page} limit={limit} setPage={setPage} setLimit={setLimit} />
                </Paper>
            </Grid>
        </Box>

    );

});


export default Home;