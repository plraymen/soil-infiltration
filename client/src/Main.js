import React from 'react';
import {Link} from "react-router-dom";
import OtherContent from "./OtherContent";
import drawerButton from './DrawerEnter.png'
import drawerOpen from './DrawerOpen.png'
import './App.css'
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
        <div align={"center"} style={modalStyle} className={classes.paper}>
            <h4>Welcome to Soil Infiltrometer App</h4>
            <h5>We want to let you know that this app is still in active development. You may experience technical issues while using this App.</h5>
            <h5>_____________________________________</h5>
            <h4>Here is a helpful Hint</h4>
            <img src={drawerButton} className={"img"}/>
            <h5><li>This button, that is located in the top left corner, is your friend.</li></h5>
            <h5><li>It host a myriad of different pages and options on every different page.</li></h5>
            <Button onClick={handleClose} variant="contained" color="primary">Close this Pop-up</Button>
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
                <OtherContent></OtherContent>
            </div>

            <h3 className={"center"}>Start the Program</h3>
            <div className={"center"}>
                <TextField id="filled-basic-Time"
                           label="Time Intervals in Seconds"
                           variant="filled"
                           value={that.state.timeInterval}
                           onChange={e => that.setState({ timeInterval: parseInt(e.target.value) })}
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
                           onChange={e => that.setState({ initialVolume: parseInt(e.target.value) })}
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
                    <TextField id="filled-basic-Time"
                               label="Infiltrometer Radius (cm)"
                               variant="filled"
                               value={that.state.Radius}
                               onChange={e => that.setState({ Radius: parseInt(e.target.value) })}
                               type="number"
                               pattern="[0-9]*"
                               inputmode="numeric"
                    />
                </div>

                <div>
                    <InputLabel>Select a Value</InputLabel>
                    <Select name="infilSelect">
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
                               onChange={e => that.setState({ Alpha: parseInt(e.target.value) })}
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
                               onChange={e => that.setState({ NperH0: parseInt(e.target.value) })}
                               type="number"
                               pattern="[0-9]*"
                               inputmode="numeric"
                    />
                </div>
                <div>
                    <InputLabel>Select a Value</InputLabel>
                    <Select defaultValue={Select} labelId="label" id="select">
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
                               onChange={e => that.setState({ Suction: parseInt(e.target.value) })}
                               type="number"
                               pattern="[0-9]*"
                               inputmode="numeric"
                    />

                    <br/>

                    <div class="buttonContainer">
                        <InputLabel>Select a Value</InputLabel>
                        <Select labelId="label" id="suctionselect" defaultValue={"0.5"}>

                            {suctionData.map((data, key) => {
                                return (
                                    <MenuItem
                                        key={key}
                                        variant="contained"
                                        color="primary"
                                        value={data.suction}
                                        onClick={() => that.selectSoilSuction(data.suction)}>
                                        {Math.abs(data.suction)}
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
                    <Button variant="contained" color="primary"> Start Collecting Data</Button>
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
