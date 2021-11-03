import { useEffect, useState } from "react"

export const useMobile = () => {
    const [isMobile, setIsMobile] = useState(window.outerWidth < 800)

    useEffect(() => {
        function resizeListener() {
            if (window.outerWidth < 800)
                setIsMobile(true)
            else
                setIsMobile(false)
        }
        window.addEventListener('resize', resizeListener)
        return () => {
            window.removeEventListener('resize', resizeListener)
        }
    }, [])
    return isMobile
}