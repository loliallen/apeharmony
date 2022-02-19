import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    FormControl,
    FormControlLabel,
    FormLabel,
    MenuItem,
    Radio,
    RadioGroup,
    Select,
    Theme,
    Typography,
    useMediaQuery,
    useTheme
} from "@material-ui/core"
import {makeStyles} from "@material-ui/core"
import React, {ChangeEvent, useState} from 'react'
import {useAHMC} from '../../hooks/useAHMC'
import {useARTW} from '../../hooks/useARTW'
import {useSUPL} from '../../hooks/useSUPL'
import {useETH} from '../../hooks/useETH'
import {Body} from '../Body'
import {StyledButton} from '../StyledButton'
import {prepareTokens} from './helpers'
import {useAlert} from '../../hooks/useAlert'

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
    }),
    {name: "SubTabStyles"}
)
export const SupTab = () => {
    const classes = useStyles()
    const eth = useETH()
    const supl = useSUPL()
    const artw = useARTW()
    const ahmc = useAHMC()
    const {openAlert} = useAlert()

    const t = useTheme()
    const sm = useMediaQuery(t.breakpoints.down('sm'))
    const md = useMediaQuery(t.breakpoints.between('sm', 'md'))

    const [count, setCount] = useState(1)
    const [selector, setSelector] = useState<string>("$PPL")

    const [open, setOpen] = useState(false)
    const [from, setFrom] = useState<"wallet" | "token">("token")


    const purcase = async () => {
        if (selector === "$PPL") {
            if (from === "token") {
                const [err, tokens] = prepareTokens([...ahmc.tokens, ...artw.tokens], supl.price.ppl, count)
                if (err)
                    return openAlert && openAlert(err.message, "error")
                await supl.purchase(count, tokens!)
            } else {
                await supl.purchase(count)
            }
        }
    }
    const handlePurcase = async () => {
        if (selector === "$PPL")
            setOpen(true)
        else
            await supl.purchaseEth(count)
    }

    const handleSubmit = () => purcase()
    const handleClose = () => setOpen(false)

    return (
        <Box
            minHeight="90vh"
            padding="2rem"
        >
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
            <Body
                srcs={[
                    '/supladies/1.png',
                    '/supladies/2.png',
                    '/supladies/3.png',
                ]}
            />
            </div>
            <Box>
                {eth.account && <Box
                    display="flex"
                    justifyContent="center"
                >
                    <Select
                        variant={"outlined"}
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
                        onClick={handlePurcase}
                        style={{
                            borderBottom: "1px solid black",
                            borderTop: "1px solid black",
                        }}
                        disabled
                    >
                        Purchase
                    </StyledButton>
                    <Select
                        variant={"outlined"}
                        value={selector}
                        onChange={(e) => setSelector(e.target.value as string)}
                        color="primary"
                        className={classes.select}
                    >
                        {["$PPL", "$ETH"].map((i) =>
                            <MenuItem
                                className={classes.menu}
                                key={i}
                                value={i}
                            >{i}</MenuItem>
                        )}
                    </Select>
                </Box>}
                <Box
                    padding="0px 5rem"
                    sx={{
                        [t.breakpoints.down('sm')]: {
                            padding: "0px 2rem"
                        }
                    }}
                >
                    <Typography style={{ marginTop: "1rem", paddingBottom: "1rem" }} align="center" variant="h3">SOLD
                        OUT!</Typography>
                    <Typography style={{ marginTop: "2rem", paddingBottom: "1rem" }} align="center" variant="h4">You
                        have {supl.vouchers} {`voucher${supl.vouchers === 1 ? "" : "s"}`}</Typography>
                </Box>
            </Box>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogContent style={{color: "white"}}>
                    <FormControl component="fieldset">
                        <FormLabel style={{color: "white"}} component="legend">Purchase from</FormLabel>
                        <RadioGroup
                            aria-label="gender"
                            defaultValue="female"
                            name="radio-buttons-group"
                            onChange={(_, value) => setFrom(value as "wallet" | "token")}
                        >
                            <FormControlLabel value="wallet" control={<Radio style={{color: "white"}}/>} label="Wallet"/>
                            <FormControlLabel value="token" control={<Radio style={{color: "white"}}/>} label="Tokens"/>
                        </RadioGroup>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button variant='outlined' onClick={handleSubmit}>Submit</Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}
