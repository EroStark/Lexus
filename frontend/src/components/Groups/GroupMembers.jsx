import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

class GroupMembers extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      members: [],
      group_name: ''
    }
  }

  getGroupInfo = () =>{
    const { group_name, members } = this.state
    axios
      .get(`/users/getSingleGroup/${this.props.groupID}`)
      .then(res => {
        this.setState({
          group_name: res.data[0].group_name,
        })
      })
      .catch(error => {
        console.log('groups error')
      })
    axios
      .get(`/users/getAllGroupFollowers/${this.props.groupID}`)
      .then(res => {
        this.setState({
          members: res.data
        })
      })
      .catch(error => {
        console.log(error)
      })
  }

  componentDidMount(){
    this.getGroupInfo()
  }

  render(){
    const { members, group_name } = this.state
    console.log(members)
    if(members !== []){
      return(
        <div>
          <h1>All Members for {group_name}</h1>
          {members.map(member =>{
            let path = `/cb/profile/${member.user_id}`
            return(
              <div>
                <p><Link to={path}>{member.username}</Link></p>
              </div>
            )
          })}
        </div>
      )
    }
    else {
      return(
        <div>
          <h3>No Mmembers Yet</h3>
        </div>
      )
    }
  }
}

export default GroupMembers
