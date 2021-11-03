import { Typography } from '@mui/material'
import {TextBackground} from '../TextBackground'

export const Greeting = () => {
    return (
        <TextBackground>
            <Typography
                variant="h5"
                color="white"
                align="center"
                sx={{ textTransform: "uppercase" }}
            >
                GREETINGS MORTAL
            </Typography>
            <Typography
                variant="h5"
                color="white"
                align="center"
                sx={{ textTransform: "uppercase" }}
            >
                SO YOU FOUND YOUR WAY TO THE APE HARMONY PRE-SALE
            </Typography>
            <Typography
                variant="h5"
                color="white"
                align="center"
                sx={{ textTransform: "uppercase" }}
            >
                WHERE YOU CAN MINT TODAY BEFORE YOUR 
            </Typography>
            <Typography
                variant="h5"
                color="white"
                align="center"
                sx={{ textTransform: "uppercase" }}
            >
                LESS FORTUNATE NEIGHBORS
            </Typography>
            <Typography
                variant="h5"
                color="white"
                align="center"
                sx={{ textTransform: "uppercase" }}
            >
                NOW THANKS TO OUR SPOOKY SOLIDITY DEV
            </Typography>
            <Typography
                variant="h5"
                color="white"
                align="center"
                sx={{ textTransform: "uppercase" }}
            >
                YOU'LL ALSO ENJOY HAUNTINGLY LOW GAS FEES
            </Typography>
        </TextBackground>
    )
}
