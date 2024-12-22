import React from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import background from '../images/background (2).jpg';
import logo from '../images/logo.png';
import { IoNavigateSharp } from "react-icons/io5";

const HomeFinal = () => {

    const navigate = useNavigate();

    const navigateHandler = () => {
        console.log("Printing the value of isLoggedIn in HomeFinal : ",localStorage.getItem("isLoggedIn"));
        const flag = localStorage.getItem("isLoggedIn");
        console.log("Printing the value of isLoggedIn in HomeFinal : ",localStorage.getItem("isLoggedIn"));
        if(flag === "true"){
            navigate("/dashboard");
        }
        else{
            navigate("/login");
        }
    }

  return (
    <div className='hello'>

      <div className=' max-w-[600px]'>
        <img className=' w-[250px]' src={logo} alt="CodeFusion Logo" />
        <div className=' text-[3rem] text-white font-bold mb-[30px] '>Welcome to CodeFusion</div>
        <div className=' text-[1.5rem] font-semibold mb-[40px]'>Run your HTML, CSS, and JavaScript code live!</div>
        <div onClick={navigateHandler} className=' cursor-pointer hover:bg-[#beff00ba] bg-[#beff00]  text-black w-fit mx-auto font-bold px-4 py-2 rounded-md flex items-center gap-2' to="/editor">
            <p>Start Coding</p>
            <IoNavigateSharp className=' text-lg mt-1' />
        </div>
      </div>
    </div>
  );
};

export default HomeFinal;
