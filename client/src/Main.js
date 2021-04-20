import React from 'react';
import {Link, NavLink} from "react-router-dom";
import drawerButton from './DrawerEnter.png'
import './App.css'
import './button.css'

import {
    AppBar,
    Button, FormControl, FormControlLabel, FormLabel, Grid,
    IconButton,
    InputLabel, makeStyles,
    MenuItem, Modal, Radio, RadioGroup,
    Select, SwipeableDrawer,
    TextField,
    Toolbar,
    Typography
} from "@material-ui/core";
import { soilData, suctionData } from "./configSoil";
import addNotification from "react-push-notification";
import CssBaseline from "@material-ui/core/CssBaseline";
import MenuIcon from "@material-ui/icons/Menu";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import CloseIcon from "@material-ui/icons/Close";
import ListItemText from "@material-ui/core/ListItemText";


function getModalStyle() {
    const top = 50
    const left = 50

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

function Main({that}) {
    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    window.onload = function() {
        that.notificationFlag = true;
        console.log("Notification: " + that.notificationFlag);

        that.audioFlag = true;
        console.log("Audio: " + that.audioFlag);
        notification()
        handleOpen()
    }

    //-------------------------------------------------------------------------------------------------//
    //Modal
    const body = (
        <div style={modalStyle} className={classes.paper}>
            <div>
                <h4 align={"center"}>Welcome to Soil Infiltrometer App</h4>
                <h5><li>This Application is an Aid in Collecting Data, you're goal is to pay attention to the Soil Infiltrometer first.</li></h5>
                <h5><li>This application is per device, per browser specific, we've made it to save data to the current Browser you're using.</li></h5>
                <h5><li>We are using Polynomial Regression in this to calculate certain constants, you're results could vary a small percentage.</li></h5>
            </div>
            <div align={"center"}>
                <h5>_____________________________________</h5>
                <h4>Here is a helpful Hint</h4>
                <img src={drawerButton} className={"smimg"}/>
                <h5><li>This button, that is located in the top left corner, is your friend.</li></h5>
                <h5><li>It host a myriad of different pages and options on every different page.</li></h5>
                <Button onClick={handleClose} variant="contained" color="primary">Close this Pop-Up</Button>
            </div>
        </div>
    );

    //------------------------------------------------------------------------------------------------//
    //Notification
    const notification = () => {
        addNotification({
            title: 'Warning',
            subtitle: 'Notifications',
            message: 'You will receive notifications while collecting data, you can choose to disable them in the settings while you are collecting data.',
            theme: 'darkblue',
            native: true // when using native, your OS will handle theming.
        });
    };

    //------------------------------------------------------------------------------------------------//
    //Drawer
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
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                >
                    {body}
                </Modal>
            </div>
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

            <h3 className={"center"}>Start the Program</h3>
            <div className={"center"}>
                <TextField id="filled-basic-Time"
                           label="Time Intervals in Seconds"
                           variant="filled"
                           value={that.state.timeInterval}
                           onChange={e => that.setState({ timeInterval: e.target.value })}
                           type="number"
                           pattern="[0-9]*"
                           inputmode="numeric"

                />
            </div>
            <br/>
            <div className={"center"}>
                <TextField id="filled-basic-Initial-Vol"
                           label="Initial Volume in mL"
                           variant="filled"
                           value={that.state.initialVolume}
                           onChange={e => that.setState({ initialVolume: e.target.value })}
                           type="number"
                           pattern="[0-9]*"
                           inputmode="numeric"
                />
            </div>
            <br/>
            <br/>
            <h3 className={"center"}>Enter Infiltrometer Setting</h3>
            <div className={"center"}>
                <div>
                    <h5>Enter Soil Infiltrometer Radius</h5>
                    <TextField  id="filled-basic-Time"
                               label="Infiltrometer Radius (cm)"
                               variant="filled"
                               value={that.state.Radius}
                               onChange={e => that.setState({ Radius: e.target.value })}
                               type="number"
                               pattern="[0-9]*"
                               inputmode="numeric"
                    />
                </div>

                <div>
                    <InputLabel>Select a Preset Value</InputLabel>
                    <Select name="infilSelect" defaultValue={"None"}>
                        <MenuItem value={"None"} onClick={that.selectInftiltrometerTypeNone}>None</MenuItem>
                        <MenuItem value="MiniDisk"
                                  onClick={that.selectInftiltrometerTypeMiniDisk}
                        >MiniDisk</MenuItem>
                        <MenuItem value="MiniDisk V1"
                                  onClick={that.selectInftiltrometerTypeMiniDiskV1}
                        >MiniDisk Version 1</MenuItem>
                    </Select>
                </div>
            </div>

            <br/>
            <div className={"center"}>
                <div>
                    <h5>Enter Soil Type - Alpha and n/h0</h5>
                    <TextField id="filled-basic-Time"
                               label="Alpha"
                               variant="filled"
                               value={that.state.Alpha}
                               onChange={e => that.setState({ Alpha: e.target.value })}
                               type="number"
                               pattern="[0-9]*"
                               inputmode="numeric"
                    />
                </div>
                <br/>
                <div>
                    <TextField id="filled-basic-Time"
                               label="n/h0"
                               variant="filled"
                               value={that.state.NperH0}
                               onChange={e => that.setState({ NperH0: e.target.value })}
                               type="number"
                               pattern="[0-9]*"
                               inputmode="numeric"
                    />
                </div>
                <div>
                    <InputLabel>Select a Preset Value</InputLabel>
                    <Select defaultValue={Select} labelId="label" id="select" defaultValue={"None"}>
                        {soilData.map((data, key) => {
                            return (
                                <MenuItem defaultValue={"Clay"} key={key}
                                          variant="contained"
                                          color="primary"
                                          value={data.name}
                                          onClick={() => that.selectSoilType(data.Alpha, data.NperH0)}>
                                    {data.name}
                                </MenuItem>
                            );
                        })}

                    </Select>
                </div>
            </div>

            <br/>
            <div className={"center"}>
                <div>
                    <h5>Enter Suction (cm)</h5>
                    <TextField id="filled-basic-Time"
                               label="Suction (cm)"
                               variant="filled"
                               value={that.state.Suction}
                               onChange={e => that.setState({ Suction: e.target.value })}
                               type="number"
                               pattern="[0-9]*"
                               inputmode="numeric"
                    />

                    <br/>

                    <div align={"center"}>
                        <InputLabel>Select a Preset Value</InputLabel>
                        <Select labelId="label" id="suctionselect" defaultValue={"0.5"} defaultValue={"None"}>
                            <MenuItem value={"None"} onClick={that.selectInftiltrometerSuctionNone}>None</MenuItem>
                            {suctionData.map((data, key) => {
                                return (
                                    <MenuItem
                                        key={key}
                                        variant="contained"
                                        color="primary"
                                        value={data.suction}
                                        onClick={() => that.selectSoilSuction(data.suction)}>
                                        {(data.suction)}
                                    </MenuItem>
                                );
                            })}
                        </Select>
                    </div>
                </div>
            </div>

            <br/>
            <br/>

            <div className={"center"}>
                <Link onClick={that.SwitchToMainToDataGathering} to="/data-gathering" style={{ textDecoration: 'none' }}>
                    <Button variant="contained" color="primary" className={"buttonContainer"}> Start Collecting Data</Button>
                </Link>
            </div>
            <br/>
            <br/>
            <br/>
            <br/>
        </div>
    )
}

export default Main;
