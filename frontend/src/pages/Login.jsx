import React, { useState } from 'react'
import logo from "../images/logo.png"
import { Link, useNavigate } from 'react-router-dom';
import image from "../images/authPageSide.png"
import axios from 'axios';
import toast from 'react-hot-toast';
import img1 from "../images/bg.jpg"

const Login = () => {

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const navigate = useNavigate();

    const onSubmitHandler = async(e) =>{
        e.preventDefault();

        const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/login`,{
            email:email,
            password:password,
        }).catch(function (error) {
            console.log("Printing the error in api function : ",error);
            console.log(error.message);
            toast.error(error.response.data.message);
          });

          console.log("printing the response : ",response);
        if(response?.data?.success){
            toast.success("User logged in successfully");
            localStorage.setItem("token", response?.data?.token);
            localStorage.setItem("isLoggedIn", true);
            localStorage.setItem("userID", response?.data?.userID);
            navigate("/dashboard");
        }
    }

  return (
    <div className=' container bg-[] w-screen min-h-screen flex items-center justify-between lg:pl-[100px] '>

        <div className=' left w-[35%]'>
            <img src={logo} className=' lg:w-[200px]' alt='Image logo'/>
            <form className=' w-full mt-16' action='' onSubmit={onSubmitHandler}>

                <div className='inputBox'>
                    <input required onChange={(e)=>setEmail(e.target.value)} value={email} type='email' placeholder='Email'/>
                </div>

                <div className='inputBox'>
                    <input required onChange={(e)=>setPassword(e.target.value)} value={password} type='password' placeholder='Password'/>
                </div>

                <p className=' text-[gray]'>Don't have an account ? <Link to="/signup" className=' text-[#00AEEF] hover:underline'>Sign Up</Link></p>

                <button className='btnBlue w-full mt-5'>Login</button>

            </form>
        </div>

        <div className=' right w-[55%]'>

            <img className=' h-[90%] w-full object-cover' src={image}/>

        </div>

    </div>
  )
}

export default Login