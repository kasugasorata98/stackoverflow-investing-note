const express = require("express");
const router = express.Router();
const Constants = require("../../constants/constants");
const Comment = require("../../models/Comment");
const Post = require("../../models/Post");
const { authenticateToken } = require("../../utils/jwt");

router.post("/", authenticateToken, async (req, res) => {
    const user_id = req.user_id;
    try {
        const { comment, postId } = req.body;
        if (!comment && !postId) {
            return res.status(Constants.HTTP_STATUS_CODES.BAD_REQUEST).json({
                message: Constants.ERROR_MESSAGES.POST_BODY_INVALID
            });
        }

        await Comment.create({
            user: user_id,
            post: postId,
            content: comment
        });

        return res.status(Constants.HTTP_STATUS_CODES.CREATED)
            .json({
                message: Constants.SUCCESS_MESSAGES.COMMENT_SUCCESSFUL
            });

    }
    catch (err) {
        console.log("Post post", err);
        return res.status(Constants.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json({
            message: Constants.ERROR_MESSAGES.SOMETHING_WENT_WRONG
        });
    }
});

router.post("/markAsAnswer", authenticateToken, async (req, res) => {
    const user_id = req.user_id;
    try {
        const { postId, commentId, isAnswer } = req.body;
        if (!commentId && !postId) {
            return res.status(Constants.HTTP_STATUS_CODES.BAD_REQUEST).json({
                message: Constants.ERROR_MESSAGES.POST_BODY_INVALID
            });
        }

        const isPostOwner = await Post.exists({
            user: user_id
        });

        if (!isPostOwner) {
            // means that someone tried to mark an answer despite not being the post owner
            return res.status(Constants.HTTP_STATUS_CODES.BAD_REQUEST)
                .json({
                    message: Constants.ERROR_MESSAGES.NOT_OWNER
                });
        }

        await Comment.findByIdAndUpdate(commentId, {
            isAnswer
        });

        return res.status(Constants.HTTP_STATUS_CODES.OK)
            .json({
                message: Constants.SUCCESS_MESSAGES.SUCCESSFULLY_MARK_AS_ANSWER,
                isAnswer
            });
    }
    catch (err) {
        console.log("Post mark as answer", err);
        return res.status(Constants.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json({
            message: Constants.ERROR_MESSAGES.SOMETHING_WENT_WRONG
        });
    }
});

router.get("/", async (req, res) => {
    try {
        const { postId } = req.query;

        const comments = await Comment.find({
            post: postId
        })
            .sort('-createdAt')
            .populate({
                path: "user",
                select: "username -_id createdAt"
            });

        return res.status(Constants.HTTP_STATUS_CODES.OK)
            .json({
                comments
            });
    }
    catch (err) {
        console.log("Post get", err);
        return res.status(Constants.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json({
            message: Constants.ERROR_MESSAGES.SOMETHING_WENT_WRONG
        });
    }
});


module.exports = router;
