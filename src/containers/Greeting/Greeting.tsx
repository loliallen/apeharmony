import { Typography } from '@material-ui/core'
import {TextBackground} from '../TextBackground'

export const Greeting = () => {
    return (
        <TextBackground>
            <Typography
                variant="h5"
                align="center"
                style={{ textTransform: "uppercase" }}
            >
                GREETINGS MORTAL
            </Typography>
            <Typography
                variant="h5"
                align="center"
                style={{ textTransform: "uppercase" }}
            >
                SO YOU FOUND YOUR WAY TO THE APE HARMONY PRE-SALE
            </Typography>
            <Typography
                variant="h5"
                align="center"
                style={{ textTransform: "uppercase" }}
            >
                WHERE YOU CAN MINT TODAY BEFORE YOUR 
            </Typography>
            <Typography
                variant="h5"
                align="center"
                style={{ textTransform: "uppercase" }}
            >
                LESS FORTUNATE NEIGHBORS
            </Typography>
            <Typography
                variant="h5"
                align="center"
                style={{ textTransform: "uppercase" }}
            >
                NOW THANKS TO OUR SPOOKY SOLIDITY DEV
            </Typography>
            <Typography
                variant="h5"
                align="center"
                style={{ textTransform: "uppercase" }}
            >
                YOU'LL ALSO ENJOY HAUNTINGLY LOW GAS FEES
            </Typography>
        </TextBackground>
    )
}
