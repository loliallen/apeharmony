import React, { useEffect, useState } from 'react'
import {
    CardHeader,
    IconButton,
    Typography,
    useTheme,
    Box,
    Select,
    MenuItem,
    Theme,
    SelectChangeEvent,
    useMediaQuery,
    ButtonGroup,
    Grid,
    Card,
    CardMedia,
    CardContent,
    CardActions
} from '@mui/material'
import { useMobile } from '../../hooks/useMobile'
import { Twitter, Discord } from '../Links'
import { Link } from 'react-router-dom'
import styles from './style.module.scss'
import { useETH } from '../../hooks/useETH'
import { makeStyles } from '@mui/styles'
import { TextBackground } from '../TextBackground'

import { generateTextShadow } from './helpers'
import { useARTW } from '../../hooks/useARTW'
import { useAHMC } from '../../hooks/useAHMC'
import { StyledButton } from '../StyledButton'


type Token = {
    id: string
    src: string
    accamulated: number
    claimed: number
    collection: "ahmc" | "artw"
    registered?: boolean
}

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

export const PPL = () => {
    const eth = useETH()
    const ethsARTW = useARTW()
    const ethsAHMC = useAHMC()

    const classes = useStyles()
    const t = useTheme()
    const sm = useMediaQuery(t.breakpoints.down('sm'))

    const isMobile = useMobile()

    const [selector, setSelector] = useState<TokenSelector>("ALL")
    const [tokens, setTokens] = useState<any[]>([])

    const [pageI, setPageI] = useState(0)

    const step = 20
    const maxSteps = Math.round(tokens.length / step)
    const handleChangeValue = (e: SelectChangeEvent<TokenSelector>) => {
        setSelector(e.target.value as TokenSelector)
    }

    useEffect(() => {
        if (selector === "AHMC") {
            setTokens(ethsAHMC.tokens)
        } else if (selector === "ARTW") {
            setTokens(ethsARTW.tokens)
        } else {
            setTokens([
                ...ethsAHMC.tokens,
                ...ethsARTW.tokens
            ])
        }
    }, [selector, JSON.stringify(ethsAHMC.tokens), JSON.stringify(ethsARTW.tokens)])
    useEffect(() => {
        console.log(selector)
        if (selector === "AHMC") {
            ethsAHMC.getTokens()
        } else if (selector === "ARTW") {
            ethsARTW.getTokens()
        } else {
            ethsAHMC.getTokens()
            ethsARTW.getTokens()
        }
    }, [selector])

    const handleTransfer = (collection: "artw" | "ahmc", tokenId: string) => {
        if (collection === "artw")
            ethsARTW.transferOne(tokenId, eth.account)
        else
            ethsAHMC.transferOne(tokenId, eth.account)
    }
    const handleTransferAll = () => {
        if (selector === "ALL") {
            ethsARTW.transferAll(eth.account)
            ethsAHMC.transferAll(eth.account)
        } else if (selector === "AHMC") {
            ethsAHMC.transferAll(eth.account)
        } else if (selector === "ARTW") {
            ethsARTW.transferAll(eth.account)
        }
    }
    const handleClaimAll = () => {
        if (selector === "ALL") {
            ethsARTW.claimAll()
            ethsAHMC.claimAll()
        } else if (selector === "AHMC") {
            ethsAHMC.claimAll()
        } else if (selector === "ARTW") {
            ethsARTW.claimAll()
        }
    }

    const handleRegisterAll = () =>
        ethsARTW.registerAll()

    const handleClaimOrRegister = (collection: "artw" | "ahmc", tokenId: string, isRegistered?: boolean) => {
        console.log(tokens)
        if (collection === "artw")
            if (isRegistered)
                ethsARTW.claimOne(tokenId)
            else
                ethsARTW.registerOne(tokenId)
        else
            ethsAHMC.claimOne(tokenId)
    }


    // ethsARTW.getTokens()
    return (
        <div className={styles.footer}>
            <TextBackground>
                <Box
                    padding="2rem"
                    marginBottom="1.5rem"
                    display="flex"
                    justifyContent="space-between"
                    sx={{
                        [t.breakpoints.down('sm')]: {
                            justifyContent: "space-around",
                            flexDirection: "column"
                        }
                    }}
                >

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
                    {eth.account && <Box
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
                        {selector === "ARTW" && <StyledButton variant="contained" onClick={handleRegisterAll} disabled={!ethsARTW.tokens.some(t => !t.registered)}>Register All</StyledButton>}
                        <StyledButton variant="contained" onClick={handleClaimAll}>Claim All</StyledButton>
                        <StyledButton variant="contained" onClick={handleTransferAll}>Transfer All</StyledButton>
                    </Box>}
                </Box>
                <Box
                    minHeight="60vh"
                >
                    {tokens.length > 0 ?
                        <Grid container spacing={5} justifyContent="center">
                            {tokens.slice(step * pageI, step * (pageI + 1)).map((token, i) => {
                                return <Grid item key={i}>
                                    <Card sx={{
                                        width: "450px",
                                        [t.breakpoints.down('sm')]: {
                                            width: "350px",

                                        }
                                    }}>
                                        <CardHeader title={token.name} titleTypographyProps={{ color: "white"}} />
                                        <CardMedia
                                            sx={{
                                                height: "350px",
                                                [t.breakpoints.down('sm')]: {
                                                    height: "300px",
                                                }
                                            }}
                                            image={token.src}
                                        />
                                        <CardContent>
                                            <Box>
                                                <Box
                                                    display="flex"
                                                    justifyContent="space-between"
                                                >
                                                    <Typography variant="h6" color="white">
                                                        Accumulated:
                                                    </Typography>
                                                    <Typography variant="h6" color="white">
                                                        {(token.collection === "artw" && !token.registered) ? 0 : token.accamulated} $PPL
                                                    </Typography>
                                                </Box>
                                                <Box
                                                    display="flex"
                                                    justifyContent="space-between"
                                                >
                                                    <Typography variant="h6" color="white">
                                                        Claimed:
                                                    </Typography>
                                                    <Typography variant="h6" color="white">
                                                        {token.claimed} $PPL
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </CardContent>
                                        <CardActions sx={{ justifyContent: "space-between" }}>
                                            <StyledButton
                                                onClick={() => handleClaimOrRegister(token.collection, token.id, token.registered)}
                                                size="large"
                                                variant="contained"
                                                disabled={token.claimed > 0}>
                                                {token.collection === "artw" ? !token.registered ? "Register" : "Claim" : "Claim"}
                                            </StyledButton>

                                            <StyledButton onClick={() => handleTransfer(token.collection, token.id)} size="large" variant="contained">Transfer</StyledButton>
                                        </CardActions>
                                    </Card>
                                </Grid>
                            })}
                        </Grid>
                        :
                        <>
                            <Typography variant="h1" align="center" sx={{ textShadow: generateTextShadow(3, "#9e9e9e"), [t.breakpoints.down('sm')]: { fontSize: "4.571429rem" } }} color="gray">No tokens</Typography>
                            {!eth.account && <Typography variant="h4" align="center" sx={{ textShadow: generateTextShadow(2, "#9e9e9e") }} color="#bababa">Please connect your wallet</Typography>}
                        </>
                    }
                </Box>
                <Box
                    display="flex"
                    flexDirection="row-reverse"
                    marginTop="2rem"
                >
                    {maxSteps > 0 && <ButtonGroup>
                        <StyledButton variant="contained" disabled={pageI == 0} onClick={() => setPageI(p => p - 1)}>Prev</StyledButton>
                        <StyledButton variant="contained" >{pageI + 1}</StyledButton>
                        <StyledButton variant="contained" disabled={!(pageI < maxSteps)} onClick={() => setPageI(p => p + 1)}>Next</StyledButton>
                    </ButtonGroup>}
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
        </div >
    )
}
