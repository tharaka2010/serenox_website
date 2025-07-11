import React from "react";
import { Typed } from "react-typed";
import { Router } from "react-router-dom";

import { useNavigate } from "react-router-dom";

import appview from "../Home/assets/app view.png";
import card_appintro from "../Home/assets/card/5.png";
import card_whywedothis from "../Home/assets/card/3.png";
import card_whatisebsite from "../Home/assets/card/2.png";
import card_appdescription from "../Home/assets/card/4.png";

import bgIcon from "../Home/assets/bg_icon_home.png";

import { WhatWebSit } from "./WhatWebSit";

export const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      
      <div className="w-full py-4 px-1 ">
        <div className="max-w-[1340px] mx-auto grid md:grid-cols-2">
          <p className="text-white uppercase justify-center mt-[50px] font-bold md:text-7xl sm:text-4xl text-3xl">
            Sex education Along with Maternal and Child counseling
          </p>

          <div className="mx-auto grid grid-row-2">
            <div>
              <button className=" text-lg font-sans bg-white w-[220px] rounded-md   my-4 mx-auto px-2 My-1 uppercase font-bold flex justify-self-end ">
                {" "}
                Serenox Mobile App{" "}
              </button>
            </div>

            <img className="w-[450px] mx-auto my- " src={appview} alt="/" />
          </div>
        </div>

        <div className="w-full py-[2rem] px-4 bg-[#af8dff]">
          <div className="max-w-[1340px] mx-auto grid md:grid-cols-4 gap-8 ">
            {/* what is web site--------------------------------------------------------------------------------------------------*/}

            <div className="w-[300px] shadow-2xl flex-col p-4 my-4 rounded-2xl hover:scale-105 bg-[#D9D9D9] bg-opacity-[0.45] duration-300 ">
              <img
                className="w-[350px] mx-auto mt-1 "
                src={card_whatisebsite}
                alt=""
              />
              <div>
                <h2 className="text-3xl font-bold text-center py-5">
                  What is this Website
                </h2>
                <div className=" ml-2 ">
                  <p>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. ..
                  </p>
                </div>
              </div>

              <button
                onClick={() => navigate("/whatwebsite")}
                className="bg-emerald-500 rounded-md text-white font-medium my-4 mx-auto px-2 py-1 hover:scale-105 "
              >
                Lern more
              </button>
            </div>

            {/* way we doing this--------------------------------------------------------------------------------------------------*/}

            <div className="w-[300px] shadow-2xl  flex-col p-4 my-4 rounded-2xl hover:scale-105 bg-[#D9D9D9] bg-opacity-[0.45] duration-300 ">
              <img
                className="w-[350px] mx-auto mt-1 "
                src={card_whywedothis}
                alt=""
              />
              <div>
                <h2 className="text-3xl font-bold text-center py-5">
                  Why do we doing this ?
                </h2>
                <div className=" ml-2 ">
                  <p>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. ..
                  </p>
                </div>
              </div>

              <button
                onClick={() => navigate("/whatwebsite")}
                className="bg-emerald-500 rounded-md text-white font-medium my-4 mx-auto px-2 py-1 hover:scale-105"
              >
                Lern more
              </button>
            </div>

            {/* Abouth apllication--------------------------------------------------------------------------------------------------*/}

            <div className="w-[300px] shadow-2xl flex-col p-4 my-4 rounded-2xl hover:scale-105 bg-[#D9D9D9] bg-opacity-[0.45] duration-300 ">
              <img
                className="w-[350px] mx-auto mt-1 "
                src={card_appintro}
                alt=""
              />
              <div>
                <h2 className="text-3xl font-bold text-center py-5">
                  about Our Mobile Apllication
                </h2>
                <div className=" ml-2 ">
                  <p>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. ..
                  </p>
                </div>
              </div>

              <button
                onClick={() => navigate("/whatwebsite")}
                className="bg-emerald-500 rounded-md text-white font-medium my-4 mx-auto px-2 py-1 hover:scale-105 "
              >
                Lern more
              </button>
            </div>

            {/*app discription--------------------------------------------------------------------------------------------------*/}

            <div className="w-[300px] shadow-2xl flex-col p-4 my-4 rounded-2xl hover:scale-105 bg-[#D9D9D9] bg-opacity-[0.45] duration-300 ">
              <img
                className="w-[350px] mx-auto mt-1 "
                src={card_appdescription}
                alt=""
              />
              <div>
                <h2 className="text-3xl font-bold text-center py-5">
                  About Our Application Content
                </h2>
                <div className=" ml-2 ">
                  <p>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. ..
                  </p>
                </div>
              </div>

              <button
                onClick={() => navigate("/whatwebsite")}
                className="bg-emerald-500 rounded-md text-white font-medium my-4 mx-auto px-2 py-1 hover:scale-105"
              >
                Lern more
              </button>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
};
