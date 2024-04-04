import React from 'react'
import { useParams } from 'react-router-dom'
import { useQuery, useMutation } from '@tanstack/react-query'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import { fetchPostById, updatePostById } from '../../APIServices/posts/postAPI';

const updatePost = () => {
    const { postId } = useParams();

    const { data } = useQuery({
        queryKey: ['post-details'],
        queryFn: () => fetchPostById(postId)
    })

    // post mutation
    const postMutation = useMutation({
        mutationKey: ['update-post'],
        mutationFn: updatePostById
    });

    const formik = useFormik({
        // initial data
        initialValues: {
            title: data?.postFound?.title || "",
            description: data?.postFound?.description || ""
        },
        enableReinitialize: true,
        // validation
        validationSchema: Yup.object({
            title: Yup.string().required('Title is required'),
            description: Yup.string().required('Description is required')
        }),
        // submit handler
        onSubmit: (postData) => {
            // console.log({ values });
            postData.postId = postId;
            postMutation.mutate(postData);
        }
    })

    // console.log('mutation', postMutation)

    const isLoading = postMutation.isPending;
    const isError = postMutation.isError;
    const isSuccess = postMutation.isSuccess;

    const error = postMutation.error;

    // console.log({ data })

    return (
        <div>
            {/* PostDetails */}
            {data &&
                <>
                    <h2>You are editing: {data.postFound.title}</h2>
                    {/* <p>{data.postFound.description}</p> */}

                    <div>
                        {isLoading && <p>Loading...</p>}
                        {isSuccess && <p>Post updated successfully</p>}
                        {isError && <p>{error.message}</p>}
                        <form onSubmit={formik.handleSubmit}>
                            <input type="text" name="title" id="postTitle" placeholder='Enter Post Title'
                                {...formik.getFieldProps('title')}
                            />
                            {/* display error message */}
                            {formik.touched.title && formik.errors.title &&
                                <span>
                                    {formik.errors.title}
                                </span>
                            }
                            <input type="text" name="description" id="postDescription" placeholder='Enter Post Description...'
                                {...formik.getFieldProps('description')}
                            />
                            {/* display error message */}
                            {formik.touched.description && formik.errors.description &&
                                <span>
                                    {formik.errors.description}
                                </span>
                            }
                            <button type="submit">
                                Update Post
                            </button>
                        </form>
                    </div>
                </>
            }
        </div>
    )
}

export default updatePost