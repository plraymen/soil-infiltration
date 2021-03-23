import React from "react";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import {NavLink} from "react-router-dom";
import CloseIcon from '@material-ui/icons/Close';

export default function OtherContent({that}) {
    let index = 0;

    const Name = [
        {id: 0, name: "Welcome to Soil Infiltration App"},
        {id: 1, name: "Learn How To Use The App?"},
        {id: 2, name: "Learn How to Use the Infiltrometer?"},
        {id: 3, name: "Previous Test Data"},
        {id: 4, name: "Learn About Us?"}
    ]

    let currentWindow = window.location.pathname;
    if (currentWindow === "/") {
        index = 0;
    } else if (currentWindow === "/learn") {
        index = 1;
    } else if (currentWindow === "/learn-infiltrometer") {
        index = 2;
    } else if (currentWindow === "/previous-data") {
        index = 3;
    } else if (currentWindow === "/about") {
        index = 4;
    }

    const Categories = [{id: " Main Page", location: "/", command: "that.SwitchToMain", number: 0},
        {id: " Learn How To Use The App?", location: '/learn', command: "that.SwitchToLearnHowToUseTheApp", number: 1},
        {id: " Learn How to Use the Infiltrometer?", location: "/learn-infiltrometer", command: "that.SwitchToLearnHowToUseTheInfiltrometer", number: 2},
        {id: " Previous Test Data", location: "/previous-data", command: "that.SwitchToPreviousData", number: 3},
        {id: " Learn About Us?", location: "/about", command: "that.SwitchToAboutUs", number: 4}
    ]

    const [open, setOpen] = React.useState(false);
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };
    return (
        <div>
            <CssBaseline />
            <AppBar position="static">
                <Toolbar variant="dense">
                    <IconButton color="inherit" onClick={handleDrawerOpen} edge="start">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h5"  align="center" style={{width: "100%", alignItems: "center"}}> {Name[index].name} </Typography>
                </Toolbar>
            </AppBar>
            <Drawer variant="persistent" anchor="left" open={open}>
                <List>
                    <ListItem button key="home" onClick={handleDrawerClose}>
                        <ListItemIcon>
                            <CloseIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Close" />
                    </ListItem>
                    <List>
                        {Categories.map((id, command) => (
                            <ListItem button component={NavLink} to={id.location} activeClassName="Mui-selected" exact>
                                <ListItemText primary={id.id} />
                            </ListItem>
                        ))}
                    </List>
                </List>
            </Drawer>
            <main style={{ marginTop: 50 }}>
            </main>


        </div>
    );
}