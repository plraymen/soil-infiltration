import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {AppBar, Button, TextField, Toolbar, Typography} from "@material-ui/core";
import Timer from "react-compound-timer";

function DataGathering({that}) {
  return (
    <div>
      <div align='center'>
        <AppBar position="static">
          <Toolbar style={{backgroundColor: '#FFA500'}} variant="dense">
            <h4>Total Time: </h4>
            <Timer formatValue={e => that.totalTime = e}
                   lastUnit={"s"}
                   initialTime={0}
                   direction="forward"
            >
                <h4><Timer.Seconds /> Sec</h4>
            </Timer>
              <Typography variant="h5"  align="center" style={{width: "100%", alignItems: "center"}}>
              Application is Running
            </Typography>
            <Button variant="contained"
                    color="primary"
            > Reset Time Intervals  </Button>
            <Link to="/" onClick={that.resettingToMainPage} style={{ textDecoration: 'none' }}>
                <Button variant="contained" color="primary"> Reset to Main Page </Button>
            </Link>
          </Toolbar>
        </AppBar>
      </div>

      <br/>
      <br/>
      <br/>
      <div align='center'>
        <Link to="/data-complete" onClick={that.SwitchToDataCompleted} style={{ textDecoration: 'none' }}>
            <Button variant="contained" color="primary">Data Gathering Completed</Button>
        </Link>
      </div>

      <br/>
      <br/>
      <br/>
      <div align='center'>
        <table>
          <tr>
            <td>Time Left in Interval:  </td>
            <td><Timer
                checkpoints={[ { time: 0, callback: () => that.playAudio()} ]}
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
      <br/>
      <div align='center'>
        <TextField id="filled-basic-Time"
                   label="Enter Volumetric Data"
                   variant="filled"
                   value={that.state.volume}
                   onChange={e => that.setState({ volume: e.target.value })}
        />

        <Button variant="contained"
                color="primary"
                onClick={that.AddToDataArray}
        > Submit Volume</Button>
      </div>

      <br/>
      <br/>
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
