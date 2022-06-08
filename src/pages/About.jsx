import React from 'react'

function About() {
  return (
    <div className='w-4/5 mx-auto my-16'>
        <div className="flex flex-col gap-10">
            <h1 className='text-6xl font-bold text-slate-500'>About <span className='text-slate-700'>Me</span>.</h1>
            <p className='font-semibold'>
                This is an online shopping application (SPA), developed by <span className='font-bold text-slate-600'>Arkadipta Das</span>. It is a React
                Application which uses MongoDB Realm as a Serverless Backend API. It has Real Time Form Validation,
                User Authentication and Authorization. Routing is handled by React Router v6.
            </p>
        </div>
    </div>
  )
}

export default About