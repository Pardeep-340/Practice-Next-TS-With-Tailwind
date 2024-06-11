import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div className='relative h-screen'>
      <Link href="/todo" className='bg-gray-400 px-5 py-2 rounded-lg inline-block absolute top-1/2 start-1/2 -translate-x-1/2 -translate-y-1/2'>Todo</Link>
    </div>
  )
}

export default page