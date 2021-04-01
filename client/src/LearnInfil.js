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
import MobilePDFReader from 'pdf-viewer-reactjs';
import "./LearnInfil.css";
import pdf from './Mini_Disk_Manual_Web.pdf';
import './button.css'

function LearnInfil({that}) {
    let OtherContentindex = 0;

    const Name = [
        {id: 0, name: "Welcome to Soil Infiltration App"},
        {id: 1, name: "Learn How To Use The App?"},
        {id: 2, name: "Learn How to Use the Infiltrometer?"},
        {id: 3, name: "Previous Test Data"},
        {id: 4, name: "Learn About Us?"}
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
    }

    const OtherContentCategories = [{id: " Main Page", location: "/index.html", command: that.SwitchToMain, number: 0},
        {id: " Learn How To Use The App?", location: '/learn', command: that.SwitchToLearnHowToUseTheApp, number: 1},
        {id: " Learn How to Use the Infiltrometer?", location: "/learn-infiltrometer", command: that.SwitchToLearnHowToUseTheInfiltrometer, number: 2},
        {id: " Previous Test Data", location: "/previous-data", command: that.SwitchToPreviousData, number: 3},
        {id: " Learn About Us?", location: "/about", command: that.SwitchToAboutUs, number: 4}
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
              <br/>
              <div className={"pdf"}>
                  <MobilePDFReader
                      document={{
                          url: pdf,
                          scale: "auto"
                      }}
                  />
              </div>
              <br/>
          </div>

      </div>
  )
}

export default LearnInfil;
