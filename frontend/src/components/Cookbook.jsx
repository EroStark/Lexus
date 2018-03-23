import React from 'react'
import axios from 'axios'
import { Route, Switch } from 'react-router'
import Feed from './Feed/Feed'
import UserProfile from './Profile/UserProfile'
import Recipe from './SingleRecipe/Recipe'
import LoginUser from './Modals/LoginUser'
import RegisterUser from './Modals/RegisterUser'

class Cookbook extends React.Component {
  constructor() {
    super();
    this.state = {
      user: ''
    }
  }

  loggedInUser = () =>{
    axios.get('/users')
    .then(response =>{
      if(response.data){
        this.setState({
          user: response.data
        })
      }
    })
    .catch(error =>{
      console.log('user fetch did not work')
    })
  }

  componentDidMount(){
    this.loggedInUser()
  }

  renderUserProfile = props =>{
    const { id } = props.match.params
    const { user } = this.state
    console.log(user);
    return(
      <UserProfile user={user} id={id}/>
    )
  }

  renderSingleRecipe = props =>{
    const { username, recipeID } = props.match.params
    const { user } = this.state
    return(
      <Recipe user={props.match.params}/>
    )
  }

  renderUserFeed = props =>{
    const { id } = props.match.params
    const { user } = this.state
    return(
      <Feed user={user} />
    )
  }

  render() {
    const { user } = this.state
    return (
     <div>
       <h1>Cookbook</h1>
       <LoginUser />
      <Switch>
        <Route exact path='/cb/profile/:id' render={this.renderUserProfile} />
        <Route path='/cb/profile/:id/favorites' component={UserProfile} />
        <Route path='/cb/profile/:id/edit' component={UserProfile} />
        <Route path='/cb/profile/:id/addrecipe' component={UserProfile} />
        <Route exact path='/cb/:username/:recipeID' render={this.renderSingleRecipe} />
        <Route path='/cb/:username/:recipeID/edit' component={Recipe} />
        <Route exact path='/cb/feed' render={this.renderUserFeed} />
      </Switch>
    </div> )
  }
}

export default Cookbook
