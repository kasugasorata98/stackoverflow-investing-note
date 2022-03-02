const express = require("express");
const User = require("../../models/User");
const router = express.Router();
const bcrypt = require('bcrypt');
const Constants = require("../../constants/constants");
const { generateToken, verifyToken } = require("../../utils/jwt");

router.post("/", async (req, res) => {
    try {
        const { username, password, token } = req.body;

        if (token) {
            try {
                const result = await verifyToken(token);
                const userExists = await User.exists({
                    _id: result.id
                });
                if (userExists) {
                    return res.status(Constants.HTTP_STATUS_CODES.OK).json({
                        message: Constants.SUCCESS_MESSAGES.LOGIN_SUCCESSFUL,
                        token
                    });
                }
                else {
                    return res.status(Constants.HTTP_STATUS_CODES.NOT_FOUND).json({
                        message: Constants.ERROR_MESSAGES.USER_DOES_NOT_EXIST
                    });
                }
            }
            catch (err) {
                return res.status(Constants.HTTP_STATUS_CODES.FORBIDDEN).json({
                    message: err.message
                });
            }
        }
        else {
            const user = await User.findOne({
                username
            });

            if (!user) {
                return res.status(Constants.HTTP_STATUS_CODES.NOT_FOUND).json({
                    message: Constants.ERROR_MESSAGES.USER_DOES_NOT_EXIST
                });
            }

            bcrypt.compare(password, user.password).then(function (result) {
                if (result == true) {
                    const token = generateToken(user._id);
                    return res.status(Constants.HTTP_STATUS_CODES.OK).json({
                        message: Constants.SUCCESS_MESSAGES.LOGIN_SUCCESSFUL,
                        token
                    });
                }
                else {
                    return res.status(Constants.HTTP_STATUS_CODES.UNAUTHORIZED).json({
                        message: Constants.ERROR_MESSAGES.INVALID_AUTH
                    });
                }
            });
        }
    }
    catch (err) {
        console.log("Login", err);
        return res.status(Constants.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json({
            message: Constants.ERROR_MESSAGES.SOMETHING_WENT_WRONG
        });
    }
});

module.exports = router;
