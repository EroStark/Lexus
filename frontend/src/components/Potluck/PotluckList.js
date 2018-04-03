import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";
import Searchbar from "../Search/SearchBar";
import './PotluckList.css'


class PotluckList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: "",
      potluck_info: [],
      potluck_invitations: [],
      potluck_items: [],
      userPotluckInvites: [], 
      userPotluckCreated: []
    };
  }


  componentDidMount(props) {
    axios
      .get(`/users/getAllPotlucksUserCreatedAndInvited`)
      .then(res => {
        console.log('resssssss', res)
        this.setState({
          userPotluckInvites: res.data[0],
          userPotluckCreated: res.data[1]
        });
      })
      .catch(err => {
        this.setState({
          message: `${err.response.data}`
        });
      });
  }

  render(props) {
    const { potluck_info, potluck_items, potluck_invitations } = this.state;
    console.log('this.state', this.state.userPotluckInvites)
    console.log('this.state', this.state.userPotluckCreated)
    console.log('this.props%%%%%', this.props)
    console.log('*********', this.props.user.user_id)

    return (
      <div className="potluckpage">
      <Searchbar user={this.props.user} />
        <img className="potlucksHeaderImage"  />
        <div className="potluckContainer">
      <h1> My Potlucks </h1> 

      <h2> Potlucks I Am Invited To </h2> 
      {this.state.userPotluckInvites.length > 0 ? this.state.userPotluckInvites.map((elem) => <li> <Link to={`/cb/potluck/${elem.potluck_id}`}> {elem.potluck_name}</Link> </li>) : <li>no potluck invitations</li>}

      <h2> Potlucks I Am Organizing </h2> 
      {this.state.userPotluckCreated.length > 0 ? this.state.userPotluckCreated.map((elem) => <li> <Link to={`/cb/potluck/${elem.potluck_id}`}> {elem.potluck_name}</Link> </li>) : <li>no potlucks created</li>}
        </div>
      </div>
    );
  }
}

export default PotluckList;

