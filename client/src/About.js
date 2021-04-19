import React from 'react';
import {Link, NavLink} from "react-router-dom";
import {AppBar, Button, Toolbar, Typography} from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import CloseIcon from "@material-ui/icons/Close";
import ListItemText from "@material-ui/core/ListItemText";
import "./About.css";
import './button.css'

function About({that}) {
    let OtherContentindex = 0;

    const Name = [
        {id: 0, name: "Welcome to Soil Infiltration App"},
        {id: 1, name: "Learn How To Use The App?"},
        {id: 2, name: "Learn How to Use the Infiltrometer?"},
        {id: 3, name: "Previous Test Data"},
        {id: 4, name: "Learn About Us?"},
        {id: 5, name: "Downloads"}
    ]

    let OtherContentcurrentWindow = window.location.pathname;
    if (OtherContentcurrentWindow === "/index.html") {
        OtherContentindex = 0;
    } else if (OtherContentcurrentWindow === "/learn") {
        OtherContentindex = 1;
    } else if (OtherContentcurrentWindow === "/learn-infiltrometer") {
        OtherContentindex = 2;
    } else if (OtherContentcurrentWindow === "/previous-data") {
        OtherContentindex = 3;
    } else if (OtherContentcurrentWindow === "/about") {
        OtherContentindex = 4;
    } else if (OtherContentcurrentWindow === "/download") {
        OtherContentindex = 5;
    }

    const OtherContentCategories = [{id: " Main Page", location: "/index.html", command: that.SwitchToMain, number: 0},
        {id: " Learn How To Use The App?", location: '/learn', command: that.SwitchToLearnHowToUseTheApp, number: 1},
        {id: " Learn How to Use the Infiltrometer?", location: "/learn-infiltrometer", command: that.SwitchToLearnHowToUseTheInfiltrometer, number: 2},
        {id: " Previous Test Data", location: "/previous-data", command: that.SwitchToPreviousData, number: 3},
        {id: " Learn About Us?", location: "/about", command: that.SwitchToAboutUs, number: 4},
        {id: " Downloads", location: "/download", command: that.SwitchToAboutUs, number: 5}
    ]

    const [OtherContentopen, OtherContentsetOpen] = React.useState(false);
    const handleDrawerOpen = () => {
        OtherContentsetOpen(true);
    };
    const handleDrawerClose = () => {
        OtherContentsetOpen(false);
    };
  return (
    <div>
        <div>
            <CssBaseline />
            <AppBar position="static">
                <Toolbar variant="dense">
                    <IconButton color="inherit" onClick={handleDrawerOpen} edge="start">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h5"  align="center" style={{width: "100%", alignItems: "center"}}> {Name[OtherContentindex].name} </Typography>
                </Toolbar>
            </AppBar>
            <Drawer variant="persistent" anchor="left" open={OtherContentopen}>
                <List>
                    <ListItem button key="home" onClick={handleDrawerClose}>
                        <ListItemIcon>
                            <CloseIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Close" />
                    </ListItem>
                    <List>
                        {OtherContentCategories.map((id, command) => (
                            <ListItem button component={NavLink} to={id.location} onClick={id.command} activeClassName="Mui-selected" exact>
                                <ListItemText primary={id.id} />
                            </ListItem>
                        ))}
                    </List>
                </List>
            </Drawer>
            <main style={{ marginTop: 10 }}>
            </main>


        </div>

        <div className={"border"}>

            <h3 className={"text"}>
                <h1>About the Application</h1>
                This app will be used throughout a myriad of different scientists with all different
                agricultural aspects from one single device called a Soil Infiltrometer. A Soil Infiltrometer is a device
                that will penetrate the ground - it must be conducted in a loamy environment like soil. A user then will
                pour water through a top funnel that then allows a user to watch it drain through time. A user then will
                record the time difference (from start) and the recorded volume of water that was lost throughout the
                process. This is an incremental step that is done in different time based intervals, for example: if a user
                selects time intervals for every 30 seconds, they will then record the volume lost every 30 seconds until
                the water drains.
                <br/>
                <br/>
                What this application is doing is allowing a user to get more accurate and precise measurements when it
                comes to recording information with a Soil Infiltrometer. We will build the app so that it will initially
                allow the user to set the time intervals they want to, then gets notified when the selected time intervals finally come into fruition.
                When the user gets notified, it will prompt them to enter the volumetric information that the soil
                infiltrometer shows (please note that the user will have to manually enter the information in and the time
                is still static during the interval). The app will show a table below that will dynamically auto-populate
                the information and create several different charts and graphs based-off of the recorded/calculated values.
                What this application is doing is allowing a user to get more accurate and precise measurements when it
                comes to recording information. We will build the app so that it will initially allow the user to set the
                time intervals they want to, then gets notified when the selected time intervals finally come into fruition.
                When the user gets notified, it will prompt them to enter the volumetric information that the soil
                infiltrometer shows (please note that the user will have to manually enter the information in and the time
                is still static during the interval). The app will show a table below that will dynamically auto-populate
                the information and create several different charts and graphs based-off of the recorded/calculated
                values.

                <br/>
                <br/>
                <h1>Contact Information</h1>
                Name: Bryan Wandrych. Github: bdwandry, Email: bdwandry@mtu.edu<br/>
                Name: Franklin Van Hove, Github: FrankVanHove, Email: ftvanhov@mtu.edu <br/>
                Name: John Bland, Github: kgost, Email: jpbland@mtu.edu <br/>
                Name: Nathan Kenwabikise, Github: nikenwab, Email: nikenwab@mtu.edu <br/>
                Name: Paul Rayment, Github: plraymen, Email: plraymen@mtu.edu <br/>
            </h3>
        </div>
    </div>
  )
}

export default About;
