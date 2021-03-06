//contanin all of the user-facing routes such as homepage and login page
const router = require('express').Router();
const session = require('express-session');
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');

router.get('/', (req, res) => {
  Post.findAll({
    attributes: [
      'id',
      'title',
      'post_body',
      'created_at'
    ],
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id','user_id', 'created_at'],
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
  })
    .then(dbPostData => {
      console.log("RENDER PAGE");
      // pass a single post object into the homepage template
      console.log(req);
      console.log(req.session);
      const posts = dbPostData.map(post => post.get({ plain: true }));
      const response_body = { 
        posts,
        loggedIn: req.session.loggedIn,
      }
      res.render('homepage', { 
        posts,
        loggedIn: req.session.loggedIn,
        username: req.session.username
      });
    })
    .catch(err => {
      console.log("REACHING ERROR IN HOME ROUTE");
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

router.get('/post/:id', (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'title',
      'post_body',
      'created_at'
    ],
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
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
  })
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }

      // serialize the data
      const post = dbPostData.get({ plain: true });

      // pass data to template
      res.render('single-post', { 
        post,
      loggedIn: req.session.loggedIn,
      username: req.session.username
     });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;