const Post = require('../models/post');
const { commonAPIResponse } = require('../utils/responseLib');

module.exports = {
	/**
	 * fetch posts from database
	 */
	getPosts: async (req, res) => {
		try {
			let result = await Post.find();
			if (!result) {
				throw 'FAILED';
			}

			let response = { posts: result, length: result.length };
			if (result.length === 0) {
				return res
					.status(200)
					.send(commonAPIResponse('No records found!', 0, response));
			}

			res.status(200).send(
				commonAPIResponse('Records fetched successfully!', 0, response),
			);
		} catch (error) {
			console.log(error);

			if (error === 'FAILED') {
				res.status(400).send(
					commonAPIResponse(
						'Failed while fetching records!',
						1,
						null,
					),
				);
			} else {
				res.status(500).send(
					commonAPIResponse(
						'Something went wrong! Looks like problem in server',
						3,
						null,
					),
				);
			}
		}
	},

	/**
	 * Create new post resource in database
	 */
	createPost: async (req, res) => {
		try {
			const post = new Post(req.body);
			let result = await post.save();
			if (!result) {
				throw 'FAILED';
			}

			let response = { post: result };
			res.status(201).send(
				commonAPIResponse('Post created successfully!', 0, response),
			);
		} catch (error) {
			console.log(error);

			if (error.errors || error === 'FAILED') {
				res.status(400).send(
					commonAPIResponse('Failed while creating post!', 1, error),
				);
			} else {
				res.status(500).send(
					commonAPIResponse(
						'Something went wrong! Looks like problem in server',
						3,
						null,
					),
				);
			}
		}
	},
};
