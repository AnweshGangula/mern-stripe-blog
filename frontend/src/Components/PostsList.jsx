import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { fetchAllPosts } from '../APIServices/posts/postAPI'
import { Link } from 'react-router-dom'

const PostsList = () => {

    const {isError, isLoading, isSuccess, data, error} = useQuery({
        queryKey: ['list-posts'],
        queryFn: fetchAllPosts
    })

    console.log({data})

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
                </div>
            )
        })}
    </div>
  )
}

export default PostsList