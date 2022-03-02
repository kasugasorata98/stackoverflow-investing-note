import axios from "axios";

const API = (token) => {
    // function getToken() {
    //     return new Promise((resolve) => {
    //         const token = localStorage.getItem('token');
    //         resolve(token);
    //     });
    // }

    let axiosInstance = axios.create({
        baseURL: 'http://192.168.68.104:3001',
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
        }
    };
};

export default API;