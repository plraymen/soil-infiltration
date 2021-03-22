import React from 'react';
import {Link} from "react-router-dom";
import Drawer from 'react-simple-drawer'
import 'react-simple-drawer/dist/index.css'

import {
    AppBar,
    Button, Grid,
    IconButton,
    InputLabel,
    MenuItem,
    Select, SwipeableDrawer,
    TextField,
    Toolbar,
    Typography
} from "@material-ui/core";

import { soilData, suctionData } from "./configSoil";
import MenuIcon from "@material-ui/icons/Menu";

const styles = {
    root: {
        flexGrow: 1
    },
    typography: {
        flexGrow: 1,
        align: "center"
    }
};

function Main({that}) {

    let backdrop;
    if(that.state.drawerOpen){
        // backdrop = <Backdrop close={this.backdropClickHandler}/>;
    }

  return (
    <div>
    <div>
        <AppBar position="static" >
            <Toolbar style={{backgroundColor: '#FFA500'}} variant="dense">
                <IconButton edge="start"  color="inherit" aria-label="menu" align="left">

                    <Drawer closeIcon={<MenuIcon></MenuIcon>}
                        cta={<MenuIcon></MenuIcon>}
                        maskable={true}
                        placement={"left"}
                        open={false}
                    >
                        <div className={"center"}>
                            <Link to="/learn" onClick={that.SwitchToLearnHowToUseTheApp} style={{ textDecoration: 'none' }}>
                                <Button variant="contained" color="primary">Learn How to Use the App?</Button>
                            </Link>
                        </div>
                        <br/>
                        <div className={"center"}>
                            <Link to="/learn-infiltrometer" onClick={that.SwitchToLearnHowToUseTheInfiltrometer} style={{ textDecoration: 'none' }}>
                                <Button variant="contained" color="primary">Learn How to Use the Infiltrometer?</Button>
                            </Link>
                        </div>
                        <br/>
                        <div className={"center"}>
                            <Link to="/previous-data" onClick={that.SwitchToPreviousData} style={{ textDecoration: 'none' }}>
                                <Button variant="contained" color="primary"> Previous Test Data </Button>
                            </Link>
                        </div>
                        <br/>
                        <div className={"center"}>
                            <Link to="/about" onClick={that.SwitchToAboutUs} style={{ textDecoration: 'none' }}>
                                <Button variant="contained" color="primary"> Learn About Us? </Button>
                            </Link>
                        </div>
                    </Drawer>
                </IconButton>
                <Typography variant="h5"  align="center" style={{width: "100%", alignItems: "center"}}> Welcome to Soil Infiltration App </Typography>
            </Toolbar>
        </AppBar>
    </div>
      <h3 className={"center"}>Start the Program</h3>
      <div className={"center"}>
        <TextField id="filled-basic-Time"
                   label="Time Intervals in Seconds"
                   variant="filled"
                   value={that.state.timeInterval}
                   onChange={e => that.setState({ timeInterval: e.target.value })}
        />
      </div>
      <br/>
      <div className={"center"}>
        <TextField id="filled-basic-Initial-Vol"
                   label="Initial Volume in mL"
                   variant="filled"
                   value={that.state.initialVolume}
                   onChange={e => that.setState({ initialVolume: e.target.value })}
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
                     onChange={e => that.setState({ Radius: e.target.value })}
          />
        </div>

        <div>
            <InputLabel>Select a Value</InputLabel>
            <Select defaultValue={"Main"} labelId="label" id="select" value="20">
                <MenuItem id={"Main"} variant="contained"
                        color="primary"
                        onClick={that.selectInftiltrometerTypeMiniDisk}
                > MiniDisk </MenuItem>
                <MenuItem variant="contained"
                        color="primary"
                        onClick={that.selectInftiltrometerTypeMiniDiskV1}
                > MiniDisk Version 1 </MenuItem>
            </Select>
        </div>
      </div>

      <br/>
      <div className={"center"}>
        <div>
          <h5>Enter Soil Type - Alpha</h5>
          <TextField id="filled-basic-Time"
                     label="Alpha"
                     variant="filled"
                     value={that.state.Alpha}
                     onChange={e => that.setState({ Alpha: e.target.value })}
          />
        </div>
        <br/>
        <div>
          <TextField id="filled-basic-Time"
                     label="n/h0"
                     variant="filled"
                     value={that.state.NperH0}
                     onChange={e => that.setState({ NperH0: e.target.value })}
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
                                  onClick={() => that.selectSoilType(data.Alpha, data.NperH0)}>
                              {data.name}
                          </MenuItem>
                      );
                  })}

              </Select>
          </div>
      </div>

      <br/>
      <br/>
      <div className={"center"}>
        <div>
          <h5>Enter Suction (cm)</h5>
          <TextField id="filled-basic-Time"
                     label="Suction (cm)"
                     variant="filled"
                     value={that.state.Suction}
                     onChange={e => that.setState({ Suction: e.target.value })}
          />

          <br/>

          <div class="buttonContainer">
            <InputLabel>Select a Value</InputLabel>
            <Select labelId="label" id="select" value={"Clay"} defaultValue={"Clay"}>
                {suctionData.map((data, key) => {
                  return (
                      <MenuItem key={key}
                              variant="contained"
                              color="primary"
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
