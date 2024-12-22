import React, { useEffect, useState } from 'react'
import logo from "../images/logo.png"
import { FiDownload } from "react-icons/fi";
import fileDownload from 'js-file-download';
import toast from 'react-hot-toast';
import { FaAngleLeft } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const EditorNavbar = ({htmlCode,jsCode,cssCode,fileName}) => {

  const downloadFile = () => {
    fileDownload(data1,"saksham.html");
    fileDownload(data2,"saksham.css");
    fileDownload(data3,"saksham.js");
    toast.success("File dowloaded successfully");
  }

  const [data1,setData1] = useState(null);
  const [data2,setData2] = useState(null);
  const [data3,setData3] = useState(null);
  const navigate = useNavigate();

  useEffect(()=>{
    setData1(htmlCode);
    setData2(cssCode);
    setData3(jsCode);
  },[htmlCode,jsCode,cssCode])

  return (
    <>
        <div className=' EditorNavbar flex items-center justify-between px-[100px] h-[80px] bg-[#141414]'>

            <div className='logo flex items-center gap-5'>
                <FaAngleLeft className=' text-2xl hover:text-gray-400 cursor-pointer' onClick={()=>navigate(-1)}/>
                <img className=' w-[150px] cursor-pointer' src={logo}/>
            </div>

            <p>File / <span className=' text-[gray]'>{fileName}</span></p>

            <i className=' p-[8px] rounded-[5px] cursor-pointer text-[20px] group relative' >
                
                <FiDownload className=' hover:text-gray-500' onClick={downloadFile}/>
                <span className=' group-hover:block hidden text-[13px] absolute -top-3 -right-10 font-semibold font-sans w-24 bg-white text-black rounded-md px-1' >Download file</span>
            </i>
        </div>
    </>
  )
}

export default EditorNavbar