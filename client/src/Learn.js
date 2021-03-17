import React from 'react';
import {Link} from "react-router-dom";
import {AppBar, Toolbar, Typography} from "@material-ui/core";

function Learn({that}) {
      return (
          <div>
            <AppBar position="static">
              <Toolbar variant="dense" style={{backgroundColor: '#FFA500'}} align='center'>
                <Typography variant="h5" align='center'>
                  Learn How to use the App?
                </Typography>
                <Link to="/" onClick={that.SwitchToMain}>Return to Main Page</Link>
              </Toolbar>
            </AppBar>

            <div>
              <h3><li>Step 1: Enter in Initial Time Interval</li></h3>
              <h5>NOTE** This is going to start a timer from the selected time intervals defined on the main page. Once the time intervals is over, you will get prompted to enter in your volumetric data. Then the time intervals will reset.</h5>
              <br/>
              <br/>
              <br/>
              <h3><li>Step 2: Enter your initial volume in Mili-Liters(mL)</li></h3>

              <br/>
              <br/>
              <br/>
              <h3><li>Step 3: Once you click start, a new page will appear and it will prompt you during your session to enter volumetric data. Once time intervals has reached.</li></h3>

              <br/>
              <br/>
              <br/>
              <h3><li>Step 4: Once data gathering has been completed, press on the completed button to view recorded data.</li></h3>

              <br/>
              <br/>
              <br/>
              <h3><li>Step 5: You will be moved to a new page that will show you graphs, table data, and will allow you to export your data as a CSV file (similar to an excel spreadsheet). This will also allow you to upload a picture. As well as type in or use your phones GPS location data.</li></h3>
              <h5>NOTE** Useing phone GPS Location Data may not be as accurate as using a dedicated GPS device. The Coordinates could very by one meters to a kilometer away.</h5>
            </div>

          </div>
      )
}

export default Learn;
