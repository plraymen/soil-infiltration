import React from 'react';
import {Link} from "react-router-dom";
import {AppBar, Button, TextField, Toolbar, Typography} from "@material-ui/core";
import Timer from "react-compound-timer";
import Table from "./table";

function DataGathering({that}) {
  return (
      <div>
        <div align='center'>
          <AppBar position="static">
            <Toolbar variant="dense" style={{backgroundColor: '#FFA500'}} align='center'>
              <h2>Total Time (Seconds): </h2>
              <Timer formatValue={e => that.totalTime = e}
                  lastUnit={"s"}
                  initialTime={0}
                  direction="forward"
              >
                <Timer.Seconds />  seconds
              </Timer>
              <Typography variant="h5" align='center'>
                Application is Running
              </Typography>
              <Button variant="contained"
                      color="primary"
              > Reset Time Intervals  </Button>
              <Link to="/" onClick={that.resettingToMainPage}>Reset to Main Page</Link>
            </Toolbar>
          </AppBar>
        </div>

        <br/>
        <br/>
        <br/>
        <div align='center'>
          <Link to="/data-complete" onClick={that.SwitchToDataCompleted}>Data Gathering Completed</Link>
        </div>

        <br/>
        <br/>
        <br/>
      <div align='center'>
        <table>
          <tr>
            <td>Time Left in Interval:  </td>
            <td><Timer
              checkpoints={[ { time: 0, callback: () => that.promptToAddToArray()} ]}
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
          <Table Data={that.state.Data}/>
        </div>
      </div>
  )
}

export default DataGathering;
