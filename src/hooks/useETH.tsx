import React, { useEffect, useState } from 'react'
import Web3 from 'web3'
import Web3Modal from 'web3modal'
import { AbiItem } from 'web3-utils'
import WalletConnectProvider from '@walletconnect/web3-provider'
import { Contract } from 'web3-eth-contract'

type State = {
    contracts: Record<string, any>
    provider: any
    account: string
    web3cli: Web3 | null
}

type Methods = {
    connectWallet: () => void
    hasAccounts: () => boolean
}

type AvaliableCN = 'ahmc' | 'artw' | 'pplx'

type Options = {
    account?: string
    contracts: Record<string, { abi: AbiItem | AbiItem[], address: string }>
    provider?: any
}

const ETHContext = React.createContext<State & Methods>({
    contracts: {},
    provider: null,
    account: "",
    web3cli: null,
    connectWallet: () => { },
    hasAccounts: () => false,
})

export const ETHProvider: React.FC<Options> = ({
    children,
    ...options
}) => {
    const [state, set] = useState<State>({
        contracts: {},
        provider: null,
        account: "",
        web3cli: null
    })
    const [accounts, setAccounts] = useState<string[]>([])

    const {
        provider,
        web3cli,
        contracts
    } = state

    const setState = (data: Partial<State>) => set(p => ({ ...p, ...data }))

    const init = () => {
        setState(options)
    }

    const createProvider = () => {
        if (provider)
            return new Promise(r => r(provider))
        if (options.provider)
            return new Promise(r => r(options.provider))
        const web3modal = new Web3Modal({
            cacheProvider: false,
            providerOptions: {
                walletconnect: {
                    package: WalletConnectProvider,
                },
            },
            disableInjectedProvider: false,
        })
        return web3modal.connect()
    }

    const connectAccounts = async (w3c: Web3 | null) => {
        console.log("w3c", w3c)
        if (!w3c)
            return
        const accounts = await w3c.eth.getAccounts()
        console.log(accounts)
        setAccounts(accounts)
        if (accounts.length > 0)
            setState({ account: accounts[0] })
    }

    const connectWallet = async () => {
        let newWeb3cli = web3cli;
        let newContracts = contracts;
        let newProvider = provider;
        console.log('provider', newProvider)
        if (!provider)
            newProvider = await createProvider()
            
        console.log('provider', newProvider)
        if (!web3cli && newProvider) {
            newWeb3cli = new Web3(newProvider)
        }
        if (Object.keys(contracts).some(k => contracts[k].abi && contracts[k].address))
            newContracts = Object.keys(contracts).reduce<State['contracts']>((r, i) => {
                r[i] = new newWeb3cli!.eth.Contract(contracts[i].abi, contracts[i].address)
                return r
            }, {})

        // connect accounts
        console.log(newContracts)

        await connectAccounts(newWeb3cli)

        const data: Record<string, any> = {}
        if (newWeb3cli != web3cli)
            data.web3cli = newWeb3cli
        data.provider = newProvider
        data.contracts = newContracts
        setState(data)
    }

    const hasAccounts = () => accounts.length > 0

    useEffect(() => {
        init()
    }, [])

    return <ETHContext.Provider value={{ ...state, connectWallet, hasAccounts }}>
        {children}
    </ETHContext.Provider>
}



export const useETH = () => React.useContext(ETHContext)
