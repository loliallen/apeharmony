import React from 'react'
import { Section } from './Section'
import { Grid, SelectChangeEvent, Typography, useTheme } from '@mui/material'
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
    return (
        <Section
            {...props}
            paggination={paggination}
        >
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
