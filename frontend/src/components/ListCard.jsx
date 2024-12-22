import React, { useEffect, useRef, useState } from 'react'
import code from "../images/code.png"
import deleteImg from "../images/delete.png"
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ListCard = ({item,getProjects}) => {

  const [showDeleteModal,setShowDeleteModal] = useState(false);
  const navigate = useNavigate();
  useEffect(()=>{
    console.log("Printing the item : ",item);
  },[]);

  const deleteProject = async() => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/deleteProject`,{
            userID:localStorage.getItem("userID"),
            projectID:item._id,
        }).catch(function (error) {
            console.log("Printing the error in api function : ",error);
            console.log(error.message);
            toast.error(error.response.data.message);
          });

          console.log("Printing the response",response);
          setShowDeleteModal(false);
          toast.success("Project deleted successfully");
          getProjects();
          // setData(response?.data?.projects);

    } catch (error) {
        console.log("Frontend : There is some error in fetching all projects ");
    }
  }

  const clickHandler = (event) =>{

    if(event.target !== position.current){
      navigate(`/editor/${item._id}`);
    }
   
  }

  const deleteModalHandler = () =>{
    console.log("Delete button has been clicked !");
    setShowDeleteModal(true);
  }

  const position = useRef();
  return (
    <>
      <div onClick={clickHandler} className=' mb-2 listCard w-full flex items-center justify-between p-[10px] bg-[#141414] cursor-pointer rounded-lg hover:bg-[#202020]'>
        
          <div className=' flex items-center gap-2'>

              <img src={code} className=' w-[80px]' alt='code image'/>

              <div>
                  <h3 className=' text-[20px]'>{item?.title}</h3>
                  <p className=' text-[gray] text-[14px]'>created on {new Date(item.date).toDateString()}</p>
              </div>

          </div>

          <div>
              <img ref={position} className=' w-[30px] mr-4' src={deleteImg} alt='' onClick={deleteModalHandler}/>
          </div>

      </div>

      {
        showDeleteModal && (
          <div className=' model fixed top-0 left-0 w-screen h-screen bg-[rgba(0,0,0,0.1)] flex flex-col justify-center items-center'>
            <div className=' mainModel w-[25vw] h-[25vh] bg-[#141414] rounded-lg p-[20px]'>
              <h3 className=' text-3xl'>Do you want to delete <br/> this project ?</h3>
              <div className=' w-full mt-5 flex items-center gap-2'>
                <button className=' p-[10px] rounded-lg text-white cursor-pointer min-w-[49%] bg-[#ff4343]' onClick={deleteProject}>Delete</button>
                <button className=' p-[10px] rounded-lg text-white cursor-pointer min-w-[49%] bg-[#1A1919]' onClick={() => setShowDeleteModal(false)}>Cancel</button>
              </div>
            </div>
          </div>
        )
      }

    </>
  )
}

export default ListCard