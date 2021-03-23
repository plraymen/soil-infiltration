import React from 'react';
import {Link, NavLink} from "react-router-dom";
import {AppBar, Button, TextField, Toolbar, Typography} from "@material-ui/core";
import Table from "./table";
import {CSVLink} from "react-csv";
import CssBaseline from "@material-ui/core/CssBaseline";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import CloseIcon from "@material-ui/icons/Close";
import ListItemText from "@material-ui/core/ListItemText";

function DataComplete({that}) {

    //-------------------------------------------------------------------------------------------------//
    //Drawer
    let index = 0;

    const Name = [
        {id: 0, name: "Data Gathered: Application Completed"},
    ]

    let currentWindow = window.location.pathname;
    if (currentWindow === "/") {
        index = 0;
    }

    const Categories =
        [
            {id: " Save & Return to Main Page", location: "/", command: that.SaveAndExit, number: 0},
            {id: " Reset to Main Page", location: "/", command: that.resettingToMainPage, number: 1},
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
                    <Typography variant="h5"  align="center" style={{width: "100%", alignItems: "center"}}> {Name[index].name} </Typography>
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

        <h3>Add a Title to this Test</h3>
          <TextField id="filled-basic-Time"
                     label="Title"
                     variant="filled"
                     value={that.state.title}
                     onChange={e => that.setState({ title: e.target.value })}
          />
      </div>
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
