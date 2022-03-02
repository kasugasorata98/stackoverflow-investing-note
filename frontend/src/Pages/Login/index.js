import { Button, Container, Paper, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import API from '../../Network';
import { useNavigate } from "react-router-dom";

const Login = ({ setToken }) => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    function login(event) {
        event.preventDefault();
        const token = localStorage.getItem('token');
        API(token)
            .login(username, password)
            .then(res => {
                console.log(res);
                localStorage.setItem('token', res.token);
                navigate("/");
                setToken(res.token);
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
                    Sign In
                </Typography>
                <form onSubmit={login}>
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
                        Sign In
                    </Button>
                </form>
            </Paper>
        </Container>
    );
};

export default Login;