import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import  { useMutation } from '@tanstack/react-query'
import { createPostAPI } from '../../APIServices/posts/postAPI'

function CreatePost() {
    // post mutation
    const postMutation = useMutation({
        mutationKey: ['create-post'],
        mutationFn: createPostAPI
    });

    const formik = useFormik({
        // initial data
        initialValues: {
            title: '',
            description: ''
        },
        // validation
        validationSchema: Yup.object({
            title: Yup.string().required('Title is required'),
            description: Yup.string().required('Description is required')
        }),
        // submit handler
        onSubmit: (postData) => {
            // console.log({ values });
            postMutation.mutate(postData);
        }
    })

    // console.log('mutation', postMutation)

    const isLoading = postMutation.isPending;
    const isError = postMutation.isError;
    const isSuccess = postMutation.isSuccess;

    const error = postMutation.error;
    const serverErrorMessage = error?.response?.data?.message;
    return (
        <div>
            {isLoading && <p>Loading...</p>}
            {isSuccess && <p>Post Created successfully</p>}
            {isError && <p>{serverErrorMessage}</p>}
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
                    Create Post
                </button>
            </form>
        </div>
    )
}

export default CreatePost