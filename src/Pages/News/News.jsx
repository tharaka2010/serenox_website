import React from 'react'
import { Navbar } from '../../components/Navbar'
import { Fotbar } from '../../components/Fotbar'
import card_whatisebsite from "../Home/assets/card/2.png";

export const News = () => {
  return (
    <div>
      <Navbar/>
      <div>
      <div className="max-w-[1340px] mx-auto grid md:grid-cols-2">
        <p></p>

          <div className="mx-auto grid " >

            <div>
            <p className="text-white uppercase justify-center mt-[50px] font-bold md:text-5xl sm:text-4xl text-3xl">
            
            News And Artical
          </p>
            </div>

            
            
          </div>
          
        </div>
    </div>

    <div className="w-full py-[2rem] px-4 bg-[#af8dff]">
          <div className="max-w-[1340px] mx-auto grid md:grid-row-4 gap-8 ">
          

            <div className="w-[1300px] h-[300px] shadow-2xl flex-col p-4  rounded-2xl  bg-[#D9D9D9] bg-opacity-[0.45] duration-300 md:grid-row-4">
              
              


            
            </div>
            <div className="w-[1300px] h-[300px] shadow-2xl flex-col p-2  rounded-2xl  bg-[#D9D9D9] bg-opacity-[0.45] duration-300 md:grid-row-4">
              
              


            
            </div>

            <div className="w-[1300px] h-[300px] shadow-2xl flex-col p-2  rounded-2xl  bg-[#D9D9D9] bg-opacity-[0.45] duration-300 md:grid-row-4">
              
              


            
            </div>
            <div className="w-[1300px] h-[300px] shadow-2xl flex-col p-2  rounded-2xl  bg-[#D9D9D9] bg-opacity-[0.45] duration-300 md:grid-row-4">
              
              


            
            </div>
            


              </div>




    



      </div>
    <Fotbar/>
    </div>
  )
}
