import React, { useEffect, useState } from 'react'
import EditorNavbar from '../components/EditorNavbar'
import Editor from '@monaco-editor/react';
import { MdOutlineLightMode } from "react-icons/md";
import { AiOutlineExpandAlt } from "react-icons/ai";
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import { GrContract } from "react-icons/gr";
import { MdDarkMode } from "react-icons/md";

const Editors = () => {

  const [isLightMode,setIsLightMode] = useState(false);
  const [isExpanded,setIsExpanded] = useState(false);
  const [tab,setTab] = useState("html");
  const {projectID} = useParams();
  const navigate = useNavigate();
  const [fileName,setFileName] = useState("");
  
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

  const expandHandler = () => {
    console.log("expandHandler function called");
    setIsExpanded((prev)=>!prev);
  }

  const [htmlCode,setHtmlCode] = useState("<h1>This is the heading</h1>");
  const [cssCode,setCssCode] = useState("body{color:red;}");
  const [jsCode,setJsCode] = useState("//some comment");

  const run = () => {
    const html = htmlCode;
    const css = `<style>${cssCode}</style>`;
    const js = `<script>${jsCode}</script>`

    const iframe = document.getElementById("ifr");
    iframe.srcdoc = html + css + js;
  }

  useEffect(()=>{
    run();
  },[htmlCode,jsCode,cssCode]);

  const getProject = async() => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/getProject`,{
          userID:localStorage.getItem("userID"),
          projectID:projectID,
      }).catch(function (error) {
          console.log("Printing the error in api function [get Project] : ",error);
        });

        console.log("printing the response : ",response);

        setFileName(response?.data?.project?.title);
        setHtmlCode(response?.data?.project?.htmlCode);
        setCssCode(response?.data?.project?.cssCode);
        setJsCode(response?.data?.project?.jsCode);
      } 
    catch (error) {
      console.log("Frontend : There is some error in getProject");
    }
  }

  useEffect(()=>{
    console.log("Printing the details in editor section");
    getProject();
  },[])

  const saveHandler = async() =>{
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/updateProject`,{
        userID:localStorage.getItem("userID"),
        projectID:projectID,
        htmlCode:htmlCode,
        cssCode:cssCode,
        jsCode:jsCode
    }).catch(function (error) {
        console.log("Printing the error in api function [update Project] : ",error);
      });

      console.log("printing the responsein updateProject : ",response);

      setHtmlCode(response?.data?.project?.htmlCode);
      setCssCode(response?.data?.project?.cssCode);
      setJsCode(response?.data?.project?.jsCode);


      if(response?.data?.success){
        toast.success("Code saved successfully");
      }
    } 
    catch (error) {
      console.log("Frontend : There is some error in updateProject");
    }  
  }

  useEffect(() => {
    const handleKeyDown = async(event) => {
      if (event.ctrlKey && event.key === 's') {
        event.preventDefault(); // Prevent the default save file dialog
  
        saveHandler();
      }
    };
  
    window.addEventListener('keydown', handleKeyDown);
  
    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [projectID, htmlCode, cssCode, jsCode]);


  return (
    <>
        <EditorNavbar htmlCode={htmlCode} cssCode={cssCode} jsCode={jsCode} fileName = {fileName} />

        <div className=' flex'>

            <div className={`left ${isExpanded ? " w-[100%]":" w-[50%]"}`}>
                <div className='tabs flex items-center justify-between w-full gap-2 bg-[#1A1919] h-[50px] px-[40px]'>
                    
                    <div className=' flex items-center gap-2'>
                      <div className='tab p-[6px] bg-[#1E1E1E] px-[10px] text-[15px] cursor-pointer' onClick={() => setTab("html")}>HTML</div>
                      <div className='tab p-[6px] bg-[#1E1E1E] px-[10px] text-[15px] cursor-pointer' onClick={() => setTab("css")}>CSS</div>
                      <div className='tab p-[6px] bg-[#1E1E1E] px-[10px] text-[15px] cursor-pointer' onClick={() => setTab("javascript")}>JavaScript</div>
                    </div>

                    <div className=' flex items-center gap-2'>
                    <button  className=' text-[15px] mr-5 bg-[#00ADEF] px-5 py-2 text-black font-semibold hover:bg-[#8cbdd0]' onClick={saveHandler}>Save</button>
                      <i className=' text-[20px] cursor-pointer' onClick={lightModeHandler}>{isLightMode ? <MdOutlineLightMode/> : <MdDarkMode/>}</i>
                      <i className=' text-[20px] cursor-pointer' onClick={expandHandler}>{isExpanded?<GrContract className=' text-sm'/> : <AiOutlineExpandAlt/>}</i>
                    </div>
                </div>

                {
                  tab == "html"?<Editor onChange={(e)=>{
                    setHtmlCode(e);
                    run();
                  }} height="78vh" language="html" theme={isLightMode ? "light" : "vs-dark"} value={htmlCode} />:
                  tab == "css"?<Editor onChange={(e)=>{
                    setCssCode(e);
                    run();
                  }}   height="78vh" language="css" theme={isLightMode ? "light" : "vs-dark"} value={cssCode} />:
                  <Editor onChange={(e)=>{
                    setJsCode(e);
                    run();
                  }} height="78vh" language="javascript" theme={isLightMode ? "light" : "vs-dark"} value={jsCode} />
                }
                
            </div>


            <iframe id='ifr' className={` ${isExpanded ? " w-[0%]":" w-[50%]"} ${isExpanded ? " hidden":""}  min-h-[78vh] bg-[#fff] text-black`}></iframe>
        </div>
    </>
  )
}

export default Editors