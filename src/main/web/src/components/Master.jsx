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
import {CODE, useLocalStorage, useTicker, VALID_CODE} from "../Hooks";

export const Master = () => {
    const history = useHistory();
    const [open, setOpen] = React.useState(false);
    const [isAuth, setAuth] = React.useState(false);

    const isChange = () => {
        let isValid = get(VALID_CODE);
        setAuth(isValid != null && isValid === 'true');
    }

    useTicker(isChange, 1000);

    const {get, remove} = useLocalStorage();

    React.useEffect(() => {
        let isValid = get(VALID_CODE);
        if (isValid === null) {
            return setAuth(false);
        }
        setAuth(isValid === "true");
    }, [get]);

    const logout = () => {
        remove(CODE);
        remove(VALID_CODE);
        history.push("/");
    }

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
                {!isAuth ? (
                    <Button color="inherit" onClick={go("/login")}>Login</Button>
                ) : (
                    <Button color="inherit" onClick={logout}>Logout</Button>
                )}
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