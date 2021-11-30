import { useMemo } from 'react'
import { useMobile } from '../../hooks/useMobile'
import styles from './style.module.scss'



export const Logo = () => {
    const isMobile = useMobile()
    const SRCS = useMemo(() => ({
        mobile: '/logo.svg',
        desktop: '/logo.svg'
    }), [])

    return (
        <img className={styles.logo} src={isMobile ? SRCS.mobile : SRCS.desktop} alt="desktop" />
    )
}
