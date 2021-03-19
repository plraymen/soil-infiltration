import React from 'react';
import {Link} from "react-router-dom";
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
          <Link to="/" onClick={that.SwitchToMain}>Return to Main Page</Link>
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
        <Link to="/review-data" onClick={that.ReviewOldData}>Review Old Data</Link>
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
        <Link to="/edit-data" onClick={that.SwitchToEditingOldData}>Edit Data</Link>
      </div>

      <br/>
      <br/>
      <br/>
      <div>
        <p>{console.log(that.state.ReviewOldDataArray)}</p>
        <RetrivalData ReviewOldDataArray={that.state.ReviewOldDataArray}/>
      </div>
    </div>
  )
}

export default PreviousData;
