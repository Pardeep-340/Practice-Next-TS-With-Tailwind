import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div className='relative h-screen'>
      <div className='absolute top-1/2 start-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-4'>
        <Link href="/todo" className='bg-gray-500 px-5 py-2 rounded-lg inline-block '>Todo</Link>
        <Link href="/select" className='bg-gray-500 px-5 py-2 rounded-lg inline-block'>Select</Link>
      </div>
    </div>
  )
}

export default page