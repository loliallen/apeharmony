import { Typography } from '@mui/material'
import React from 'react'
import { TextBackground } from '../TextBackground'
import { useStyles } from './style'


export const Description = React.forwardRef<HTMLDivElement>((_, ref) => {
    const classes = useStyles()
    return (
        <TextBackground style={{marginBottom: "4rem"}}>
            <div className={classes.container} ref={ref}>
                <Typography
                    variant="h5"
                    color="white"
                    align="center"
                    sx={{ textTransform: "uppercase", marginBottom: "2rem" }}
                >
                    WELCOME APE LOVER
                </Typography>
                <Typography
                    variant="h6"
                    color="white"
                    align="center"
                    sx={{ lineHeight: 1.2 }}
                >
                    To the Genesis Pre-Sale of Ape Harmony Monster Club where ghoulish baboons and nightmarish mandrils will soon enjoy your lugubrious company.
                    <br />
                    <br />
                    1111 eerily animated incubator GIFs are now available for your minting pleasure before the hellish onslaught of the 10,000 Monstrous Lovechildren
                    <br />
                    <br />
                    After all the AHMC Monsters have found their way home into your wallets and have been sufficiently exposed to Dr. Frankenape's toxic formula...
                    <br />
                    <br />
                    We invite you back to initiate your child's terrifying metamorphosis
                </Typography>
            </div>
        </TextBackground>
    )
})
