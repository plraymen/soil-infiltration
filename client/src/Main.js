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
                <h5><li>During Gathering Data while Using BAER Protocol, a Replicate is a symbolic run that meant to increment when a user moves the Infiltrometer</li></h5>
            </div>
            <div >
                <h5 align={"center"}>_____________________________________</h5>
                <h4 align={"center"}>Here is a helpful Hint</h4>
                <div align={"center"}>
                <img src={drawerButton} className={"smimg"}/>
                </div>
                <h5><li>This button, that is located in the top left corner, is your friend.</li></h5>
                <h5><li>It host a myriad of different pages and options on every different page.</li></h5>
                <div align={"center"}>
                <Button onClick={handleClose} variant="contained" color="primary">Close this Pop-Up</Button>
                </div>
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
        {id: 5, name: "Downloads"},
        {id: 6, name: "Learn BAER Protocol?"}
    ]

    let OtherContentcurrentWindow = window.location.pathname;
    if (OtherContentcurrentWindow === "/soilinfiltrometer/index.html") {
        OtherContentindex = 0;
    } else if (OtherContentcurrentWindow === "/soilinfiltrometer/learn") {
        OtherContentindex = 1;
    } else if (OtherContentcurrentWindow === "/soilinfiltrometer/learn-infiltrometer") {
        OtherContentindex = 2;
    } else if (OtherContentcurrentWindow === "/soilinfiltrometer/previous-data") {
        OtherContentindex = 3;
    } else if (OtherContentcurrentWindow === "/soilinfiltrometer/about") {
        OtherContentindex = 4;
    } else if (OtherContentcurrentWindow === "/soilinfiltrometer/download") {
        OtherContentindex = 5;
    } else if (OtherContentcurrentWindow === "/soilinfiltrometer/learn-baer") {
        OtherContentindex = 6;
    }

    const OtherContentCategories = [{id: " Main Page", location: "/soilinfiltrometer/index.html", command: that.SwitchToMain, number: 0},
        {id: " Learn How To Use The App?", location: '/soilinfiltrometer/learn', command: that.SwitchToLearnHowToUseTheApp, number: 1},
        {id: " Learn How to Use the Infiltrometer?", location: "/soilinfiltrometer/learn-infiltrometer", command: that.SwitchToLearnHowToUseTheInfiltrometer, number: 2},
        {id: " Learn BAER Protocol?", location: "/soilinfiltrometer/learn-baer", command: that.SwitchToLearnBAER, number: 3},
        {id: " Previous Test Data", location: "/soilinfiltrometer/previous-data", command: that.SwitchToPreviousData, number: 4},
        {id: " Learn About Us?", location: "/soilinfiltrometer/about", command: that.SwitchToAboutUs, number: 5},
        {id: " Downloads", location: "/soilinfiltrometer/download", command: that.SwitchToAboutUs, number: 6}
    ]

    const [OtherContentopen, OtherContentsetOpen] = React.useState(false);
    const handleDrawerOpen = () => {
        OtherContentsetOpen(true);
    };
    const handleDrawerClose = () => {
        OtherContentsetOpen(false);
    };

    //--------------------------------------------------------------------------------------------------//
    //Data Collecting Protocol
    const [value, setValue] = React.useState("StandardProtocol");
    const handleChange = (event) => {
        setValue(event.target.value);

        if (event.target.value === "StandardProtocol") {
            that.switchDataCollectionStandardProtocol();
            that.state.DataCollectingProtocol = "StandardProtocol";
        }

        if (event.target.value === "BAERProtocol") {
            that.switchDataCollectionBAERProtocol();
            that.state.DataCollectingProtocol = "BAERProtocol";
        }
    };


    const switchButton = () => {
        if (that.state.DataCollectingProtocol === "StandardProtocol") {
            return (
                <div className={"center"}>
                    <Link onClick={that.SwitchToMainToDataGathering} to="/soilinfiltrometer/data-gathering" style={{ textDecoration: 'none' }}>
                        <Button variant="contained" color="primary" className={"buttonContainer"}> Start Collecting Data using Standard Protocol</Button>
                    </Link>
                </div>
            )
        }

        else if (that.state.DataCollectingProtocol === "BAERProtocol") {
            return (
                <div className={"center"}>
                    <Link onClick={that.SwitchToDataGatheringBAER} to="/soilinfiltrometer/data-gathering-baer" style={{ textDecoration: 'none' }}>
                        <Button variant="contained" color="primary" className={"buttonContainer"}> Start Collecting Data using BAER Protocol</Button>
                    </Link>
                </div>
            )
        }
    }

    const renderOptions = () => {
        if (that.state.DataCollectingProtocol === "BAERProtocol") {
            console.log(that.state.NumberOfRuns)
            return (
                <div className={"center"}>
                    <br/>
                    <div className={"center"}>
                        <h3>BAER Protocol: Enter the Number of Replicates</h3>
                        <TextField id="filled-basic-Time"
                                   label="Number of Replicates"
                                   variant="filled"
                                   value={that.state.NumberOfRuns}
                                   onChange={e => that.setState({ NumberOfRuns: e.target.value })}
                                   type="number"
                                   pattern="[0-9]*"
                                   inputmode="numeric"
                        />
                    </div>
                </div>
            )
        }
    }
    //--------------------------------------------------------------------------------------------------//
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

            <h1 className={"center"}>Start the Program</h1>
            <div className={"center"}>
                <TextField id="filled-basic-Time"
                           label="Time Intervals (s)"
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
                           label="Initial Volume (mL)"
                           variant="filled"
                           value={that.state.initialVolume}
                           onChange={e => that.setState({ initialVolume: e.target.value })}
                           type="number"
                           pattern="[0-9]*"
                           inputmode="numeric"
                />
            </div>
            <br/>

            <div align={"center"}>
                <FormControl component="fieldset">
                    <h3>Select Method of Collection</h3>
                    {/*<RadioGroup aria-label="gender" name="gender1" value={NotificationValue} onChange={NotificationHandleChange}>*/}
                    <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange} defaultValue={"StandardProtocol"}>
                        <FormControlLabel value="StandardProtocol" control={<Radio />} label="Standard Protocol" onClick={that.switchDataCollectionStandardProtocol}/>
                        <FormControlLabel value="BAERProtocol" control={<Radio />} label="BAER Protocol" onClick={that.switchDataCollectionBAERProtocol}/>
                    </RadioGroup>
                </FormControl>
            </div>
            {renderOptions()}
            <br/>
            <h1 className={"center"}>Enter Mini-disk Settings</h1>
            <div className={"center"}>
                <h3>Enter Soil Infiltrometer Radius</h3>
                <div>
                    {/*<InputLabel>Select a Preset Value</InputLabel>*/}
                    <Select name="infilSelect" defaultValue={"None"}>
                        <MenuItem value={"None"} onClick={that.selectInftiltrometerTypeNone}>Preset Values</MenuItem>
                        <MenuItem value="MiniDisk"
                                  onClick={that.selectInftiltrometerTypeMiniDisk}
                        >MiniDisk</MenuItem>
                        <MenuItem value="MiniDisk V1"
                                  onClick={that.selectInftiltrometerTypeMiniDiskV1}
                        >MiniDisk Version 1</MenuItem>
                    </Select>
                </div>
                <div>
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
            </div>

            <br/>
            <div className={"center"}>
                <div>
                    <h3>Enter Soil Type - Alpha and n/h0</h3>
                    <div>
                        <Select defaultValue={Select} labelId="label" id="select" defaultValue={"Preset Values"}>
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
            </div>

            <br/>
            <div className={"center"}>
                <div>
                    <h3>Enter Suction (cm)</h3>
                    <div align={"center"}>
                        <Select labelId="label" id="suctionselect" defaultValue={"0.5"} defaultValue={"Preset Value"}>
                            <MenuItem value={"Preset Value"} onClick={that.selectInftiltrometerSuctionNone}>Preset Value</MenuItem>
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
                </div>
            </div>

            <br/>
            <br/>

            {/*<div className={"center"}>*/}
            {/*    <Link onClick={that.SwitchToMainToDataGathering} to="/data-gathering" style={{ textDecoration: 'none' }}>*/}
            {/*        <Button variant="contained" color="primary" className={"buttonContainer"}> Start Collecting Data</Button>*/}
            {/*    </Link>*/}
            {/*</div>*/}

            {switchButton()}

            <br/>
            <br/>
            <br/>
            <br/>
        </div>
    )
}

export default Main;
