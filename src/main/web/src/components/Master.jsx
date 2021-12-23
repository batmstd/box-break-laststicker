import React from 'react';
import {Routers} from "./Routers";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';
import StorageIcon from '@mui/icons-material/Storage';
import {
    useHistory,
} from "react-router-dom";

export const Master = () => {
    const history = useHistory();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const go = (path) => () => history.push(path);
    const menu = () => (
        <Box
            sx={{width: 300}}
            role="presentation"
            onClick={handleClose}
            onKeyDown={handleClose}
        >
            <List>
                <ListItem button onClick={go("/")}>
                    <ListItemIcon>
                        <SportsBasketballIcon/>
                    </ListItemIcon>
                    <ListItemText primary={"Бокс-Брейки"}/>
                </ListItem>
                <ListItem button onClick={go("/draft")}>
                    <ListItemIcon>
                        <StorageIcon/>
                    </ListItemIcon>
                    <ListItemText primary={"Управление Бокс-Брейками"}/>
                </ListItem>
            </List>
            <Divider/>
        </Box>
    );
    return (<Box sx={{flexGrow: 1}}>
        <AppBar position="static">
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{mr: 2}}
                    onClick={handleOpen}
                >
                    <MenuIcon/>
                </IconButton>
                <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                    laststicker drafts
                </Typography>
                <Button color="inherit">Login</Button>
            </Toolbar>
        </AppBar>
        <Drawer
            anchor={'left'}
            open={open}
            onClose={handleClose}
        >
            {menu()}
        </Drawer>
        <div style={{padding: 20}}>
            <Routers/>
        </div>
    </Box>)
}