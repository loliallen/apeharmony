import { createTheme, ThemeProvider } from '@mui/material/styles'
import { BrowserRouter } from "react-router-dom"

import { Pages } from '../pages'
import { AlertProvider } from '../hooks/useAlert'
import { ETHProvider } from '../hooks/useETH'
import ahmcAbi from '../abis/AHMC.json'
import pplxAbi from '../abis/PPLRewards.json'
import artwAbi from '../abis/ARTW.json'
import { AbiItem } from 'web3-utils'

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
    },
    components: {
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundColor: "hsla(0, 0%, 0%, 0.8)",
                }
            }
        }
    }
})

export const App = () => {
    return (
        <BrowserRouter>
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
                                address: '0x3e51F6422e41915e96A0808d21Babb83bcd278e5'
                            },
                            "artw": {
                                abi: pplxAbi as AbiItem[],
                                address: '0x22d202872950782012baC53346EE3DaE3D78E0CB'
                            }
                        }}>
                        <Pages />
                    </ETHProvider>
                </AlertProvider>
            </ThemeProvider>
        </BrowserRouter>
    )
}
