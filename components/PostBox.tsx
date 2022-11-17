import React from 'react'
import { useSession } from 'next-auth/react'
import Avatar from './Avatar';
import { LinkIcon, PhotographIcon } from '@heroicons/react/outline'
import { useForm } from 'react-hook-form';


type FormData = {
    postTitle: string;
    postBody: string;
    postImage: string;
    subreddit: string;
}

function PostBox({}: Props) {
    const { data: session } = useSession();
    const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>();

  return (
    <form className='sticky top-16 z-50 bg-white border rounded-md p-2 border-gray-300'>
        <div className='flex items-center space-x-3'>
            {/* Avatar */}
            <Avatar />
            <input
                {...register('postTitle', { required: true })}
                disabled={!session} 
                className='flex-1 bg-gray-50 p-2 pl-5 outline-none rounded-md' 
                type="text" 
                placeholder={session ? 'Create a Post' : 'Sign in'}
            />

        <PhotographIcon className={`h-6 text-gray-300 cursor-pointer`}/>
        <LinkIcon className='h-6 text-gray-300'/>

        </div>
    </form>
  )
}

export default PostBox