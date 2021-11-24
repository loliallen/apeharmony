import React, { useEffect, useState } from 'react'
import { IconButton, Typography, useTheme, Box, Button, Select, MenuItem, Theme, SelectChangeEvent, useMediaQuery } from '@mui/material'
import { useMobile } from '../../hooks/useMobile'
import { Twitter, Discord } from '../Links'
import { Link } from 'react-router-dom'
import styles from './style.module.scss'
import { useETH } from '../../hooks/useETH'
import { TokenSelector, usePPL } from '../../hooks/usePPL'
import { makeStyles } from '@mui/styles'
import { TextBackground } from '../TextBackground'

import { AbiItem } from 'web3-utils'
import { useARTW } from '../../hooks/useARTW'
import { useAHMC } from '../../hooks/useAHMC'


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


export const PPL = () => {
    const classes = useStyles()
    const t = useTheme()
    const sm = useMediaQuery(t.breakpoints.down('sm'))
    const isMobile = useMobile()
    const [selector, setSelector] = useState<TokenSelector>("ALL")

    const eth = useETH()
    const ethsARTW = useARTW()
    const ethsAHMC = useAHMC()
    const ethsPll = usePPL()


    const handleChangeValue = (e: SelectChangeEvent<TokenSelector>) => {
        setSelector(e.target.value as TokenSelector)
    }

    // ethsARTW.getTokens()
    return (
        <div className={styles.footer}>
            <Button
                onClick={ethsARTW.getTokens}
            >Click</Button>
            <TextBackground>
                <Box>
                    <Box
                        display="flex"
                        gap="0.5rem"
                        sx={{
                            [t.breakpoints.down('sm')]: {
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "initial"
                            }
                        }}
                    >
                        {selector === "ARTW" && <Button variant="contained">Register All</Button>}
                        <Button variant="contained">Claim All</Button>
                        <Button variant="contained">Transfer All</Button>
                    </Box>
                    <Box
                        display="flex"
                        alignItems="center"
                        sx={{
                            [t.breakpoints.down('sm')]: {
                                justifyContent: "center"
                            }
                        }}
                    >
                        <Typography variant={sm ? "h4" : "h3"} color="white">Collection:</Typography>
                        <Select
                            value={selector}
                            color="primary"
                            className={classes.select}
                            onChange={handleChangeValue}
                        >
                            <MenuItem className={classes.menu} value="ALL">ALL</MenuItem>
                            <MenuItem className={classes.menu} value="AHMC">AHMC</MenuItem>
                            <MenuItem className={classes.menu} value="ARTW">ARTW</MenuItem>
                        </Select>
                    </Box>
                </Box>
            </TextBackground>

            <div style={{
                marginTop: "4rem",
                backgroundColor: "hsla(0, 0%, 0%, 0.9)",
                flex: 1
            }}>
                <Typography variant="h6" color="white" align="center" sx={{ lineHeight: "1.2", marginTop: "2rem" }}>
                    <Link to="/legal" style={{ textDecoration: "none" }}>Terms and Conditions</Link>
                </Typography>
                <Typography variant={isMobile ? "subtitle2" : "h6"} color="white" align="center" sx={{ lineHeight: "1.2", marginTop: "1rem", wordBreak: "break-all" }}>
                    <a rel="noreferrer" href="https://etherscan.io/address/0x61db9dde04f78fd55b0b4331a3d148073a101850" target="_blank" style={{ textDecoration: "none" }}>0x61db9dde04f78fd55b0b4331a3d148073a101850</a>
                </Typography>
                <div style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "1rem",
                }}>
                    <IconButton sx={{ padding: 0, marginRight: "2rem" }}>
                        <Twitter size={24} fillColor="#ffffff" link="https://twitter.com/ApeHarmony" />
                    </IconButton>
                    <IconButton sx={{ padding: 0 }}>
                        <Discord size={24} fillColor="#ffffff" link="https://discord.gg/apeharmony" />
                    </IconButton>
                </div>
                <div className={styles.footer_logo_container}>
                    <img src="/logo.svg" alt="logo261x60" width="261px" height="60px" />
                </div>
            </div>
        </div>
    )
}
