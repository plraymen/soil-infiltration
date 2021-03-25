import React, {useEffect, useRef, useState} from 'react';
import {Link, NavLink} from "react-router-dom";
import {
    AppBar,
    Button,
    TextField,
    Toolbar,
    Typography,
    makeStyles,
    Modal,
    FormControl,
    FormLabel, RadioGroup, FormControlLabel, Radio
} from "@material-ui/core";
import Timer from "react-compound-timer";
import DataGatheringDrawer from './DataGatheringDrawer'
import CssBaseline from "@material-ui/core/CssBaseline";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import CloseIcon from "@material-ui/icons/Close";
import ListItemText from "@material-ui/core/ListItemText";
import addNotification from "react-push-notification";

const tiRef = React.createRef();
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

function DataGathering({that}) {
    window.addEventListener("beforeunload", function (e) {
        let confirmationMessage = 'It looks like you have been editing something. '
            + 'If you leave before saving, test will be los5t.';

        (e || window.event).returnValue = confirmationMessage;
        return confirmationMessage;
    });
    //-------------------------------------------------------------------------------------------------//
    //Audio and Notification Settings
    //Notification
    const [NotificationValue, NotificationSetValue] = React.useState('Enabled');
    const NotificationHandleChange = (event) => {
        NotificationSetValue(event.target.value);
        if (event.target.value === "Enabled") {
            that.notificationFlag = true;
            console.log("Notification: " + that.notificationFlag);
        }

        if (event.target.value === "Disabled") {
            that.notificationFlag = false;
            console.log("Notification: " + that.notificationFlag);
        }
    };

    //Audio
    const [value, setValue] = React.useState('Enabled');
    const handleChange = (event) => {
        setValue(event.target.value);

        if (event.target.value === "Enabled") {
            that.audioFlag = true;
            console.log("Audio: " + that.audioFlag);
        }

        if (event.target.value === "Disabled") {
            that.audioFlag = false;
            console.log("Audio: " + that.audioFlag);
        }
    };

    //-------------------------------------------------------------------------------------------------//
    //Drawer
    let index = 0;

    const Name = [
        {id: 0, name: "Data Collecting: Application is Running"},
    ]

    let currentWindow = window.location.pathname;
    if (currentWindow === "/") {
        index = 0;
    }


    const Categories =
        [
            {id: " Data Gathering Completed", location: "/data-complete", command: that.SwitchToDataCompleted, number: 0},
            {id: " Reset to Main Page", location: "/", command: that.resettingToMainPage, number: 1},
        ]


    const [openModel, setOpenModal] = React.useState(false);
    const handleDrawerOpen = () => {
        setOpenModal(true);
    };
    const handleDrawerClose = () => {
        setOpenModal(false);
    };


    //-------------------------------------------------------------------------------------------------//
    //Enter Data Modal
    const DataCollectingclasses = useStyles();
    const [DataCollectingmodalStyle] = React.useState(getModalStyle);
    const [DataCollectingModalopen, DataCollectingsetOpen] = React.useState(false);

    const DataCollectingModalhandleOpen = () => {
        if (that.notificationFlag === true) {
            notification()
        }

        if (that.audioFlag === true) {
            that.playAudio()
        }
        DataCollectingsetOpen(true);
    };

    const DataCollectingModalhandleClose = () => {
        that.pauseAudio()
        that.CalculatedAddToDataArray()
        DataCollectingsetOpen(false);
    };
    const body = (
        <div align={"center"} style={DataCollectingmodalStyle} className={DataCollectingclasses.paper}>
            <h3>Quickly: Enter Volumetric Data</h3>
            <div align='center'>
                <TextField id="filled-basic-Time"
                           label="Enter Volumetric Data"
                           variant="filled"
                           onChange={e => that.setState({ volume: e.target.value })}
                           type="number"
                           pattern="[0-9]*"
                           inputmode="numeric"
                />
            </div>
            <br/>
            <div align={"center"}>
                <Button variant="contained"
                        color="primary"
                        onClick={DataCollectingModalhandleClose}
                > Submit Volume</Button>
            </div>
        </div>
    );

    //-------------------------------------------------------------------------------------------------//
    //Settings Modal
    const Settingsclasses = useStyles();
    const [SettingsmodalStyle] = React.useState(getModalStyle);
    const [SettingsModalopen, SettingssetOpen] = React.useState(false);

    const SettingsModalhandleOpen = () => {
        SettingssetOpen(true);
    };

    const SettingsModalhandleClose = () => {
        handleDrawerClose()
        SettingssetOpen(false);
    };
    const Settingsbody = (
        <div align={"center"} style={SettingsmodalStyle} className={Settingsclasses.paper}>
            <div>
                <div align={"center"}>
                    <FormControl component="fieldset">
                        <FormLabel component="legend" >Notification Settings</FormLabel>
                        <RadioGroup aria-label="gender" name="gender1" value={NotificationValue} onChange={NotificationHandleChange}>
                            <FormControlLabel value="Enabled" control={<Radio />} label="Enabled" />
                            <FormControlLabel value="Disabled" control={<Radio />} label="Disabled" />
                        </RadioGroup>
                    </FormControl>
                </div>

                <br/>
                <div align={"center"}>
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Audio Settings</FormLabel>
                        <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
                            <FormControlLabel value="Enabled" control={<Radio />} label="Enabled" />
                            <FormControlLabel value="Disabled" control={<Radio />} label="Disabled" />
                        </RadioGroup>
                    </FormControl>
                </div>
                <br/>
                <div align={"center"}>
                    <Button variant="contained"
                            color="primary"
                            onClick={SettingsModalhandleClose}
                    > Close </Button>
                </div>
            </div>
        </div>
    );

    //------------------------------------------------------------------------------------------------//
    //Notification
    const notification = () => {
        addNotification({
            title: 'Warning',
            subtitle: 'Timer',
            message: 'YOUR TIMER IS GOING DONE. COLLECT DATA',
            theme: 'darkblue',
            native: true // when using native, your OS will handle theming.
        });
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
                            <ListItem button component={NavLink} to={id.location} onClick={id.command} activeClassName="Mui-selected" exact>
                                <ListItemText primary={id.id} />
                            </ListItem>
                        ))}
                        <ListItem button onClick={SettingsModalhandleOpen} activeClassName="Mui-selected" exact>
                            <ListItemText primary={"Settings"} />
                        </ListItem>
                    </List>
                </List>
            </Drawer>
            <main style={{ marginTop: 50 }}>
            </main>
        </div>
      <div align='center'>
      </div>
        <div>
            <Modal
                open={DataCollectingModalopen}
                onClose={DataCollectingModalhandleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {body}
            </Modal>
        </div>
        <div>
            <Modal
                open={SettingsModalopen}
                onClose={SettingsModalhandleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {Settingsbody}
            </Modal>
        </div>
        <br/>
        <br/>
      <div align='center'>
        <table>
            <tr>
                <td>Total Time: </td>
                <td><Timer formatValue={e => that.totalTime = e}
                           lastUnit={"s"}
                           initialTime={0}
                           direction="forward"
                >
                    <Timer.Seconds /> Seconds
                </Timer></td>
            </tr>

            <tr>
                <td>Time Left in Interval:  </td>
                <td><Timer
                    ref={tiRef}
                    initialTime={that.state.timeInterval * 1000}
                    direction="backward"
                    checkpoints={[
                        {time: 0, callback: function (e) {
                                tiRef.current.reset()
                                tiRef.current.start()
                                DataCollectingModalhandleOpen()
                            },
                        },]}
                > <Timer.Seconds/> seconds </Timer></td>
            </tr>
        </table>
      </div>
        <br/>
        <br/>
      <h3 align={"center"}>Manual Entry</h3>
      <div align='center'>
        <TextField id="filled-basic-Time"
                   label="Enter Volumetric Data"
                   variant="filled"
                   onChange={e => that.setState({ volume: e.target.value })}
                   type="number"
                   pattern="[0-9]*"
                   inputmode="numeric"
        />
      </div>

        <div align={"center"}>
        <Button variant="contained"
                color="primary"
                onClick={that.AddToDataArray}
        > Submit Volume</Button>
      </div>
      <br/>
      <br/>
        <div>

        </div>
      <br/>
      <div>
        <h1 id='title'>Table Data</h1>
        <table id='students'>
          <tbody>
          <tr>{that.renderTableHeader()}</tr>
          {that.renderTableData()}
          </tbody>
        </table>
      </div>
      <br/>
      <br/>
      <br/>
    </div>
  )
}

export default DataGathering;
