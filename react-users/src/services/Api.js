import axios from 'axios';

export const Api = {
    login(data) {
        return axios.post('http://localhost:3900/auth/login', data)
    },
    registerUser(data) {
        return axios.post('http://localhost:3900/auth/reg', data)
    }

}