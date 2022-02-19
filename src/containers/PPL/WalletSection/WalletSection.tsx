import React, {useMemo} from 'react'
import {Section} from '../Section'
import {Box, Grid, SelectProps, Typography, useTheme} from "@material-ui/core"
import {Token} from '../Token'
import {useStyles} from "./style";

type TokenSelector = "ALL" | "ARTW" | "AHMC"

type Props = {
    addComponent?: React.ReactNode
    selector: {
        value: TokenSelector
        handleChange?: SelectProps['onChange']
    },
    paggination: {
        max: number,
        current: number,
        step: number,
        setPage: React.Dispatch<React.SetStateAction<number>>
    }
    tokens: {
        value: any[]
        handleClaimOrRegister?: (collection: "artw" | "ahmc", tokenId: string, isRegistered?: boolean) => void
        handleTransfer?: Function
    }
    eth: {
        account: string
    }
}

export const WalletSection = ({paggination, tokens, eth, ...props}: Props) => {
    const classes = useStyles()

    const perDays: Record<string, number> = useMemo(() => ({
        'ahmc': 1,
        'artw': 0.05,
    }), [])

    const totals = {
        accamulated: tokens.value.reduce((r, i) => r + i.accamulated, 0).toFixed(3) + " $PPL",
        claimed: tokens.value.reduce((r, i) => r + i.claimed, 0).toFixed(3) + " $PPL",
        perDay: tokens.value.reduce((r, i) => {
            if (i.collection == "artw" && i.accamulated === 0 && i.claimed === 0) {
                return r
            }
            return r + perDays[i.collection]
        }, 0).toFixed(2) + " $PPL",
    }

    return (
        <Section
            {...props}
            paggination={paggination}
        >
            {tokens.value.length > 0 && <Box
                maxWidth="500px"
                marginBottom="2rem"
            >
                <Typography
                    className={classes.header}
                    variant='subtitle1'
                >
                    <div>
                        Total accumulated:
                    </div>
                    <div>
                        {totals.accamulated}
                    </div>
                </Typography>
                <Typography
                    className={classes.header}
                    variant='subtitle1'
                >
                    <div>
                        Total claimed:
                    </div>
                    <div>
                        {totals.claimed}
                    </div>
                </Typography>
                <Typography
                    className={classes.header}
                    variant='subtitle1'
                >
                    <div>
                        Total per day:
                    </div>
                    <div>
                        {totals.perDay}
                    </div>
                </Typography>
            </Box>}
            {tokens.value.length > 0 ?
                <Grid container spacing={5} justifyContent="center">
                    {tokens.value.slice(paggination.step * paggination.current, paggination.step * (paggination.current + 1)).map((token, i) => {
                        return <Grid item key={i}>
                            <Token
                                {...token}
                                accamulated={(token.collection === "artw" && !token.registered) ? 0 : token.accamulated}
                                handleClaimOrRegister={tokens.handleClaimOrRegister}
                                handleTransfer={tokens.handleTransfer}
                                isOwner
                            />
                        </Grid>
                    })}
                </Grid>
                :
                <>
                    <Typography
                        variant="h1"
                        align="center"
                        className={classes.typo}

                    >No tokens</Typography>
                    {!eth.account &&
                        <Typography variant="h4" align="center" style={{color: "#bababa"}}>Please connect your wallet</Typography>}
                </>
            }
            {/* <Typography color="white">
                <pre>
                    <code>{JSON.stringify(tokens.value, null, 2)}</code>
                </pre>
            </Typography> */}
        </Section>
    )
}
