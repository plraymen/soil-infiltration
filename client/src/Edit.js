import React from 'react';
import {Link, NavLink} from "react-router-dom";
import {AppBar, Button, TextField, Toolbar, Typography} from "@material-ui/core";
import Table from "./table";
import CssBaseline from "@material-ui/core/CssBaseline";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import CloseIcon from "@material-ui/icons/Close";
import ListItemText from "@material-ui/core/ListItemText";

function Edit({that}) {
  window.addEventListener("beforeunload", function (e) {
    let confirmationMessage = 'It looks like you have been editing something. '
        + 'If you leave before saving, test will be los5t.';

    (e || window.event).returnValue = confirmationMessage;
    return confirmationMessage;
  });
  //-------------------------------------------------------------------------------------------------//
  //Drawer
  let index = 0;

  const Name = [
    {id: 0, name: "Editing Old Data: "},
  ]

  let currentWindow = window.location.pathname;
  const Categories =
      [
        {id: " Save Changes and Return to Main Page", location: "/index.html", command: that.EditData, number: 0},
        {id: " Reset and Return to Main Page", location: "/index.html", command: that.resettingToEditingMainPage, number: 1},
      ]

  const [openModel, setOpenModal] = React.useState(false);
  const handleDrawerOpen = () => {
    setOpenModal(true);
  };
  const handleDrawerClose = () => {
    setOpenModal(false);
  };

  //------------------------------------------------------------------------------------------------//
  return (
    <div>
      <div>
        <CssBaseline />
        <AppBar position="static">
          <Toolbar variant="dense">
            <IconButton color="inherit" onClick={handleDrawerOpen} edge="start">
              <MenuIcon />
            </IconButton>
            <Typography variant="h5"  align="center" style={{width: "100%", alignItems: "center"}}> {Name[index].name} {that.state.DatabaseData[that.state.indexNum].Title} </Typography>
          </Toolbar>
        </AppBar>
        <Drawer variant="persistent" anchor="left" open={openModel}>
          <List>
            <ListItem button key="home" onClick={handleDrawerClose}>
              <ListItemIcon>
                <CloseIcon/>
              </ListItemIcon>
              <ListItemText primary="Close" />
            </ListItem>
            <List>
              {Categories.map((id, command) => (
                  <ListItem button component={NavLink} to={id.location} onClick={id.command} activeClassName="Mui-selected" exact>
                    <ListItemText primary={id.id} />
                  </ListItem>
              ))}
            </List>
          </List>
        </Drawer>
        <main style={{ marginTop: 50 }}>
        </main>
      </div>

      <div align={"center"}>
        <p>Change Title: </p>
        <div>
        <TextField id="filled-basic-Time"
                   label="Title"
                   variant="filled"
                   value={that.state.newTitle}
                   onChange={e => that.setState({ newTitle: e.target.value })}
        />
        </div>

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
          <div><input
              type="file"
              id="imageFile"
              name='imageFile'
              onChange={that.imageUpload} />
          </div>
           <div>
          <img src={that.state.file}/>
           </div>
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
