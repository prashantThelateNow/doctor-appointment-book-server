const postRouter = require('express').Router();
const { getPosts, createPost } = require('../controllers/postController');

/**
 * All post routes end points
 */
postRouter.get(`/`, getPosts);
postRouter.post(`/`, createPost);

module.exports = postRouter;
