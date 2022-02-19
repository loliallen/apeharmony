import React, { useState } from 'react'
import { IconButton, TextField } from '@material-ui/core'
import { AiOutlineSearch } from 'react-icons/ai'


type Props = {
    onSearch: (tokenId: string) => void
    disabled?: boolean
}

export const Search = ({ onSearch, disabled }: Props) => {
    const [value, setValue] = useState("")
    return (
        <TextField
            label="Token ID"
            value={value}
            color="secondary"
            onChange={(e) => setValue(e.target.value)}
            disabled={disabled}
            onKeyDown={(e) => {
                if (e.key === "Enter")
                    onSearch(value)
            }}
            InputProps={{
                endAdornment: <IconButton onClick={() => onSearch(value)}>
                    <AiOutlineSearch color="white" />
                </IconButton>,
                style: {
                    color: "white",
                    borderColor: "white",
                }
            }}
            InputLabelProps={{
                style: {
                    color: "white",
                }
            }}
        />
    )
}
