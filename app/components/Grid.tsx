'use client'

import React from "react"
import {useState, useEffect} from "react";


import Cell from "./Cell"
import Controls from "./Controls";


const generateGrid = (row : number, col : number) => {
    row += 2
    col += 2
    const newGrid : string[] = [] //let
    for (let i = 0; i < row; i++) {
        for (let j = 0; j < col; j++) {
            if (i == 0 || i == row - 1 || j == 0 || j == col - 1) newGrid.push("#")
            else newGrid.push("X")
        }
        //newGrid += "\n"
    }
    //console.log(newGrid)
    return newGrid
}

const getAliveNeighbours = (grid : string[], cols : number, index : number) => {
    let count = 0
    const neighboursPos = [-cols-3, -cols-2, -cols-1, -1, 1, cols+1, cols+2, cols+3]

    for (let i = 0; i < neighboursPos.length; i++) {
         if (grid[index + neighboursPos[i]] == "O") count ++
    }
    return count
}

const defaultCellSize = 650 //let
const generateCellSize = (cols: number) => {
    return defaultCellSize / cols
}

function slowDown(ms = 200) {
  const start = performance.now();
  while (performance.now() - start < ms) {
    // Busy-wait loop, blocks rendering
  }
}

let rows = 10
let cols = 10


const Grid = () => {
    
    console.log("---- UPDATED ----")
    
    // const [rows, setRows] = useState(3)
    // const cols = rows
    const [isPaused, setIsPaused] = useState(true)
    
    const [grid, setGrid] = useState(generateGrid(rows,cols))

    useEffect(() => {
        console.log(`paused: ${isPaused}`)
        if (isPaused === true) return
        
        setTimeout(step, 300)
    }, [isPaused, grid]);


    const cellSize : number = generateCellSize(cols)

    const handleCellClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
        const div = e.currentTarget;
        if (div.dataset.value != undefined){
            const value : number = Number(div.dataset.value)
            console.log(value);
            const newGrid = [...grid] //let
            if (grid[value] == "O") {
                newGrid[value] = "X"
                //newGrid[value - cols - 2] = "X"
            }
            else if (grid[value] == "X") newGrid[value] = "O"
            setGrid(newGrid)

            //console.log("alive neighbours:")
            //console.log(getAliveNeighbours(grid, cols, value))
        }
        
        
    }
    
    const step = () => {
        console.log("doing a step")
        const newGrid = [...grid] //let
        for (let i = 0; i < newGrid.length; i++) {
            const neighbours = (getAliveNeighbours(grid, cols, i))
            if (grid[i] == "O") {
                
                if (neighbours < 2 || neighbours > 3) {
                    console.log(i + " dies")
                    newGrid[i] = "X"
                }
            } else if (grid[i] == "X"){
                if (neighbours == 3) {
                    console.log(i + " comes to life")
                    newGrid[i] = "O"
                }
            }
        }
        console.log("step completed")
        setGrid(newGrid)
    }

    const sizeIncrease = () => {
        //cellSize -= 50
        //setRows(rows + 1)
        //setCols(cols + 1)

        rows ++
        cols ++
        setGrid(generateGrid(rows, cols))        
    }

    const sizeDecrease = () => {
        //cellSize += 50 // fix this crap, it changes the size before before decreasing the amount of rows
        if (rows === 1) return
        //setRows(rows - 1)
        //setCols(cols - 1)

        rows --
        cols --
        setGrid(generateGrid(rows, cols))  
    }

    const autoStep = () => {
        step()
        setTimeout(autoStep, 300)
    }

    const cells = grid.map((char, index) => 
        {
            //console.log("updating grid")
            if (char == "O") return <Cell 
                                        state = {true} 
                                        key = {index} 
                                        index = {index}
                                        size = {cellSize}
                                        roundness="lg"
                                        onClick={handleCellClick}
                                    />
            else if (char == "X") return <Cell 
                                        state = {false} 
                                        key = {index} 
                                        index = {index}
                                        size = {cellSize}
                                        roundness="lg"
                                        onClick={handleCellClick}
                                    />
        }
    )
    //slowDown(300)
    return (
        <div className="flex flex-row items-center justify-center mt-5">
            <Controls isPaused={isPaused} onStep={step} onSizeIncrease={sizeIncrease} onSizeDecrease={sizeDecrease} onPause={() => setIsPaused(!isPaused)}/>
            <div className={`grid gap-0 bg-gray-500 p-5`} style={{gridTemplateRows: `repeat(${rows}, 1fr)`, gridTemplateColumns: `repeat(${cols}, 1fr)`
            }}>
                {cells}
             </div>
             
        </div>
        
    )
};

export default Grid;
