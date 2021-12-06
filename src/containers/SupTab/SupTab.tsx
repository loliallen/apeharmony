import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormControlLabel, FormLabel, MenuItem, Radio, RadioGroup, Select, Theme, Typography, useMediaQuery, useTheme } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React, { useState } from 'react'
import { useAHMC } from '../../hooks/useAHMC'
import { useARTW } from '../../hooks/useARTW'
import { useSUPL } from '../../hooks/useSUPL'
import { useETH } from '../../hooks/useETH'
import { Body } from '../Body'
import { StyledButton } from '../StyledButton'
import { prepareTokens } from './helpers'
import { useAlert } from '../../hooks/useAlert'

const useStyles = makeStyles<Theme>(t => ({
    select: {
        backgroundColor: "hsla(0, 0%, 0%, 0.6)",
        color: "white",
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
export const SupTab = () => {
    const classes = useStyles()
    const eth = useETH()
    const supl = useSUPL()
    const artw = useARTW()
    const ahmc = useAHMC()
    const { openAlert } = useAlert()

    const t = useTheme()
    const sm = useMediaQuery(t.breakpoints.down('sm'))
    const md = useMediaQuery(t.breakpoints.between('sm', 'md'))

    const [count, setCount] = useState(1)
    const [selector, setSelector] = useState<string>("$PPL")

    const [open, setOpen] = useState(false)
    const [from, setFrom] = useState<"wallet" | "token">("token")


    const purcase = async () => {
        if (selector === "$PPL") {
            if (from === "token") {
                const [err, tokens] = prepareTokens([...ahmc.tokens, ...artw.tokens], supl.price.ppl, count)
                if (err)
                    return openAlert && openAlert(err.message, "error")
                await supl.purcase(count, tokens!)
            } else {
                await supl.purcase(count)
            }
        }
    }
    const handlePurcase = async () => {
        setOpen(true)
    }

    const handleSubmit = () => {
        purcase()
    }

    const handleClose = () => setOpen(false)
    return (
        <Box
            minHeight="90vh"
            padding="2rem"
        >
            <Body
                srcs={[
                    '/supladies/1.png',
                    '/supladies/2.png',
                    '/supladies/3.png',
                ]}
            />
            <Box>
                {eth.account && <Box
                    display="flex"
                    justifyContent="center"
                >
                    <Select
                        value={count}
                        onChange={(e) => setCount(e.target.value as number)}
                        color="primary"
                        className={classes.select}
                    >
                        {Array.from(Array(20).keys()).map((i) =>
                            <MenuItem
                                className={classes.menu}
                                key={i}
                                value={i + 1}
                            >{i + 1}</MenuItem>
                        )}
                    </Select>
                    <StyledButton
                        color="primary"
                        onClick={handlePurcase}
                        sx={{
                            borderBottom: "1px solid black",
                            borderTop: "1px solid black",
                        }}
                    >
                        Purchase
                    </StyledButton>
                    <Select
                        value={selector}
                        onChange={(e) => setSelector(e.target.value)}
                        color="primary"
                        className={classes.select}
                    >
                        {["$PPL", "$ETH"].map((i) =>
                            <MenuItem
                                className={classes.menu}
                                key={i}
                                value={i}
                            >{i}</MenuItem>
                        )}
                    </Select>
                </Box>}
                <Box
                    padding="0px 5rem"
                    sx={{
                        [t.breakpoints.down('sm')]: {
                            padding: "0px 2rem"
                        }
                    }}
                >
                    <Typography marginTop="1rem" align="center" paddingBottom="1rem" variant="h5" color="white">Vouchers left {supl.count || "XX"}/{supl.maxCount || "1957"}</Typography>
                    <Typography align="center" paddingBottom="1rem" variant="h6" color="white">Price {supl.price.ppl || "19.57"} $PPL or {supl.price.eth || "0.1957 "} $ETH</Typography>
                    <Typography marginTop="2rem" align="center" paddingBottom="1rem" variant="h4" color="white">You have {supl.vouchers} vouchers</Typography>
                </Box>
            </Box>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogContent sx={{ color: "white" }}>
                    <FormControl component="fieldset">
                        <FormLabel sx={{ color: "white" }} component="legend">Purchase from</FormLabel>
                        <RadioGroup
                            aria-label="gender"
                            defaultValue="female"
                            name="radio-buttons-group"
                            onChange={(_, value) => setFrom(value as "wallet" | "token")}
                        >
                            <FormControlLabel value="wallet" control={<Radio sx={{ color: "white" }} />} label="Wallet" />
                            <FormControlLabel value="token" control={<Radio sx={{ color: "white" }} />} label="Tokens" />
                        </RadioGroup>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button variant='outlined' onClick={handleSubmit}>Submit</Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}
