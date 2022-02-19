import {AppProps} from "next/app"

import React from "react";
import Head from "next/head";
import {CssBaseline, ThemeProvider} from "@material-ui/core";
import {AbiItem} from 'web3-utils'

import {AlertProvider} from '../hooks/useAlert'
import {ETHProvider} from '../hooks/useETH'
import ahmcAbi from '../abis/AHMC'
import pplxAbi from '../abis/PPLRewards'
import ppl20Abi from '../abis/PPL20'
import artwAbi from '../abis/ARTW'
import suplAbi from '../abis/Supl'
import suplEthAbi from '../abis/SuplETH'
import {theme} from '../app/theme'
import '../styles/style.css'
import '../styles/index.css'

const App = (props: AppProps & { emotionCache: any }) => {

    const {Component, pageProps} = props;
    React.useEffect(() => {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) {
            jssStyles.parentElement?.removeChild(jssStyles);
        }
    }, []);
    return (
        <>
            <Head>
                <meta name="viewport" content="initial-scale=1, width=device-width" />
                <title>Apeharmony</title>
            </Head>
            <ThemeProvider theme={theme}>
                <CssBaseline />
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
                                address: '0x3cccba37c7514be89d7258e89ea83f3841499103'
                            },
                            "supleth": {
                                abi: suplEthAbi as AbiItem[],
                                address: '0x466eC8D7d6A22e37Ea397B2355a200231DeCA0E6'
                            },
                        }}>
                            <Component {...pageProps}/>
                    </ETHProvider>
                </AlertProvider>
            </ThemeProvider>
        </>
    )
}

export default App