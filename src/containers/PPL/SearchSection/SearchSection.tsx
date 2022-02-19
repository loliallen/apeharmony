import { Grid, SelectProps, Typography, useTheme } from "@material-ui/core"
import React from 'react'
import { Section } from '../Section'
import { Search } from '../../../components/Search/Search'
import { Token } from '../Token'

type TokenSelector = "ALL" | "ARTW" | "AHMC"

type Props = {
    selector: {
        value: TokenSelector
        handleChange: SelectProps['onChange']
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
        addComponent={<Search disabled={!Boolean(eth.account)} onSearch={onSearch} />}
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
                    variant="h2"
                    align="center"
                    style={{
                        [t.breakpoints.down('sm')]: {
                            fontSize: "4.571429rem"
                        },
                        marginTop: "4rem",
                        color: "gray"
                    }}
                >Tokens from AHMC or ARTW not found</Typography>
                {!eth.account && <Typography variant="h4" align="center" style={{color: "#bababa"}}>Please connect your wallet</Typography>}
            </>
        }
    </Section>)
}
