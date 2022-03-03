const mongoose = require("mongoose");
const SchemaTypes = mongoose.Schema.Types;
const Schema = mongoose.Schema;
const User = require("./User");
const Post = require("./Post");

const commentSchema = new Schema(
    {
        user: {
            type: SchemaTypes.ObjectId,
            ref: User,
            required: true,
        },
        post: {
            type: SchemaTypes.ObjectId,
            ref: Post,
            required: true,
        },
        isAnswer: {
            type: Boolean,
            default: false
        },
        content: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;
