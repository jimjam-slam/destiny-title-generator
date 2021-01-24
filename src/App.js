import React from "react";
// import logo from "./logo.svg";
import './App.css';
import TitleGenerator from "./TitleGenerator";

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isFetching: false,
      isReady: false,
      isError: false,
      userName: "james",
      dictionary: {}
    };
  }

  // componentDidMount: fetch the data dictionary, then mark as ready to go
  componentDidMount() {

    console.log("Starting fetch...");

    this.setState({ isFetching: true });

    fetch("/data/title-dictionary.json")
      .then(response => response.json())
      .then(
        result => {
          console.log("Setting dictionary to:", result);
          this.setState({
            isFetching: false,
            isReady: true,
            dictionary: result
          })}
        )
      .catch(e => {
        console.log(e);
        this.setState({
          isFetching: false,
          isReady: false,
          isError: true
        })
      });

  }

  render() {
    return (
      <div className="App">
        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header> */}
            <h1>{this.state.userName}</h1>
            <h2>
              {
                this.state.isReady ?
                  <TitleGenerator
                    userName = {this.state.userName}
                    dictionary = {this.state.dictionary} /> :
                  "NOT READY"
              }
            </h2>
      </div>
    );
  }
}

export default App;
