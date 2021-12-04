import { createTheme, ThemeProvider } from '@mui/material/styles'
import { HashRouter as Router } from "react-router-dom"
import { AbiItem } from 'web3-utils'

import { Pages } from '../pages'
import { AlertProvider } from '../hooks/useAlert'
import { ETHProvider } from '../hooks/useETH'
import ahmcAbi from '../abis/AHMC.json'
import pplxAbi from '../abis/PPLRewards.json'
import ppl20Abi from '../abis/PPL20.json'
import artwAbi from '../abis/ARTW.json'
import suplAbi from '../abis/SUPL.json'
const defaultTheme = createTheme()

export const theme = createTheme({
    palette: {
        primary: {
            main: "#CD0067"
        },
        secondary: {
            main: "#999999"
        },
    },
    typography: {
        fontFamily: [
            'Pixeloid',
        ].join(' '),
        fontWeightMedium: 550,
        fontSize: 20,
        h6: {
            [defaultTheme.breakpoints.down('sm')]: {
                fontSize: "1.3rem"
            }
        }
    },
    components: {
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundColor: "hsla(0, 0%, 0%, 0.8)",
                }
            }
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    ":disabled": {
                        backgroundColor: "hsla(330, 66%, 40%, 1)",
                        color: "hsla(0, 0%, 82%, 1)",
                    }

                }
            },
        }
    }
})

export const App = () => {
    return (
        <Router>
            <ThemeProvider theme={theme}>
                <AlertProvider>
                    <ETHProvider
                        contracts={{
                            "ahmc": {
                                abi: ahmcAbi as AbiItem[],
                                address: "0x61DB9Dde04F78fD55B0B4331a3d148073A101850"
                            },
                            "pplx": {
                                abi: pplxAbi as AbiItem[],
                                address: "0x625D2534f9a7A92e7eAf859F0d70c6343cF7728d"
                            },
                            "artw": {
                                abi: artwAbi as AbiItem[],
                                address: '0x22d202872950782012baC53346EE3DaE3D78E0CB'
                            },
                            "ppl20": {
                                abi: ppl20Abi as AbiItem[],
                                address: '0x3e51F6422e41915e96A0808d21Babb83bcd278e5'
                            },
                            "supl": {
                                abi: suplAbi as AbiItem[],
                                address: '0xb22295d20F1f40D55E01E3f1902BAa47ceeCc34A'
                            }
                        }}>
                        <Pages />
                    </ETHProvider>
                </AlertProvider>
            </ThemeProvider>
        </Router>
    )
}
