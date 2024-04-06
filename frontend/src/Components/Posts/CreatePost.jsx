import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import ReactQuill from 'react-quill'
import "react-quill/dist/quill.snow.css"
import { useMutation } from '@tanstack/react-query'
import { createPostAPI } from '../../APIServices/posts/postAPI'

function CreatePost() {
    //state for wysiwyg
    const [description, setDescription] = useState('')
    // post mutation
    const postMutation = useMutation({
        mutationKey: ['create-post'],
        mutationFn: createPostAPI
    });

    const formik = useFormik({
        // initial data
        initialValues: {
            // title: '',
            description: ''
        },
        // validation
        validationSchema: Yup.object({
            // title: Yup.string().required('Title is required'),
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
            <ReactQuill
                value={formik.values.description}
                onChange={(value) => {
                    setDescription(value);
                    formik.setFieldValue('description', value)
                }}

            />
            {/* display error message */}
            {formik.touched.description && formik.errors.description &&
                <span>
                    {formik.errors.description}
                </span>
            }
            <button type="submit" onClick={formik.handleSubmit}>
                Create Post
            </button>
        </div>
    )
}

export default CreatePost