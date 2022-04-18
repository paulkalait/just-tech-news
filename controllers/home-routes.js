const router = require('express').Router();
const res = require('express/lib/response');
const sequelize = require('../config/connection')
const { Post, User, Comment} = require('../models');


router.get('/', (req, res) => {
    Post.findAll({
        attributes: [
            'id',
            'post_url',
            'title',
            'crated_at',
            [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
        ],
        include: [
            {
                model: Comment,
                attributes: ['id' , 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    }).then(dbPostData => {
        //pass a single post object into the homepage temoplate
        console.log(dbPostData[0])
                        //use sequelixe .get metho to only get the properties you need to serialize object
        const posts = dbPostData.map(post => post.get({ plain: true}))
        res.render('homepage', {posts})
        
    }).catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
})

module.exports = router