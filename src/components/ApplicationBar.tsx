import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';
import ChatIcon from '@mui/icons-material/Chat';


export default function ApplicationBar() {
return (
        <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static"
            style={{backgroundColor: "#e2e8f0", boxShadow: "none", marginBottom: "50px"}}
            >
            <Toolbar>
            <IconButton
                size="small"
                edge="start"
                aria-label="menu"
                sx={{ mr: 2 }}
            >
                <HomeIcon style={{ color: "backgroundColor"}}/>
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Airboxr
        </Typography>
            <Button variant="contained" startIcon={<ChatIcon />}>
                Chat
            </Button>
            </Toolbar>
        </AppBar>
        </Box>
);
}
