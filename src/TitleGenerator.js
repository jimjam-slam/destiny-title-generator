import React from "react";
import doT from "dot";

class TitleGenerator extends React.Component {



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
  getTitle(userName) {

    // hash user to a number for randomisation
    const userHash = this.getUserHash(userName.toUpperCase());

    // get a random tmeplate to fill in
    // console.log("getHashedElement:", this.getHashedElement);
    // console.log("Templates:", this.props.dictionary.templates);
    // console.log("Hash:", userHash);
    const userTemplate =
      this.getHashedElement(this.props.dictionary.templates, userHash);
    const templateFn = doT.template(userTemplate)

    // get the names of all the lists referenced in the templates
    let selectedWords = {};
    const listKeys = Object.keys(this.props.dictionary.lists);

    // get a random term from each list
    console.log("List keys:", listKeys)
    listKeys.forEach(list => {
      console.log("Selected list item:", list);
      selectedWords[list] = this.getHashedElement(
        this.props.dictionary.lists[list],
        userHash)
      });
    console.log(selectedWords);

    // now use dot to interpolate the template using selectedWords
    return(templateFn(selectedWords));
  }
  
  // return a random title based on username
  render() {
    return(this.getTitle(this.props.userName));
  }
}

export default TitleGenerator;
