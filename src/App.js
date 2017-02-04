import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import Papa from 'papaparse';
import './app.css';

class App extends Component {

    render () {
        return (
            <div className="app">
                <div className="app-header">
                    <h2>Spreadsheeter</h2>
                </div>

                <div className="app-body">
                    <IO />
                </div>
            </div>
        )
    };
}

class IO extends Component {

    constructor(props) {

        super(props);
        this.ondrop = this.ondrop.bind(this);

        this.state = {
            filename: "",
            data: []
        };
    }

    ondrop (accepted, rejected) {

        var that = this;

        if (accepted.length) {
            // console.log('uploaded file: ' + accepted);

            that.setState({
                filename: accepted[0].name
            });

            Papa.parse(accepted[0], {
            	complete: function(results) {
                    that.setState({
                        data: results.data
                    });
            	}
            });
        }

        if (rejected.length) {
            // console.log(rejected.length + ' files rejected');
        }
    };

    render () {

        var mapspreadsheet = function(data) {

            var maprows = data.map( function(row, rindex) {

                var mapcells = row.map( function(cell, cindex) {

                    return (
                        <td key={cindex} className="cell">{cell}</td>
                    )
                });

                return (
                    <tr key={rindex} className="row">{mapcells}</tr>
                )
            });

            return maprows;
        };

        return (
            <div className="inputoutput">
                <div className="input">
                    <Dropzone className="uploader" activeClassName="uploaderactive" onDrop={this.ondrop}></Dropzone>
                </div>
                <div className="output">
                    {this.state.filename !== "" && <div className="filename">Displaying: {this.state.filename}</div>}
                    <table className="spreadsheet">
                        <tbody>
                            {mapspreadsheet(this.state.data)}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    };
}

export default App;
