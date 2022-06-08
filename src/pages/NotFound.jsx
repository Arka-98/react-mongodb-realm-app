import React from 'react'
import { Link } from 'react-router-dom'

function NotFound() {
    return (
        <div className='flex flex-col gap-6 h-96 items-center justify-center overflow-hidden'>
            <div className='text-6xl text-slate-500 font-bold'>
                <p className='text-slate-700'>Oops!</p> 404 Not Found
            </div>
            <Link to='/profile' className="text-violet-500 font-bold pb-0.5 border-b-2 hover:border-b-violet-600">
                Back to home
            </Link>
        </div>
    )
}

export default NotFound