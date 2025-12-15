import React, { createContext, useState, useContext, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const ThemeContext = createContext();

export const useThemeContext = () => useContext(ThemeContext);

export const CustomThemeProvider = ({ children }) => {
    const [mode, setMode] = useState(() => {
        const savedMode = localStorage.getItem('themeMode');
        return savedMode || 'light';
    });

    useEffect(() => {
        localStorage.setItem('themeMode', mode);
    }, [mode]);

    const toggleTheme = () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
    };

    const theme = createTheme({
        palette: {
            mode,
            primary: {
                main: mode === 'light' ? '#1976d2' : '#90caf9',
            },
            secondary: {
                main: mode === 'light' ? '#dc004e' : '#f48fb1',
            },
            background: {
                default: mode === 'light' ? '#f5f5f5' : '#121212',
                paper: mode === 'light' ? '#ffffff' : '#1e1e1e',
            },
        },
        typography: {
            fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        },
        shape: {
            borderRadius: 8,
        },
    });

    return (
        <ThemeContext.Provider value={{ mode, toggleTheme }}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </ThemeContext.Provider>
    );
};