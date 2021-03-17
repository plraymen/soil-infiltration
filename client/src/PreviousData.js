import React from 'react';
import {AppBar, Button, TextField, Toolbar, Typography} from "@material-ui/core";
import RetrivalData from './RetrivalData';

function PreviousData({that}) {
  return (
    <div>
      <AppBar position="static">
        <Toolbar variant="dense" style={{backgroundColor: '#FFA500'}} align='center'>
          <Typography variant="h5" align='center'>
            Previous Test Data
          </Typography>
          <Button variant="contained"
                  color="primary"
                  onClick={that.DeleteDatabase}
          >Delete Entire Database </Button>
          <Button variant="contained"
                  color="primary"
                  onClick={that.SwitchToMain}
          >Return to Main Page </Button>
        </Toolbar>
      </AppBar>

      <br/>
      <br/>
      <br/>
      <div className={"center"}>
        <h1>View or Edit old Data Values</h1>

        <p>Enter Title: <TextField id="Title"
                                      label="Title"
                                      variant="filled"
                                      value={that.state.title}
                                      onChange={e => that.setState({ title: e.target.value })}
        /></p>
        <br/>
        <Button variant="contained"
                color="primary"
                onClick={that.ReviewOldData}
        > Review Old Data </Button>
      </div>
      <br/>
      <div align={"center"}>
        <Button variant="contained"
                   color="primary"
                   onClick={that.DeleteOldData}
      > Delete Old Data</Button>
      </div>

      <br/>
      <div align={"center"}>
        <Button variant="contained"
                color="primary"
                onClick={that.SwitchToEditingOldData}
        > Edit Data</Button>
      </div>

      <br/>
      <br/>
      <br/>
      <div>
        <RetrivalData DatabaseData={that.state.DatabaseData}/>
      </div>
    </div>
  )
}

export default PreviousData;
