import { useEffect, useState } from "react"
import Web3 from "web3"
import config from "../app/config"
import { useAlert } from "./useAlert"
import { useETH } from "./useETH"
import { Token, usePPL } from "./usePPL"

export const useARTW = () => {
    const { openAlert } = useAlert()
    const eth = useETH()
    const ppl = usePPL()

    const contract = eth.contracts['artw']


    const [tokens, setTokens] = useState<Token[]>([])

    const makeMint = async (ammount: number) => {
        await eth.connectWallet()
        if (!eth.hasAccounts()) {
            return openAlert && openAlert("No accounts provided", "error")
        }
        try {
            const price = await contract.methods.price().call();
            const priceBN = Web3.utils.toBN(price);

            const quantityBN = Web3.utils.toBN(ammount);

            const valueBN = quantityBN.mul(priceBN);
            await contract.methods.mint(quantityBN.toString()).send({ 'from': eth.account, 'value': valueBN.toString() });
        } catch (error) {
            console.error(error)
            if (error instanceof Error)
                openAlert && openAlert(error.message, "error")
        }
    }

    const getTokens = async () => {
        console.log('contract', contract)
        if (!contract)
            return
        const tokens = await ppl.getTokens("artw")
        setTokens(tokens)
    }

    const registerOne = (tokenId: string) => ppl.register(config.contract_addresses.artw, Number(tokenId))
    const registerAll = () => ppl.register(config.contract_addresses.artw, tokens.map(t => Number(t.id)))
    const claimOne = (tokenId: string) => ppl.claim(config.contract_addresses.artw, tokenId)
    const claimAll = () => ppl.claim(config.contract_addresses.artw, tokens.map(t => t.id))
    const transferOne = (tokenId: string, to: string) => ppl.transfer(to, config.contract_addresses.artw, tokenId)
    const transferAll = (to: string) => ppl.transfer(to, config.contract_addresses.artw, tokens.map(t => t.id))


    useEffect(() => {
        if (contract && contract.methods)
            getTokens()
    }, [contract])

    return {
        ...eth,
        makeMint,
        getTokens,
        tokens,
        registerOne,
        registerAll,
        claimOne,
        claimAll,
        transferOne,
        transferAll
    }
}