import { IconButton, Menu, MenuItem } from '@mui/material'
import { Link } from "react-router-dom"

import { Logo } from '../Logo'
import { Discord, Twitter } from '../Links'
import { Player } from '../../components/Player'
import { ConnectWalletButton } from '../ConnectWalletButton'
import styles from './style.module.scss'
import { MoreHoriz } from '@mui/icons-material'
import { useState } from 'react'
import { useMobile } from '../../hooks/useMobile'

const MobileLinks = () => {
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)

    const open = Boolean(anchorEl)
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(e.currentTarget)
    }
    const handleClose = () => setAnchorEl(null)
    return <>
        <IconButton onClick={handleClick} sx={{ backgroundColor: "#999999", width: 32 * 1.5, height: 32 * 1.5 }}>
            <MoreHoriz sx={{ width: 28, height: 28 }} />
        </IconButton>
        <Menu
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
        >
            <MenuItem>
                <IconButton sx={{ padding: 0 }}>
                    <Twitter size={24} fillColor="#999999" link="https://twitter.com/ApeHarmony" />
                </IconButton>
            </MenuItem>
            <MenuItem>
                <IconButton sx={{ padding: 0 }}>
                    <Discord size={24} fillColor="#999999" link="https://discord.gg/apeharmony" />
                </IconButton>
            </MenuItem>
        </Menu>
    </>
}
const DesktopLinks = () => {
    return <>
        <IconButton sx={{ padding: 0 }}>
            <Twitter size={24} fillColor="#999999" link="https://twitter.com/ApeHarmony" />
        </IconButton>
        <IconButton sx={{ padding: 0 }}>
            <Discord size={24} fillColor="#999999" link="https://discord.gg/apeharmony" />
        </IconButton>
    </>
}

type Props = {
    offMusic?: boolean
}
export const Header: React.FC<Props> = ({ offMusic }) => {
    const isMobile = useMobile()
    return (
        <div className={styles.header}>
            <div className={styles.header_left}>
                <div style={{color: "white", marginRight: "1rem"}}>
                    <div className={styles.pre_word}>
                        SECRET PRE-SALE
                    </div>
                    <div className={styles.pre_word}>
                        Shhhhhhhhh!!!!...
                    </div>
                </div>
                <Link to="/">
                    <Logo />
                </Link>
            </div>
            <div className={styles.header_right}>
                {!offMusic && <Player />}
                {isMobile ? <MobileLinks /> : <DesktopLinks />}
                <ConnectWalletButton />
            </div>
        </div>
    )
}
