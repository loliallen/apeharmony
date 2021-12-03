import { Box, ButtonGroup, MenuItem, Select, Theme, Typography, useMediaQuery, useTheme } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { useState } from 'react'
import { Body } from '../Body'
import { StyledButton } from '../StyledButton'

import { addresses } from './__mocks'

const useStyles = makeStyles<Theme>(t => ({
    select: {
        backgroundColor: "hsla(0, 0%, 0%, 0.6)",
        color: "white",
        height: "100%",
        '& .MuiSvgIcon-root': {
            color: t.palette.common.white
        }
    },
    menu: {
        backgroundColor: "hsla(0, 0%, 0%, 0.6)",
        color: "white"
    },
}))
export const SupTab = () => {
    const classes = useStyles()
    const t = useTheme()
    const sm = useMediaQuery(t.breakpoints.down('sm'))
    const md = useMediaQuery(t.breakpoints.between('sm', 'md'))


    const [count, setCount] = useState(1)
    const [users, setUsers] = useState(addresses)

    const [page, setPage] = useState(0)
    const step = 10
    const maxPages = Math.round(users.length / step)



    return (
        <Box
            minHeight="90vh"
            padding="2rem"
        >
            <Body
                srcs={[
                    '/supladies/1.png',
                    '/supladies/2.png',
                    '/supladies/3.png',
                ]}
            />
            <Box>
                <Box
                    display="flex"
                    justifyContent="center"
                >
                    <Select
                        value={count}
                        onChange={(e) => setCount(e.target.value as number)}
                        color="primary"
                        className={classes.select}
                    >
                        {Array.from(Array(20).keys()).map((i) =>
                            <MenuItem
                                className={classes.menu}
                                key={i}
                                value={i + 1}
                            >{i + 1}</MenuItem>
                        )}
                    </Select>
                    <StyledButton
                        color="primary"
                        border
                    >
                        Purchase
                    </StyledButton>
                </Box>
                <Box
                    padding="0px 5rem"
                    sx={{
                        [t.breakpoints.down('sm')]: {
                            padding: "0px 2rem"
                        }
                    }}
                >
                    <Typography paddingBottom="1rem" variant="h4" color="white">Voucher list</Typography>
                    <Box
                        height="500px"
                    >
                        {addresses.sort((a, b) => b.ammount - a.ammount).slice(page * step, (page + 1) * step).map(user => {
                            return <Box
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                                key={user.address}
                            >
                                <Typography color="white" variant="h5">
                                    {sm ?
                                        `${user.address.substr(0, 4)}...${user.address.slice(11, 14)}`
                                        :
                                        md ?
                                            `${user.address.substr(0, 4)}...${user.address.slice(11, 18)}`
                                            :
                                            user.address
                                    }</Typography>
                                <Typography color="white" variant="h5">{user.ammount}</Typography>
                            </Box>
                        })}
                    </Box>
                    <Box
                        display="flex"
                        flexDirection="row-reverse"
                    >
                        {maxPages > 0 && <ButtonGroup>
                            <StyledButton variant="contained" disabled={page == 0} onClick={() => setPage(p => p - 1)}>Prev</StyledButton>
                            <StyledButton variant="contained" >{page + 1}</StyledButton>
                            <StyledButton variant="contained" disabled={((page + 1) === maxPages)} onClick={() => setPage(p => p + 1)}>Next</StyledButton>
                        </ButtonGroup>}
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}
