import { Box, ButtonGroup, Grid, MenuItem, Select, SelectChangeEvent, Theme, Typography, useMediaQuery, useTheme } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React from 'react'
import { StyledButton } from '../StyledButton'

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
type TokenSelector = "ALL" | "ARTW" | "AHMC"

type Props = {
    addComponent?: React.ReactNode
    selector: {
        value: TokenSelector
        handleChange: (e: SelectChangeEvent<TokenSelector>) => void
    },
    paggination: {
        max: number,
        current: number
        setPage: React.Dispatch<React.SetStateAction<number>>
    }
}
export const Section: React.FC<Props> = ({ addComponent, selector, paggination, children }) => {
    const classes = useStyles()
    const t = useTheme()
    const sm = useMediaQuery(t.breakpoints.down('sm'))
    return (
        <>
            <Box
                padding="2rem"
                marginBottom="0.5rem"
                paddingBottom="0rem"
                display="flex"
                justifyContent="space-between"
                sx={{
                    [t.breakpoints.down('sm')]: {
                        justifyContent: "space-around",
                        flexDirection: "column"
                    }
                }}>
                <Box
                    display="flex"
                    alignItems="center"
                    sx={{
                        [t.breakpoints.down('sm')]: {
                            justifyContent: "center"
                        },
                        [t.breakpoints.down('sm')]: {
                            flexDirection: "column"
                        },
                    }}
                >
                    <Typography variant={sm ? "h4" : "h3"} color="white">Collection:</Typography>
                    <Select
                        value={selector.value}
                        color="primary"
                        className={classes.select}
                        onChange={selector.handleChange}
                    >
                        <MenuItem className={classes.menu} value="ALL">ALL</MenuItem>
                        <MenuItem className={classes.menu} value="AHMC">AHMC</MenuItem>
                        <MenuItem className={classes.menu} value="ARTW">ARTW</MenuItem>
                    </Select>
                </Box>
                {addComponent}
            </Box>

            <Box
                minHeight="60vh"
            >
                {children}
            </Box>
            <Box
                display="flex"
                flexDirection="row-reverse"
                marginTop="2rem"
            >
                {paggination.max > 0 && <ButtonGroup>
                    <StyledButton variant="contained" disabled={paggination.current == 0} onClick={() => paggination.setPage(p => p - 1)}>Prev</StyledButton>
                    <StyledButton variant="contained" >{paggination.current + 1}</StyledButton>
                    <StyledButton variant="contained" disabled={!(paggination.current < paggination.max)} onClick={() => paggination.setPage(p => p + 1)}>Next</StyledButton>
                </ButtonGroup>}
            </Box>
        </>
    )
}
