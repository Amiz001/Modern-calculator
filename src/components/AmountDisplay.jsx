import { useState } from 'react'

function AmountDisplay({value, setValue}) {

  return (
  <div className="bg-[#0B0F1B] rounded-xl w-full h-20 flex justify-end items-center px-6">
    <input className="w-full font-bold text-5xl text-right text-white border-none focus:outline-none" value={value} type="number" placeholder="0.00" />
  </div>
  )
}

export default AmountDisplay
