import React from 'react'
import Image from 'next/image'
import { BellIcon, ChatIcon, GlobeIcon, PlusIcon, SparklesIcon, SpeakerphoneIcon, VideoCameraIcon, } from '@heroicons/react/outline'
import { MenuIcon, HomeIcon, ChevronDownIcon, SearchIcon } from '@heroicons/react/solid'
import Home from '../pages'
import { signIn, useSession, signOut } from 'next-auth/react'

type Props = {}

function Header({}: Props) {
      const { data: session } = useSession();
  return (
    <div className='flex sticky top-0 z-50 bg-white px-2 py-2 shadow-sm'>
        <div className='relative h-10 w-20 flex-shrink-0 cursor-pointer'>
            <Image objectFit="contain"
            src="https://www.google.com/url?sa=i&url=https%3A%2F%2F1000logos.net%2Freddit-logo%2F&psig=AOvVaw3aE5dVQ9VmayIZ3aWEy7cz&ust=1668200895212000&source=images&cd=vfe&ved=0CA8QjRxqFwoTCMDA7uHCpPsCFQAAAAAdAAAAABAD" alt="reddit" layout="fill"
        />
        </div>

        <div className="flex items-center mx-7 xl:min-[300px]">
        <HomeIcon className='h-5 w-5'/>
        <p className='flex-1 ml-2 hidden lg:inline'>Home</p>
        <ChevronDownIcon className='h-5 w-5'/>
        </div>

    <form className='flex flex-1 items-center space-x-2 rounded-sm border border-gray-200 bg-gray-100 px-3 py-1'>
      <SearchIcon className='h-6 w-6 text-gray-400' />
        <input className='flex-1 bg-transparent outline-none' type="text" placeholder="Search Reddit" />
        <button type='submit' hidden />
    </form>
    <div className='flex text-gray-500 space-x-2 items-center mx-5 hidden: lg:inline-flex'>
      <SparklesIcon className='icon' />
      <GlobeIcon className='icon'/>
      <VideoCameraIcon className='icon'/>
      <hr className='h-10 border border-gray-100'/>
      <ChatIcon className='icon'/>
      <BellIcon className='icon'/>
      <PlusIcon className='icon'/>
      <SpeakerphoneIcon className='icon'/>
    </div>
     <div className='ml-5 flex items-center lg:hidden'>
      <MenuIcon className='icon'/>
     </div>

      {session ? (
        <div onClick={() => signOut()} className='hidden lg:flex cursor-pointer items-center space-x-2 border border-gray-100'>
        <div className="relative h-5 w-5 flex-shrink-0">
        <Image objectFit='contain' src="https://links.papareact.com/23l" layout='fill' alt="sign in"/>
          </div>
        
          <div className='flex-1 text-xs'>
            <p className='truncate'>{session?.user?.name}</p>
            <p className='text-gray-400'>1 Karma</p>
          </div>
        
        <ChevronDownIcon className='h-5 flex-shrink-0 text-gray-400'/>

        </div>  
        ): (
          <div onClick={() => signIn()} className='hidden lg:flex cursor-pointer items-center space-x-2 border border-gray-100'>
        <div className="relative h-5 w-5 flex-shrink-0">
        <Image objectFit='contain' src="https://links.papareact.com/23l" layout='fill' alt="sign in"/>
          </div>
          <p className='text-gray-400'>Sign In</p>
        </div>  
        )}
    </div>
  )
}

export default Header
