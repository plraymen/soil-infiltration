import React from 'react';
import {Link} from "react-router-dom";
import {AppBar, Button, TextField, Toolbar, Typography} from "@material-ui/core";
import Table from "./table";
import {CSVLink} from "react-csv";

function DataComplete({that}) {
  return (
    <div>
      <AppBar position="static">
        <Toolbar variant="dense" style={{backgroundColor: '#FFA500'}} align='center'>
          <Typography variant="h5" align='center'>
            Data Gathered
          </Typography>

          <Link to="/" onClick={that.resettingToMainPage} style={{ textDecoration: 'none' }}>
              <Button variant="contained" color="primary">Reset to Main Page</Button>
          </Link>
          <Link to="/" onClick={that.SaveAndExit} style={{ textDecoration: 'none' }}>
              <Button variant="contained" color="primary">Save & Return to Main Page</Button>
          </Link>
        </Toolbar>
      </AppBar>

      <div align={"center"}>

        <h3>Add a Title to this Test</h3>
          <TextField id="filled-basic-Time"
                     label="Title"
                     variant="filled"
                     value={that.state.title}
                     onChange={e => that.setState({ title: e.target.value })}
          />
      </div>

      <br/>
      <br/>
      <br/>

      <div align={"center"}>
        <h3>Upload a Picture:</h3>
        <div>
          <input
              type="file"
              id="imageFile"
              name='imageFile'
              onChange={that.imageUpload} />
        </div>
        <div>
          <img src={that.state.file} alt="Picture"/>
        </div>
      </div>

      <br/>
      <br/>
      <br/>

      <div align={"center"}>
        <h3>Enter GPS Location</h3>
        <div>
          <TextField id="filled-basic-Time"
                     label="Longitude"
                     variant="filled"
                     value={that.state.longitude}
                     onChange={e => that.setState({ longitude: e.target.value })}
          />
        </div>
        <br/>
        <div>
          <TextField id="filled-basic-Time"
                     label="Latitude"
                     variant="filled"
                     value={that.state.latitude}
                     onChange={e => that.setState({ latitude: e.target.value })}
          />
        </div>
        <Button variant="contained"
                color="primary"
                onClick={that.getGPSLocation}
        >Use Phones GPS</Button>
      </div>

      <br/>
      <br/>
      <br/>
      <div align={"center"}>
        <CSVLink
            data={that.state.Data}
            filename={that.state.title.toString() + ".csv"}
            className="btn btn-primary"
            target="_blank"

        >
            <Button variant="contained" color="primary">Export as CSV File</Button>

        </CSVLink>
      </div>

      <br/>
      <br/>

      <div align={"center"}>
        <table>
          <tr>
            <th>Setting</th>
            <th>Number</th>
          </tr>
          <tr>
            <td>Radius: </td>
            <td>{that.state.Radius.toString()}</td>
          </tr>
          <tr>
            <td>Alpha: </td>
            <td>{that.state.Alpha.toString()}</td>
          </tr>
          <tr>
            <td>n/ho: </td>
            <td>{that.state.NperH0.toString()}</td>
          </tr>
          <tr>
            <td>Suction: </td>
            <td>{that.state.Suction.toString()}</td>
          </tr>
        </table>
      </div>

      <br/>
      <br/>

      <div>
        <Table Data={that.state.Data}/>
      </div>
      <br/>
      <br/>
      <br/>
      <br/>
    </div>
  )
}

export default DataComplete;
