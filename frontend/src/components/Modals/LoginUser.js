import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import axios from "axios"
import { Redirect } from "react-router-dom"

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

Modal.setAppElement('#root')

class LoginUser extends Component {
  constructor() {
    super();

    this.state = {
      username: '',
      password: '',
      isLoggedIn: false,
      message: '',
      modalIsOpen: false
    }
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  closeModal() {
    this.setState({modalIsOpen: false, message: ''});
  }

  handleFormInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleLoginFormSubmit = e => {
    e.preventDefault();

    const { username, password } = this.state;
    axios
      .post("/users/login", {
        username: username,
        password: password
      })
      .then(res => {
        this.setState({
          message: 'success',
          isLoggedIn: true,
        });
      })
      .catch(err => {
        this.setState({
          username: "",
          password: "",
          message: `Error logging in. ${err}`
        });
      });
  }

  render() {
    console.log('LOGIN PROPS',this.props)
    if(this.state.isLoggedIn === true) {
      return <Redirect to='/feed' />
    }
    return (
      <div className="Modal">
      <div>
      <button onClick={this.openModal}>Log in</button>
      <Modal
        isOpen={this.state.modalIsOpen}
        onRequestClose={this.closeModal}
        style={customStyles}
      >

        <h2 ref={subtitle => this.subtitle = subtitle}>Log In</h2>
        <form onSubmit={this.handleLoginFormSubmit}>
          <input className="input" type="text" placeholder="Username" onChange={this.handleFormInput} name='username'></input>
          <input className="input" type="password" placeholder="Password" onChange={this.handleFormInput} name='password'></input>
          <button>Log in</button>
        </form>
        <p> {this.state.message} </p>
        <button onClick={this.closeModal}>close</button>
      </Modal>
      </div>
      </div>
    );
  }
}

export default LoginUser;
