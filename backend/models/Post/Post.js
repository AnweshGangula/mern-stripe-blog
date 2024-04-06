const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
    {
        // Post Schema
        description: {
            type: String,
            required: true,
            trim: true
        },
        image: {
            type: Object,
            // fieldname: {
            //     type: String
            // },
            // originalName: {
            //     type: String
            // },
            // encoding: {
            //     type: String
            // },
            // mimeType: {
            //     type: String
            // },
            // path: {
            //     type: String
            // },
            // size: {
            //     type: Number
            // },
            // filename: {
            //     type: String
            // },
            // public_id: {
            //     type: String
            // },
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            // required: true
        },
        nextEarningDate: {
            type: Date,
            default: () => new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1) // default to the first date of next month
        },
        thisMonthEarnings: {
            type: Number,
            default: 0
        },
        totalEarnings: {
            type: Number,
            default: 0
        },
        category:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category',
        },
        viewsCount: {
            type: Number,
            default: 0
        },
        // Interactions
        likes: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        dislikes: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        viewers: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        // Comments
        comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}],

        // Flag for moderation
        isBlocked: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true
    }
);

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
