import React, { useEffect, useRef, useState } from 'react'
import logo from "../images/logo.png"
import { Link, matchPath, useLocation, useNavigate } from 'react-router-dom'
import Avatar from 'react-avatar';
import { MdLightMode } from "react-icons/md";
import { BsFillGridFill } from "react-icons/bs";
import { toggleClass } from '../helper';
import toast from 'react-hot-toast';
import axios from 'axios';
import { MdOutlineLightMode } from "react-icons/md";
import { MdDarkMode } from "react-icons/md";

const Navbar = ({isGridLayout,setIsGridLayout}) => {

    const location = useLocation();
    const dropdownRef = useRef(null);
    const [userData,setUserData] = useState(null);
    const navigate = useNavigate("/");
    const [isOpen,setIsOpen] = useState(false);
    const [isLightMode,setIsLightMode] = useState(false);

    const getUserDetails = async() => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/getUserDetails`,{
                userID:localStorage.getItem("userID"),
            }).catch(function (error) {
                console.log("Printing the error in api function : ",error);
                console.log(error.message);
                toast.error(error.response.data.message);
              });

              console.log("Printing the response in getUserDetails in navbar",response);

              setUserData(response?.data?.data);
              localStorage.setItem("userData",JSON.stringify(response?.data?.data));

        } catch (error) {
            console.log("Frontend : There is some error in fetching all projects ");
        }
    }

    const toggleHandler = () => {
        console.log("Printing the value of isOpen [before] : ",isOpen);
        setIsOpen(!isOpen);
        console.log("Printing the value of isOpen [after] : ",isOpen);
    }

    useEffect(()=>{
        getUserDetails();
        console.log("Printing the location.pathname : ",location.pathname);
    },[])

    const logout = () => {
        localStorage.removeItem("userId");
        localStorage.removeItem("token");
        localStorage.setItem("isLoggedIn",false);
        setUserData(null);
        navigate("/");
     }

    const layoutHandler = () => {
        console.log("Layout handler clicked ");
        setIsGridLayout((prev) => !prev);
    }

    const pathMatching = (path) =>{
        return matchPath({path: path },location.pathname);
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
          if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false); // Close dropdown when clicking outside
          }
        };
    
        // Add event listener when the dropdown is open
        if (isOpen) {
          document.addEventListener('mousedown', handleClickOutside);
        } else {
          // Clean up event listener if the dropdown is closed
          document.removeEventListener('mousedown', handleClickOutside);
        }
    
        return () => {
          // Cleanup listener on component unmount
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }, [isOpen]);

      const lightModeHandler = () => {
        if(isLightMode){
          // document.querySelector(".EditorNavbar").style.background = "#f4f4f4"
          document.body.classList.remove("lightMode");
          setIsLightMode(false);
          // document.body
        }
        else{
          document.body.classList.add("lightMode");
          setIsLightMode(true);
        }
      }
    
  return (
    <>
        <div className=' fixed top-0 w-full navbar flex items-center justify-between lg:px-[100px] lg:h-[80px] bg-[#141414]'>

            <div className=' logo'>
                <Link to={"/"}>
                    <img className=' lg:w-[150px] cursor-pointer' src={logo} alt='Image logo'/>
                </Link>
            </div>

            <div className='links flex items-center gap-5'>
                <Link to={localStorage.getItem("isLoggedIn") === "true" ? "/dashboard":"/"} className={`hover:underline ${pathMatching("/dashboard") && " text-yellow-500 underline"}`}>Home</Link>
                <Link className={`hover:underline ${pathMatching("/about") && " text-yellow-500 underline"}`} to="/about">About</Link>
                <Link to="/service" className={`hover:underline ${pathMatching("/service") && " text-yellow-500 underline"}`}>Services</Link>
                {
                    localStorage.getItem("isLoggedIn") &&
                    <button onClick={logout} className='btnBlue !bg-red-500 min-w-[120px] ml-2 hover:!bg-red-600'>Logout</button>
                }
                <Avatar name={(userData?.name)?userData?.name : ""} size="40" round = "50%" className=' cursor-pointer ml-2'
                onClick={toggleHandler} />
            </div>

            {isOpen && <div ref={dropdownRef}  className='dropDown absolute right-[60px] top-[83px] shadow-lg shadow-black/50 bg-[#1A1919] w-[150px] h-[160px] p-[10px] '>
                
                <div className=' py-[10px] border-b-[1px] border-b-[#fff]'>
                    <h3 className=' text-[17px]' style={{lineHeight:1}}>{userData?.name}</h3>
                </div>

                <div className=' flex items-center gap-2 mt-3 mb-2 cursor-pointer' onClick={lightModeHandler}>
                    {isLightMode?<MdDarkMode/>:<MdLightMode className=' text-[20px]'/>}
                    <p>{isLightMode? "Dark ":"Light "} Mode</p>
                </div>

                <div onClick={layoutHandler} className=' flex items-center gap-2 mt-3 mb-2 cursor-pointer'>
                    <BsFillGridFill className=' text-[20px]'/>
                    <p>{isGridLayout ? "List Layout":"Grid Layout"}</p>
                </div>
            </div>}

        </div>
    </>
  )
}

export default Navbar