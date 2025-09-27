import React from "react"

import { FaPlus, FaMinus, FaStepForward, FaStepBackward, FaPause, FaPlay } from "react-icons/fa";

interface ControlsProps {
    isPaused?: boolean
    onStep?(): any;
    onPause?(): any;
    onSizeIncrease?(): any;
    onSizeDecrease?(): any;
}

const buttonStyle : string = "bg-gray-600 text-3xl text-white flex justify-center items-center w-15 h-15 my-2 mx-5 rounded-xl cursor-pointer hover:bg-gray-500"

const Controls: React.FC<ControlsProps> = ({isPaused, onStep, onSizeIncrease, onSizeDecrease, onPause}) => {
  return (
    <div className="flex flex-col">
      <button className={buttonStyle} onClick={onPause}>
        {isPaused == false ? <FaPause /> : <FaPlay/>}
      </button>
      <button className={buttonStyle} onClick={onStep}>
        <FaStepForward />
      </button>
      <button className={buttonStyle} onClick={onSizeIncrease}>
          <FaPlus />
      </button>
      <button className="bg-gray-600 text-3xl text-white flex justify-center items-center w-15 h-15 my-2 mx-5 rounded-xl cursor-pointer hover:bg-gray-500" onClick={onSizeDecrease}>
          <FaMinus />
      </button>
      
    </div>
    
    
    
  )
};

export default Controls;
