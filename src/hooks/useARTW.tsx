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
            let sendArgs: any = {
                'from': eth.account,
                'value': valueBN.toString()
            }

            let success = false;
            try{
                await contract.methods.mint(quantityBN.toString()).send( sendArgs );
                success = true;
            }
            catch( err: any ){
                if( err.code && err.code !== -32602 )
                    throw err
            }

            if( !success ){
                sendArgs = {
                    'from': eth.account,
                    'value': valueBN.toString(),
                    'type': '0x1'
                };
                await contract.methods.mint(quantityBN.toString()).send( sendArgs );
            }
        } catch (error) {
            if (error instanceof Error)
                openAlert && openAlert(error.message, "error")
        }
    }

    const getTokens = async () => {
        if (!contract)
            return
        const tokens = await ppl.getTokens("artw")
        setTokens(tokens)
    }

    const registerOne = (tokenId: string) => ppl.register(config.contract_addresses.artw, Number(tokenId))
    const registerAll = () => ppl.register(config.contract_addresses.artw, tokens.filter(t => !t.registered).map(t => Number(t.id)))
    const claimOne = (tokenId: string) => ppl.claim(config.contract_addresses.artw, tokenId)
    const claimAll = () => {
        const tc = claimAllData()
        ppl.claim(tc.address, tc.tokens)
    }
    const claimAllData = () => {
        const ct = tokens.filter(t => t.registered && t.accamulated! > 0)
        return { address: ct.map(() => config.contract_addresses.artw), tokens: ct.map(t => t.id) }
    }
    const transferOne = (tokenId: string, to: string) => ppl.transfer(to, config.contract_addresses.artw, tokenId)
    const transferAll = (to: string) => {
        const tt = transferAllData()
        ppl.transfer(to, tt.address, tt.tokens)
    }
    const transferAllData = () => {
        const tt = tokens.filter(t => t.claimed && t.claimed > 0)
        return { address: tt.map(() => config.contract_addresses.artw), tokens: tt.map(t => t.id) }
    }


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
        claimAllData,
        transferOne,
        transferAll,
        transferAllData
    }
}