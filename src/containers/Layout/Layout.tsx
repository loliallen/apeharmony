import React from 'react'
import styles from './style.module.scss'

type Props = {
    ppl?: boolean
}
export const Layout: React.FC<Props> = ({ children, ppl }) => {
    return (
        <div className={ppl ? styles.pineapple_background : styles.background}>
            {children}
        </div>
    )
}
