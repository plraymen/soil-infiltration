import React from 'react';
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Typography from "@material-ui/core/Typography";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import CloseIcon from "@material-ui/icons/Close";
import ListItemText from "@material-ui/core/ListItemText";
import {NavLink} from "react-router-dom";
import './Learn.css';
import './button.css'

function Learn({that}) {
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

              <div>
                  {/*   Main Page Help Section Collapsible  */}
                  <div className="wrap-collapsible">
                      <input id="StartingTest" className="toggle" type="checkbox"></input>
                      <label htmlFor="StartingTest" className="lbl-toggle">Starting a Test</label>
                      <div className="collapsible-content">
                          <div className="content-inner">
                              <h1 className={"step"}>Step 1: Enter Initial Settings</h1>
                              <h2 className={"stepText"}>
                                  You should see input boxes just like the ones shown in Figure 1.1 for the Time
                                  Interval (seconds) and Initial Volume (mL).
                                  <br/>
                                  <br/>
                                  <img className={"helpImg"} src='help1_step1_1.jpg' alt='step1'></img>
                                  <br/>
                                  Figure 1.1
                                  <br/>
                                  <br/>
                                  Make sure both boxes are filled appropriately.
                                  <br/>
                                  <br/>
                                  <br/>
                                  <br/>
                                  Underneath there are more input boxes corresponding to the data of their
                                  respective names. (See Figure 1.2)
                                  <br/>
                                  <br/>
                                  You may either manually enter in your data into each box or you can click on the
                                  drop-down arrow to choose from built-in values.
                                  <br/>
                                  <br/>
                                  <br/>
                                  <img className={"helpImg"} src='help1_step1_2.jpg' alt='step1_2'></img>
                                  <br/>
                                  Figure 1.2
                                  <br/>
                                  <br/>
                                  <br/>
                                  <br/>
                                  <br/>
                                  <br/>
                                  <br/>
                                  <br/>
                                  <br/>

                              </h2>
                              <br/>
                              <h1 className={"step"}>Step 2: Begin timer!</h1>
                              <h2 className={"stepText"}>
                                  <h3 className={"note"}>
                                      Once you click the button the timer will start, so only proceed when ready!
                                  </h3>
                                  <br/>
                                  When you are ready to begin collecting data click the "Start collecting data"
                                  button on the bottom of the page.
                                  <br/>
                                  <br/>
                                  <img className={"helpImg"} src='help1_step2_1.jpg' alt='step2'></img>
                                  <br/>
                                  <br/>
                                  <br/>
                                  <br/>
                                  <br/>
                                  <br/>
                                  <br/>
                                  <br/>
                                  <br/>

                              </h2>
                          </div>
                      </div>
                  </div>




                  {/*   Entering Data Help Section Collapsible   */}
                  <div className="wrap-collapsible">
                      <input id="EnteringData" className="toggle" type="checkbox"></input>
                      <label htmlFor="EnteringData" className="lbl-toggle">Entering Data During Test</label>
                      <div className="collapsible-content">
                          <div className="content-inner">
                              <h1 className={"step"}>Step 1: Wait...</h1>
                              <h2 className={"stepText"}>
                                  Once you enter your initial settings and click "Start collecting data" you will be
                                  brought to a new page, you will notice the 2 running timers. (See Figure 2.1)
                                  <br/>
                                  <br/>
                                  Total Time: Total amount of time spent on this test. (Since "Start collecting data")
                                  <br/>
                                  Time Left in Interval: Time left in current data interval.
                                  <br/>
                                  <br/>
                                  <br/>
                                  <br/>
                                  <img className={"helpImg"} src='help2_step1_1.jpg' alt='step1'></img>
                                  <br/>
                                  Figure 2.1
                                  <br/>
                                  <br/>
                                  For now you may wait until the Interval Timer reaches 0, but keep an eye on it so you
                                  are ready to enter data when it goes off.
                                  <br/>
                                  <br/>
                                  <br/>
                                  <br/>
                                  <br/>
                                  <br/>
                                  <br/>
                                  <br/>
                                  <br/>
                                  <br/>
                              </h2>

                              <h1 className={"step"}>Step 2: Enter volume data</h1>
                              <h2 className={"stepText"}>
                                  Once the Interval Timer reaches 0, a popup window will appear prompting you to enter
                                  the current volumetric data. (See Figure 2.2)
                                  <br/>
                                  <br/>
                                  <img className={"helpImg"} src='help2_step2_1.jpg' alt='step1'></img>
                                  <br/>
                                  Figure 2.2
                                  <br/>
                                  <br/>
                                  Click in the input box to being entering the data. Once you are done click
                                  "Submit Volume" to save the data into the current test table.
                                  <br/>
                                  <h3 className={"note"}>
                                      The Interval Timer will continue to run in the background.
                                  </h3>
                                  <br/>
                                  After the data is saved the popup window will disappear and you may wait for the
                                  next interval.
                                  <br/>
                                  <br/>
                                  <br/>
                                  <br/>
                                  <br/>
                                  <br/>
                                  <br/>
                                  <br/>
                              </h2>
                          </div>
                      </div>
                  </div>



                  {/*   TODO  */}
                  <div className="wrap-collapsible">
                      <input id="help3" className="toggle" type="checkbox"></input>
                      <label htmlFor="help3" className="lbl-toggle">TODO: Finishing a test</label>
                      <div className="collapsible-content">
                          <div className="content-inner">
                              <h1 className={"step"}>Step 1: TODO...</h1>
                              <h2 className={"stepText"}>
                                  TODO
                              </h2>
                          </div>
                      </div>
                  </div>

                  {/*   TODO  */}
                  <div className="wrap-collapsible">
                      <input id="help4" className="toggle" type="checkbox"></input>
                      <label htmlFor="help4" className="lbl-toggle">TODO: Viewing past data</label>
                      <div className="collapsible-content">
                          <div className="content-inner">
                              <h1 className={"step"}>Step 1: TODO...</h1>
                              <h2 className={"stepText"}>
                                  TODO
                              </h2>
                          </div>
                      </div>
                  </div>

              </div>
          </div>
      )
}

export default Learn;
