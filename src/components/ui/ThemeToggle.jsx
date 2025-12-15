import React from 'react';
import { IconButton, Tooltip, useTheme } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { useThemeContext } from './ThemeContext';

const ThemeToggle = () => {
    const { mode, toggleTheme } = useThemeContext();
    const theme = useTheme();

    return (
        <Tooltip title={`${mode === 'light' ? 'Тёмная' : 'Светлая'} тема`}>
            <IconButton
                onClick={toggleTheme}
                color="inherit"
                aria-label="Переключить тему"
                sx={{
                    ml: 1,
                    color: theme.palette.mode === 'dark' ? 'yellow' : 'inherit'
                }}
            >
                {mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
            </IconButton>
        </Tooltip>
    );
};

export default ThemeToggle;