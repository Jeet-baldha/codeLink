import React from 'react'
import { useSelector } from 'react-redux'

function Profile() {

    const username = useSelector((state) => state.user.userName)

    return (
        <div className=' bg-dark-blue-black text-white min-h-full'>
            <div className=' w-full p-10 flex justify-center'>
                <div>
                    <div className=' flex justify-center py-10'>
                        <h1 className=' text-3xl self-center'>Hello {username}</h1>
                    </div>
                    <div>
                        <h1 className=' text-xl py-2'>Your Recent Work:</h1>
                    </div>
                    <div className=' w-96 flex flex-col gap-2'>
                        <div className=' w-full bg-dark-grayish-blue flex justify-between text-xl p-2'>
                            <h3>Room 1</h3>
                            <h3 className=' text-red-400'>Expried</h3>
                        </div>
                        <div className=' w-full bg-dark-grayish-blue flex justify-between text-xl p-2'>
                            <h3>Room 2</h3>
                            <h3 className=' text-green-400'>Active</h3>
                        </div>
                        <div className=' w-full bg-dark-grayish-blue flex justify-between text-xl p-2'>
                            <h3>Room 3</h3>
                            <h3 className=' text-red-400'>Expried</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile