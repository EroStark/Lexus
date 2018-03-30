import React from 'react'
import axios from 'axios'
import { Route, Switch } from 'react-router'
import Feed from './Feed/Feed'
import UserProfile from './Profile/UserProfile'
import Recipe from './SingleRecipe/Recipe'
import LoginUser from './Modals/LoginUser'
import RegisterUser from './Modals/RegisterUser'
import Groups from './Groups/Groups'
import AddRecipe from './SingleRecipe/AddRecipe'
import EditRecipe from './SingleRecipe/EditRecipe'
import Potluck from './Potluck/Potluck';

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
          user: response.data[0]
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

  renderAddRecipe = props => { 
    const { user } = this.state
    return(
      <AddRecipe user={user} />
    )
  }

  renderUserProfile = props =>{
    const { id } = props.match.params
    const { user } = this.state
    return(
      <UserProfile user={user} id={id}/>
    )
  }

  renderSingleRecipe = props =>{
    console.log('rendering single recipe')
    const { username, recipeID } = props.match.params
    const { user } = this.state
    return(
      <Recipe id={user.user_id} user={props.match.params}  userinfo={user} />
    )
  }

  renderUserFeed = props =>{
    const { id } = props.match.params
    const { user } = this.state
    return(
      <Feed user={user} />
    )
  }

  renderGroups = () =>{
    const { user } = this.state
    return(
      <Groups user={user} />
    )
  }

  renderPotluck = props =>{
    const { user } = this.state
    const { potluckID } = props.match.params
    return(
      <Potluck user={user} potluckID={props.match.params} />
    )
  }


  render() {
    const { user } = this.state
    return (
     <div>
      <Switch>
        <Route exact path='/cb/groups' render={this.renderGroups} />
        <Route path='/cb/potluck/:potluckID' render={this.renderPotluck} />
        <Route path='/cb/groups/:groupID' component={Groups} />
        <Route exact path='/cb/profile/:id' render={this.renderUserProfile} />
        <Route path='/cb/profile/:id/favorites' render={this.renderUserProfile} />
        <Route path='/cb/profile/:id/edit' component={UserProfile} />
        <Route path='/cb/addrecipe' render={this.renderAddRecipe} />
        <Route path='/cb/editRecipe/:recipeID' component={EditRecipe} />
        <Route exact path='/cb/:username/:recipeID' render={this.renderSingleRecipe} />
        <Route path='/cb/:username/:recipeID/edit' component={Recipe} />
        <Route exact path='/cb/feed' render={this.renderUserFeed} />
      </Switch>
    </div> )
  }
}

export default Cookbook
