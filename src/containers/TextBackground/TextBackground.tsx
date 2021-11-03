import { makeStyles } from '@mui/styles'
import React, { HTMLAttributes } from 'react'

const useStyles = makeStyles({
    container: {
        backgroundColor: "hsla(0, 0%, 0%, 0.6)",
        padding: "3rem 0px"
    }
})

export const TextBackground: React.FC<HTMLAttributes<HTMLDivElement>> = ({ children, className, ...rest }) => {
    const classes = useStyles()
    return (
        <div className={classes.container} {...rest}>
            {children}
        </div>
    )
}
