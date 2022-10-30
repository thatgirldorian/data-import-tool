import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';
import ChatIcon from '@mui/icons-material/Chat';
import { Link } from "react-router-dom"


export default function ApplicationBar() {
return (

    <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed"
            style={{backgroundColor: "#f6f8fb", boxShadow: "none", }}
            >
            <Toolbar>
            <Link to="/">
                <IconButton
                    edge="start"
                    size="small"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                >
                    <HomeIcon />
                </IconButton>
            </Link>

            
            
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        </Typography>
            <Button variant="contained" startIcon={<ChatIcon />}  style={{border: "1px solid #5ad0a4",  padding: "2px 10px", backgroundColor: "#31c48d", boxShadow: "none"}}>
                Chat
            </Button>
            </Toolbar>
        </AppBar>
        </Box>
);
}
