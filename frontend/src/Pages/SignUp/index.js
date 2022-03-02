import { Button, Container, Paper, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import API from '../../Network';

const SignUp = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    function signUp(event) {
        event.preventDefault();
        const token = localStorage.getItem('token');
        API(token)
            .register(username, password)
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            });
    }
    return (
        <Container sx={{
            marginTop: 10
        }}
            component="main"
            maxWidth="xs">
            <Paper sx={{
                padding: 4
            }}>
                <Typography sx={{ fontWeight: 'bold' }} variant="h5">
                    Register
                </Typography>
                <form onSubmit={signUp}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Username"
                        name="username"
                        autoFocus
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="success"
                    >
                        Sign Up
                    </Button>
                </form>
            </Paper>
        </Container>
    );
};

export default SignUp;