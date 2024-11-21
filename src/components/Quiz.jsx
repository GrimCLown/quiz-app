import React from 'react'

const Quiz = () => {
  return (
    <div className='flex flex-col w-full md:w-1/2 justify-center items-center gap-2'>        
        <a href="/quiz" className='bg-[#403D39] text-white px-4 py-2 rounded w-1/2 md:h-[50px] flex justify-center items-center '>Play</a>
        <a href="/leaderboard" className='bg-[#FFFCF2] text-[#403D39] px-4 py-2 border border-[#EB5E28] rounded w-1/2 md:h-[50px] flex justify-center items-center'>High Scores</a>
    </div>
  )
}

export default Quiz