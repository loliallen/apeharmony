import { useState } from "react"
import Web3 from "web3"
import { useAlert } from "./useAlert"
import { useETH } from "./useETH"

export const useARTW = () => {
    const { openAlert } = useAlert()
    const eth = useETH()

    const contract = eth.contracts['ahmc']


    const [tokens, setTokens] = useState<any[]>([])

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
        await eth.connectWallet()
        if (!contract)
            return
        console.log(contract.methods)
        const tokenIds = await contract.methods.walletOfOwner(eth.account).call();
        console.log(tokenIds)
        setTokens(tokenIds)
    }

    return { ...eth, makeMint, getTokens, tokens }
}