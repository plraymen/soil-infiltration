import React from 'react';
import {Link, NavLink, Route} from "react-router-dom";
import {AppBar, Button,  Toolbar, Typography} from "@material-ui/core";
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
import LineChart from "react-linechart";
import './button.css'

function ReviewData({that}) {
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
        {id: 0, name: "Review Old Data: "},
    ]

    let currentWindow = window.location.pathname;

    const Categories =
        [
            {id: " Return To Previous Data", location: "/soilinfiltrometer/previous-data", command: that.SwitchToPreviousData, number: 0},
            {id: " Return to Main Page", location: "/soilinfiltrometer/index.html", command: that.SwitchToMain, number: 1},
        ]

    const [openModel, setOpenModal] = React.useState(false);
    const handleDrawerOpen = () => {
        setOpenModal(true);
    };
    const handleDrawerClose = () => {
        setOpenModal(false);
    };

    //------------------------------------------------------------------------------------------------//
    const Data = [
        {
            color: "steelblue",
            points: that.state.DatabaseData[that.state.indexNum].InfiltrometerCalculations.Coordinates
        }
    ];

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
              <main style={{ marginTop: 10 }}>
              </main>
          </div>
        <div align={"center"}>
          <h2>Title: {that.state.DatabaseData[that.state.indexNum].Title}</h2>
          <br/>
          <h2>GPS Coordinate: {that.state.DatabaseData[that.state.indexNum].GPSLocation}</h2>
          <br/>
          <div align={"center"}>
              <div className="App">
                  <h2>Regression plot</h2>
                  <LineChart
                      width={300}
                      height={300}
                      data={Data}
                      xLabel={"Square Root of Time(s)"}
                      yLabel={"Cumulative Infiltration(cm)"}
                      hidePoints={true}
                  />
              </div>
          </div>
          <br/>

          <h2>Picture</h2>
          <img className={"reviewImg"} src={that.state.DatabaseData[that.state.indexNum].Picture} alt="Picture"/>
          <br/>
          <br/>
          <div align={"center"}>
            <CSVLink
                data={that.state.DatabaseData[that.state.indexNum].InfiltrometerCalculations.CSVArray}
                filename={that.state.DatabaseData[that.state.indexNum].Title.toString() + ".csv"}
                className="btn btn-primary"
                target="_blank"
                style={{ textDecoration: 'none' }}
            >
                <Button variant="contained" color="primary" style={{ textDecoration: 'none' }}>Export as CSV File</Button>

            </CSVLink>
          </div>
        </div>

        <br/>
          <hr></hr>
          <div align={"center"}>
              <h3>Mini-disk Configuration</h3>
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

          <div align={"center"}>
              <div>
                  <h3>Calculated Constants</h3>
              </div>
              <table>
                  <tr>
                      <td>A: </td>
                      <td>{that.state.DatabaseData[that.state.indexNum].InfiltrometerCalculations.A.toFixed(3)}</td>
                  </tr>
                  <tr>
                      <td>C1: </td>
                      <td>{that.state.DatabaseData[that.state.indexNum].InfiltrometerCalculations.C1.toFixed(3)}</td>
                  </tr>
                  <tr>
                      <td>K: </td>
                      <td>{that.state.DatabaseData[that.state.indexNum].InfiltrometerCalculations.K.toFixed(3)}</td>
                  </tr>
              </table>
          </div>

        <br/>

        <div align={"center"}>
          <Table Data={that.state.DatabaseData[that.state.indexNum].Data}/>
        </div>

        <br/>
        <br/>
        <br/>
      </div>
  )
}

export default ReviewData;
