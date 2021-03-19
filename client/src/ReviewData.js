import React from 'react';
import {Link} from "react-router-dom";
import {AppBar, Button,  Toolbar, Typography} from "@material-ui/core";
import {ComposableMap, Geographies, Geography, Marker, ZoomableGroup} from "react-simple-maps";
import { CSVLink } from "react-csv";
import Table from "./table";

const geoUrl = "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

function ReviewData({that}) {
  return (
      <div>
        <AppBar position="static">
          <Toolbar variant="dense" style={{backgroundColor: '#FFA500'}} align='center'>
            <Typography variant="h5" align='center'>
              Review Old Data
            </Typography>
            <Link to="/previous-data" onClick={that.SwitchToPreviousData}>Return To Previous Data</Link>
            <Link to="/" onClick={that.SwitchToMain}>Return to Main Page</Link>
          </Toolbar>
        </AppBar>

        <div align={"center"}>
          <br/>
          <br/>
          <br/>

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
          <div align={"center"}>
            <CSVLink
                data={that.state.DatabaseData[that.state.indexNum].Data}
                filename={that.state.DatabaseData[that.state.indexNum].Title.toString() + ".csv"}
                className="btn btn-primary"
                target="_blank"

            >
              Export as CSV File

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
