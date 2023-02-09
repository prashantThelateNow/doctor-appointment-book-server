const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		message: {
			type: String,
			required: true,
		},
		creator: {
			type: String,
			required: true,
		},
		tags: [String],
		img: {
			type: String,
			required: true,
		},
		likeCount: {
			type: Number,
			default: 0,
		},
	},
	{ timestamps: true },
);

/** Post model  */
const Post = mongoose.model('Post', postSchema);

module.exports = Post;
