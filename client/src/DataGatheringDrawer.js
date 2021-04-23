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

export default function DataGatheringDrawer({that}) {
    let index = 0;

    const Name = [
        {id: 0, name: "Welcome to Soil Infiltration App"},
    ]

    let currentWindow = window.location.pathname;
    if (currentWindow === "/soilinfiltrometer/") {
        index = 0;
    }

    const Categories =
        [{id: " Data Gathering Completed", location: "/soilinfiltrometer/data-complete", command: "that.SwitchToMain", number: 0},
        {id: " Learn How To Use The App?", location: '/soilinfiltrometer/learn', command: "that.SwitchToLearnHowToUseTheApp", number: 1},
    ]

    const [openModel, setOpenModal] = React.useState(false);
    const handleDrawerOpen = () => {
        setOpenModal(true);
    };
    const handleDrawerClose = () => {
        setOpenModal(false);
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
            <Drawer variant="persistent" anchor="left" open={openModel}>
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