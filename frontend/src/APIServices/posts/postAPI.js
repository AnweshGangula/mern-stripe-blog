import axios from 'axios'

const BASE_URL = 'http://localhost:5000/api/v1/posts';

export const createPostAPI = async (postData) => {
    // console.log({postData})
    const response = await axios.post(BASE_URL + '/create', postData);

    return response.data;
};

export const fetchAllPosts = async()=>{
    const response = await axios.get(BASE_URL + '');

    return response.data;
}

export const fetchPostById = async(postId)=>{
    const postById = await axios.get(BASE_URL + '/' + postId);

    return postById.data;
}

export const deletePostById = async(postId)=>{
    const postById = await axios.delete(BASE_URL + '/' + postId);

    return postById.data;
}

export const updatePostById = async (postData) => {
    // console.log({postData})
    const response = await axios.put(BASE_URL + '/' + postData.postId, postData);

    return response.data;
};
