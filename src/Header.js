import React from 'react'

function reload() {
  window.location.reload()
}

function Header() {
  return (
    <div class="shadow-lg w-full">
        <div class="md:px-10 py-4 px-7">
            <button class="text-center text-4xl drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] font-bold text-gray-900 dark:text-white" onClick = {reload }>
                Poké or Pass
            </button>
        </div>
    </div>
  )
}

export default Header