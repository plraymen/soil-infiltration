import React, {useEffect, useRef, useState} from 'react';
import {Link, NavLink} from "react-router-dom";
import {AppBar, Button, TextField, Toolbar, Typography, makeStyles, Modal} from "@material-ui/core";
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
    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        that.playAudio()
        setOpen(true);
    };

    const handleClose = () => {
        that.pauseAudio()
        that.AddToDataArray()
        setOpen(false);
    };

    const body = (
        <div align={"center"} style={modalStyle} className={classes.paper}>
            <h3>Quickly: Enter Volumetric Data</h3>
            <div align='center'>
                <TextField id="filled-basic-Time"
                           label="Enter Volumetric Data"
                           variant="filled"
                           value={that.state.volume}
                           onChange={e => that.setState({ volume: e.target.value })}
                />
            </div>
            <br/>
            <div align={"center"}>
                <Button variant="contained"
                        color="primary"
                        onClick={handleClose}
                > Submit Volume</Button>
            </div>
        </div>
    );

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

    //------------------------------------------------------------------------------------------------//

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
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {body}
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
                           //checkpoints={[ {time: timeTotal * 1000, callback:() => handleOpen()}]}
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
                                handleOpen()
                            },
                        },]}
                > <Timer.Seconds/> seconds </Timer></td>
            </tr>
        </table>
      </div>
        <br/>
        <br/>
      <h3 align={"center"}>This is for Testing Purposes - Will Get Deleted When the Project is Finished</h3>
      <div align='center'>
        <TextField id="filled-basic-Time"
                   label="Enter Volumetric Data"
                   variant="filled"
                   value={that.state.volume}
                   onChange={e => that.setState({ volume: e.target.value })}
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
