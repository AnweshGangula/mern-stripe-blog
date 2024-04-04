import React from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'

import { fetchPostById } from '../../APIServices/posts/postAPI';

const PostDetails = () => {
    const { postId } = useParams();

    const { isError, isLoading, isSuccess, data, error } = useQuery({
        queryKey: ['post-details'],
        queryFn: () => fetchPostById(postId)
    })

    // console.log({ data })

    return (
        <div>
            {/* PostDetails */}
            {data &&
                <>
                    <h2>{data.postFound.title}</h2>
                    <p>{data.postFound.description}</p>
                </>
            }
        </div>
    )
}

export default PostDetails