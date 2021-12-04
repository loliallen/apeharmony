import { Box, ButtonGroup, MenuItem, Select, Theme, Typography, useMediaQuery, useTheme } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { useState } from 'react'
import { useAHMC } from '../../hooks/useAHMC'
import { useARTW } from '../../hooks/useARTW'
import { useSUPL } from '../../hooks/useSUPL'
import { Body } from '../Body'
import { StyledButton } from '../StyledButton'
import { prepareTokens } from './helpers'

import { addresses } from './__mocks'

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
    const supl = useSUPL()
    const artw = useARTW()
    const ahmc = useAHMC()

    const t = useTheme()
    const sm = useMediaQuery(t.breakpoints.down('sm'))
    const md = useMediaQuery(t.breakpoints.between('sm', 'md'))

    const [count, setCount] = useState(1)
    const [selector, setSelector] = useState<string>("$PPL")


    const handlePurcase = async () => {
        if (selector === "$PPL") {
            const tokens = prepareTokens([...ahmc.tokens, ...artw.tokens], supl.price.ppl, count)
            await supl.purcase(count, tokens)
        } else {
            await supl.purcase(count)
        }
    }


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
                <Box
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
                        border
                        onClick={handlePurcase}
                    >
                        Purchase
                    </StyledButton>
                    <Select
                        value={selector}
                        onChange={(e) => setSelector(e.target.value)}
                        color="primary"
                        className={classes.select}
                    >
                        {["$PPL", "ETH"].map((i) =>
                            <MenuItem
                                className={classes.menu}
                                key={i}
                                value={i}
                            >{i}</MenuItem>
                        )}
                    </Select>
                </Box>
                <Box
                    padding="0px 5rem"
                    sx={{
                        [t.breakpoints.down('sm')]: {
                            padding: "0px 2rem"
                        }
                    }}
                >
                    <Typography align="center" paddingBottom="1rem" variant="h5" color="white">Vouchers left {supl.count}/{supl.maxCount}</Typography>
                    <Typography align="center" paddingBottom="1rem" variant="h6" color="white">Price {supl.price.ppl} $PPL or {supl.price.eth} ETH</Typography>
                </Box>
            </Box>
        </Box>
    )
}
