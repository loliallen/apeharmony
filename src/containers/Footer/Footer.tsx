import { IconButton, Typography } from '@mui/material'
import { Link } from "react-router-dom"
import { Discord, Twitter } from '../Links'
import { TextBackground } from '../TextBackground'
import { Children } from '../Children'
import styles from './style.module.scss'
import { useMobile } from '../../hooks/useMobile'

export const Footer = () => {
    const isMobile = useMobile()
    return (
        <div className={styles.footer}>
            <TextBackground style={{ marginTop: "4rem" }}>
                <Typography
                    variant="h6"
                    color="white"
                    align="center"
                    sx={{ lineHeight: "1.2", margin: '0 auto', width: "80%", marginBottom: "2rem" }}
                >
                    THE MONSTROUS LOVECHILD COLLECTION - COMING SOON
                </Typography>
                <Children />
                <Typography
                    variant="h6"
                    color="white"
                    align="center"
                    sx={{ lineHeight: "1.2", margin: '0 auto', width: "80%" }}
                >
                    !OOH The Holidays are approaching and love is in the air... Ape Harmony will soon be offering breeding services to holders of all popular ape collections. !OOH
                    <br />
                    <br />
                    Every AHMC shall be automatically deposited into the Ape Harmony breeding pool to earn Pineapples $PPL by breeding with less fortunate non-AHMC holders
                    <br />
                    <br />
                    Every AHMC Genesis Monster shall earn 1 Pineapple per day for doing nothing besides howling at the moon
                    <br />
                    <br />
                    Every AHMC can breed one of 10,000 Monster Lovechildren for 50 $PPL on ApeHarmony dot com... and avoid the Dutch drudgery ;)
                    <br />
                    <br />
                    Every AHMC Monster shall receive his or her own accursed residence inside MINTSPACE.COM the official virtual theme park metaverse of Club 1111 (once we build it)
                    <br />
                    <br />
                    *2 Apes from any popular collection are required to breed a Monster Lovechild on ApeHarmony (that's only natural after all)
                </Typography>
            </TextBackground>
            <Typography variant="h6" color="white" align="center" sx={{ lineHeight: "1.2", marginTop: "4rem" }}>
                <Link to="/legal" style={{ textDecoration: "none" }}>Terms and Conditions</Link>
            </Typography>
            <Typography variant={isMobile ? "subtitle2" : "h6"} color="white" align="center" sx={{ lineHeight: "1.2", marginTop: "1rem", wordBreak: "break-all" }}>
                <a rel="noreferrer" href="https://etherscan.io/address/0x61db9dde04f78fd55b0b4331a3d148073a101850" target="_blank" style={{ textDecoration: "none" }}>0x61db9dde04f78fd55b0b4331a3d148073a101850</a>
            </Typography>
            <div style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "1rem"
            }}>
                <IconButton sx={{ padding: 0, marginRight: "2rem" }}>
                    <Twitter size={24} fillColor="#ffffff" link="https://twitter.com/ApeHarmony" />
                </IconButton>
                <IconButton sx={{ padding: 0 }}>
                    <Discord size={24} fillColor="#ffffff" link="https://discord.gg/apeharmony" />
                </IconButton>
            </div>
            <div className={styles.footer_logo_container}>
                <img src="/logo261x60.png" alt="logo261x60" />
            </div>
        </div>
    )
}
