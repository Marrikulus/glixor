import React, { Component } from 'react'
import { render } from 'react-dom'

class App extends Component {
  state = {
      messages: [],
      message: "",
      name: "",
  }

  componentDidMount = () => {
    this.connection = new WebSocket('ws://localhost:5000/ws');

    this.connection.onmessage = evt => {
    	this.setState({
      	messages : this.state.messages.concat([ evt.data ])
      })
    };
  }

  onKeyUp = (e) => {
    e.preventDefault();
    if (this.state.name == "") {
      console.log("Please enter a name");
    }

    if (e.keyCode === 13)
    {
      console.log("Enter");
      if (this.state.message !== "")
      {
        this.connection.send("<"+ this.state.name +"> " + this.state.message);
        this.setState({ message: "" });
        this.textInput.value = "";
        console.log("Sending message");
      }
      else{
        console.log("No message to send");
      }
    }
    else
    {
        this.setState({ message: e.target.value });
    }
  }

  onInputName = (e) => {
    this.setState({name: e.target.value});
  }

  render(){
      return (
      <div>
        <input type="text" onChange={this.onInputName} placeholder="insert your name here" />
        <ul>
          {this.state.messages.map( (message, index) => <li key={ index }>{ message }</li> )}
        </ul>
        <input type="text" onKeyUp={this.onKeyUp} ref={(input) => { this.textInput = input; }} />
      </div>
    )
  }
}

export default App;
