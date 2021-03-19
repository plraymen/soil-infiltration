import React from 'react';
import {Link} from "react-router-dom";
import {AppBar, Button, TextField, Toolbar, Typography} from "@material-ui/core";
import Table from "./table";

function Edit({that}) {
  return (
    <div>
      <AppBar position="static">
        <Toolbar variant="dense" style={{backgroundColor: '#FFA500'}} align='center'>
          <Typography variant="h5" align='center'>
            Editing Old Data
          </Typography>

          <Link to="/" onClick={that.resettingToEditingMainPage}>Reset and Return to Main Page</Link>
          <Link to="/" onClick={that.EditData}>Save and Return to Main Page</Link>

        </Toolbar>
      </AppBar>

      <div align={"center"}>
        <br/>
        <br/>
        <br/>

        <p>Change Title: </p>
        <TextField id="filled-basic-Time"
                   label="Title"
                   variant="filled"
                   value={that.state.newTitle}
                   onChange={e => that.setState({ newTitle: e.target.value })}
        />

        <br/>
        <br/>

        <p>Change GPS Coordinates: </p>
        <div>
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
        </div>
        <div>
          <Button variant="contained"
                  color="primary"
                  onClick={that.getGPSLocation}
          >Use Phones GPS</Button>
        </div>

        <br/>
        <br/>

        <div>
          <p>Change Picture:  </p>
          <TextField id="filled-basic-Time"
                     label="Picture"
                     variant="filled"
                     value={that.state.file}
                     onChange={e => that.setState({ file: e.target.value })}
          />
        </div>
        <div>
          <h3>Upload a Picture:</h3>
          <input
              type="file"
              id="imageFile"
              name='imageFile'
              onChange={that.imageUpload} />
          <img src={that.state.file}/>
        </div>

        <br/>
        <br/>

        <div>
          <p>Change Data:  </p>
          <TextField id="filled-basic-Time"
                     label="Data"
                     variant="filled"
                     value={that.state.Data}
                     onChange={e => that.setState({ Data: e.target.value })}
          />
        </div>

        <br/>
        <br/>

        <div>
          <p>Change Infiltrometer Settings:  </p>
          <TextField id="filled-basic-Time"
                     label="Data"
                     variant="filled"
                     value={that.state.infiltrometerData}
                     onChange={e => that.setState({ infiltrometerData: e.target.value })}
          />
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
              <td>{that.state.DatabaseData[that.state.indexNum].InfiltrometerData.Radius.toString()}</td>
            </tr>
            <tr>
              <td>Alpha: </td>
              <td>{that.state.DatabaseData[that.state.indexNum].InfiltrometerData.Alpha.toString()}</td>
            </tr>
            <tr>
              <td>n/ho: </td>
              <td>{that.state.DatabaseData[that.state.indexNum].InfiltrometerData.NperH0.toString()}</td>
            </tr>
            <tr>
              <td>Suction: </td>
              <td>{that.state.DatabaseData[that.state.indexNum].InfiltrometerData.Suction.toString()}</td>
            </tr>
          </table>
        </div>

        <br/>
        <br/>

      </div>


      <div>
        <Table Data={that.state.DatabaseData[that.state.indexNum].Data}/>
      </div>



      <br/>
      <br/>
      <br/>
      <div>
        {/*<TestInfiltrometerSettings Data={that.state.DatabaseData[indexNum].infiltrometerData}/>*/}
      </div>
      <br/>
      <br/>
      <br/>
    </div>
  )
}

export default Edit;
