import React from 'react';
import {Link} from "react-router-dom";
import {AppBar, Button, TextField, Toolbar, Typography} from "@material-ui/core";
import RetrivalData from './RetrivalData';
import OtherContent from "./OtherContent";

function PreviousData({that}) {
  return (
    <div>
        <OtherContent/>
        {that.SwitchToPreviousData}
      <div className={"center"}>
        <h1>View or Edit old Data Values</h1>

        <p>Enter Test Title</p>

            <TextField id="Title"
                                   label="Title"
                                   variant="filled"
                                   value={that.state.title}
                                   onChange={e => that.setState({ title: e.target.value })}
        />
        <br/>
        <br/>
        <Link to="/review-data" onClick={that.ReviewOldData} style={{ textDecoration: 'none' }}>
            <Button variant="contained" color="primary">Review Old Data</Button>
        </Link>
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
        <Link to="/edit-data" onClick={that.SwitchToEditingOldData} style={{ textDecoration: 'none' }}>
            <Button variant="contained" color="primary">Edit Data</Button>
        </Link>
      </div>

        <br/>
        <br/>

        <hr></hr>
        <div align={"center"}>
            <h3>Having Trouble Seeing Old Data? Or The Table is not Populated?</h3>
            <Link to="/previous-data" onClick={that.SwitchToPreviousData} style={{ textDecoration: 'none' }}>
                <Button variant="contained" color="primary"> Refresh Table </Button>
            </Link>
        </div>

        <hr></hr>

        <br/>
        <div align={"center"}>
            <Link to="/" onClick={that.DeleteDatabase} style={{ textDecoration: 'none' }}>
                <Button variant="contained" color="secondary"> Delete Entire Database </Button>
            </Link>
        </div>

      <br/>
      <br/>
      <div>
        <p>{console.log(that.state.ReviewOldDataArray)}</p>
        {/*<RetrivalData ReviewOldDataArray={that.state.ReviewOldDataArray}/>*/}
          <div>
              <h1 id='title'>Previous Test Data</h1>
              <table id='students'>
                  <tbody>
                  <tr>{that.renderPreviousTableHeader()}</tr>
                  {that.renderPreviousTableData()}
                  </tbody>
              </table>
          </div>
      </div>
        <br/>
        <br/>
        <br/>
        <br/>
    </div>
  )
}

export default PreviousData;
