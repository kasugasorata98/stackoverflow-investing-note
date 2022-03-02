import React from 'react';
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Button, Box } from '@mui/material';
import SearchBar from '../SearchBar';

const Header = ({ token, setToken, setSearchQuery, searchQuery }) => {
    function handleLogout() {
        localStorage.removeItem('token');
        setToken(null);
    }

    return (
        <AppBar
            sx={{
                paddingRight: "20%",
                paddingLeft: "20%",
            }}
            position="static">
            <Toolbar>
                <Button component={Link} to="/" sx={{ textTransform: 'none' }} color="inherit">Home</Button>
                <SearchBar setSearchQuery={setSearchQuery} searchQuery={searchQuery} />
                <Box sx={{ flexGrow: 1 }} />
                {
                    token ?
                        <>
                            <Button
                                component={Link}
                                to="/"
                                sx={{ textTransform: 'none' }}
                                onClick={handleLogout}
                                color="inherit">
                                Logout
                            </Button>
                        </>
                        :
                        <>
                            <Button component={Link} to="/login" sx={{ textTransform: 'none' }} color="inherit">Login</Button>
                            <Button component={Link} to="/signUp" sx={{ textTransform: 'none' }} color="inherit">Sign up</Button>
                        </>
                }
            </Toolbar>
        </AppBar>
    );
};

export default Header;