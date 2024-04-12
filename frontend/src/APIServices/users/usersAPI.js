import axios from 'axios'

import { BASE_URL } from "../../utils/baseEndpoint"

const USERS_BASE_URL = BASE_URL + '/users';

export const registerAPI = async (userData) => {
    // try {
        const response = await axios.post(
            USERS_BASE_URL + '/register',
            {
                // ...userData
                username: userData.username,
                email: userData.email,
                password: userData.password
            },
            {
                withCredentials: true // this passes the cookie to the server
            }
        )
        return response.data
    // } catch (error) {
    //     return error.response
    // }
}

export const loginAPI = async (userData) => {
    // try {
        const response = await axios.post(
            USERS_BASE_URL + '/login',
            {
                // ...userData
                username: userData.username,
                password: userData.password
            },
            {
                withCredentials: true // this passes the cookie to the server
            }
        )
        return response.data
    // } catch (error) {
    //     return error.response
    // }
}

export const checkAuthStatusAPI = async() => {
    const response = await axios.get(
        USERS_BASE_URL + '/checkAuthenticated',
        {
            withCredentials: true
        }
    )
    return response.data
}