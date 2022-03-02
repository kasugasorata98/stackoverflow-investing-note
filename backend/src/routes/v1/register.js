const express = require("express");
const User = require("../../models/User");
const router = express.Router();
const bcrypt = require('bcrypt');
const Constants = require("../../constants/constants");

router.post("/", async (req, res) => {
    try {
        const { username, password } = req.body;

        const userExists = await User.exists({
            username
        });

        if (userExists) {
            return res.status(Constants.HTTP_STATUS_CODES.CONFLICT).json({
                message: Constants.ERROR_MESSAGES.USER_ALREADY_EXISTS
            });
        }

        const saltRounds = 10;
        const hash = bcrypt.hashSync(password, saltRounds);

        await User.create({
            username,
            password: hash
        });

        return res.status(Constants.HTTP_STATUS_CODES.CREATED).json({
            message: "Registration Successful"
        });
    }
    catch (err) {
        console.log("Register", err);
        return res.status(Constants.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json({
            message: Constants.ERROR_MESSAGES.SOMETHING_WENT_WRONG
        });
    }
});

module.exports = router;
