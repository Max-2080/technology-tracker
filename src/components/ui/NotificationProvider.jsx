import React, { createContext, useState, useContext } from 'react';
import {
    Snackbar,
    Alert,
    IconButton,
    Slide
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';

const NotificationContext = createContext();

export const useNotification = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState('info');
    const [autoHideDuration, setAutoHideDuration] = useState(6000);

    const showNotification = (msg, type = 'info', duration = 6000) => {
        setMessage(msg);
        setSeverity(type);
        setAutoHideDuration(duration);
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') return;
        setOpen(false);
    };

    const action = (
        <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
        >
            <CloseIcon fontSize="small" />
        </IconButton>
    );

    return (
        <NotificationContext.Provider value={{ showNotification }}>
            {children}
            <Snackbar
                open={open}
                autoHideDuration={autoHideDuration}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                TransitionComponent={Slide}
                sx={{
                    maxWidth: { xs: '90%', sm: '400px' },
                    width: '100%',
                    '& .MuiAlert-root': {
                        width: '100%',
                        alignItems: 'center'
                    }
                }}
            >
                <Alert
                    onClose={handleClose}
                    severity={severity}
                    variant="filled"
                    sx={{ width: '100%' }}
                    action={action}
                    iconMapping={{
                        success: '✅',
                        error: '❌',
                        warning: '⚠️',
                        info: 'ℹ️'
                    }}
                >
                    {message}
                </Alert>
            </Snackbar>
        </NotificationContext.Provider>
    );
};