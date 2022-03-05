import React from 'react';
import { Alert, Snackbar } from '@mui/material';

const Toast = React.memo(({ alert, setAlert }) => {
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setAlert({
            ...alert,
            open: false
        });
    };
    return (
        <Snackbar open={alert.open} autoHideDuration={alert.duration} onClose={handleClose}>
            <Alert onClose={handleClose} severity={alert.severity} sx={{ width: '100%' }}>
                {alert.message}
            </Alert>
        </Snackbar>
    );
});

export default Toast;