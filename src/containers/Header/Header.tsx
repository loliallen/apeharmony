import { Drawer, IconButton, Menu, MenuItem, Typography, useMediaQuery, useTheme, Box } from '@mui/material'
import { Link } from "react-router-dom"
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai'


import { Logo } from '../Logo'
import { Player } from '../../components/Player'
import { ConnectWalletButton } from '../ConnectWalletButton'
import styles from './style.module.scss'
import { useState } from 'react'
import { FaDiscord, FaTwitter } from 'react-icons/fa'


const DesktopLinks = () => {
    return <>
        <IconButton sx={{ padding: 0 }}>
            <Link target="_blank" style={{ display: "flex", alignItems: "center", justifyContent: "center" }} to="https://twitter.com/ApeHarmony">
                <FaTwitter color="#fff" />
            </Link>
        </IconButton>
        <IconButton sx={{ padding: 0 }}>
            <Link target="_blank" style={{ display: "flex", alignItems: "center", justifyContent: "center" }} to="https://discord.gg/apeharmony" >
                <FaDiscord color="#fff" />
            </Link>
        </IconButton>
    </>
}

type Props = {
    offMusic?: boolean,
    refs?: { ref: React.RefObject<HTMLDivElement>, label: string }[]
    links?: { to: string, label: string }[]
}
export const Header: React.FC<Props> = ({ offMusic, refs, links }) => {
    const t = useTheme()
    const lg = useMediaQuery(t.breakpoints.down('lg'))
    const sm = useMediaQuery(t.breakpoints.down('sm'))

    const [open, set] = useState(false)
    const toggle = () => set(p => !p)

    const handleClickRef = (ref: React.RefObject<HTMLDivElement>) => () => {
        toggle()
        setTimeout(()=>{
            ref.current && ref.current.scrollIntoView({ behavior: "smooth" })
        }, 500)
    }
    return (
        <div className={styles.header}>
            <div className={styles.header_left}>
                <Link to="/">
                    <Logo />
                </Link>
            </div>

            {!lg && <div style={{ display: "flex", gap: "4rem", justifyContent: "space-around", flex: 1, margin: "0px 10%", alignItems: "center" }}>
                {refs && refs.map(({ ref, label }, i) =>
                    <Typography
                        key={i}
                        sx={{  cursor: "pointer" }}
                        variant="body1"
                        color="white"
                        onClick={() => ref.current && ref.current.scrollIntoView({ behavior: "smooth" })}
                    >{label}</Typography>
                )}
                {links && links.map(({ to, label }, i) =>
                    <Link to={to} key={i} style={{textDecoration: "none"}}>
                        <Typography variant="body1" color="white">{label}</Typography>
                    </Link>
                )}
            </div>}
            {!lg ? <div className={styles.header_right}>
                {!offMusic && <Player />}
                <DesktopLinks />
                <ConnectWalletButton />
            </div> : <div>
                <IconButton onClick={toggle}>
                    <AiOutlineMenu color="white" />
                </IconButton>
            </div>}
            <Drawer
                open={open}
                anchor="right"
                onClose={toggle}
            >

                <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    width={sm ? "100vw" : "600px"}
                    height={sm ? "100vh" : "50vh"}
                    position="relative"
                >
                    {sm && <div style={{ position: "absolute", right: "0.5rem", top: "0.5rem" }}>
                        <IconButton onClick={toggle}>
                            <AiOutlineClose color="white" />
                        </IconButton>
                    </div>}
                    <div style={{width: "50%", marginBottom: "2rem", display: "flex", alignItems: "center", justifyContent: "center"}}>
                        <ConnectWalletButton />
                    </div>
                    {refs && refs.map(({ ref, label }, i) =>
                        <Typography
                            key={i}
                            sx={{ textDecoration: "underline", cursor: "pointer" }}
                            variant="h5"
                            color="white"
                            onClick={handleClickRef(ref)}
                        >{label}</Typography>
                    )}
                    {links && links.map(({ to, label }, i) =>
                        <Link to={to} key={i}>
                            <Typography variant="h5" color="white">{label}</Typography>
                        </Link>
                    )}
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-around", width: "50%", marginTop: "2rem" }}>
                        {!offMusic && <Player />}
                        <DesktopLinks />
                    </div>
                </Box>
            </Drawer>
        </div>
    )
}
