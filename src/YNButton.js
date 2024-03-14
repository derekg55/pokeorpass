import React from 'react'

function YNButton( {onYesClick, onNoClick}) {
  return (
    <div class="flex">
      <button class="w-40 h-20 flex-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl hover:rounded-3xl transition-all duration-300 ease-in-out m-5" onClick={onYesClick}>Smash</button>
      <button class="w-40 h-20 flex-1 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-xl hover:rounded-3xl transition-all duration-300 ease-in-out m-5 " onClick={onNoClick}>Pass</button>
    </div>
  )
}

export default YNButton