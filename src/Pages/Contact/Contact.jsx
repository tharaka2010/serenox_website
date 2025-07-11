import React from 'react'
import { Navbar } from '../../components/Navbar'
import { Fotbar } from '../../components/Fotbar'

export const Contact = () => {
  return (
    <div>
    <Navbar/>

    <div className="max-w-[1340px] mx-auto grid md:grid-cols-2">
        <p></p>

          <div className="mx-auto grid grid-row-2" >

            <div>
            <p className="text-white uppercase justify-center mt-[50px] font-bold md:text-7xl sm:text-4xl text-3xl">
            
            Contact Us
          </p>
            </div>

            
            
          </div>
          <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
        </div>



        <Fotbar/>



    </div>
  )
}
