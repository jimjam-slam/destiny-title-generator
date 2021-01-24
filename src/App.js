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
      userName: "rns",
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

  // render a title, if we're ready and one has been typed in
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h2>Destiny title generator</h2>
        {
          this.state.isReady ?
            <React.Fragment>
              <input
                id="usernameentry"
                type="text" />
              {/* <h1>{this.state.userName}</h1> */}
              <h2>
                <TitleGenerator
                  userName = {this.state.userName}
                  dictionary = {this.state.dictionary} />
              </h2>
            </React.Fragment> :
            <h2>LOADING...</h2>
        }

          
          <p>By <a
            className="App-link"
            href="https://jamesgoldie.dev"
            target="_blank"
            rel="noopener noreferrer"
          >
            Rensa
          </a>.</p>
          <p>Not affiliated with <a
            className="App-link"
            href="https://bungie.net"
            target="_blank"
            rel="noopener noreferrer"
          >
            Bungie
          </a>, the makers of Destiny.</p>
        </header>
            
      </div>
    );
  }
}

export default App;
