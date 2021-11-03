import React from 'react'
import styles from './style.module.scss'

export const Layout: React.FC = ({ children }) => {
    return (
        <div className={styles.background}>
            {children}
        </div>
    )
}
