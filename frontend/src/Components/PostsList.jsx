import React from 'react'
import { useQuery, useMutation } from '@tanstack/react-query'

import { deletePostById, fetchAllPosts } from '../APIServices/posts/postAPI'
import { Link } from 'react-router-dom'

const PostsList = () => {

    const {isError, isLoading, isSuccess, data, error, refetch} = useQuery({
        queryKey: ['list-posts'],
        queryFn: fetchAllPosts
    })

    const postMutation = useMutation({
        mutationKey: ['delete-post'],
        mutationFn: deletePostById
    });

    const deleteHandler = async (postId)=>{
        postMutation.mutateAsync(postId)
        .then(()=>{
            refetch();
        })
        .catch(()=>{
            console.error(e)
        });
    }

    // console.log({data})

  return (
    <div>
        {isLoading && <p>Loading...</p>}
        {isError && <p>Unable to fetch all posts: {error.message}</p>}

        {isSuccess && <p>Posts fetched</p>}
        {data?.posts.map(post=>{
            return (
                <div key={post._id} >
                    <h2>{post.title}</h2>
                    <p>{post.description}</p>
                    <Link to={`/posts/${post._id}`}>
                        <button type="button">Edit</button>
                    </Link>
                    <button type="button" onClick={()=>deleteHandler(post._id)}>Delete</button>
                </div>
            )
        })}
    </div>
  )
}

export default PostsList