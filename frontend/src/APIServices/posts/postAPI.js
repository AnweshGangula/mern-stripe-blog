import axios from 'axios'

const BASE_URL = 'http://localhost:5000';

export const createPostAPI = async (postData) => {
    console.log({postData})
    const response = await axios.post(BASE_URL + '/api/v1/posts/create', postData);

    return response.data;
};

export const fetchAllPosts = async()=>{
    const response = await axios.get(BASE_URL + '/api/v1/posts');

    return response.data;
}