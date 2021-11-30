import { Grid, SelectChangeEvent, Typography, useTheme } from '@mui/material'
import React from 'react'
import { Section } from './Section'
import { Search } from '../../components/Search/Search'
import { Token } from './Token'

type TokenSelector = "ALL" | "ARTW" | "AHMC"

type Props = {
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
    onSearch: (tokenId: string) => void
    tokens: {
        value: any[]
        handleClaimOrRegister?: (collection: string, tokenId: string, isRegistered?: boolean) => void
        handleTransfer?: Function
    }
    eth: any
}
export const SearchSection = ({ paggination, onSearch, tokens, eth, ...props }: Props) => {
    const t = useTheme()
    return (<Section
        {...props}
        paggination={paggination}
        addComponent={<Search onSearch={onSearch} />}
    >
        {tokens.value.length > 0 ?
            <Grid container spacing={5} justifyContent="center">
                {tokens.value.filter(t => props.selector.value !== "ALL" ? t.collection === props.selector.value.toLowerCase() : true).slice(paggination.step * paggination.current, paggination.step * (paggination.current + 1)).map((token, i) => {
                    return <Grid item key={i}>
                        <Token
                            {...token}
                        />
                    </Grid>
                })}
            </Grid>
            :
            <>
                <Typography
                    marginTop="4rem"
                    variant="h2"
                    align="center"
                    sx={{
                        [t.breakpoints.down('sm')]: {
                            fontSize: "4.571429rem"
                        }
                    }}
                    color="gray"
                >Tokens from AHMC or ARTW not found</Typography>
                {!eth.account && <Typography variant="h4" align="center" color="#bababa">Please connect your wallet</Typography>}
            </>
        }
    </Section>)
}
