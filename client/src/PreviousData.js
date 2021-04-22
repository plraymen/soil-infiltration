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
        {id: 5, name: "Downloads"}
    ]

    let OtherContentcurrentWindow = window.location.pathname;
    if (OtherContentcurrentWindow === "/index.html") {
        OtherContentindex = 0;
    } else if (OtherContentcurrentWindow === "/learn") {
        OtherContentindex = 1;
    } else if (OtherContentcurrentWindow === "/learn-infiltrometer") {
        OtherContentindex = 2;
    } else if (OtherContentcurrentWindow === "/previous-data") {
        OtherContentindex = 3;
    } else if (OtherContentcurrentWindow === "/about") {
        OtherContentindex = 4;
    } else if (OtherContentcurrentWindow === "/download") {
        OtherContentindex = 5;
    }

    const OtherContentCategories = [{id: " Main Page", location: "/index.html", command: that.SwitchToMain, number: 0},
        {id: " Learn How To Use The App?", location: '/learn', command: that.SwitchToLearnHowToUseTheApp, number: 1},
        {id: " Learn How to Use the Infiltrometer?", location: "/learn-infiltrometer", command: that.SwitchToLearnHowToUseTheInfiltrometer, number: 2},
        {id: " Previous Test Data", location: "/previous-data", command: that.SwitchToPreviousData, number: 3},
        {id: " Learn About Us?", location: "/about", command: that.SwitchToAboutUs, number: 4},
        {id: " Downloads", location: "/download", command: that.SwitchToAboutUs, number: 5}
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
        if (that.state.ReviewOldDataArray.length === 1) {
            return (
                <div>
                    <div align={"center"}>
                        <h3>Are there any test not showing up for you?</h3>
                        <Link to="/previous-data" onClick={that.SwitchToPreviousData} style={{ textDecoration: 'none' }}>
                            <Button variant="contained" color="primary" className={"buttonContainer"}> Re-Load Table </Button>
                        </Link>
                    </div>
                </div>
            )
        } else if (that.state.DataCollectingProtocol === "StandardProtocol") {
            return (
                <div>
                    {protocalSelection()}
                    <br/>
                    <br/>
                    <div align={"center"}>
                        <Link to="/index.html" onClick={that.DeleteDatabase} style={{ textDecoration: 'none' }}>
                            <Button variant="contained" color="secondary" className={"buttonContainer"}> Delete Entire Database (Standard) </Button>
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
        }

        else if (that.state.DataCollectingProtocol === "BAERProtocol") {
            return (
                <div>
                    {protocalSelection()}
                    <br/>
                    <br/>
                    <div align={"center"}>
                        <Link to="/index.html" onClick={that.DeleteDatabaseBAER} style={{ textDecoration: 'none' }}>
                            <Button variant="contained" color="secondary" className={"buttonContainer"}> Delete Entire Database (BAER)</Button>
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