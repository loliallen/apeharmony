import { useMemo } from 'react'
import { useMobile } from '../../hooks/useMobile'



export const Logo = () => {
    const isMobile = useMobile()
    const SRCS = useMemo(() => ({
        mobile: '/logo.png',
        desktop: '/logo261x60.png'
    }), [])

    return (
        <img src={isMobile ? SRCS.mobile : SRCS.desktop} alt="desktop" />
    )
}
