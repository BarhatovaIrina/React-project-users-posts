import axios from 'axios';

//API for auth-user and user's posts
export const Api = {
    login(data) {
        return axios.post('http://localhost:3900/auth/login', data)
    },
    registerUser(data) {
        return axios.post('http://localhost:3900/auth/reg', data)
    },
    setValueToLocalStorage(key, value) {
        if (!key || !value) return
        return localStorage.setItem(key, value)
    },
    getValueFromLocalStorage(key) {
        if (!key) return
        return localStorage.getItem(key)
    },
    getUserById(id) {
        return axios.get(`http://localhost:3900/auth/getuser?userId=${id}`)
    },
    getPosts(id) {
        return axios.get(`http://localhost:3900/post/getposts?userId=${id}`)
    },
    createPost(data) {
        return axios.post('http://localhost:3900/post/create', data)
    },


}