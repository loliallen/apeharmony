import { makeStyles } from '@mui/styles'
import { Box, BoxProps } from "@mui/material"
import React, { HTMLAttributes } from 'react'

const useStyles = makeStyles({
    container: {
        backgroundColor: "hsla(0, 0%, 0%, 0.6)",
        padding: "3rem 0px"
    }
})

export const TextBackground: React.FC<BoxProps> = ({ children, className, ...rest }) => {
    const classes = useStyles()
    return (
        <Box className={classes.container} {...rest}>
            {children}
        </Box>
    )
}
