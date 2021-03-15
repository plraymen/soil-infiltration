import React, { Component } from 'react';
import './App.css';
import {AppBar, Button, IconButton, Menu, MenuItem, TextField, Toolbar, Typography} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import Table from "./table";
import Timer from "react-compound-timer";
//import Countdown from "react-countdown";
import { CSVLink, CSVDownload } from "react-csv";
import PDFViewer from 'pdf-viewer-reactjs';
import pdf from './Mini_Disk_Manual_Web.pdf';
import Localbase from 'localbase';
import RetrivalData from './RetrivalData';
import {ComposableMap, Geographies, Geography, Marker, ZoomableGroup} from "react-simple-maps";

let db = new Localbase('db')

const geoUrl = "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

let users = [];
let indexNum = 0;
let lon = 0;
let lat = 0;
let totalTime = 0;


async function getUsers() {
  try {
    users = await db.collection('Database')
        .get()
    console.log('users: ', users)
  }
  catch(error) {
    console.log('error: ', error)
  }
}

const Completionist = () => <span>Enter Volumetric Data</span>;

const renderer = ({ hours, minutes, seconds, completed }) => {
  if (completed) {
    // Render a completed state
    return <Completionist />;
  } else {
    // Render a countdown
    return <span>{hours}:{minutes}:{seconds}</span>;
  }
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      PageState: "MainPage",
      id: 0,
      time: 0,
      timeInterval: 30,
      initialVolume: 95,
      volume: 0,
      Data: [],
      title: "",
      gpsCoordinates: "",
      file: null,
      DatabaseData: [],
      infiltrometerData: [{Radius: 0, Alpha: 0, NperH0: 0, Suction: 0}], //Keeps track of MiniDisk
      newTitle: "",
      sqrtTime: 0,
      Radius: 2.25,
      Alpha: 0,
      NperH0: 0,
      Suction: 0,
      infilt: 0,
      longitude: 0,
      latitude: 0,
      A:0,
      C1:0,
      K:0,
      InfiltrometerCalculatioons: [{A:0, C1: 0, K:0}]
    };

    this.componentDidMount  = this.componentDidMount.bind(this);
    this.SwitchToMainToDataGathering = this.SwitchToMainToDataGathering.bind(this);
    this.SwitchToMain = this.SwitchToMain.bind(this);
    this.SwitchToDataCompleted = this.SwitchToDataCompleted.bind(this);
    this.SwitchToLearnHowToUseTheApp = this.SwitchToLearnHowToUseTheApp.bind(this);
    this.SwitchToLearnHowToUseTheInfiltrometer = this.SwitchToLearnHowToUseTheInfiltrometer.bind(this);
    this.SwitchToPreviousData = this.SwitchToPreviousData.bind(this);
    this.SwitchToAboutUs = this.SwitchToAboutUs.bind(this);
    this.SwitchToEditingOldData = this.SwitchToEditingOldData.bind(this);
    this.AddToDataArray = this.AddToDataArray.bind(this);
    this.getGPSLocation = this.getGPSLocation.bind(this);
    this.getPosition = this.getPosition.bind(this);
    this.handleChange = this.handleChange.bind(this)
    this.SaveAndExit = this.SaveAndExit.bind(this)
    this.ReviewOldData = this.ReviewOldData.bind(this)
    this.DeleteOldData = this.DeleteOldData.bind(this)
    this.DeleteDatabase = this.DeleteDatabase.bind(this)
    this.EditData = this.EditData.bind(this)
    this.checkpoints = this.checkpoints.bind(this)
    this.SoilInfiltrometerCalculations = this.SoilInfiltrometerCalculations.bind(this)

    this.selectInftiltrometerTypeMiniDisk = this.selectInftiltrometerTypeMiniDisk.bind(this)
    this.selectInftiltrometerTypeMiniDiskV1 = this.selectInftiltrometerTypeMiniDiskV1.bind(this)
    this.selectSoilTypeClay = this.selectSoilTypeClay.bind(this)
    this.selectSoilTypeClayLoam = this.selectSoilTypeClayLoam.bind(this)
    this.selectSoilTypeLoamySand = this.selectSoilTypeLoamySand.bind(this)
    this.selectSoilTypeSand = this.selectSoilTypeSand.bind(this)
    this.selectSoilTypeSandyClay = this.selectSoilTypeSandyClay.bind(this)
    this.selectSoilTypeSandyClayLoam = this.selectSoilTypeSandyClayLoam.bind(this)
    this.selectSoilTypeSandyLoam = this.selectSoilTypeSandyLoam.bind(this)
    this.selectSoilTypeSilt = this.selectSoilTypeSilt.bind(this)
    this.selectSoilTypeSiltLoam = this.selectSoilTypeSiltLoam.bind(this)
    this.selectSoilTypeSiltyClay = this.selectSoilTypeSiltyClay.bind(this)
    this.selectSoilTypeSiltyClayLoam = this.selectSoilTypeSiltyClayLoam.bind(this)
    this.selectSoilTypeLoamy = this.selectSoilTypeLoamy.bind(this)

    this.selectSoilSuctionTypePoint5 = this.selectSoilSuctionTypePoint5.bind(this)
    this.selectSoilSuctionType1 = this.selectSoilSuctionType1.bind(this)
    this.selectSoilSuctionType2 = this.selectSoilSuctionType2.bind(this)
    this.selectSoilSuctionType3 = this.selectSoilSuctionType3.bind(this)
    this.selectSoilSuctionType4 = this.selectSoilSuctionType4.bind(this)
    this.selectSoilSuctionType5 = this.selectSoilSuctionType5.bind(this)
    this.selectSoilSuctionType6 = this.selectSoilSuctionType6.bind(this)
    this.selectSoilSuctionType7 = this.selectSoilSuctionType7.bind(this)

    this.resettingToMainPage = this.resettingToMainPage.bind(this)
    this.resettingToEditingMainPage = this.resettingToEditingMainPage.bind(this)
    this.promptToAddToArray = this.promptToAddToArray.bind(this)
  }

  componentDidMount  () {
    getUsers().then(r => "something")
    this.setState({
      DatabaseData: this.state.DatabaseData = users
    })
  }

  SwitchToMain() {
    getUsers().then(r => "something")
    getUsers().then(r => "something")
    this.setState({
      DatabaseData: this.state.DatabaseData = users
    })

    totalTime = 0;

    this.setState({
      id: this.state.id = 0,
      time: this.state.time = 0,
      timeInterval: this.state.timeInterval = 30,
      initialVolume: this.state.initialVolume = 95,
      volume: this.state.volume = 0,
      Data: this.state.Data = [],
      title: this.state.title = "",
      gpsCoordinates: this.state.gpsCoordinates = "",
      file: this.state.file = null,
      sqrtTime: this.state.sqrtTime = 0,
      newTitle: this.state.newTitle = "",
      Radius: this.state.Radius = 0,
      Alpha: this.state.Alpha = 0,
      NperH0: this.state.NperH0 = 0,
      Suction: this.state.Suction = 0,
      infilt: this.state.infilt = 0,
      infiltrometerData: this.state.infiltrometerData = [{Radius: 0, Alpha: 0, NperH0: 0, Suction: 0}],
      longitude: this.state.longitude = 0,
      latitude: this.state.latitude = 0,
      PageState: this.state.PageState = "MainPage"
    })
  }

  SwitchToMainToDataGathering() {
    getUsers().then(r => "something")
    getUsers().then(r => "something")
    this.setState({
      DatabaseData: this.state.DatabaseData = users
    })

    let joined = this.state.Data.concat({id: this.state.id, Time: totalTime, Sqrt: this.state.sqrtTime, Volume: this.state.initialVolume, Infilt: this.state.infilt});
    this.setState({Data: joined})
    console.log(this.state.Data)

      this.setState({
        PageState: this.state.PageState = "DataGathering"
      })
  }

  SwitchToDataCompleted() {
    getUsers().then(r => "something")
    getUsers().then(r => "something")
    this.setState({
      DatabaseData: this.state.DatabaseData = users
    })

    this.setState({
      PageState: this.state.PageState = "DataCompleted"
    })
  }

  SwitchToLearnHowToUseTheApp() {
    getUsers().then(r => "something")
    getUsers().then(r => "something")
    this.setState({
      DatabaseData: this.state.DatabaseData = users
    })
    this.setState({
      PageState: this.state.PageState = "LearnHowToUsetheApp"
    })
  }

  SwitchToLearnHowToUseTheInfiltrometer() {
    getUsers().then(r => "something")
    getUsers().then(r => "something")
    this.setState({
      DatabaseData: this.state.DatabaseData = users
    })
    this.setState({
      PageState: this.state.PageState = "LearnHowToUsetheInfiltrometer"
    })
  }

  async SwitchToPreviousData() {
    getUsers().then(r => "something")
    getUsers().then(r => "something")
    this.setState({
      DatabaseData: this.state.DatabaseData = users
    })
    getUsers().then(r => "something")
    getUsers().then(r => "something")
    this.setState({
      DatabaseData: this.state.DatabaseData = users
    })

    if (this.state.DatabaseData.length < 3) {
      alert("You have no Previous Data Entries. Please have a minimum of Three Test to view old data.")
    } else {

      console.log(this.state.DatabaseData);
      console.log(this.state.DatabaseData[0].Data)
      this.setState({
        PageState: this.state.PageState = "PeviousTestData"
      })
    }
  }

  SwitchToEditingOldData() {
    getUsers().then(r => "something")
    getUsers().then(r => "something")
    this.setState({
      DatabaseData: this.state.DatabaseData = users
    })
    if (this.state.title === "") {
      alert("You have left the title blank. Please enter information")
    } else {
      let confirmation = "no"
      for (let i = 0; i < this.state.DatabaseData.length; i++) {
        if (this.state.DatabaseData[i].Title === this.state.title) {
          indexNum = i
          confirmation = "yes"
        }
      }

      console.log("IndexNum: " + indexNum)
      if ((confirmation === "yes") && (this.state.DatabaseData[indexNum].GPSLocation.toString() === "N/A - Not Saved")) {
        this.setState({
          title: this.state.title = this.state.DatabaseData[indexNum].Title.toString(),
          newTitle: this.state.newTitle = this.state.DatabaseData[indexNum].Title.toString(),
          gpsCoordinates: this.state.gpsCoordinates = this.state.DatabaseData[indexNum].GPSLocation.toString(),
          longitude: this.state.longitude = "N/A - Not Saved",
          latitude: this.state.latitude = "N/A - Not Saved",
          file: this.state.file = this.state.DatabaseData[indexNum].Picture,
          Data: this.state.Data = this.state.DatabaseData[indexNum].Data,
          infiltrometerData: this.state.infiltrometerData = this.state.DatabaseData[indexNum].InfiltrometerData,
          PageState: this.state.PageState = "EditingPage"
        })
      } else if ((confirmation === "yes") && (this.state.DatabaseData[indexNum].GPSLocation.toString() !== "N/A - Not Saved")) {
        let arr = this.state.DatabaseData[indexNum].GPSLocation.split(",")

        this.setState({
          title: this.state.title = this.state.DatabaseData[indexNum].Title.toString(),
          newTitle: this.state.newTitle = this.state.DatabaseData[indexNum].Title.toString(),
          gpsCoordinates: this.state.gpsCoordinates = this.state.DatabaseData[indexNum].GPSLocation.toString(),
          longitude: this.state.longitude = arr[0],
          latitude: this.state.latitude = arr[1],
          file: this.state.file = this.state.DatabaseData[indexNum].Picture,
          Data: this.state.Data = this.state.DatabaseData[indexNum].Data,
          infiltrometerData: this.state.infiltrometerData = this.state.DatabaseData[indexNum].InfiltrometerData,
          PageState: this.state.PageState = "EditingPage"
        })
      }
      else {
        alert("No Titles Matched Your inputted Text. Please also check Spelling and/or Capitalization (this does matter)")
      }
    }
  }

  SwitchToAboutUs() {
    getUsers().then(r => "something")
    getUsers().then(r => "something")
    this.setState({
      DatabaseData: this.state.DatabaseData = users
    })
    this.setState({
      PageState: this.state.PageState = "AboutUs"
    })
  }

  promptToAddToArray(reset) {
    let entered = prompt("Enter Volumetric Data (mL): ", "0");

    this.setState({
      volume: this.state.volume = entered
    })

    if (entered != null) {
      this.AddToDataArray()
    }
  }

  AddToDataArray() {
    if (this.state.volume === "") {
      alert("Volumetric Data is Empty, Please Enter a number in the given text field.")
    } else {
      getUsers().then(r => "something")
      getUsers().then(r => "something")
      this.setState({
        DatabaseData: this.state.DatabaseData = users
      })

      this.state.id++;

      //This setting the square root of the time
      this.setState({
        sqrtTime: this.state.sqrtTime = Math.sqrt(totalTime)
      })

      //This is for the infilt calculation
      this.setState({
        infilt: this.state.infilt = ((this.state.initialVolume - this.state.volume) / (Math.PI * Math.pow(this.state.Radius, 2)))
      })

      let joined = this.state.Data.concat({
        id: this.state.id,
        Time: totalTime,
        Sqrt: this.state.sqrtTime,
        Volume: this.state.volume,
        Infilt: this.state.infilt
      });
      this.setState({Data: joined})
      console.log(this.state.Data)

      this.setState({
        volume: this.state.volume = 0
      })
    }
  }

  resettingToMainPage() {
    let flag = false;
    flag = window.confirm("Are you sure you would like to reset to the main page? This will ERASE ALL DATA that was gathered and will not store any information about the current test.");

    if (flag === true) {
      this.SwitchToMain()
    }
  }

  resettingToEditingMainPage() {
    let flag = false;
    flag = window.confirm("Are you sure you would like to reset to the main page? This will not save the changes that you have made while editing old data.");

    if (flag === true) {
      this.SwitchToMain()
    }
  }

  //Designed to get GPS Location Data
  getGPSLocation() {
    getUsers().then(r => "something")
    getUsers().then(r => "something")
    this.setState({
      DatabaseData: this.state.DatabaseData = users
    })
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.getPosition);
    }
  }

  getPosition(position) {
    getUsers().then(r => "something")
    getUsers().then(r => "something")
    this.setState({
      DatabaseData: this.state.DatabaseData = users
    })
    console.log(position.coords.latitude, position.coords.longitude);
    lon = position.coords.longitude;
    lat = position.coords.latitude;
    this.setState({
      gpsCoordinates: this.state.gpsCoordinates = position.coords.longitude + "," + position.coords.latitude,
      longitude: this.state.longitude = position.coords.longitude,
      latitude: this.state.latitude = position.coords.latitude
    })
  }

  handleChange(event) {
    getUsers().then(r => "something")
    getUsers().then(r => "something")
    this.setState({
      DatabaseData: this.state.DatabaseData = users
    })
    this.setState({
      file: URL.createObjectURL(event.target.files[0])
    })
  }

  SaveAndExit() {
    getUsers().then(r => "something")
    getUsers().then(r => "something")
    this.setState({
      DatabaseData: this.state.DatabaseData = users
    })
    let sameName = "No";
    for (let i = 0; i < this.state.DatabaseData.length; i++) {
      if (this.state.title === this.state.DatabaseData[i].Title) {
        sameName = "Yes";
      }
    }

    this.SoilInfiltrometerCalculations();

    if (this.state.title === "") {
      alert("Title must have something filled out")

    } else if (sameName === "Yes") {
      alert("There is another test with the SAME NAME. Please Choose Another")
    }

    else if (this.state.file === null && ((this.state.longitude === 0 || this.state.latitude === 0) || (this.state.longitude === "" || this.state.latitude === ""))) {
      alert("You're data has been saved! You will now be returned to the main menu.");
      this.setState({
        gpsCoordinates: this.state.gpsCoordinates = this.state.longitude + "," + this.state.latitude,
      })

      this.setState({infiltrometerData: this.state.infiltrometerData = {Title: this.state.title.toString(), Radius: this.state.Radius.toString(), Alpha: this.state.Alpha.toString(), NperH0: this.state.NperH0.toString(), Suction: this.state.Suction.toString()}})
      console.log(this.state.infiltrometerData)
      db.collection("Database").add({
        Title: this.state.title.toString(),
        GPSLocation: "N/A - Not Saved",
        Picture: "N/A - Not Saved",
        Data: this.state.Data,
        InfiltrometerData: this.state.infiltrometerData
      })
      this.SwitchToMain();
    }

    else if (((this.state.longitude === 0 && this.state.latitude === 0) || (this.state.longitude === "" && this.state.latitude === ""))) {
      alert("You're data has been saved! You will now be returned to the main menu.");
      this.setState({
        gpsCoordinates: this.state.gpsCoordinates = this.state.longitude + "," + this.state.latitude,
      })

      this.setState({infiltrometerData: this.state.infiltrometerData = {Title: this.state.title, Radius: this.state.Radius, Alpha: this.state.Alpha, NperH0: this.state.NperH0, Suction: this.state.Suction}})
      console.log(this.state.infiltrometerData)
      db.collection("Database").add({
        Title: this.state.title.toString(),
        GPSLocation: "N/A - Not Saved",
        Picture: this.state.file,
        Data: this.state.Data,
        InfiltrometerData: this.state.infiltrometerData
      })
      this.SwitchToMain();

    }

    else if (((this.state.longitude === 0 || this.state.latitude === 0) || (this.state.longitude === "" || this.state.latitude === "")) && this.state.file !== null) {
      alert("You're data has been saved! You will now be returned to the main menu.");
      this.setState({
        gpsCoordinates: this.state.gpsCoordinates = this.state.longitude + "," + this.state.latitude,
      })

      this.setState({infiltrometerData: this.state.infiltrometerData = {Title: this.state.title, Radius: this.state.Radius, Alpha: this.state.Alpha, NperH0: this.state.NperH0, Suction: this.state.Suction}})
      console.log(this.state.infiltrometerData)
      db.collection("Database").add({
        Title: this.state.title.toString(),
        GPSLocation: "N/A - Not Saved",
        Picture: this.state.file,
        Data: this.state.Data,
        InfiltrometerData: this.state.infiltrometerData
      })
      this.SwitchToMain();

    }

    else if (this.state.file === null) {
      alert("You're data has been saved! You will now be returned to the main menu.");
      this.setState({
        gpsCoordinates: this.state.gpsCoordinates = this.state.longitude + "," + this.state.latitude,
      })

      this.setState({infiltrometerData: this.state.infiltrometerData = {Title: this.state.title, Radius: this.state.Radius, Alpha: this.state.Alpha, NperH0: this.state.NperH0, Suction: this.state.Suction}})
      console.log(this.state.infiltrometerData)
      db.collection("Database").add({
        Title: this.state.title.toString(),
        GPSLocation: this.state.gpsCoordinates.toString(),
        Picture: "N/A - Not Saved",
        Data: this.state.Data,
        InfiltrometerData: this.state.infiltrometerData
      })
      this.SwitchToMain();
    }

    else {
      alert("You're data has been saved! You will now be returned to the main menu.");
      this.setState({
        gpsCoordinates: this.state.gpsCoordinates = this.state.longitude + "," + this.state.latitude,
      })

      this.setState({infiltrometerData: this.state.infiltrometerData = {Title: this.state.title, Radius: this.state.Radius, Alpha: this.state.Alpha, NperH0: this.state.NperH0, Suction: this.state.Suction}})
      console.log(this.state.infiltrometerData)
      db.collection("Database").add({
        Title: this.state.title.toString(),
        GPSLocation: this.state.gpsCoordinates.toString(),
        Picture: this.state.file,
        Data: this.state.Data,
        InfiltrometerData: this.state.infiltrometerData
      })
      this.SwitchToMain();
    }
  }

  SoilInfiltrometerCalculations() {
    //Calculating the constant "A"
    let pi = 3.141592653589793238462643383279502884197169399375105820974944592307816406286208998628034825342117067;
    let aCalculation = 0;
    aCalculation = (11.65*((Math.pow(this.state.NperH0,.1))-1) );

    if (this.state.NperH0 < 1.9) {
      aCalculation = aCalculation * Math.pow(pi, (7.5) * (this.state.NperH0 - 1.9) * (this.state.Alpha) * (this.state.Suction));
      aCalculation = aCalculation/(Math.pow(this.state.Alpha*this.state.Radius, .91));
    } else {
      aCalculation = aCalculation * Math.pow(pi, (2.92) * (this.state.NperH0 - 1.9) * (this.state.Alpha) * (this.state.Suction));
      aCalculation = aCalculation/(Math.pow(this.state.Alpha*this.state.Radius, .91));
    }

    console.log("Calculation A: " + aCalculation);
    //Calculating the constant "C1"


    //Calculating the Constant "K"


    //Saving everything to state
  }




  //-------------------------------------------------------------------------------------------------------------------//

  async ReviewOldData() {
    getUsers().then(r => "something")
    getUsers().then(r => "something")
    this.setState({
      DatabaseData: this.state.DatabaseData = users
    })
    if (this.state.title === "") {
      alert("You have left the title blank. Please enter information")
    } else {
      let confirmation = "no"
      for (let i = 0; i < this.state.DatabaseData.length; i++) {
        if (this.state.DatabaseData[i].Title === this.state.title) {
          indexNum = i
          confirmation = "yes"
        }
      }

      console.log("IndexNum: " + indexNum)

      if (confirmation === "yes") {
        console.log(this.state.DatabaseData[indexNum].InfiltrometerData)
        this.getGPSLocation();
        this.setState({
          title: this.state.title = "",
          PageState: this.state.PageState = "ReviewOldDataPage"
        })
      } else {
        alert("No Titles Matched Your inputted Text. Please also check Spelling and/or Capitalization (this does matter)")
      }
    }
  }

  async DeleteOldData() {
    getUsers().then(r => "something")
    getUsers().then(r => "something")
    this.setState({
      DatabaseData: this.state.DatabaseData = users
    })
    if (this.state.title === "") {
      alert("You have left the title blank. Please enter information")
    } else {
      let confirmation = "no"
      for (let i = 0; i < this.state.DatabaseData.length; i++) {
        if (this.state.DatabaseData[i].Title === this.state.title) {
          indexNum = i
          confirmation = "yes"
        }
      }
      console.log("IndexNum: " + indexNum)
      console.log(this.state.DatabaseData)
      if (confirmation === "yes") {
        let flag = false;
        flag = window.confirm("Are you sure you would like to delete test: " + this.state.title + "? It will ERASE the entry from the current Database.")

        if (flag === true) {
          db.collection('Database').doc({Title: this.state.DatabaseData[indexNum].Title}).delete()
          let array = [...this.state.DatabaseData];
          array.splice(indexNum, 1);
          this.setState({DatabaseData: this.state.DatabaseData = array});
          console.log(this.state.DatabaseData)

          alert("Database Entry Deleted - Please allow for some time for this update on screen. You will now me returned to the MainPage")
        } else {
          alert("Entry has not been deleted.")
        }
        this.SwitchToMain()
      } else {
        alert("No Titles Matched Your inputted Text. Please also check Spelling and/or Capitalization (this does matter)")
      }
    }
  }

  async DeleteDatabase() {
    getUsers().then(r => "something")
    getUsers().then(r => "something")
    this.setState({
      DatabaseData: this.state.DatabaseData = users
    })
    let flag = false;
    flag = window.confirm("Are you sure you would like to reset the Database? This will ERASE ALL PREVIOUS TEST that you have conducted before hand. ");

    if (flag === true) {
      db.collection('Database').delete()
      alert("Database has been Deleted/Cleared - Please allow for some time for this update on screen. You will now me returned to the MainPage")
      this.SwitchToMain()
    } else {
      alert("The Database has not been deleted. ")
    }
  }

  async EditData() {
    getUsers().then(r => "something")
    getUsers().then(r => "something")
    this.setState({
      DatabaseData: this.state.DatabaseData = users
    })

    let sameName = "No";
    for (let i = 0; i < this.state.DatabaseData.length; i++) {
      if (this.state.newTitle === this.state.DatabaseData[i].Title) {
        sameName = "Yes";
      }
    }

    console.log(this.state.DatabaseData)
    if (this.state.newTitle === "") {
      alert("Title must have something filled out")
    } else if (sameName === "Yes" && this.state.title !== this.state.newTitle) {
      alert("There is another test with the SAME NAME. Please Choose Another")
    }

    else if (this.state.file === null && ((this.state.longitude === 0 || this.state.latitude === 0) || (this.state.longitude === "" || this.state.latitude === ""))) {
      db.collection('Database').doc({ Title: this.state.DatabaseData[indexNum].Title }).delete()
      let array = [...this.state.DatabaseData];
      array.splice(indexNum, 1);
      this.setState({DatabaseData: this.state.DatabaseData = array});
      console.log(this.state.DatabaseData)

      this.setState({
        gpsCoordinates: this.state.gpsCoordinates = this.state.longitude + "," + this.state.latitude,
      })
      db.collection("Database").add({
        Title: this.state.title.toString(),
        GPSLocation: "N/A - Not Saved",
        Picture: "N/A - Not Saved",
        Data: this.state.Data,
        InfiltrometerData: this.state.infiltrometerData
      })

      let joined = this.state.DatabaseData.concat({ Title: this.state.newTitle.toString(), GPSLocation: "N/A - Not Saved", Picture: "N/A - Not Saved", Data: this.state.Data, InfiltrometerData: this.state.infiltrometerData});
      this.setState({ DatabaseData: joined })
      alert("Everything has been Successfully Saved. Please allow a few moments for the screen to update as well. You will now be switched back to the MainPage")
      console.log(this.state.DatabaseData)
      this.SwitchToMain();
    }

    else if (((this.state.longitude === 0 && this.state.latitude === 0) || (this.state.longitude === "" && this.state.latitude === ""))) {
      db.collection('Database').doc({ Title: this.state.DatabaseData[indexNum].Title }).delete()
      let array = [...this.state.DatabaseData];
      array.splice(indexNum, 1);
      this.setState({DatabaseData: this.state.DatabaseData = array});
      console.log(this.state.DatabaseData)

      this.setState({
        gpsCoordinates: this.state.gpsCoordinates = this.state.longitude + "," + this.state.latitude,
      })
      db.collection("Database").add({
        Title: this.state.title.toString(),
        GPSLocation: "N/A - Not Saved",
        Picture: this.state.file,
        Data: this.state.Data,
        InfiltrometerData: this.state.infiltrometerData
      })

      let joined = this.state.DatabaseData.concat({ Title: this.state.newTitle.toString(), GPSLocation: "N/A - Not Saved", Picture: this.state.file, Data: this.state.Data, InfiltrometerData: this.state.infiltrometerData});
      this.setState({ DatabaseData: joined })
      alert("Everything has been Successfully Saved. Please allow a few moments for the screen to update as well. You will now be switched back to the MainPage")
      console.log(this.state.DatabaseData)
      this.SwitchToMain();
    }

    else if (((this.state.longitude === 0 || this.state.latitude === 0) || (this.state.longitude === "" || this.state.latitude === "")) && this.state.file !== null) {
      db.collection('Database').doc({ Title: this.state.DatabaseData[indexNum].Title }).delete()
      let array = [...this.state.DatabaseData];
      array.splice(indexNum, 1);
      this.setState({DatabaseData: this.state.DatabaseData = array});
      console.log(this.state.DatabaseData)

      this.setState({
        gpsCoordinates: this.state.gpsCoordinates = this.state.longitude + "," + this.state.latitude,
      })
      db.collection("Database").add({
        Title: this.state.title.toString(),
        GPSLocation: "N/A - Not Saved",
        Picture: this.state.file,
        Data: this.state.Data,
        InfiltrometerData: this.state.infiltrometerData
      })

      let joined = this.state.DatabaseData.concat({ Title: this.state.newTitle.toString(), GPSLocation: "N/A - Not Saved", Picture: this.state.file, Data: this.state.Data, InfiltrometerData: this.state.infiltrometerData});
      this.setState({ DatabaseData: joined })
      alert("Everything has been Successfully Saved. Please allow a few moments for the screen to update as well. You will now be switched back to the MainPage")
      console.log(this.state.DatabaseData)
      this.SwitchToMain();
    }

    else if (this.state.file === null) {
      db.collection('Database').doc({ Title: this.state.DatabaseData[indexNum].Title }).delete()
      let array = [...this.state.DatabaseData];
      array.splice(indexNum, 1);
      this.setState({DatabaseData: this.state.DatabaseData = array});
      console.log(this.state.DatabaseData)

      this.setState({
        gpsCoordinates: this.state.gpsCoordinates = this.state.longitude + "," + this.state.latitude,
      })
      db.collection("Database").add({
        Title: this.state.title.toString(),
        GPSLocation: this.state.gpsCoordinates.toString(),
        Picture: "N/A - Not Saved",
        Data: this.state.Data,
        InfiltrometerData: this.state.infiltrometerData
      })

      let joined = this.state.DatabaseData.concat({ Title: this.state.newTitle.toString(), GPSLocation: this.state.gpsCoordinates.toString(), Picture: "N/A - Not Saved", Data: this.state.Data, InfiltrometerData: this.state.infiltrometerData});
      this.setState({ DatabaseData: joined })
      alert("Everything has been Successfully Saved. Please allow a few moments for the screen to update as well. You will now be switched back to the MainPage")
      console.log(this.state.DatabaseData)
      this.SwitchToMain();
    }

    else {
      db.collection('Database').doc({ Title: this.state.DatabaseData[indexNum].Title }).delete()
      let array = [...this.state.DatabaseData];
      array.splice(indexNum, 1);
      this.setState({DatabaseData: this.state.DatabaseData = array});
      console.log(this.state.DatabaseData)

      this.setState({
        gpsCoordinates: this.state.gpsCoordinates = this.state.longitude + "," + this.state.latitude,
      })
      db.collection("Database").add({
        Title: this.state.title.toString(),
        GPSLocation: this.state.gpsCoordinates.toString(),
        Picture: this.state.file,
        Data: this.state.Data,
        InfiltrometerData: this.state.infiltrometerData
      })

      let joined = this.state.DatabaseData.concat({ Title: this.state.newTitle.toString(), GPSLocation: this.state.gpsCoordinates.toString(), Picture: this.state.file, Data: this.state.Data, InfiltrometerData: this.state.infiltrometerData});
      this.setState({ DatabaseData: joined })
      alert("Everything has been Successfully Saved. Please allow a few moments for the screen to update as well. You will now be switched back to the MainPage")
      console.log(this.state.DatabaseData)
      this.SwitchToMain();
    }
  }

  checkpoints() {
    this.setState({
      time: this.state.time = this.state.time + this.state.timeInterval
    })
  }

  //For infilt calculations - Select infiltrometer
  selectInftiltrometerTypeMiniDisk() {
      this.setState({
        Radius: this.state.Radius = 2.25
      })
  }

  selectInftiltrometerTypeMiniDiskV1() {
    this.setState({
      Radius: this.state.Radius = 1.6
    })
  }

  //For infilt Calculations - Select Soil Type
  selectSoilTypeClay() {
    this.setState({
      Alpha: this.state.Alpha = .008,
      NperH0: this.state.NperH0 = 1.9
    })
  }

  selectSoilTypeClayLoam() {
    this.setState({
      Alpha: this.state.Alpha = .019,
      NperH0: this.state.NperH0 = 1.31
    })
  }

  selectSoilTypeLoamy() {
    this.setState({
      Alpha: this.state.Alpha = .036,
      NperH0: this.state.NperH0 = 1.56
    })
  }

  selectSoilTypeLoamySand() {
    this.setState({
      Alpha: this.state.Alpha = .124,
      NperH0: this.state.NperH0 = 2.28
    })
  }

  selectSoilTypeSand() {
    this.setState({
      Alpha: this.state.Alpha = .145,
      NperH0: this.state.NperH0 = 2.68
    })
  }

  selectSoilTypeSandyClay() {
    this.setState({
      Alpha: this.state.Alpha = .027,
      NperH0: this.state.NperH0 = 1.23
    })
  }

  selectSoilTypeSandyClayLoam() {
    this.setState({
      Alpha: this.state.Alpha = .059,
      NperH0: this.state.NperH0 = 1.48
    })
  }

  selectSoilTypeSandyLoam() {
    this.setState({
      Alpha: this.state.Alpha = .075,
      NperH0: this.state.NperH0 = 1.89
    })
  }

  selectSoilTypeSilt() {
    this.setState({
      Alpha: this.state.Alpha = .016,
      NperH0: this.state.NperH0 = 1.37
    })
  }

  selectSoilTypeSiltLoam() {
    this.setState({
      Alpha: this.state.Alpha = .02,
      NperH0: this.state.NperH0 = 1.41
    })
  }

  selectSoilTypeSiltyClay() {
    this.setState({
      Alpha: this.state.Alpha = .005,
      NperH0: this.state.NperH0 = 1.09
    })
  }

  selectSoilTypeSiltyClayLoam() {
    this.setState({
      Alpha: this.state.Alpha = .01,
      NperH0: this.state.NperH0 = 1.23
    })
  }

  //For Infilt Calculations - Select Suction Type
  selectSoilSuctionTypePoint5() {
    this.setState({
      Suction: this.state.Suction = -.5
    })
  }

  selectSoilSuctionType1() {
    this.setState({
      Suction: this.state.Suction = -1
    })
  }

  selectSoilSuctionType2() {
    this.setState({
      Suction: this.state.Suction = -2
    })
  }

  selectSoilSuctionType3() {
    this.setState({
      Suction: this.state.Suction = -3
    })
  }

  selectSoilSuctionType4() {
    this.setState({
      Suction: this.state.Suction = -4
    })
  }

  selectSoilSuctionType5() {
    this.setState({
      Suction: this.state.Suction = -5
    })
  }

  selectSoilSuctionType6() {
    this.setState({
      Suction: this.state.Suction = -6
    })
  }

  selectSoilSuctionType7() {
    this.setState({
      Suction: this.state.Suction = -7
    })
  }

  render() {
    //Login Screen
    if (this.state.PageState === "MainPage") {
      return (

          <div>
            <div align='center'>
              <AppBar position="static">
                <Toolbar variant="dense" style={{backgroundColor: '#FFA500'}} align='center'>
                  <IconButton edge="start"  color="inherit" aria-label="menu">
                    <MenuIcon />
                  </IconButton>
                  <Typography variant="h5" align='center'>
                    Welcome to Soil Infiltration App
                  </Typography>
                </Toolbar>
              </AppBar>
            </div>


            <div>
              <h3 className={"center"}>Start the Program</h3>
              <div className={"center"}>
                <TextField id="filled-basic-Time"
                           label="Time Intervals in Seconds"
                           variant="filled"
                           value={this.state.timeInterval}
                           onChange={e => this.setState({ timeInterval: e.target.value })}
                />
              </div>
              <br/>
              <div className={"center"}>
                <TextField id="filled-basic-Initial-Vol"
                           label="Initial Volume in mL"
                           variant="filled"
                           value={this.state.initialVolume}
                           onChange={e => this.setState({ initialVolume: e.target.value })}
                />
              </div>
              <br/>
              <br/>
              <h3 className={"center"}>Enter Infiltrometer Setting</h3>
              <div className={"center"}>
                <div>
                  <h5>Enter Soil Infiltrometer Radius</h5>
                  <TextField id="filled-basic-Time"
                             label="Infiltrometer Radius (cm)"
                             variant="filled"
                             value={this.state.Radius}
                             onChange={e => this.setState({ Radius: e.target.value })}
                  />
                </div>

                <div>
                  <Button variant="contained"
                          color="primary"
                          onClick={this.selectInftiltrometerTypeMiniDisk}
                  > MiniDisk </Button>

                  <Button variant="contained"
                          color="primary"
                          onClick={this.selectInftiltrometerTypeMiniDiskV1}
                  > MiniDisk Version 1 </Button>
                </div>
              </div>

              <br/>
              <div className={"center"}>
                <div>
                  <h5>Enter Soil Type - Alpha</h5>
                  <TextField id="filled-basic-Time"
                             label="Alpha"
                             variant="filled"
                             value={this.state.Alpha}
                             onChange={e => this.setState({ Alpha: e.target.value })}
                  />
                </div>
                <br/>
                <div>
                  <TextField id="filled-basic-Time"
                             label="n/h0"
                             variant="filled"
                             value={this.state.NperH0}
                             onChange={e => this.setState({ NperH0: e.target.value })}
                  />
                </div>

                <div>
                  <Button variant="contained"
                          color="primary"
                          onClick={this.selectSoilTypeSiltyClay}
                  > Clay </Button>

                  <Button variant="contained"
                          color="primary"
                          onClick={this.selectSoilTypeClayLoam}
                  > Clay Loam </Button>

                  <Button variant="contained"
                          color="primary"
                          onClick={this.selectSoilTypeLoamy}
                  > Loam </Button>
                </div>
                <div>
                  <Button variant="contained"
                          color="primary"
                          onClick={this.selectSoilTypeLoamySand}
                  > Loamy Sand </Button>

                  <Button variant="contained"
                          color="primary"
                          onClick={this.selectSoilTypeSand}
                  > Sand </Button>

                  <Button variant="contained"
                          color="primary"
                          onClick={this.selectSoilTypeSandyClay}
                  > Sandy Clay </Button>
                </div>
                <div>
                  <Button variant="contained"
                          color="primary"
                          onClick={this.selectSoilTypeSandyClayLoam}
                  > Sandy Clay Loam </Button>

                  <Button variant="contained"
                          color="primary"
                          onClick={this.selectSoilTypeSandyLoam}
                  > Sandy Loam </Button>

                  <Button variant="contained"
                          color="primary"
                          onClick={this.selectSoilTypeSilt}
                  > Silt </Button>
                </div>
                <div>
                  <Button variant="contained"
                          color="primary"
                          onClick={this.selectSoilTypeSiltLoam}
                  > Silt Loam </Button>

                  <Button variant="contained"
                          color="primary"
                          onClick={this.selectSoilTypeSiltyClay}
                  > Silty Clay </Button>

                  <Button variant="contained"
                          color="primary"
                          onClick={this.selectSoilTypeSiltyClayLoam}
                  > Silty Clay Loam </Button>
                </div>
              </div>

              <br/>
              <br/>
              <div className={"center"}>
                <div>
                  <h5>Enter Suction (cm)</h5>
                  <TextField id="filled-basic-Time"
                             label="Suction (cm)"
                             variant="filled"
                             value={this.state.Suction}
                             onChange={e => this.setState({ Suction: e.target.value })}
                  />

                  <div>
                    <Button variant="contained"
                            color="primary"
                            onClick={this.selectSoilSuctionTypePoint5}
                    > 0.5 </Button>
                    <Button variant="contained"
                            color="primary"
                            onClick={this.selectSoilSuctionType1}
                    > 1 </Button>
                    <Button variant="contained"
                            color="primary"
                            onClick={this.selectSoilSuctionType2}
                    > 2 </Button>
                    <Button variant="contained"
                            color="primary"
                            onClick={this.selectSoilSuctionType3}
                    > 3 </Button>
                  </div>
                  <div>
                    <Button variant="contained"
                            color="primary"
                            onClick={this.selectSoilSuctionType4}
                    > 4 </Button>
                    <Button variant="contained"
                            color="primary"
                            onClick={this.selectSoilSuctionType5}
                    > 5 </Button>
                    <Button variant="contained"
                            color="primary"
                            onClick={this.selectSoilSuctionType6}
                    > 6 </Button>
                    <Button variant="contained"
                            color="primary"
                            onClick={this.selectSoilSuctionType7}
                    > 7 </Button>
                  </div>
                </div>
              </div>

              <br/>
              <br/>

              <div className={"center"}>
                <Button variant="contained"
                        color="primary"
                        onClick={this.SwitchToMainToDataGathering}
                > Start Collecting Data </Button>
              </div>

              <hr></hr>
              <h3 className={"center"}>Other Content</h3>
              <br/>
              <div className={"center"}>
                <Button variant="contained"
                        color="primary"
                        onClick={this.SwitchToLearnHowToUseTheApp}
                > Learn How to Use the App? </Button>
              </div>
              <br/>
              <div className={"center"}>
                <Button variant="contained"
                        color="primary"
                        onClick={this.SwitchToLearnHowToUseTheInfiltrometer}
                > Learn How to Use the Infiltrometer? </Button>
              </div>
              <br/>
              <div className={"center"}>
                <Button variant="contained"
                        color="primary"
                        onClick={this.SwitchToPreviousData}
                > Previous Test Data </Button>
              </div>
              <br/>
              <div className={"center"}>
                <Button variant="contained"
                        color="primary"
                        onClick={this.SwitchToAboutUs}
                > Learn About Us? </Button>
              </div>
            </div>
          </div>
      )
    }

    if (this.state.PageState === "DataGathering") {
      return (
          <div>
            <div align='center'>
              <AppBar position="static">
                <Toolbar variant="dense" style={{backgroundColor: '#FFA500'}} align='center'>
                  <h2>Total Time (Seconds): </h2>
                  <Timer formatValue={e => totalTime = e}
                      lastUnit={"s"}
                      initialTime={0}
                      direction="forward"
                  >
                    <Timer.Seconds />  seconds
                  </Timer>
                  <Typography variant="h5" align='center'>
                    Application is Running
                  </Typography>
                  <Button variant="contained"
                          color="primary"
                  > Reset Time Intervals  </Button>
                  <Button variant="contained"
                          color="primary"
                          onClick={this.resettingToMainPage}
                  > Reset to Main Page </Button>
                </Toolbar>
              </AppBar>
            </div>

            <br/>
            <br/>
            <br/>
            <div align='center'>
              <Button variant="contained"
                      color="primary"
                      onClick={this.SwitchToDataCompleted}
              > Data Gathering Completed </Button>
            </div>

            <br/>
            <br/>
            <br/>
          <div align='center'>
            <table>
              <tr>
                <td>Time Left in Interval:  </td>
                <td><Timer
                  checkpoints={[ { time: 0, callback: () => this.promptToAddToArray()} ]}
                  lastUnit={"s"}
                  initialTime={this.state.timeInterval * 1000}
                  direction="backward"
                >
                  <Timer.Seconds />  seconds
                </Timer></td>

              </tr>
            </table>
          </div>

            <br/>
            <br/>
            <br/>
          <div align='center'>
            <TextField id="filled-basic-Time"
                       label="Enter Volumetric Data"
                       variant="filled"
                       value={this.state.volume}
                       onChange={e => this.setState({ volume: e.target.value })}
            />

            <Button variant="contained"
                    color="primary"
                    onClick={this.AddToDataArray}
            > Submit Volume</Button>
          </div>

            <br/>
            <br/>
            <br/>

            <div>
              <Table Data={this.state.Data}/>
            </div>
          </div>
      )
    }

    if (this.state.PageState === "DataCompleted") {
      return (
          <div>
            <AppBar position="static">
              <Toolbar variant="dense" style={{backgroundColor: '#FFA500'}} align='center'>
                <Typography variant="h5" align='center'>
                  Data Gathered
                </Typography>
                <Button variant="contained"
                        color="primary"
                        onClick={this.resettingToMainPage}
                > Reset to Main Page </Button>
                <Button variant="contained"
                        color="primary"
                        onClick={this.SaveAndExit}
                > Save & Return to Main Page </Button>
              </Toolbar>
            </AppBar>

            <div align={"center"}>
              <h3>Add a Title to this Test:
              <TextField id="filled-basic-Time"
                         label="Title"
                         variant="filled"
                         value={this.state.title}
                         onChange={e => this.setState({ title: e.target.value })}
              /></h3>
            </div>

            <br/>
            <br/>
            <br/>

            <div align={"center"}>
              <div>
                <h3>Upload a Picture:</h3>
                <input  type="file" onChange={this.handleChange}/>
                <img src={this.state.file}/>
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
                           value={this.state.longitude}
                           onChange={e => this.setState({ longitude: e.target.value })}
                />
              </div>
              <br/>
              <div>
                <TextField id="filled-basic-Time"
                         label="Latitude"
                         variant="filled"
                         value={this.state.latitude}
                         onChange={e => this.setState({ latitude: e.target.value })}
               />
              </div>
              <Button variant="contained"
                      color="primary"
                      onClick={this.getGPSLocation}
              >Use Phones GPS</Button>
            </div>

            <br/>
            <br/>
            <br/>

            <div align={"center"}>
              <CSVLink
                  data={this.state.Data}
                  filename={this.state.title.toString() + ".csv"}
                  className="btn btn-primary"
                  target="_blank"

              >
                Export as CSV File

              </CSVLink>
            </div>

            <br/>
            <br/>
            <br/>

            <div>
              <Table Data={this.state.Data}/>
            </div>
          </div>
      )
    }

//----------------------------------------------------------------Other Content---------------------------------------------------//
    if (this.state.PageState === "LearnHowToUsetheApp") {
      return (
          <div>
            <AppBar position="static">
              <Toolbar variant="dense" style={{backgroundColor: '#FFA500'}} align='center'>
                <Typography variant="h5" align='center'>
                  Learn How to use the App?
                </Typography>
                <Button variant="contained"
                        color="primary"
                        onClick={this.SwitchToMain}
                >Return to Main Page </Button>
              </Toolbar>
            </AppBar>

            <div>
              <h3><li>Step 1: Enter in Initial Time Interval</li></h3>
              <h5>NOTE** This is going to start a timer from the selected time intervals defined on the main page. Once the time intervals is over, you will get prompted to enter in your volumetric data. Then the time intervals will reset.</h5>
              <br/>
              <br/>
              <br/>
              <h3><li>Step 2: Enter your initial volume in Mili-Liters(mL)</li></h3>

              <br/>
              <br/>
              <br/>
              <h3><li>Step 3: Once you click start, a new page will appear and it will prompt you during your session to enter volumetric data. Once time intervals has reached.</li></h3>

              <br/>
              <br/>
              <br/>
              <h3><li>Step 4: Once data gathering has been completed, press on the completed button to view recorded data.</li></h3>

              <br/>
              <br/>
              <br/>
              <h3><li>Step 5: You will be moved to a new page that will show you graphs, table data, and will allow you to export your data as a CSV file (similar to an excel spreadsheet). This will also allow you to upload a picture. As well as type in or use your phones GPS location data.</li></h3>
              <h5>NOTE** Useing phone GPS Location Data may not be as accurate as using a dedicated GPS device. The Coordinates could very by one meters to a kilometer away.</h5>
            </div>

          </div>
      )
    }

    if (this.state.PageState === "LearnHowToUsetheInfiltrometer") {
      return (
          <div>
            <AppBar position="static">
              <Toolbar variant="dense" style={{backgroundColor: '#FFA500'}} align='center'>
                <Typography variant="h5" align='center'>
                  Learn How to use the Infiltrometer?
                </Typography>
                <Button variant="contained"
                        color="primary"
                        onClick={this.SwitchToMain}
                >Return to Main Page </Button>
              </Toolbar>
            </AppBar>

            <div>
              <PDFViewer
                  document={{
                    url: pdf
                  }}
              />
            </div>

          </div>
      )
    }

    if (this.state.PageState === "PeviousTestData") {
      return (
          <div>
            <AppBar position="static">
              <Toolbar variant="dense" style={{backgroundColor: '#FFA500'}} align='center'>
                <Typography variant="h5" align='center'>
                  Previous Test Data
                </Typography>
                <Button variant="contained"
                        color="primary"
                        onClick={this.DeleteDatabase}
                >Delete Entire Database </Button>
                <Button variant="contained"
                        color="primary"
                        onClick={this.SwitchToMain}
                >Return to Main Page </Button>
              </Toolbar>
            </AppBar>

            <br/>
            <br/>
            <br/>
            <div className={"center"}>
              <h1>View or Edit old Data Values</h1>

              <p>Enter Title: <TextField id="Title"
                                            label="Title"
                                            variant="filled"
                                            value={this.state.title}
                                            onChange={e => this.setState({ title: e.target.value })}
              /></p>
              <br/>
              <Button variant="contained"
                      color="primary"
                      onClick={this.ReviewOldData}
              > Review Old Data </Button>
            </div>
            <br/>
            <div align={"center"}>
              <Button variant="contained"
                         color="primary"
                         onClick={this.DeleteOldData}
            > Delete Old Data</Button>
            </div>

            <br/>
            <div align={"center"}>
              <Button variant="contained"
                      color="primary"
                      onClick={this.SwitchToEditingOldData}
              > Edit Data</Button>
            </div>

            <br/>
            <br/>
            <br/>
            <div>
              <RetrivalData DatabaseData={this.state.DatabaseData}/>
            </div>
          </div>
      )
    }

    if (this.state.PageState === "AboutUs") {
      return (
          <div>
            <AppBar position="static">
              <Toolbar variant="dense" style={{backgroundColor: '#FFA500'}} align='center'>
                <Typography variant="h5" align='center'>
                  About Us?
                </Typography>
                <Button variant="contained"
                        color="primary"
                        onClick={this.SwitchToMain}
                >Return to Main Page </Button>
              </Toolbar>
            </AppBar>

            <div>
              <h3>This app will be used throughout a myriad of different scientists with all different agricultural aspects from one single device called a Soil Infiltrometer. A Soil Infiltrometer is a device that will penetrate the ground - it must be conducted in a loamy environment like soil. A user then will pour water through a top funnel that then allows a user to watch it drain through time. A user then will record the time difference (from start) and the recorded volume of water that was lost throughout the process. This is an incremental step that is done in different time based intervals, for example: if a user selects time intervals for every 30 seconds, they will then record the volume lost every 30 seconds until the water drains.</h3>
              <h3>What this application is doing is allowing a user to get more accurate and precise measurements when it comes to recording information. We will build the app so that it will initially allow the user to set the time intervals they want to, then gets notified when the selected time intervals finally come into fruition. When the user gets notified, it will prompt them to enter the volumetric information that the soil infiltrometer shows (please note that the user will have to manually enter the information in and the time is still static during the interval). The app will show a table below that will dynamically auto-populate the information and create several different charts and graphs based-off of the recorded/calculated values. What this application is doing is allowing a user to get more accurate and precise measurements when it comes to recording information. We will build the app so that it will initially allow the user to set the time intervals they want to, then gets notified when the selected time intervals finally come into fruition. When the user gets notified, it will prompt them to enter the volumetric information that the soil infiltrometer shows (please note that the user will have to manually enter the information in and the time is still static during the interval). The app will show a table below that will dynamically auto-populate the information and create several different charts and graphs based-off of the recorded/calculated values.</h3>
            </div>
          </div>
      )
    }

    if (this.state.PageState === "ReviewOldDataPage") {
      return (
          <div>
            <AppBar position="static">
              <Toolbar variant="dense" style={{backgroundColor: '#FFA500'}} align='center'>
                <Typography variant="h5" align='center'>
                  Review Old Data
                </Typography>
                <Button variant="contained"
                        color="primary"
                        onClick={this.SwitchToPreviousData}
                >Return To Previous Data </Button>
                <Button variant="contained"
                        color="primary"
                        onClick={this.SwitchToMain}
                >Return to Main Page </Button>
              </Toolbar>
            </AppBar>

            <div align={"center"}>
              <br/>
              <br/>
              <br/>

              <p>Title: {this.state.DatabaseData[indexNum].Title}</p>
              <br/>

              <p>GPS Coordinate: {this.state.DatabaseData[indexNum].GPSLocation}</p>
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
                    <Marker coordinates={[lon,lat]}>
                      <circle r={1} fill="#F53" />
                    </Marker>
                  </ZoomableGroup>
                </ComposableMap>
              </div>
              <br/>

              <p>Picture</p>
              <img src={this.state.DatabaseData[indexNum].Picture} alt="Picture"/>

              <br/>
              <br/>
              <div align={"center"}>
                <CSVLink
                    data={this.state.DatabaseData[indexNum].Data}
                    filename={this.state.DatabaseData[indexNum].Title.toString() + ".csv"}
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
                  <td>{this.state.DatabaseData[indexNum].InfiltrometerData.Radius.toString()}</td>
                </tr>
                <tr>
                  <td>Alpha: </td>
                  <td>{this.state.DatabaseData[indexNum].InfiltrometerData.Alpha.toString()}</td>
                </tr>
                <tr>
                  <td>n/ho: </td>
                  <td>{this.state.DatabaseData[indexNum].InfiltrometerData.NperH0.toString()}</td>
                </tr>
                <tr>
                  <td>Suction: </td>
                  <td>{this.state.DatabaseData[indexNum].InfiltrometerData.Suction.toString()}</td>
                </tr>
              </table>
            </div>

            <br/>
            <br/>
            <br/>

            <div>
              <Table Data={this.state.DatabaseData[indexNum].Data}/>
            </div>

            <br/>
            <br/>
            <br/>
          </div>
      )
    }

    if (this.state.PageState === "EditingPage") {
      return (
          <div>
            <AppBar position="static">
              <Toolbar variant="dense" style={{backgroundColor: '#FFA500'}} align='center'>
                <Typography variant="h5" align='center'>
                  Editing Old Data
                </Typography>

                <Button variant="contained"
                        color="primary"
                        onClick={this.resettingToEditingMainPage}
                >Reset and Return to Main Page </Button>

                <Button variant="contained"
                        color="primary"
                        onClick={this.EditData}
                >Save and Return to Main Page </Button>

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
                         value={this.state.newTitle}
                         onChange={e => this.setState({ newTitle: e.target.value })}
              />

              <br/>
              <br/>

              <p>Change GPS Coordinates: </p>
              <div>
                <div>
                  <TextField id="filled-basic-Time"
                             label="Longitude"
                             variant="filled"
                             value={this.state.longitude}
                             onChange={e => this.setState({ longitude: e.target.value })}
                  />
                </div>
                <br/>
                <div>
                  <TextField id="filled-basic-Time"
                             label="Latitude"
                             variant="filled"
                             value={this.state.latitude}
                             onChange={e => this.setState({ latitude: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <Button variant="contained"
                      color="primary"
                      onClick={this.getGPSLocation}
              >Use Phones GPS</Button>
              </div>

              <br/>
              <br/>

              <div>
                <p>Change Picture:  </p>
                <TextField id="filled-basic-Time"
                           label="Picture"
                           variant="filled"
                           value={this.state.file}
                           onChange={e => this.setState({ file: e.target.value })}
                />
              </div>
              <div>
                <h3>Upload a Picture:</h3>
                <input  type="file" onChange={this.handleChange}/>
                <img src={this.state.file}/>
              </div>

              <br/>
              <br/>

              <div>
                <p>Change Data:  </p>
                <TextField id="filled-basic-Time"
                           label="Data"
                           variant="filled"
                           value={this.state.Data}
                           onChange={e => this.setState({ Data: e.target.value })}
                />
              </div>

              <br/>
              <br/>

              <div>
                <p>Change Infiltrometer Settings:  </p>
                <TextField id="filled-basic-Time"
                           label="Data"
                           variant="filled"
                           value={this.state.infiltrometerData}
                           onChange={e => this.setState({ infiltrometerData: e.target.value })}
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
                    <td>{this.state.DatabaseData[indexNum].InfiltrometerData.Radius.toString()}</td>
                  </tr>
                  <tr>
                    <td>Alpha: </td>
                    <td>{this.state.DatabaseData[indexNum].InfiltrometerData.Alpha.toString()}</td>
                  </tr>
                  <tr>
                    <td>n/ho: </td>
                    <td>{this.state.DatabaseData[indexNum].InfiltrometerData.NperH0.toString()}</td>
                  </tr>
                  <tr>
                    <td>Suction: </td>
                    <td>{this.state.DatabaseData[indexNum].InfiltrometerData.Suction.toString()}</td>
                  </tr>
                </table>
              </div>

              <br/>
              <br/>

            </div>


            <div>
              <Table Data={this.state.DatabaseData[indexNum].Data}/>
            </div>



            <br/>
            <br/>
            <br/>
            <div>
              {/*<TestInfiltrometerSettings Data={this.state.DatabaseData[indexNum].infiltrometerData}/>*/}
            </div>
            <br/>
            <br/>
            <br/>
          </div>
      )
    }
  }
}

export default App;