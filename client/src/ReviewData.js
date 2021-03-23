import React from 'react';
import {Link, NavLink} from "react-router-dom";
import {AppBar, Button,  Toolbar, Typography} from "@material-ui/core";
import {ComposableMap, Geographies, Geography, Marker, ZoomableGroup} from "react-simple-maps";
import { CSVLink } from "react-csv";
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

const geoUrl = "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

function ReviewData({that}) {

    //-------------------------------------------------------------------------------------------------//
    //Drawer
    let index = 0;

    const Name = [
        {id: 0, name: "Review Old Data: "},
    ]

    let currentWindow = window.location.pathname;
    if (currentWindow === "/") {
        index = 0;
    }

    const Categories =
        [
            {id: " Return To Previous Data", location: "/previous-data", command: that.SwitchToPreviousData, number: 0},
            {id: " Return to Main Page", location: "/", command: that.SwitchToMain, number: 1},
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
          <p>Title: {that.state.DatabaseData[that.state.indexNum].Title}</p>
          <br/>

          <p>GPS Coordinate: {that.state.DatabaseData[that.state.indexNum].GPSLocation}</p>
          <div>
            <ComposableMap>
              <ZoomableGroup zoom={1}>
                <Geographies geography={geoUrl}>
                  {({ geographies }) =>
                      geographies.map(geo => (
                          <Geography key={geo.rsmKey} geography={geo} />
                      ))
                  }
                </Geographies>
                <Marker coordinates={[that.state.longitude,that.state.latitude]}>
                  <circle r={1} fill="#F53" />
                </Marker>
              </ZoomableGroup>
            </ComposableMap>
          </div>
          <br/>

          <p>Picture</p>
          <img className={"reviewImg"} src={that.state.DatabaseData[that.state.indexNum].Picture} alt="Picture"/>
          <br/>
          <br/>
          <br/>
          <br/>
          <div align={"center"}>
            <CSVLink
                data={that.state.DatabaseData[that.state.indexNum].Data}
                filename={that.state.DatabaseData[that.state.indexNum].Title.toString() + ".csv"}
                className="btn btn-primary"
                target="_blank"

            >
                <Button variant="contained" color="primary">Export as CSV File</Button>

            </CSVLink>
          </div>
        </div>

        <br/>
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
        <br/>

        <div>
          <Table Data={that.state.DatabaseData[that.state.indexNum].Data}/>
        </div>

        <br/>
        <br/>
        <br/>
      </div>
  )
}

export default ReviewData;
