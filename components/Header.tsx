import React from 'react'
import Image from 'next/image'
import { BeakerIcon } from '@heroicons/react/outline'
import { StarIcon, HomeIcon, ChevronDownIcon } from '@heroicons/react/solid'
import Home from '../pages'

type Props = {}

function Header({}: Props) {
  return (
    <div>
        <div className='relative h-10 w-20 flex-shrink-0 cursor-pointer'>
            <Image objectFit="contain"
            src="https://www.google.com/url?sa=i&url=https%3A%2F%2F1000logos.net%2Freddit-logo%2F&psig=AOvVaw3aE5dVQ9VmayIZ3aWEy7cz&ust=1668200895212000&source=images&cd=vfe&ved=0CA8QjRxqFwoTCMDA7uHCpPsCFQAAAAAdAAAAABAD" alt="reddit" layout="fill"
        />
        </div>

        <div>
        <HomeIcon />
        <p>Home</p>
        <ChevronDownIcon />
        </div>
    </div>
  )
}

export default Header