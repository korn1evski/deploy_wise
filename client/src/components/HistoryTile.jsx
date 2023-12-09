import React from 'react'
import { MdDeleteOutline } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { useDispatch } from "react-redux";
import { deleteVideo } from '../features/historySlice';
import { useNavigate } from 'react-router-dom';

const HistoryTile = ({name, videoId}) => {
    function truncateText(text) {
        if (text.length > 27) {
            return text.substring(0, 27) + '...';
        } else {
            return text;
        }
    }
    const dispatch = useDispatch();
    const navigate = useNavigate();
  return (
    <div className="rounded-[8px] w-[95%] flex justify-between bg-opacity-20 bg-[#000] px-[4px] py-[8px] items-center cursor-pointer">
    <h3 className="text-[#fff] text-[14px]" onClick={() => {
        navigate(`/results/${videoId}`);
    }}>{truncateText(name)}</h3>
    <div className='flex'>
    <CiEdit color="white" className='mr-2'/>
    <MdDeleteOutline color="white" onClick={() => {
        dispatch(deleteVideo(videoId));
    }}/>
    </div>
  </div>
  )
}

export default HistoryTile
