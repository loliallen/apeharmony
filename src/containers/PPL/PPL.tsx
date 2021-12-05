import React, { useEffect, useState } from 'react'
import {
    IconButton,
    Typography,
    useTheme,
    Theme,
    SelectChangeEvent,
    useMediaQuery,
    Tabs,
    Tab,
    Box,
    Alert,
    Collapse
} from '@mui/material'
import { useMobile } from '../../hooks/useMobile'
import { Twitter, Discord } from '../Links'
import { Link } from 'react-router-dom'
import styles from './style.module.scss'
import { useETH } from '../../hooks/useETH'
import { makeStyles } from '@mui/styles'
import { TextBackground } from '../TextBackground'

import { useARTW } from '../../hooks/useARTW'
import { useAHMC } from '../../hooks/useAHMC'
import { TabPanel } from '../TabPanel'
import { usePPL } from '../../hooks/usePPL'
import { WalletSection } from './WalletSection'
import { SearchSection } from './SearchSection'
import { StyledButton } from '../StyledButton'
import { SupTab } from '../SupTab'
import { Close } from '@mui/icons-material'



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
    const ethsPPl = usePPL()
    const ethsARTW = useARTW()
    const ethsAHMC = useAHMC()

    const t = useTheme()

    const isMobile = useMobile()

    const [selector, setSelector] = useState<TokenSelector>("ALL")
    const [tokens, setTokens] = useState<any[]>([])
    const [searchTokens, setSearchTokens] = useState<any[]>([])

    const [tab, setTab] = useState("one")
    const [pageI, setPageI] = useState(0)
    const [forceUpd, setForceUpd] = useState(0)

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
        if (selector === "AHMC") {
            ethsAHMC.getTokens()
        } else if (selector === "ARTW") {
            ethsARTW.getTokens()
        } else {
            ethsAHMC.getTokens()
            ethsARTW.getTokens()
        }
    }, [selector, forceUpd])

    const handleTransfer = async (collection: "artw" | "ahmc", token: any) => {
        if (collection === "artw") {
            await ethsARTW.transferOne(token.id, eth.account)
        } else {
            await ethsAHMC.transferOne(token.id, eth.account)

        }
        setForceUpd(p => p + 1)
    }
    const handleTransferAll = async () => {
        if (selector === "ALL") {
            const artwDT = ethsARTW.transferAllData()
            const ahmcDT = ethsAHMC.transferAllData()
            await ethsPPl.transfer(eth.account, [...artwDT.address, ...ahmcDT.address], [...artwDT.tokens, ...ahmcDT.tokens])
        } else if (selector === "AHMC") {
            await ethsAHMC.transferAll(eth.account)
        } else if (selector === "ARTW") {
            await ethsARTW.transferAll(eth.account)
        }
        setForceUpd(p => p + 1)
    }
    const handleClaimAll = async () => {
        if (selector === "ALL") {
            const artwDT = ethsARTW.claimAllData()
            const ahmcDT = ethsAHMC.claimAllData()
            console.log([...artwDT.address, ...ahmcDT.address], [...artwDT.tokens, ...ahmcDT.tokens])
            await ethsPPl.claim([...artwDT.address, ...ahmcDT.address], [...artwDT.tokens, ...ahmcDT.tokens])
        } else if (selector === "AHMC") {
            await ethsAHMC.claimAll()
        } else if (selector === "ARTW") {
            await ethsARTW.claimAll()
        }
        setForceUpd(p => p + 1)
    }
    const handleRegisterAll = async () => {
        await ethsARTW.registerAll()
        setForceUpd(p => p + 1)
    }
    const handleClaimOrRegister = async (collection: "artw" | "ahmc", tokenId: string, isRegistered?: boolean) => {
        if (collection === "artw")
            if (isRegistered)
                await ethsARTW.claimOne(tokenId)
            else
                await ethsARTW.registerOne(tokenId)
        else
            await ethsAHMC.claimOne(tokenId)
        setForceUpd(p => p + 1)
    }

    const handleSearch = async (tokenId: string) => {
        const tokens = await ethsPPl.getTokenById(tokenId)
        setSearchTokens(tokens)
    }
    // ethsARTW.getTokens()
    return (
        <div className={styles.footer}>
            <TextBackground style={{ paddingBottom: 0 }}>
                <Tabs
                    value={tab}
                    onChange={(event: React.SyntheticEvent, newValue: string) => {
                        setTab(newValue);
                    }}
                    sx={{
                        paddingLeft: "2rem"
                    }}
                >
                    <Tab
                        sx={{
                            color: "white",
                            fontSize: "1.5rem"
                        }}
                        value="one"
                        label="Wallet"
                    />
                    <Tab
                        sx={{
                            color: "white",
                            fontSize: "1.5rem"
                        }}
                        value="two"
                        label="Search"
                    />
                    <Tab
                        sx={{
                            color: "white",
                            fontSize: "1.5rem"
                        }}
                        value="three"
                        label="Sup"
                    />
                </Tabs>
                <TabPanel value={tab} index="one">
                    <WalletSection
                        eth={eth}
                        paggination={{
                            max: maxSteps,
                            current: pageI,
                            setPage: setPageI,
                            step
                        }}
                        selector={{
                            value: selector,
                            handleChange: handleChangeValue
                        }}
                        tokens={{
                            value: tokens,
                            handleClaimOrRegister: handleClaimOrRegister,
                            handleTransfer: handleTransfer
                        }}
                        addComponent={eth.account && <Box
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

                    />
                </TabPanel>
                <TabPanel value={tab} index="two">
                    <SearchSection
                        eth={eth}
                        paggination={{
                            max: maxSteps,
                            current: pageI,
                            setPage: setPageI,
                            step
                        }}
                        selector={{
                            value: selector,
                            handleChange: handleChangeValue
                        }}
                        onSearch={handleSearch}
                        tokens={{
                            value: searchTokens,
                        }}
                    />
                </TabPanel>
                <TabPanel value={tab} index="three">
                    <SupTab />
                </TabPanel>
                <div style={{
                    padding: "1.5rem",
                    backgroundColor: "hsla(0, 0%, 0%, 1)",
                    flex: 1
                }}>
                    <Typography variant="h6" color="white" align="center" sx={{ lineHeight: "1.2" }}>
                        <Link to="/legal" style={{ textDecoration: "none" }}>Terms and Conditions</Link>
                    </Typography>
                    <Typography variant={isMobile ? "subtitle2" : "h6"} color="white" align="center" sx={{ lineHeight: "1.2", marginTop: "1rem", wordBreak: "break-all" }}>
                        <a
                            rel="noreferrer"
                            href={`https://etherscan.io/address/${tab === "three" ? "0x3cccba37c7514be89d7258e89ea83f3841499103" : "0x61db9dde04f78fd55b0b4331a3d148073a101850"}`}
                            target="_blank" style={{ textDecoration: "none" }}
                        >
                            {tab === "three" ? "0x3cccba37c7514be89d7258e89ea83f3841499103" : "0x61db9dde04f78fd55b0b4331a3d148073a101850"}
                        </a>
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
            </TextBackground >
        </div >
    )
}