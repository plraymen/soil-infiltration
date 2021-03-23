import React from 'react';
import {Link} from "react-router-dom";
import {AppBar, Button, Toolbar, Typography} from "@material-ui/core";
import PDFViewer from 'pdf-viewer-reactjs';
import pdf from './Mini_Disk_Manual_Web.pdf';
import OtherContent from "./OtherContent";

function LearnInfil({that}) {
  return (
      <div>
        {/*<AppBar position="static">*/}
        {/*  <Toolbar variant="dense" style={{backgroundColor: '#FFA500'}} align='center'>*/}
        {/*    <Typography variant="h5" align='center'>*/}
        {/*      Learn How to use the Infiltrometer?*/}
        {/*    </Typography>*/}
        {/*      <Link to="/" onClick={that.SwitchToMain} style={{ textDecoration: 'none' }}>*/}
        {/*          <Button variant="contained" color="primary">Return to Main Page</Button>*/}
        {/*      </Link>*/}
        {/*  </Toolbar>*/}
        {/*</AppBar>*/}

          <OtherContent></OtherContent>
        <div>
          <PDFViewer
              document={{
                url: pdf
              }}
          />
        </div>

      </div>
  )
}

export default LearnInfil;
