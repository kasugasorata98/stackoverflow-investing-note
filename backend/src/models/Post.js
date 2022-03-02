const mongoose = require("mongoose");
const SchemaTypes = mongoose.Schema.Types;
const Schema = mongoose.Schema;
const User = require("./User");

const postSchema = new Schema(
    {
        user: {
            type: SchemaTypes.ObjectId,
            ref: User,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        body: {
            type: String,
            required: true,
        },
        tag: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
