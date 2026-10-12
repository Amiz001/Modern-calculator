import { useState } from 'react'

const VARIANT = {
    number: "w-full h-[72px] p-4 rounded-lg text-white bg-[#0F1427] flex justify-center items-center shadow-md border-white/10 border",
    operator: "w-full h-[72px] p-4 rounded-lg text-white bg-[#162137] flex justify-center items-center shadow-2xl border-white/10 border",
    ac: "col-span-2 w-full h-[72px] p-4 rounded-lg text-white bg-gradient-to-b from-[#2B2A38] to-[#1B1D29] flex justify-center items-center shadow-2xl border-white/10 border",
    submit: "col-span-2 w-full h-[72px] p-4 rounded-lg text-white bg-gradient-to-br from-[#763EED] to-[#2661EB] flex justify-center items-center shadow-2xl border-white/10 border"
}

function Button({variant, value, setValue}) {

  return (
  <div className={VARIANT[variant]} onClick={() => {setValue(value, variant)}}>
    <p className="font-bold text-4xl text-white align-left">{value}</p>
  </div>
  )
}

export default Button
