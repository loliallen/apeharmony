import { useMemo } from 'react'
import { useMobile } from '../../hooks/useMobile'



export const Logo = () => {
    const isMobile = useMobile()
    const SRCS = useMemo(() => ({
        mobile: '/logo.svg',
        desktop: '/logo.svg'
    }), [])

    return (
        <img style={{width: 220, height: "100%"}} src={isMobile ? SRCS.mobile : SRCS.desktop} alt="desktop" />
    )
}
