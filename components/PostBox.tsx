import React, { useState } from 'react'
import { useSession } from 'next-auth/react'
import Avatar from './Avatar';
import { LinkIcon, PhotographIcon } from '@heroicons/react/outline'
import { useForm } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import { ADD_POST, ADD_SUBREDDIT } from '../graphql/mutations';
import client from '../apollo-client';
import { GET_SUBREDDIT_BY_TOPIC } from '../graphql/queries';

type FormData = { // type for form data 
    postTitle: string;
    postBody: string;
    postImage: string;
    subreddit: string;
}

function PostBox() {
    const { data: session } = useSession(); // Get the user session
    const [addPost] = useMutation(ADD_POST); // Add post mutation
    const [addSubreddit] = useMutation(ADD_SUBREDDIT); // Add subreddit mutation

    const [ imageBoxOpen, setImageBoxOpen ] = useState<boolean>(false); // State for the image box
    const { register, setValue, handleSubmit, watch, formState: { errors } } = useForm<FormData>(); // React hook form

    const onSubmit = handleSubmit(async (formData) => { // On form submit
        console.log(formData);  // Log the form data

        try {
            const { 
                data: { getSubredditListByTopic }, 
                } = await client.query({
                query: GET_SUBREDDIT_BY_TOPIC,
                variables: {
                    topic: formData.subreddit,
                },
            })

            const subredditExists = getSubredditListByTopic.length > 0; // Check if the subreddit exists

            if (!subredditExists) {
               const { data: { insertSubreddit: newSubreddit } } = await addSubreddit({ // Add the subreddit if it doesn't exist
                    variables: {
                        topic: formData.subreddit,
                    },
                })

                console.log('Creating the post', formData);
                const image = formData.postImage || '';

                const { data: {insertPost: newPost},
             } = await addPost({ // Add the post
                    variables: {
                        title: formData.postTitle,
                        body: formData.postBody,
                        image: image,
                        subredditId: newSubreddit.id,
                        username: session?.user?.name,
                    },
                })

            } else {
                //use the existing subreddit
                const image = formData.postImage || '';

               const {data: {insertPost: newPost }} = await addPost({ // Add the post
                    variables: {
                        title: formData.postTitle,
                        body: formData.postBody,
                        image: image,
                        subredditId: getSubredditListByTopic[0].id,
                        username: session?.user?.name,
                    },
                })
            }

            setValue('postTitle', ''); // Reset the form
            setValue('postBody', '');
            setValue('postImage', '');
            setValue('subreddit', '');
            
        } catch (error) {
            console.log(error);
        }
    })

  return (
    <form onSubmit={onSubmit} className='sticky top-16 z-50 bg-white border rounded-md p-2 border-gray-300'> 
        <div className='flex items-center space-x-3'>
            {/* Avatar */}
            <Avatar />
            <input
                {...register('postTitle', { required: true })} // Register the input with react hook form and set it as required
                disabled={!session} 
                className='flex-1 bg-gray-50 p-2 pl-5 outline-none rounded-md' 
                type="text" 
                placeholder={session ? 'Create a Post' : 'Sign in'}
            />

        <PhotographIcon onClick={() => setImageBoxOpen(!imageBoxOpen)} className={`h-6 text-gray-300 cursor-pointer
         ${imageBoxOpen && 'text-blue-300'}`}/> {/* Image icon */}
        <LinkIcon className='h-6 text-gray-300'/> {}

        </div>

        {!!watch ('postTitle') && ( // If the post title is not empty, show the image box
            <div className='flex flex-col py-2'>
                <div className='flex items-center px-2'>
                    <p className='min-w-[90px]'>Body:</p>
                    <input
                    className='flex-1 m-2 bg-blue-50 p-2 outline-none'
                        {...register('postBody')} // React hook form
                     type="text" placeholder='Text (Optional)'
                     />
                </div>

                <div className='flex items-center px-2'> {/* Image box */}
                    <p className='min-w-[90px]'>Subreddit:</p>
                    <input
                    className='flex-1 bg-blue-50 p-2 outline-none'
                        {...register('subreddit' , { required: true })}
                     type="text" placeholder='i.e. ReactJS'
                     />
                </div>
                {imageBoxOpen && (
                      <div className='flex items-center px-2'>
                      <p className='min-w-[90px]'>Image URL:</p>
                      <input
                      className='flex-1 bg-blue-50 p-2 outline-none'
                          {...register('postImage')}
                       type="text" placeholder='Image URL (Optional)'
                       />
                  </div>
            )}
            {/* Errors */}
            {Object.keys(errors).length > 0 && ( // If there are errors in the form display them here
                <div className='space-y-2 p-2 text-red-500'>
                    {errors.postTitle?.type === 'required' && (
                        <p>Title is required</p>
                    )}
                    {errors.subreddit?.type === 'required' && ( // If the subreddit is required and the user didn't enter it display an error
                        <p className='text-red-500'>Subreddit is required</p>
                    )}
                </div>
            )}

                    {!!watch('postTitle') && ( // If the user has typed something in the title field display the submit button
                        <button 
                        type='submit' className='w-full rounded-full bg-blue-400 p-2 text-white'>
                            Create Post
                        </button>
                    )}
                </div>
            )}
    </form>
  )
}

export default PostBox