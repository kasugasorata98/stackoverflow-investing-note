const Constants = {
    ERROR_MESSAGES: {
        USER_DOES_NOT_EXIST: "User does not exist",
        INVALID_AUTH: "Invalid username or password",
        USER_ALREADY_EXISTS: "The following username is taken",
        SOMETHING_WENT_WRONG: "Something went wrong",
        INVALID_TOKEN: "Token is invalid",
        POST_BODY_INVALID: 'Title, body, and a tag are required',
        POST_NOT_EXIST: "The post does not exist",
        NOT_OWNER: "You are not the post owner"
    },
    SUCCESS_MESSAGES: {
        LOGIN_SUCCESSFUL: "Login Successful",
        POST_SUCCESSFUL: 'Successful post',
        COMMENT_SUCCESSFUL: 'Comment Successful',
        SUCCESSFULLY_MARK_AS_ANSWER: 'Sucessfully marked as answer'
    },
    HTTP_STATUS_CODES: {
        CONFLICT: 409,
        UNAUTHORIZED: 401,
        NOT_FOUND: 404,
        OK: 200,
        CREATED: 201,
        INTERNAL_SERVER_ERROR: 500,
        FORBIDDEN: 403,
        BAD_REQUEST: 400
    }
};

module.exports = Constants;