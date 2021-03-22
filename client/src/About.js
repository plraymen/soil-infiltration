import React from 'react';
import {Link} from "react-router-dom";
import {AppBar, Button, Toolbar, Typography} from "@material-ui/core";

function About({that}) {
  return (
    <div>
      <AppBar position="static">
        <Toolbar variant="dense" style={{backgroundColor: '#FFA500'}} align='center'>
          <Typography variant="h5" align='center'>
            About Us?
          </Typography>
            <Link to="/" onClick={that.SwitchToMain} style={{ textDecoration: 'none' }}>
                <Button variant="contained" color="primary">Return to Main Page</Button>
            </Link>
        </Toolbar>
      </AppBar>

      <div>
        <h3>This app will be used throughout a myriad of different scientists with all different agricultural aspects from one single device called a Soil Infiltrometer. A Soil Infiltrometer is a device that will penetrate the ground - it must be conducted in a loamy environment like soil. A user then will pour water through a top funnel that then allows a user to watch it drain through time. A user then will record the time difference (from start) and the recorded volume of water that was lost throughout the process. This is an incremental step that is done in different time based intervals, for example: if a user selects time intervals for every 30 seconds, they will then record the volume lost every 30 seconds until the water drains.</h3>
        <h3>What this application is doing is allowing a user to get more accurate and precise measurements when it comes to recording information. We will build the app so that it will initially allow the user to set the time intervals they want to, then gets notified when the selected time intervals finally come into fruition. When the user gets notified, it will prompt them to enter the volumetric information that the soil infiltrometer shows (please note that the user will have to manually enter the information in and the time is still static during the interval). The app will show a table below that will dynamically auto-populate the information and create several different charts and graphs based-off of the recorded/calculated values. What this application is doing is allowing a user to get more accurate and precise measurements when it comes to recording information. We will build the app so that it will initially allow the user to set the time intervals they want to, then gets notified when the selected time intervals finally come into fruition. When the user gets notified, it will prompt them to enter the volumetric information that the soil infiltrometer shows (please note that the user will have to manually enter the information in and the time is still static during the interval). The app will show a table below that will dynamically auto-populate the information and create several different charts and graphs based-off of the recorded/calculated values.</h3>
      </div>
    </div>
  )
}

export default About;
