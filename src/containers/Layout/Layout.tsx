import React, { useState } from 'react'
import styles from './style.module.scss'



const LayoutContext = React.createContext<React.Dispatch<React.SetStateAction<string>>>(() => { })


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
