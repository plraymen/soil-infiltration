import React, { Component } from 'react'
import './RetrivalData.css'

class RetrivalData extends Component {
    constructor(props) {
        super(props) //since we are extending class Table so we have to use super in order to override Component class constructor
        this.state = { //state is by default an object
            //     students: [
            //         { id: 1, Time: 'Wasif', Volume: 21},
            //         { id: 2, Time: 'Ali', Volume: 19},
            //         { id: 3, Time: 'Saad', Volume: 16},
            //         { id: 4, Time: 'Asad', Volume: 25}
            //     ]
            // }
            students: this.props.ReviewOldDataArray
        }
    }

    renderTableData() {

        return this.state.students.map((student, index) => {
            const { Title, Picture, GPSLocation} = student //destructuring
            return (
                <tr key={Title}>
                    <td>{Title}</td>
                    <td>{GPSLocation}</td>
                    <td><img src={Picture} alt="Picture"/></td>
                </tr>
            )
        })
    }

    renderTableHeader() {
        let header = Object.keys(this.state.students[0])
        return header.map((key, index) => {
            return <th key={index}>{key.toUpperCase()}</th>
        })
    }



    render() { //Whenever our class runs, render method will be called automatically, it may have already defined in the constructor behind the scene.
        return (
            <div>
                <h1 id='title'>Previous Test Data</h1>
                <table id='students'>
                    <tbody>
                    <tr>{this.renderTableHeader()}</tr>
                    {this.renderTableData()}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default RetrivalData //exporting a component make it reusable and this is the beauty of react