import axios from "axios";

const API = (token) => {
    let axiosInstance = axios.create({
        baseURL: 'http://localhost:3001',
        headers: {
            'Content-Type': 'application/json',
            authorization: 'Bearer ' + token
        },
    });

    return {
        register: (username, password) => {
            return new Promise(async (resolve, reject) => {
                try {
                    const { data } = await axiosInstance.post('/v1/register', {
                        username, password
                    });
                    resolve(data);
                }
                catch (err) {
                    if (err && err.response && err.response.data) {
                        reject(err.response.data);
                    }
                }

            });
        },
        login: (username, password, token) => {
            return new Promise(async (resolve, reject) => {
                try {
                    const { data } = await axiosInstance.post('/v1/login', {
                        username, password, token
                    });
                    resolve(data);
                }
                catch (err) {
                    if (err && err.response && err.response.data) {
                        reject(err.response.data);
                    }
                }
            });
        },
        post: (title, body, tag) => {
            return new Promise(async (resolve, reject) => {
                try {
                    const { data } = await axiosInstance.post('/v1/post', {
                        title, body, tag
                    });
                    resolve(data);
                }
                catch (err) {
                    if (err && err.response && err.response.data) {
                        reject(err.response.data);
                    }
                }
            });
        },
        getPosts: (page, limit, searchQuery, selectedTag) => {
            return new Promise(async (resolve, reject) => {
                try {
                    const query = new URLSearchParams({
                        page, limit, searchQuery, selectedTag
                    });
                    const { data } = await axiosInstance.get(`/v1/post?${query.toString()}`);
                    resolve(data);
                }
                catch (err) {
                    if (err && err.response && err.response.data) {
                        reject(err.response.data);
                    }
                }
            });
        },
        getOnePost: (_id) => {
            return new Promise(async (resolve, reject) => {
                try {
                    const query = new URLSearchParams({
                        _id
                    });
                    const { data } = await axiosInstance.get(`/v1/post/getOne?${query.toString()}`);
                    resolve(data);
                }
                catch (err) {
                    if (err && err.response && err.response.data) {
                        reject(err.response.data);
                    }
                }
            });
        },
        getPostOwnership: (postId) => {
            return new Promise(async (resolve, reject) => {
                try {
                    const query = new URLSearchParams({
                        _id: postId
                    });
                    const { data } = await axiosInstance.get(`/v1/post/getPostOwnership?${query.toString()}`);
                    resolve(data);
                }
                catch (err) {
                    if (err && err.response && err.response.data) {
                        reject(err.response.data);
                    }
                }
            });
        },
        comment: (postId, comment) => {
            return new Promise(async (resolve, reject) => {
                try {
                    const { data } = await axiosInstance.post('/v1/comment', {
                        postId, comment
                    });
                    resolve(data);
                }
                catch (err) {
                    if (err && err.response && err.response.data) {
                        reject(err.response.data);
                    }
                }
            });
        },
        getComments: (postId) => {
            return new Promise(async (resolve, reject) => {
                try {
                    const query = new URLSearchParams({
                        postId
                    });
                    const { data } = await axiosInstance.get(`/v1/comment?${query.toString()}`);
                    resolve(data);
                }
                catch (err) {
                    if (err && err.response && err.response.data) {
                        reject(err.response.data);
                    }
                }
            });
        },
        markAsAnswer: (postId, commentId, isAnswer) => {
            return new Promise(async (resolve, reject) => {
                try {
                    const { data } = await axiosInstance.post('/v1/comment/markAsAnswer', {
                        postId, commentId, isAnswer
                    });
                    resolve(data);
                }
                catch (err) {
                    if (err && err.response && err.response.data) {
                        reject(err.response.data);
                    }
                }
            });
        },
    };
};

export default API;