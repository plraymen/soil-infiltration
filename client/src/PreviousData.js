import React from 'react';
import {Link, NavLink} from "react-router-dom";
import {
    AppBar,
    Button,
    FormControl,
    FormControlLabel, Radio,
    RadioGroup,
    TextField,
    Toolbar,
    Typography
} from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import CloseIcon from "@material-ui/icons/Close";
import ListItemText from "@material-ui/core/ListItemText";
import './button.css'

function PreviousData({that}) {
    let OtherContentindex = 0;

    const Name = [
        {id: 0, name: "Welcome to Soil Infiltration App"},
        {id: 1, name: "Learn How To Use The App?"},
        {id: 2, name: "Learn How to Use the Infiltrometer?"},
        {id: 3, name: "Previous Test Data"},
        {id: 4, name: "Learn About Us?"},
        {id: 5, name: "Downloads"},
        {id: 6, name: "Learn BAER Protocol?"}
    ]

    let OtherContentcurrentWindow = window.location.pathname;
    if (OtherContentcurrentWindow === "/soilinfiltrometer/index.html") {
        OtherContentindex = 0;
    } else if (OtherContentcurrentWindow === "/soilinfiltrometer/learn") {
        OtherContentindex = 1;
    } else if (OtherContentcurrentWindow === "/soilinfiltrometer/learn-infiltrometer") {
        OtherContentindex = 2;
    } else if (OtherContentcurrentWindow === "/soilinfiltrometer/previous-data") {
        OtherContentindex = 3;
    } else if (OtherContentcurrentWindow === "/soilinfiltrometer/about") {
        OtherContentindex = 4;
    } else if (OtherContentcurrentWindow === "/soilinfiltrometer/download") {
        OtherContentindex = 5;
    } else if (OtherContentcurrentWindow === "/soilinfiltrometer/learn-baer") {
        OtherContentindex = 6;
    }

    const OtherContentCategories = [{id: " Main Page", location: "/soilinfiltrometer/index.html", command: that.SwitchToMain, number: 0},
        {id: " Learn How To Use The App?", location: '/soilinfiltrometer/learn', command: that.SwitchToLearnHowToUseTheApp, number: 1},
        {id: " Learn How to Use the Infiltrometer?", location: "/soilinfiltrometer/learn-infiltrometer", command: that.SwitchToLearnHowToUseTheInfiltrometer, number: 2},
        {id: " Learn BAER Protocol?", location: "/soilinfiltrometer/learn-baer", command: that.SwitchToLearnBAER, number: 3},
        {id: " Previous Test Data", location: "/soilinfiltrometer/previous-data", command: that.SwitchToPreviousData, number: 4},
        {id: " Learn About Us?", location: "/soilinfiltrometer/about", command: that.SwitchToAboutUs, number: 5},
        {id: " Downloads", location: "/soilinfiltrometer/download", command: that.SwitchToAboutUs, number: 6}
    ]

    const [OtherContentopen, OtherContentsetOpen] = React.useState(false);
    const handleDrawerOpen = () => {
        OtherContentsetOpen(true);
    };
    const handleDrawerClose = () => {
        OtherContentsetOpen(false);
    };

    const [value, setValue] = React.useState("StandardProtocol");
    const handleChange = (event) => {
        setValue(event.target.value);

        if (event.target.value === "StandardProtocol") {
            that.switchDataCollectionStandardProtocol();
            that.state.DataCollectingProtocol = "StandardProtocol";
        }

        if (event.target.value === "BAERProtocol") {
            that.switchDataCollectionBAERProtocol();
            that.state.DataCollectingProtocol = "BAERProtocol";
        }
    };

    const protocalSelection = () => {
        return (
            <div align={"center"}>
                <FormControl component="fieldset">
                    <h3>Select Protocol to Filter Data</h3>
                    {/*<RadioGroup aria-label="gender" name="gender1" value={NotificationValue} onChange={NotificationHandleChange}>*/}
                    <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange} defaultValue={"StandardProtocol"}>
                        <FormControlLabel value="StandardProtocol" control={<Radio />} label="Standard Protocol" onClick={that.switchDataCollectionStandardProtocol}/>
                        <FormControlLabel value="BAERProtocol" control={<Radio />} label="BAER Protocol" onClick={that.switchDataCollectionBAERProtocol}/>
                    </RadioGroup>
                </FormControl>
            </div>
        )
    }

    const tableData = () => {
        console.log(that.state.ReviewOldDataArray.length)
        console.log(that.state.ReviewOldDataArrayBAER.length)

        if (that.state.LoadPreviousData === 0) {
        // if ((that.state.ReviewOldDataArray.length === 1 && that.state.ReviewOldDataArrayBAER.length === 1) && (that.state.ReviewOldDataArray.Title === 0 && that.state.ReviewOldDataArrayBAER.Title === 0) ) {
            return (
                <div>
                    <div align={"center"}>
                        <h3>Are there any test not showing up for you?</h3>
                        <Link to="/soilinfiltrometer/previous-data" onClick={that.SwitchToPreviousData} style={{ textDecoration: 'none' }}>
                            <Button variant="contained" color="primary" className={"buttonContainer"}> Re-Load Table </Button>
                        </Link>
                    </div>
                </div>
            )
        } else if (that.state.DataCollectingProtocol === "StandardProtocol") {
            if (that.state.ReviewOldDataArray.length != "0") {
                return (
                    <div>
                        {protocalSelection()}
                        <br/>
                        <br/>
                        <div align={"center"}>
                            <Link to="/soilinfiltrometer/index.html" onClick={that.DeleteDatabase} style={{textDecoration: 'none'}}>
                                <Button variant="contained" color="secondary" className={"buttonContainer"}> Delete
                                    Entire Database (Standard) </Button>
                            </Link>
                        </div>

                        <br/>
                        {/*<RetrivalData ReviewOldDataArray={that.state.ReviewOldDataArray}/>*/}
                        <div align={"center"}>
                            <h1 id='title'>Previous Test Data</h1>
                            <table id='students'>
                                <tbody>
                                <tr>{that.renderPreviousTableHeader()}</tr>
                                {that.renderPreviousTableData()}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )
            } else {
                return (
                    <div align={"center"}>
                        {protocalSelection()}
                        <br/>
                        <br/>
                        <h1>Please have at least one Test Case to Review Old Data (Standard)</h1>
                    </div>
                )
            }
        }

        else if (that.state.DataCollectingProtocol === "BAERProtocol") {
            console.log("Test")
            console.log(that.state.ReviewOldDataArrayBAER)
            if (that.state.ReviewOldDataArrayBAER.length != "0") {
                return (
                    <div>
                        {protocalSelection()}
                        <br/>
                        <br/>
                        <div align={"center"}>
                            <Link to="/soilinfiltrometer/index.html" onClick={that.DeleteDatabaseBAER} style={{textDecoration: 'none'}}>
                                <Button variant="contained" color="secondary" className={"buttonContainer"}> Delete
                                    Entire Database (BAER)</Button>
                            </Link>
                        </div>

                        <br/>
                        {/*<RetrivalData ReviewOldDataArray={that.state.ReviewOldDataArrayBAER}/>*/}
                        <div align={"center"}>
                            <h1 id='title'>Previous Test Data</h1>
                            <table id='students'>
                                <tbody>
                                <tr>{that.renderPreviousTableHeaderBAER()}</tr>
                                {that.renderPreviousTableDataBAER()}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )
            } else {
                return (
                    <div align={"center"}>
                        {protocalSelection()}
                        <br/>
                        <br/>
                        <h1>Please have at least one Test Case to Review Old Data (BAER)</h1>
                    </div>
                )
            }
        }
    }

    return (
        <div>
            <div>
                <CssBaseline />
                <AppBar position="static">
                    <Toolbar variant="dense">
                        <IconButton color="inherit" onClick={handleDrawerOpen} edge="start">
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h5"  align="center" style={{width: "100%", alignItems: "center"}}> {Name[OtherContentindex].name} </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer variant="persistent" anchor="left" open={OtherContentopen}>
                    <List>
                        <ListItem button key="home" onClick={handleDrawerClose}>
                            <ListItemIcon>
                                <CloseIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Close" />
                        </ListItem>
                        <List>
                            {OtherContentCategories.map((id, command) => (
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

            <div>
                {tableData()}
            </div>
            <br/>
            <br/>
            <br/>
            <br/>
        </div>
    )
}

export default PreviousData;