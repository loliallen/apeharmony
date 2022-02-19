import { useMemo } from 'react'
import styles from './style.module.scss'
import {useMediaQuery} from "@material-ui/core";



export const Logo = () => {
    const isMobile = useMediaQuery("(max-width: 400px)")
    const SRCS = useMemo(() => ({
        mobile: '/logo.svg',
        desktop: '/logo.svg'
    }), [])

    return (
        <img className={styles.logo} src={isMobile ? SRCS.mobile : SRCS.desktop} alt="desktop" />
    )
}
