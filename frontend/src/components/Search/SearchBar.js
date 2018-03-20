import React, { Component } from 'react';
import { slide as Menu } from 'react-burger-menu'; 
import '../../App.css'

class Searchbar extends Component {
  constructor() {
    super();

    this.state = {
      input: ''
    }
  }

  showSettings (event) {
    event.preventDefault();
  }

  render() {
    return (
      <div className="searchbar">
      <h3 className="searchbarLogo"> Cookbook + logo </h3> 
      <input className="searchinput" type="search" name="search" placeholder="Search the site..."/> 
      <button className="addRecipeButton"> Add new recipe </button> 
      <Menu>
      <a id="home" className="menu-item" href="/">Home</a>
      <a id="about" className="menu-item" href="/about">About</a>
      <a id="contact" className="menu-item" href="/contact">Contact</a>
      <a onClick={ this.showSettings } className="menu-item--small" href="">Settings</a>
      </Menu>
      </div>
    );
  }
}

export default Searchbar;

