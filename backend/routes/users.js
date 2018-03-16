var express = require('express');
var router = express.Router();
var db = require('../db/queries')
const {
  loginRequired
} = require("../auth/helpers");


/*GET Request*/
router.get('/logout', loginRequired, db.logoutUser)
router.get('/profile/:userID', db.getSingleUser)
router.get('/profile/:userID/favorites', db.getSingleUserFavorites)
router.get('/followers/:userID', db.getFollowers)
router.get('/following/:userID', db.getFollowing)
router.get('/comment/:recipeID', db.getRecipeComments)

/*POST Request*/
router.post('/register', db.registerUser)
router.post('/addComment/:recipeID', loginRequired, db.addRecipeComment)
router.post('/removeComment/:recipeID', loginRequired, db.removeRecipeComment)
router.post('/addRecipe', loginRequired, db.addRecipe)
router.post('/removeRecipe', loginRequired, db.removeRecipe)
router.post('/favorite', loginRequired, db.favoriteRecipe)
router.post('/unfavorite', loginRequired, db.unfavoriteRecipe)
router.post('/followUser', loginRequired, db.followUser)
router.post('/unfollowUser', loginRequired, db.unfollowUser)
router.post('/login', db.loginUser)

/*PATCH Request*/
router.patch('/edit/:userID', loginRequired, db.editUser)
router.patch('/edit/:userID/:recipeID', loginRequired, db.editRecipe)
router.patch('/editComment/:recipeID', loginRequired, db.editRecipeComment)

module.exports = router;