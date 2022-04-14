const User = require('./User');
const Post = require('./Post')

//create associations
User.hasMany(Post, {
    //creates the reference for the id column in User model to LINK to the corresponding foreign key pair, whjich is user_id in the Post model
    foreignKey: 'user_id'
})




module.exports = { User , Post}