import React from 'react'

export const ColumnFilter = ({ column }) => {
    const { filterValue, setFilter } = column
    const onChangeHandle = async(e) => {
        await setFilter(e.target.value);
    } 
    return (
        <span>
            <input value={filterValue || ''} 
            onChange={(event) => onChangeHandle(event)} />
        </span>
    )
}