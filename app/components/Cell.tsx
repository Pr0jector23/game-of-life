'use client'

import React from "react"

interface CellProps {
    index : number;
    state : boolean;
    size : number;
    roundness? : string;
    onClick?: React.MouseEventHandler<HTMLDivElement>;
}


const Cell: React.FC<CellProps>  = ({index, state, size, roundness, onClick}) => {


  return (
    <div data-value = {index} 
        className={(state == true ? `bg-indigo-300 hover:bg-indigo-400` : `bg-gray-600 hover:bg-gray-700`) + ` rounded-lg border border-gray-500 cursor-pointer`}
        style={{
          width: `${size}px`,
          height: `${size}px`,
        }}
        onClick={onClick}
        >
        
    </div>
  )
};

export default Cell;
