import React from "react";
import {
  FaDribbbleSquare,
  FaFacebookSquare,
  FaGithubSquare,
  Falnstagram,
  FaTwitterSquare,
} from "react-icons/fa";

export const Fotbar = () => {
  return (
    <div className=" ">
      <div className="max-w-[1520px] mx-auto  px-4 grid lg:grid-cols-2 gap-8 text-gray-300  bg-gradient-to-r from-purple-start via-purple- to-purple-end ">
        <div>
          <br />
          <h1 className="w-full text-3xl font-bold text-[#ffffff] ">Serenox</h1>

          <p className="py-4">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptates
            maiores similique sapiente optio! Corporis commodi, earum dolor,
            voluptatibus itaque vero perspiciatis similique dicta id hic harum
            fugit consequuntur ut odio?
          </p>

          <div className="flex  md:w[75%] my-6 ">
            <FaFacebookSquare size={30} />
            <FaGithubSquare size={30} />
          </div>
        </div>
      </div>

      <p className="px-2">
        © 2023–2024 Serenox. All rights reserved. Terms of Use Privacy Policy
      </p>
      <div className="border-t-2 border-black my-4 mx-4  px-1"></div>
    </div>
  );
};
