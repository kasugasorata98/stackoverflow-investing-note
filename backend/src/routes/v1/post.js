const express = require("express");
const router = express.Router();
const Constants = require("../../constants/constants");
const Post = require("../../models/Post");
const { authenticateToken } = require("../../utils/jwt");

router.post("/", authenticateToken, async (req, res) => {
    const user_id = req.user_id;
    try {
        const { title, body, tag } = req.body;
        if (!title && !body && !tag) {
            return res.status(Constants.HTTP_STATUS_CODES.BAD_REQUEST).json({
                message: Constants.ERROR_MESSAGES.POST_BODY_INVALID
            });
        }

        await Post.create({
            user: user_id,
            title,
            body,
            tag
        });

        return res.status(Constants.HTTP_STATUS_CODES.CREATED)
            .json({
                message: Constants.SUCCESS_MESSAGES.POST_SUCCESSFUL
            });

    }
    catch (err) {
        console.log("Post post", err);
        return res.status(Constants.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json({
            message: Constants.ERROR_MESSAGES.SOMETHING_WENT_WRONG
        });
    }
});

router.get("/", async (req, res) => {
    try {
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);
        const searchQuery = req.query.searchQuery;
        const selectedTag = req.query.selectedTag;
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;

        let hasNext;
        const count = await Post.countDocuments();

        if (endIndex < count) {
            hasNext = true;
        } else {
            hasNext = false;
        }

        let searchCondition = {};

        if (searchQuery) {
            searchCondition = {
                $or: [
                    { title: { $regex: searchQuery, $options: "i" } },
                    { tag: { $regex: searchQuery, $options: "i" } },
                ],
            };
        }

        if (selectedTag) {
            searchCondition = {
                ...searchCondition,
                tag: selectedTag
            };
        }

        const posts = await Post.find(searchCondition)
            .limit(limit)
            .skip(startIndex)
            .select('title tag createdAt user')
            .populate({
                path: "user",
                select: "username -_id"
            });

        return res.status(Constants.HTTP_STATUS_CODES.OK)
            .json({
                posts,
                hasNext,
                count
            });
    }
    catch (err) {
        console.log("Get Post", err);
        return res.status(Constants.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json({
            message: Constants.ERROR_MESSAGES.SOMETHING_WENT_WRONG
        });
    }
});

module.exports = router;
