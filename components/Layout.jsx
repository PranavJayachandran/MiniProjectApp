import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native"
export const Layout = ({ grid, setGrid }) => {

    const handleSelect = (r, c) => {
        let value = grid[r][c];
        if (value)
        //When a selected box is deselected no box towards it left or down should be selected. And the purpose of clikcing is to deselect bpxes towards its left and top, hence clearing all the boxes. 
        {
            const tempGrid = grid.map((row,) => (
                row.map((col) => (
                    false
                ))
            ))
            tempGrid[r][c] = !value;

            setGrid(tempGrid);
        }
        else {
            const tempGrid = grid.map((row, rowIndex) => (
                row.map((col, colIndex) => (
                    colIndex <= c && rowIndex <= r ? !value : col
                ))
            ))
            tempGrid[r][c] = !value;

            setGrid(tempGrid);
        }
    }
    return (
        <View className="bg-[#E3F6E5] pb-4 pt-2 rounded-xl mt-2">
            {grid.map((row, rowIndex) => (
                <View className="flex gap-2 flex-row justify-center mt-[1px]">
                    {
                        row.map((item, index) => (
                            <TouchableOpacity onPress={() => handleSelect(rowIndex, index)} style={{ width: "10%" }} className={`h-7 rounded-sm border border-[#649468] ${item ? 'bg-[#649468]' : ''}`}>
                            </TouchableOpacity>
                        ))
                    }
                </View>
            )
            )}
        </View >
    )
}
