import React from 'react';
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Button, Box } from '@mui/material';
import SearchBar from '../SearchBar';

const Header = React.memo(({ token, setToken, setSearchQuery, searchQuery, setAlert, setUsername }) => {
    function handleLogout() {
        localStorage.removeItem('token');
        setToken(null);
        setAlert(prevAlert => ({
            ...prevAlert,
            severity: 'success',
            message: 'Log out successful',
            open: true
        }));
        setUsername('');
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
});

export default Header;