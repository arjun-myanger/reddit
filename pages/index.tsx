import Head from 'next/head'
import Image from 'next/image'
import Header from '../components/Header'
import PostBox from '../components/PostBox'

export default function Home() {
  return (
    <div className='max-w-5xl my-7 mx-auto'>
      <Head>
        <title>Reddit</title>
      </Head>

      {/* <Header /> component moved to index.tsx */}
    
      {/* Post box area */}
      <PostBox />
      
    <div className='flex'>{/* Feed */}</div>
     
    </div>
  )
}
