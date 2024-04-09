import axios from 'axios'
import { BASE_URL } from '../../utils/baseEndpoint'

const POSTS_BASE_URL = BASE_URL + '/posts';

export const createPostAPI = async (postData) => {
    // console.log({postData})
    const response = await axios.post(POSTS_BASE_URL + '/create', postData);

    return response.data;
};

export const fetchAllPosts = async()=>{
    const response = await axios.get(POSTS_BASE_URL + '');

    return response.data;
}

export const fetchPostById = async(postId)=>{
    const postById = await axios.get(POSTS_BASE_URL + '/' + postId);

    return postById.data;
}

export const deletePostById = async(postId)=>{
    const postById = await axios.delete(POSTS_BASE_URL + '/' + postId);

    return postById.data;
}

export const updatePostById = async (postData) => {
    // console.log({postData})
    const response = await axios.put(POSTS_BASE_URL + '/' + postData.postId, postData);

    return response.data;
};
