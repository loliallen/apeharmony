import React, { useEffect, useState } from 'react'
import Web3 from 'web3'
import Web3Modal from 'web3modal'
import { AbiItem } from 'web3-utils'
import WalletConnectProvider from '@walletconnect/web3-provider'
import WalletLink from 'walletlink'
import { Contract } from 'web3-eth-contract'

type State = {
    contracts: Record<string, Contract>
    provider: any
    account: string
    web3cli: Web3 | null
}

type Methods = {
    connectWallet: () => void
    hasAccounts: () => boolean
    createSign: (data: any) => Promise<string>
}

type ContractProps = { abi: AbiItem | AbiItem[], address: string }

type Options = {
    account?: string
    contracts: Record<string, ContractProps>
    provider?: any
}

const ETHContext = React.createContext<State & Methods>({
    contracts: {},
    provider: null,
    account: "",
    web3cli: null,
    connectWallet: () => {
    },
    hasAccounts: () => false,
    createSign: async (v) => "",
})

export const ETHProvider: React.FC<Options> = ({
    children,
    contracts: contractsProp,
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
                    options: {
                        infuraId: "4fde0a6e37be4e0f90efc92de4b6c483"
                    }
                },
                'custom-coinbase': {
                    display: {
                        logo: '/coinbase.webp',
                        name: 'Coinbase',
                        description: 'Scan with WalletLink to connect',
                    },
                    options: {
                        appName: 'Ape Harmony Monster Club', // Your app name
                        networkUrl: `https://mainnet.infura.io/v3/4fde0a6e37be4e0f90efc92de4b6c483`,
                        chainId: 1,
                    },
                    package: WalletLink,
                    connector: async (_, options) => {
                        const { appName, networkUrl, chainId } = options
                        const walletLink = new WalletLink({
                            appName
                        });
                        const provider = walletLink.makeWeb3Provider(networkUrl, chainId);
                        await provider.enable();
                        return provider;
                    },
                }
            },
            disableInjectedProvider: false,
        })
        return web3modal.connect()
    }

    const connectAccounts = async (w3c: Web3 | null) => {
        if (!w3c)
            return
        const accounts = await w3c.eth.getAccounts()
        setAccounts(accounts)
        if (accounts.length > 0)
            setState({ account: accounts[0] })
    }

    const connectWallet = async () => {
        let newWeb3cli = web3cli;
        let newContracts = contracts;
        let newProvider = provider;
        if (!provider)
            newProvider = await createProvider()
        if (!web3cli && newProvider) {
            newWeb3cli = new Web3(newProvider)
        }

        if (Object.keys(newContracts).length === 0)
            newContracts = Object.keys(contractsProp).reduce<State['contracts']>((r, i) => {
                r[i] = new newWeb3cli!.eth.Contract(contractsProp[i].abi, contractsProp[i].address)
                return r
            }, {})

        console.log(newContracts)
        // connect accounts

        await connectAccounts(newWeb3cli)

        const data: Record<string, any> = {}
        if (newWeb3cli != web3cli)
            data.web3cli = newWeb3cli
        data.provider = newProvider
        data.contracts = newContracts
        setState(data)
    }

    const hasAccounts = () => accounts.length > 0


    const createSign = async (data: any) => {

        const hash = JSON.stringify(data)

        //signature = "0xab2d8b24786a2e1aeaf4029b5cb0865eece5c98df037e0ade1723e76ee7a1d575ffacdd077df1b4796b0624d7146146a3636211167ba71dfeddcafb2a1c9acce1b";
        if (!hash) throw Error("Signature hash validation failed!");
        const signature = await state.web3cli?.eth.personal.sign(
            hash,
            state.account,
            ""
        );
        //signer = "0xc7f02456dd3fc26aae2ca1d68528cf9764bf5598";
        const signer = await state.web3cli?.eth.personal.ecRecover(hash, signature!);
        if (state.account === signer) throw Error("Signature validation failed!");
        console.log(signature)
        if (!signature)
            throw new Error('Bad signature')
        return signature;
    }

    useEffect(() => {
        init()
    }, [])

    return <ETHContext.Provider value={{ ...state, connectWallet, hasAccounts, createSign }}>
        {children}
    </ETHContext.Provider>
}



export const useETH = () => React.useContext(ETHContext)
