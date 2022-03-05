import { Checkbox, Grid, Typography } from '@mui/material';
import React, { useState } from 'react';
import Constants from '../../Constants';
import API from '../../Network';

const Comment = React.memo(({ comment, isOwner, owner }) => {
    const [isAnswer, setIsAnswer] = useState(comment.isAnswer);

    function markAsAnswer(e) {
        const token = localStorage.getItem('token');
        API(token)
            .markAsAnswer(comment.post, comment._id, !isAnswer)
            .then(res => {
                setIsAnswer(res.isAnswer);
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            });
    }

    return (
        <Grid
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            container>
            <Grid xs={10.5} item sx={{ flexGrow: 1 }}>
                <Grid container item xs={12}>
                    <Typography
                        sx={{ fontSize: 15, color: Constants.colors.blue }}
                        variant='h6'>
                        {comment.user.username}
                    </Typography>
                    {
                        isAnswer ?
                            <Typography
                                sx={{

                                    fontSize: 10,
                                    backgroundColor: 'green',
                                    borderRadius: 2,
                                    p: 0.5,
                                    color: 'white',
                                    alignSelf: 'center',
                                    ml: 1
                                }}
                                variant='inherit'>
                                Answer Verified by {owner}
                            </Typography>
                            :
                            null
                    }
                </Grid>
                <Grid item xs={12}>
                    <Typography
                        sx={{
                            fontSize: 14,
                        }}
                        variant='h7'>
                        <pre style={{ whiteSpace: 'pre-line' }}>
                            {comment.content}
                        </pre>
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography sx={{ fontSize: 12, color: Constants.colors.gray }} variant='h7'>{new Date(comment.createdAt).toLocaleString()}</Typography>
                </Grid>
            </Grid>
            <Grid
                xs={1.5}
                sx={{
                    display: isOwner ? "initial" : 'none',

                }}
                item>
                <Grid wrap='nowrap' justifyContent={'flex-end'} item container>
                    <Typography
                        sx={{
                            fontSize: 10,
                            backgroundColor: 'green',
                            borderRadius: 2,
                            p: 0.5,
                            color: 'white',
                            alignSelf: 'center',
                            ml: 1
                        }}
                        variant='inherit'>
                        Mark as answer
                    </Typography>
                    <Checkbox checked={isAnswer} onChange={markAsAnswer} />
                </Grid>
            </Grid>
        </Grid>
    );
});

export default Comment;