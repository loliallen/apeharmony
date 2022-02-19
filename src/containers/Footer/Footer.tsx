import {IconButton, Typography, useMediaQuery} from '@material-ui/core'
import Link from "next/link"
import {Discord, Twitter} from '../Links'
import {TextBackground} from '../TextBackground'
import {Children} from '../Children'
import styles from './style.module.scss'
import React from 'react'

export const Footer = React.forwardRef<HTMLDivElement>((_, ref) => {
    const isMobile = useMediaQuery("(max-width: 400px)")
    return (
        <div className={styles.footer} ref={ref}>
            <TextBackground style={{marginTop: "4rem"}}>
                <Typography
                    variant="h6"
                    align="center"
                    style={{lineHeight: "1.2", margin: '0 auto', width: "80%", marginBottom: "2rem"}}
                >
                    THE MONSTROUS LOVECHILD COLLECTION - COMING SOON
                </Typography>
                <Children/>
                <Typography
                    variant="h6"
                    align="center"
                    style={{lineHeight: "1.2", margin: '0 auto', width: "80%"}}
                >
                    !AWOO The Holidays are approaching and love is in the air... Ape Harmony will soon be offering
                    breeding services to holders of all popular ape collections. !AWOO
                    <br/>
                    <br/>
                    Every AHMC shall be automatically deposited into the Ape Harmony breeding pool to earn
                    Pineapples <Link href="/ppl">$PPL</Link> by breeding with less fortunate non-AHMC holders
                    <br/>
                    <br/>
                    Every AHMC Genesis Monster shall earn 1 Pineapple per day for doing nothing besides howling at the
                    moon
                    <br/>
                    <br/>
                    Every AHMC can breed one of 10,000 Monster Lovechildren for 50 <Link href="/ppl">$PPL</Link> on
                    ApeHarmony dot com... and avoid the Dutch drudgery ;)
                    <br/>
                    <br/>
                    Every AHMC Monster shall receive his or her own accursed residence inside MINTSPACE.COM the official
                    virtual theme park metaverse of Club 1111 (once we build it)
                    <br/>
                    <br/>
                    *2 Apes from any popular collection are required to breed a Monster Lovechild on ApeHarmony (that's
                    only natural after all)
                </Typography>
            </TextBackground>
            <Link href="/legal">
                <Typography
                    variant="h6"
                    align="center"
                    style={{lineHeight: "1.2", marginTop: "4rem", textDecoration: "none"}}
                >
                    Terms and Conditions
                </Typography>
            </Link>
            <Typography
                variant={isMobile ? "subtitle2" : "h6"}
                align="center"
                style={{lineHeight: "1.2", marginTop: "1rem", wordBreak: "break-all"}}
            >
                <a rel="noreferrer" href="https://etherscan.io/address/0x61db9dde04f78fd55b0b4331a3d148073a101850"
                   target="_blank">0x61db9dde04f78fd55b0b4331a3d148073a101850</a>
            </Typography>
            <div style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "1rem"
            }}>
                <IconButton style={{padding: 0, marginRight: "2rem"}}>
                    <Twitter size={24} fillColor="#ffffff" link="https://twitter.com/ApeHarmony"/>
                </IconButton>
                <IconButton style={{padding: 0}}>
                    <Discord size={24} fillColor="#ffffff" link="https://discord.gg/apeharmony"/>
                </IconButton>
            </div>
            <div className={styles.footer_logo_container}>
                <img src="/logo.svg" alt="logo261x60" width="261px" height="60px"/>
            </div>
        </div>
    )
})
