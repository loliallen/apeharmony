import React, { useMemo } from 'react'
import { Section } from './Section'
import { Box, Grid, SelectChangeEvent, Typography, useTheme } from '@mui/material'
import { Token } from './Token'

type TokenSelector = "ALL" | "ARTW" | "AHMC"

type Props = {
    addComponent?: React.ReactNode
    selector: {
        value: TokenSelector
        handleChange: (e: SelectChangeEvent<TokenSelector>) => void
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

export const WalletSection = ({ paggination, tokens, eth, ...props }: Props) => {
    const t = useTheme()

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
                    color="white"
                    variant='subtitle1'
                    lineHeight="1.3"
                    paddingLeft="2rem"
                    display="flex"
                    justifyContent="space-between"
                >
                    <div>
                        Total accumulated:
                    </div>
                    <div>
                        {totals.accamulated}
                    </div>
                </Typography>
                <Typography
                    color="white"
                    variant='subtitle1'
                    lineHeight="1.3"
                    paddingLeft="2rem"
                    display="flex"
                    justifyContent="space-between"
                >
                    <div>
                        Total claimed:
                    </div>
                    <div>
                        {totals.claimed}
                    </div>
                </Typography>
                <Typography
                    color="white"
                    variant='subtitle1'
                    lineHeight="1.3"
                    paddingLeft="2rem"
                    display="flex"
                    justifyContent="space-between"
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
                            />
                        </Grid>
                    })}
                </Grid>
                :
                <>
                    <Typography
                        marginTop="4rem"
                        variant="h1"
                        align="center"
                        sx={{
                            [t.breakpoints.down('sm')]: {
                                fontSize: "4.571429rem"
                            }
                        }}
                        color="gray"
                    >No tokens</Typography>
                    {!eth.account && <Typography variant="h4" align="center" color="#bababa">Please connect your wallet</Typography>}
                </>
            }
        </Section>
    )
}
