import React, { useState , useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { addToPastes, updateToPastes } from '../redux/pasteSlice';  


const Home = () => {
  const [title,setTitle] = useState('');
  const [value,setValue] = useState("");
  const [searchParams,setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId")
  const dispatch = useDispatch();
  const allpastes= useSelector((state)=> state.paste.pastes)
  
    useEffect(() => {
      if(pasteId){
        const paste=allpastes.find((p)=>p._id === pasteId);
        setTitle(paste.title);
        setValue(paste.content);
      }
    }, [pasteId])

  function createPaste(){
    const paste={
      title: title,
      content : value,
      _id: pasteId || Date.now().toString(36),
      createdAt:new Date().toISOString
      (),
    }
    if(pasteId){
      //update
      dispatch(updateToPastes(paste));
    }
    else{
      //create
      dispatch(addToPastes(paste))
    }

    //after creation and updation 
    setTitle('');
    setValue('');
    setSearchParams({});

  }
  return (
    <div className="p-4">
  {/* Top Row: Input + Button */}
  <div className="flex flex-row items-center justify-between gap-4">
    <input
      type="text"
      placeholder="Enter Title here"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      className="rounded-full w-[693px] h-[45px] pl-6 bg-white-700 bg-opacity-35 text-white text-lg outline-none"
    />

    <button
      className="rounded-full h-[45px] px-6 bg-[#3568D4] text-white font-semibold text-lg"
      onClick={createPaste}
    >
      {pasteId ? "Update My Paste" : "Create My Paste"}
    </button>
  </div>

  {/* Textarea Below */}
  <div className="mt-6">
    <textarea
      value={value}
      placeholder="Enter content here"
      onChange={(e) => setValue(e.target.value)}
      rows={12}
      className="rounded-xl w-full min-h-[400px] p-6 bg-white-700 bg-opacity-35 text-white text-lg outline-none resize-none"
    ></textarea>
  </div>
</div>


    
  )
}

export default Home