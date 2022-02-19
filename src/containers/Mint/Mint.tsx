import React, { useState } from 'react'
import { StyledButton } from '../StyledButton'
import { useAHMC } from '../../hooks/useAHMC'
import styles from './style.module.scss'
import { MenuItem, Select, SelectProps, Typography, Theme, makeStyles } from "@material-ui/core"

const useStyles = makeStyles<Theme>(t => ({
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
}),
{ name: "MintStyles" }
)

type Props = {
    soldOut?: boolean
}
export const Mint: React.FC<Props> = ({ soldOut }) => {
    const classes = useStyles()
    const { makeMint } = useAHMC()

    const [value, setValue] = useState('1')

    const handleMint = () => {
        makeMint && makeMint(parseInt(value))
    }
    const handleChangeValue:SelectProps['onChange'] = (e) => {
        setValue(e.target.value as string)
    }


    return (
        <div className={styles.container}>
            <div className={soldOut ? styles.sold_out : styles.actions}>
                {soldOut ?
                    <div className={styles.sold_out}>
                        <Typography variant="h4" style={{ textTransform: "uppercase" }} align="center">Sold out!!!</Typography>
                    </div>
                    :
                    <>
                        <div className={styles.action_select}>
                            <Select
                                color="primary"
                                variant="outlined"
                                value={value}
                                onChange={handleChangeValue}
                                className={classes.select}
                                fullWidth
                            >
                                {Array.from(Array(11).keys()).map((i => {
                                    return <MenuItem className={classes.menu} key={i} value={(i + 1).toString()}>{i + 1}</MenuItem>
                                }))}
                            </Select>
                        </div>
                        <div className={styles.action_item}>
                            <StyledButton
                                variant="contained"
                                onClick={handleMint}
                                style={{ marginLeft: "1rem", width: 100, height: "100%" }}
                            >
                                {Mint}
                            </StyledButton>
                        </div>
                    </>
                }
            </div>
            {!soldOut && <div>
                <Typography variant="h6" align="center">Enjoy our hauntingly LOW GAS PRICES</Typography>
            </div>}
        </div>
    )
}
