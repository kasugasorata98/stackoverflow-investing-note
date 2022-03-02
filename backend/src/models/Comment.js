const mongoose = require("mongoose");
const SchemaTypes = mongoose.Schema.Types;
const Schema = mongoose.Schema;
const User = require("./User");
const Question = require("./Question");

const commentSchema = new Schema(
    {
        user: {
            type: SchemaTypes.ObjectId,
            ref: User,
            required: true,
        },
        question: {
            type: SchemaTypes.ObjectId,
            ref: Question,
            required: true,
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
