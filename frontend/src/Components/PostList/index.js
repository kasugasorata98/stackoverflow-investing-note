import { Grid, Link, Typography } from '@mui/material';
import React from 'react';
import { NavLink } from 'react-router-dom';
import Constants from '../../Constants';

const PostList = React.memo(({ post }) => {
    return (
        <>
            <Grid container sx={{
                paddingTop: 4,
                paddingBottom: 4,
                paddingRight: 2,
                paddingLeft: 2,
                backgroundColor: Constants.colors.postList
            }}>
                <Grid item xs={12}>
                    <Link component={NavLink} to={`/viewQuestion`}
                        state={{ id: post._id }}>
                        <Typography variant="h7">
                            {post.title}
                        </Typography>
                    </Link>
                </Grid>
                <Grid
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    container
                    item>
                    <Grid item sx={{
                        backgroundColor: Constants.colors.tag,
                        padding: 0.5,
                        borderRadius: 2,
                        mt: 1,
                        pr: 1,
                        pl: 1
                    }}>
                        <Typography variant="h7" sx={{
                            fontSize: 12
                        }}>
                            {post.tag}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography
                            variant="h7"
                            sx={{
                                fontSize: 13,
                                alignSelf: 'flex-end'
                            }}>
                            <Typography
                                variant="h7"
                                sx={{
                                    fontSize: 13,
                                    alignSelf: 'flex-end',
                                    color: Constants.colors.blue,
                                    fontWeight: 'bold'
                                }}>
                                {`${post.user.username} `}
                            </Typography>
                            {`posted at ${new Date(post.createdAt).toLocaleString()}`}
                        </Typography>
                    </Grid>
                </Grid>

            </Grid>
        </>
    );
});

export default PostList;