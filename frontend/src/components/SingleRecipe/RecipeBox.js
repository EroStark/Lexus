import React from "react"
import { Link, Route, Switch } from 'react-router-dom';

const styles = {
  img: {
    width: "300px",
    height: "300px"
  }
}


class RecipeBox extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      recipeName: this.props.recipe.recipe_name,
      recipeImg: this.props.recipe.img,
      username: this.props.recipe.username,
      favorites: this.props.recipe.favorites_count
    }
  }

  render(){
    // const {recipe} = this.props;
    const { recipe_name, img,
            username, favorites_count,
            recipe , recipe_id, user_id} = this.props.recipe;

    return(
      <div className="recipeBox">
        <h3>{recipe_name}</h3>
        <Link to={`/cb/${user_id}/${recipe_id}`}> <img src={img} alt="recipeImg" style={styles.img} /></Link>
        <div className="recipeInfo">
        <h4>Chef {username}</h4>
        <div className="favorites" title="Favorites"> <i class="fas fa-file-alt"></i> <p className="fav">{favorites_count}</p> </div>
        </div>
      </div>
    )
  }
}

export default RecipeBox;
