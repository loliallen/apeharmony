import React, { useState } from 'react'
import { StyledButton } from '../StyledButton'
import { useEtherium } from '../../hooks/useEtherium'
import { MintButton } from './MintButton'
import styles from './style.module.scss'
import { MenuItem, Select, SelectChangeEvent, Typography, Theme } from '@mui/material'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles<Theme>(t=>({
    select: {
        backgroundColor: "hsla(0, 0%, 0%, 0.6)",
        color: "white",
        width: 80,
        height: "100%",
        '& .MuiSvgIcon-root': {
            color: t.palette.common.white
        }
    },
    menu: {
        backgroundColor: "hsla(0, 0%, 0%, 0.6)",
        color: "white"
    },
}))

export const Mint = () => {
    const classes = useStyles()
    const { makeMint } = useEtherium()

    const [value, setValue] = useState('1')

    const handleMint = () => {
        makeMint && makeMint(parseInt(value))
    }
    const handleChangeValue = (e: SelectChangeEvent<string>) => {
        setValue(e.target.value)
    }

    return (
        <div className={styles.container}>
            <div className={styles.actions}>
                <div className={styles.action_select}>
                    <Select
                        size="small"
                        color="primary"
                        variant="outlined"
                        value={value}
                        onChange={handleChangeValue}
                        className={classes.select}
                        fullWidth
                    >
                        {Array.from(Array(11).keys()).map((i => {
                            return <MenuItem className={classes.menu} key={i} value={(i+1).toString()}>{i+1}</MenuItem>
                        }))}
                    </Select>
                    {/* <MintButton value={value} setValue={setValue} rule={{ min: 1, max: 11 }} /> */}
                </div>
                <div className={styles.action_item}>
                    <StyledButton
                        variant="contained"
                        onClick={handleMint}
                        sx={{ marginLeft: "1rem", width: 100, height: "100%"}}
                    >
                        Mint
                    </StyledButton>
                </div>
            </div>
            <div>
                <Typography variant="h6" color="white" align="center">Enjoy our hauntingly LOW GAS PRICES</Typography>
            </div>
        </div>
    )
}
