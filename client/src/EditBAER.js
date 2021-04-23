import React from 'react';
import {Link, NavLink} from "react-router-dom";
import {AppBar, Button, TextField, Toolbar, Typography} from "@material-ui/core";
import Table from "./table";
import CssBaseline from "@material-ui/core/CssBaseline";
import './button.css'

function EditBAER({that}) {
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
            {id: " Save Changes and Return to Main Page", location: "/soilinfiltrometer/index.html", command: that.EditData, number: 0},
            {id: " Reset and Return to Main Page", location: "/soilinfiltrometer/index.html", command: that.resettingToEditingMainPage, number: 1},
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
                        <Typography variant="h5"  align="center" style={{width: "100%", alignItems: "center"}}> {Name[index].name} {that.state.DatabaseDataBAER[that.state.indexNum].Title} </Typography>
                    </Toolbar>
                </AppBar>
                <main style={{ marginTop: 10 }}>
                </main>
            </div>

            <div align={"center"}>
                <h3>Change Title</h3>
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

                <h3>Change GPS Coordinates </h3>
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
                    <br/>
                    <Button variant="contained"
                            color="primary"
                            onClick={that.getGPSLocation}
                    >Use Phones GPS</Button>
                </div>

                <br/>
                <br/>

                <div>
                    <h3>Upload a new Picture</h3>
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

            </div>


            <div className={"center"}>
                <Link onClick={that.EditDataBAER} to="/soilinfiltrometer/index.html" style={{ textDecoration: 'none' }}>
                    <Button variant="contained" color="primary" className={"buttonContainer"}> Save Changes and Return to Main Page</Button>
                </Link>
            </div>

            <br/>

            <div className={"center"}>
                <Link onClick={that.resettingToEditingMainPage} to="/soilinfiltrometer/index.html" style={{ textDecoration: 'none' }}>
                    <Button variant="contained" color="secondary" className={"buttonContainer"}> Reset and Return to Main Page </Button>
                </Link>
            </div>

            <br/>
            <hr></hr>
            <div className={"center"}>
                <h1>Non-Editable Test Results</h1>
            </div>

            <div align={"center"}>
                <h3>Mini-disk Configuration</h3>
                <table>
                    <tr>
                        <th>Setting</th>
                        <th>Number</th>
                    </tr>
                    <tr>
                        <td>Radius: </td>
                        <td>{that.state.DatabaseDataBAER[that.state.indexNum].InfiltrometerData.Radius.toString()}</td>
                    </tr>
                    <tr>
                        <td>Alpha: </td>
                        <td>{that.state.DatabaseDataBAER[that.state.indexNum].InfiltrometerData.Alpha.toString()}</td>
                    </tr>
                    <tr>
                        <td>n/ho: </td>
                        <td>{that.state.DatabaseDataBAER[that.state.indexNum].InfiltrometerData.NperH0.toString()}</td>
                    </tr>
                    <tr>
                        <td>Suction: </td>
                        <td>{that.state.DatabaseDataBAER[that.state.indexNum].InfiltrometerData.Suction.toString()}</td>
                    </tr>
                </table>
            </div>


            <br/>

            <div align={"center"}>
                <h1 id='title'>Previous Test Data</h1>
                <table id='students'>
                    <tbody>
                    <tr>{that.renderOLDTableHeaderBAER()}</tr>
                    {that.renderOLDTableDataBAER()}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default EditBAER;
