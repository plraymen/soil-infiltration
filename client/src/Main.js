import React from 'react';
import {
  Link
} from "react-router-dom";
import {Button, TextField} from "@material-ui/core";

function Main({that}) {
  return (
    <div>
      <h3 className={"center"}>Start the Program</h3>
      <div className={"center"}>
        <TextField id="filled-basic-Time"
                   label="Time Intervals in Seconds"
                   variant="filled"
                   value={that.state.timeInterval}
                   onChange={e => that.setState({ timeInterval: e.target.value })}
        />
      </div>
      <br/>
      <div className={"center"}>
        <TextField id="filled-basic-Initial-Vol"
                   label="Initial Volume in mL"
                   variant="filled"
                   value={that.state.initialVolume}
                   onChange={e => that.setState({ initialVolume: e.target.value })}
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
                     value={that.state.Radius}
                     onChange={e => that.setState({ Radius: e.target.value })}
          />
        </div>

        <div>
          <Button variant="contained"
                  color="primary"
                  onClick={that.selectInftiltrometerTypeMiniDisk}
          > MiniDisk </Button>

          <Button variant="contained"
                  color="primary"
                  onClick={that.selectInftiltrometerTypeMiniDiskV1}
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
                     value={that.state.Alpha}
                     onChange={e => that.setState({ Alpha: e.target.value })}
          />
        </div>
        <br/>
        <div>
          <TextField id="filled-basic-Time"
                     label="n/h0"
                     variant="filled"
                     value={that.state.NperH0}
                     onChange={e => that.setState({ NperH0: e.target.value })}
          />
        </div>

        <div>
          <Button variant="contained"
                  color="primary"
                  onClick={that.selectSoilTypeSiltyClay}
          > Clay </Button>

          <Button variant="contained"
                  color="primary"
                  onClick={that.selectSoilTypeClayLoam}
          > Clay Loam </Button>

          <Button variant="contained"
                  color="primary"
                  onClick={that.selectSoilTypeLoamy}
          > Loam </Button>
        </div>
        <div>
          <Button variant="contained"
                  color="primary"
                  onClick={that.selectSoilTypeLoamySand}
          > Loamy Sand </Button>

          <Button variant="contained"
                  color="primary"
                  onClick={that.selectSoilTypeSand}
          > Sand </Button>

          <Button variant="contained"
                  color="primary"
                  onClick={that.selectSoilTypeSandyClay}
          > Sandy Clay </Button>
        </div>
        <div>
          <Button variant="contained"
                  color="primary"
                  onClick={that.selectSoilTypeSandyClayLoam}
          > Sandy Clay Loam </Button>

          <Button variant="contained"
                  color="primary"
                  onClick={that.selectSoilTypeSandyLoam}
          > Sandy Loam </Button>

          <Button variant="contained"
                  color="primary"
                  onClick={that.selectSoilTypeSilt}
          > Silt </Button>
        </div>
        <div>
          <Button variant="contained"
                  color="primary"
                  onClick={that.selectSoilTypeSiltLoam}
          > Silt Loam </Button>

          <Button variant="contained"
                  color="primary"
                  onClick={that.selectSoilTypeSiltyClay}
          > Silty Clay </Button>

          <Button variant="contained"
                  color="primary"
                  onClick={that.selectSoilTypeSiltyClayLoam}
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
                     value={that.state.Suction}
                     onChange={e => that.setState({ Suction: e.target.value })}
          />

          <div>
            <Button variant="contained"
                    color="primary"
                    onClick={that.selectSoilSuctionTypePoint5}
            > 0.5 </Button>
            <Button variant="contained"
                    color="primary"
                    onClick={that.selectSoilSuctionType1}
            > 1 </Button>
            <Button variant="contained"
                    color="primary"
                    onClick={that.selectSoilSuctionType2}
            > 2 </Button>
            <Button variant="contained"
                    color="primary"
                    onClick={that.selectSoilSuctionType3}
            > 3 </Button>
          </div>
          <div>
            <Button variant="contained"
                    color="primary"
                    onClick={that.selectSoilSuctionType4}
            > 4 </Button>
            <Button variant="contained"
                    color="primary"
                    onClick={that.selectSoilSuctionType5}
            > 5 </Button>
            <Button variant="contained"
                    color="primary"
                    onClick={that.selectSoilSuctionType6}
            > 6 </Button>
            <Button variant="contained"
                    color="primary"
                    onClick={that.selectSoilSuctionType7}
            > 7 </Button>
          </div>
        </div>
      </div>

      <br/>
      <br/>

      <div className={"center"}>
        <Link onClick={that.SwitchToMainToDataGathering} to="/data-gathering">Start Collecting Data</Link>
      </div>

      <hr></hr>
      <h3 className={"center"}>Other Content</h3>
      <br/>
      <div className={"center"}>
        <Link to="/learn" onClick={that.SwitchToLearnHowToUseTheApp}>Learn How to Use the App?</Link>
      </div>
      <br/>
      <div className={"center"}>
        <Link to="/learn-infiltrometer" onClick={that.SwitchToLearnHowToUseTheInfiltrometer}>Learn How to Use the Infiltrometer?</Link>
      </div>
      <br/>
      <div className={"center"}>
        <Link to="/previous-data" onClick={that.SwitchToPreviousData}>Previous Test Data</Link>
      </div>
      <br/>
      <div className={"center"}>
        <Link to="/about" onClick={that.SwitchToAboutUs}>Learn About Us?</Link>
      </div>
    </div>
  )
}

export default Main;
