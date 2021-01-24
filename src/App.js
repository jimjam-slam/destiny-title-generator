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
      userName: "",
      dictionary: {}
    };
    this.handleUserNameChange = this.handleUserNameChange.bind(this);
  }

  // componentDidMount: fetch the data dictionary, then mark as ready to go
  componentDidMount() {

    // first up, pick an random initial starting name
    const sampleNames = ["omar", "shaimaa", "maría", "yonas", "kristian",
      "césar", "alysha", "ximena", "zoé", "yusif", "ma'ayan", "elie", "ahmet",
      "zahra", "tamar", "bayarmaa", "emine", "爱", "莉", "波", "亮", "tatsuki",
      "riko", "nathan", "luka", "tomáš", "robin", "ben", "aleksandar",
      "emma", "yasmine", "eliška", "aino", "chloe", "victoria", "nikau",
      "teiki", "ioane", "hina"];
    this.setState({
      userName: sampleNames[Math.floor(Math.random() * sampleNames.length)]
    })

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

  // control the username entry state
  handleUserNameChange(event) {
    this.setState({userName: event.target.value});
  }

  // render a title, if we're ready and one has been typed in
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h4 id="pagetitle">Destiny title generator</h4>
        {
          this.state.isReady ?
            <React.Fragment>
              <label>
                <input
                  id="usernameentry"
                  type="text"
                  value={this.state.userName}
                  onChange={this.handleUserNameChange} />
              </label>
              <h3 id="giventitle">
                <TitleGenerator
                  userName = {this.state.userName}
                  dictionary = {this.state.dictionary} />
              </h3>
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
