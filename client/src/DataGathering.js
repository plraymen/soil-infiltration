import React, {useEffect, useRef, useState} from 'react';
import {Link} from "react-router-dom";
import {AppBar, Button, TextField, Toolbar, Typography, makeStyles, Modal} from "@material-ui/core";
import Timer from "react-compound-timer";

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

  return (
    <div>
      <div align='center'>
        <AppBar position="static">
          <Toolbar variant="dense">
              <Typography variant="h5"  align="center" style={{width: "100%", alignItems: "center"}}>
              Data Collecting: Application is Running
            </Typography>
          </Toolbar>
        </AppBar>
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
                    checkpoints={[ {time: 0, callback:() => handleOpen()}]}
                    lastUnit={"s"}
                    initialTime={that.state.timeInterval * 1000}
                    direction="backward"
                >
                    <Timer.Seconds />  seconds

                </Timer></td>

            </tr>
        </table>
      </div>
      <br/>
      <br/>
      <div align={"center"}>
          <Link to="/data-complete" onClick={that.SwitchToDataCompleted} style={{ textDecoration: 'none' }}>
              <Button variant="contained" color="primary">Data Gathering Completed</Button>
          </Link>
      </div>
        <br/>
        <div align={"center"}>
            <Link to="/" onClick={that.resettingToMainPage} style={{ textDecoration: 'none' }}>
                <Button variant="contained" color="primary"> Reset to Main Page </Button>
            </Link>
        </div>
      <br/>
        <div align={"center"}>
            <Button variant="contained"
                    color="primary"
            > Reset Time Intervals  </Button>
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
