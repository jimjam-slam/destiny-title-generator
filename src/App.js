import React from "react";
import doT from "dot";
import "./App.css";

class App extends React.Component {

  // --- lifecycle methods ----------------------------------------------------

  constructor(props) {
    super(props);
    this.state = {
      isFetching: false,
      isReady: false,
      isError: false,
      userName: "",
      title: "",
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
    const initialName =
      sampleNames[Math.floor(Math.random() * sampleNames.length)];
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
            dictionary: result,
            userName: initialName,
            title: this.getTitle(initialName, result)

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
    this.setState({
      userName: event.target.value,
      title: this.getTitle(event.target.value, this.state.dictionary)
    });
  }

  // --- title computation functions ------------------------------------------

  // userHash: converts a username to a number
  // from https://stackoverflow.com/a/8831937/3246758
  getUserHash(userName) {
    var hash = 0;
    if (userName.length === 0) {
        return hash;
    }
    for (var i = 0; i < userName.length; i++) {
        var char = userName.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
  }

  // getHashedElement: return a random element of an array based on the
  // given hash
  getHashedElement(array, hash) {
    return(array[Math.abs(hash % array.length)]);
  }

  // getTitle: return a title for the user generated at random from one of the
  // downloaded templates
  getTitle(userName, dictionary) {

    // hash user to a number for randomisation
    const userHash = this.getUserHash(userName.toUpperCase());

    console.log("Dictionary:", dictionary)
    const userTemplate =
      this.getHashedElement(dictionary.templates, userHash);
    const templateFn = doT.template(userTemplate)

    // get the names of all the lists referenced in the templates
    let selectedWords = {};
    const listKeys = Object.keys(dictionary.lists);

    // get a random term from each list
    console.log("List keys:", listKeys)
    listKeys.forEach(list => {
      console.log("Selected list item:", list);
      selectedWords[list] = this.getHashedElement(
        dictionary.lists[list],
        userHash)
      });
    console.log(selectedWords);

    // now use dot to interpolate the template using selectedWords
    return(templateFn(selectedWords));
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
                {this.state.title}
                {/* <TitleGenerator
                  userName={this.state.userName}
                  dictionary={this.state.dictionary}
                  onTitleChange={this.handleTitleChange} /> */}
              </h3>
              <a
                className="twitter-share-button"
                data-size="large"
                target="_blank"
                rel="noopener noreferrer"
                href={
                  "https://twitter.com/intent/tweet?" +
                  "via=jimjam_slam&text=My+" +
                  "world-ending%2C+space-magic-sundering+%23Destiny2+%23DestinyTitle+is+" +
                  this.state.userName.toUpperCase() + "%2C+" +
                  this.state.title.toUpperCase()}>
Tweet</a>
            </React.Fragment> :
            <h2>LOADING...</h2>
        }

          
          <p>By <a
            className="App-link"
            href="https://jamesgoldie.dev"
            target="_blank"
            rel="noopener noreferrer"
          >
            Rensa (James Goldie)
          </a></p>
          <p>Not affiliated with <a
            className="App-link"
            href="https://bungie.net"
            target="_blank"
            rel="noopener noreferrer"
          >
            Bungie
          </a>, the makers of Destiny</p>
        </header>
            
      </div>
    );
  }
}

export default App;
