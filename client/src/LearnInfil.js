import React from 'react';
import {Link} from "react-router-dom";
import {AppBar, Toolbar, Typography} from "@material-ui/core";
import PDFViewer from 'pdf-viewer-reactjs';
import pdf from './Mini_Disk_Manual_Web.pdf';

function LearnInfil({that}) {
  return (
      <div>
        <AppBar position="static">
          <Toolbar variant="dense" style={{backgroundColor: '#FFA500'}} align='center'>
            <Typography variant="h5" align='center'>
              Learn How to use the Infiltrometer?
            </Typography>
            <Link to="/" onClick={that.SwitchToMain}>Return to Main Page</Link>
          </Toolbar>
        </AppBar>

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
