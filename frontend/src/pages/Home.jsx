import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import GridCard from '../components/GridCard';
import ListCard from '../components/ListCard';
import axios from 'axios';
import toast from 'react-hot-toast';
import { MdOutlineCreateNewFolder } from "react-icons/md";
import { IoMdSearch } from "react-icons/io";
import { BiLeftArrowAlt } from "react-icons/bi";
import { MdDarkMode } from "react-icons/md";


const Home = () => {

    const [isGridLayout,setIsGridLayout] = useState(false);
    const [projectTitle,setProjectTitle] = useState("");
    const [data,setData] = useState(null);
    const [isCreateModalShow,setIsCreateModalShow] = useState(false);
    const [searchQuery,setSearchQuery] = useState('');
    const [showFilterData,setShowFilterData] = useState(false);

    const createProject = async() => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/createProject`,{
                userID:localStorage.getItem("userID"),
                title:projectTitle,
            }).catch(function (error) {
                console.log("Printing the error in api function : ",error);
                console.log(error.message);
                toast.error(error.response.data.message);
              });

              console.log("Printing the response",response);

              if(response?.data?.success){
                toast.success("project created successfully");
                setIsCreateModalShow(false);
                setProjectTitle("");
                getProjects();
              }
        } catch (error) {
            console.log("Frontend : There is some error in creating project");
        }
    }

    const getProjects = async() => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/getProjects`,{
                userID:localStorage.getItem("userID"),
            }).catch(function (error) {
                console.log("Printing the error in api function : ",error);
                console.log(error.message);
                toast.error(error.response.data.message);
              });

              console.log("Frontend : Printing the response in getProjects : ",response);

              setData(response?.data?.projects);

        } catch (error) {
            console.log("Frontend : There is some error in fetching all projects ");
        }
    }

    const [userData,setUserData] = useState(null);

    const filteredData = data ? data.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) // Case insensitive filtering
      ) : [];
    
    const clickHandler = () => {

        if(searchQuery === ""){
            return;
        }
        console.log("clickHandler CLicked !!");
        setShowFilterData(true);

        console.log("Printing the searchQuery :  ",searchQuery);
        console.log("Printing the filerData :  ",filteredData);
        setSearchQuery("");
    }

    useEffect(()=>{
        getProjects();
        const data = JSON.parse(localStorage.getItem("userData"));
        console.log("Printing the userData in Home : ",data);
        setUserData(data);
    },[])


  return (
    <div>
        <Navbar isGridLayout = {isGridLayout} setIsGridLayout = {setIsGridLayout}/>
        <div className=' pt-20 flex  items-center justify-between lg:px-[100px] lg:my-[40px]'>

            <h2 className=' text-2xl'> Hi, {userData?.userName} 👋</h2>
            <div className=' flex gap-1 items-center'>
                <div className=' inputBox !w-[350px]'>
                    <input className='search' value={searchQuery} onChange={(event)=>setSearchQuery(event.target.value)} type='text' placeholder='Search Here... !'/>
                </div>

                <button className=' btnBlue rounded-[5px] mb-4 text-[20px] !p-[5px] !px-[10px]' onClick={clickHandler} >
                    <IoMdSearch className=' text-2xl text-white' />
                </button>
            </div>
        </div>

        <div className=' cards flex flex-col'>


            {
                showFilterData ?   <div>
                <button onClick={()=>setShowFilterData(false)} className='back cursor-pointer flex items-center justify-center  gap-2 bg-[#0b3914] px-4 py-2 rounded-md mb-5 w-[120px] ml-28 hover:bg-[#38a04d]'>
                    <BiLeftArrowAlt/>
                    <p>Back</p>
                </button>
                {
                    isGridLayout?
                    <div className=''>
                        {
                            filteredData?.length === 0?<div className=' w-full mx-auto text-center text-3xl font-semibold'>No Project has been created yet</div>:
                            <div className=' grid px-[100px]'>
                                {
                                    filteredData?.map((item,index)=>{
                                        return <GridCard item = {item} key={index} getProjects={getProjects}/>
                                    })
                                }
                            </div>
                        }
                    </div>:
                    <div className=' list px-[100px]'>
                    {
                            filteredData?.length === 0?<div className=' w-full mx-auto text-center text-3xl font-semibold'>No Project has been created yet</div>:
                            <div>
                                {
                                    filteredData?.map((item,index)=>{
                                        return <ListCard item = {item} key={index} getProjects = {getProjects}/>
                                    })
                                }
                            </div>
                        }
                    </div>
                }
            </div> :  <div>
                {
                    isGridLayout?
                    <div className=''>
                        {
                            data?.length === 0?<div className=' w-full mx-auto text-center text-3xl font-semibold'>No Project has been created yet</div>:
                            <div className=' grid px-[100px]'>
                                {
                                    data?.map((item,index)=>{
                                        return <GridCard item = {item} key={index} getProjects={getProjects}/>
                                    })
                                }
                            </div>
                        }
                    </div>:
                    <div className=' list px-[100px]'>
                    {
                            data?.length === 0?<div className=' w-full mx-auto text-center text-3xl font-semibold'>No Project has been created yet</div>:
                            <div>
                                {
                                    data?.map((item,index)=>{
                                        return <ListCard item = {item} key={index} getProjects = {getProjects}/>
                                    })
                                }
                            </div>
                        }
                    </div>
                }
            </div>
            }
          
           

            <div className=' w-screen h-screen mx-auto flex justify-end relative'>
                <button onClick={()=>setIsCreateModalShow(true)}
                 className=' create fixed bottom-16 right-24 w-fit mt-5 bg-[#0d2159] hover:bg-[#3754b8] px-4 py-2 rounded-md mb-2 flex gap-3 items-center'>
                    <p className=' font-semibold'>Create New Project</p>
                    <MdOutlineCreateNewFolder className=' text-3xl'/>
                </button>
            </div>


        </div>

        

       {
        isCreateModalShow && (
            <div className=' createModalBody fixed left-0 top-0 w-screen h-screen right-0 bottom-0 bg-[rgba(0,0,0,0.1)] flex justify-center items-center'>

            <div className=' createModal bg-[#141414] w-[25vw] h-[27vh] shadow-lg shadow-black/50 rounded-[10px] p-[10px] '>

                <h3 className=' text-2xl'>Create New Project</h3>

                <div className='inputBox createModalInput  !bg-[#202020] mt-4 '>
                    <input type=' text' placeholder='Project Title' value={projectTitle} onChange={(e)=>setProjectTitle(e.target.value)}/>
                </div>

                <div className=' flex items-center gap-[10px] w-full mt-2'>
                    <button onClick={createProject} className=' btnBlue rounded-[5px] mb-4 w-[49%] !py-[10px] !px-[10px] '>Create</button>
                    <button className='  bg-[#1A1919] hover:!bg-[#a9a2a2] rounded-[5px] mb-4 w-[49%] !py-[10px] !px-[10px] ' onClick={()=> setIsCreateModalShow(false)}>Cancel</button>
                </div>
            </div>

            </div>
            )
        }


    </div>
  )
}

export default Home