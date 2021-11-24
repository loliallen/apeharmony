import Web3 from "web3"
import { useAlert } from "./useAlert"
import { useETH } from "./useETH"

export const useAHMC = () => {
    const { openAlert } = useAlert()
    const eth = useETH()

    const contract = eth.contracts['ahmc']

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

    return { ...eth, makeMint }
}