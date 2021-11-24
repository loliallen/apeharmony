import React, { useCallback, useContext, useEffect, useState } from "react"
import Web3 from "web3"
import EthereumSession from "../lib/EthereumSession"
import contractsABI from "../abis/PPLRewards.json"
import { useAlert } from "./useAlert"
import { useAHMC } from "./useAHMC"


export type TokenSelector = "ALL" | "AHMC" | "ARTW"

interface IPPLContext {
    account: any
    session: any
    tokens: any
    setAccount?: React.Dispatch<React.SetStateAction<any>>
    connect?: () => void
    registerOne?: (ammount: number) => void
    claimOne?: (ammount: number) => void
    transferOne?: (ammount: number) => void
    registerAll?: (ammount: number) => void
    claimAll?: (ammount: number) => void
    getTokens?: (selector?: TokenSelector) => void
}

export const PPLContext = React.createContext<IPPLContext>({
    account: null,
    session: null,
    tokens: [],
})

export const PPLProvider: React.FC = ({ children }) => {
    const { account: ahmcAccount } = useAHMC()
    const { openAlert } = useAlert()
    const [account, setAccount] = useState<any>()
    const [pplSession, setPplSession] = useState<any>()
    const [AHMCTokens, setAHMCTokens] = useState<any[]>([])
    const [ARTWTokens, setARTWTokens] = useState<any[]>([])

    const createSession = () => {
        const session = new EthereumSession({
            chain: EthereumSession.COMMON_CHAINS[1],
            contractAddress: '0x3e51F6422e41915e96A0808d21Babb83bcd278e5',
            contractABI: contractsABI
        })
        setPplSession(session);
        (window as any).ppl_session = session
    }

    const connect = async () => {
        try {
            await pplSession.connectWeb3(true)
            if (!pplSession.hasAccounts()) {
                return openAlert && openAlert("No accounts provided", "error")
            }
            const account = pplSession.wallet.accounts[0];

            setAccount(account)
        } catch (error) {
            console.log(error)
        }
    }

    const registerOne = () => {

    }

    

    useEffect(() => {
        window.alert = () => { }
        createSession()
    }, [])



    return <PPLContext.Provider value={{
        session: pplSession,
        account,
        connect,
        tokens: [...AHMCTokens, ...ARTWTokens]
    }}>
        {children}
    </PPLContext.Provider>
}

export const usePPL = () => {
    return useContext(PPLContext)
}