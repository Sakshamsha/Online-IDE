import React, { useState } from 'react'
import logo from "../images/logo.png"
import { Link, useNavigate } from 'react-router-dom';
import image from "../images/authPageSide.png"
import axios from 'axios';
import toast from 'react-hot-toast';

const SignUp = () => {

    const [userName,setUserName] = useState("");
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const navigate = useNavigate();

    const onSubmitHandler = async(e) =>{
        e.preventDefault();

        const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/signup`,{
            name:name,
            userName:userName,
            email:email,
            password:password,
        }).catch(function (error) {
            console.log(error.message);
            toast.error(error.response.data.message);
          });

        console.log("Printing the response",response);

        if(response?.data?.success){
            toast.success("Account created successfully");
            navigate("/login");
        }
    }

  return (
    <div className=' container bg-[] w-screen min-h-screen flex items-center justify-between lg:pl-[100px] '>

        <div className=' left w-[35%]'>
            <img src={logo} className=' lg:w-[200px]' alt='Image logo'/>
            <form className=' w-full mt-16' action='' onSubmit={onSubmitHandler}>

                <div className='inputBox'>
                    <input required onChange={(e)=>setUserName(e.target.value)} value={userName} type='text' placeholder='Username'/>
                </div>

                <div className='inputBox'>
                    <input required onChange={(e)=>setName(e.target.value)} value={name} type='text' placeholder='Name'/>
                </div>

                <div className='inputBox'>
                    <input required onChange={(e)=>setEmail(e.target.value)} value={email} type='email' placeholder='Email'/>
                </div>

                <div className='inputBox'>
                    <input required onChange={(e)=>setPassword(e.target.value)} value={password} type='password' placeholder='Password'/>
                </div>

                <p className=' text-[gray]'>Already have an account ? <Link to="/login" className=' text-[#00AEEF] hover:underline'>Login</Link></p>

                <button className='btnBlue w-full mt-5'>Sign Up</button>

            </form>
        </div>

        <div className=' right w-[55%]'>

            <img className=' h-[100%] w-full object-cover' src={image}/>

        </div>

    </div>
  )
}

export default SignUp