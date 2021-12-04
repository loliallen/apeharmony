import { useEffect, useState } from "react"
import Web3 from "web3"
import { useAlert } from "./useAlert"
import { useETH } from "./useETH"

export const useSUPL = () => {
    const { openAlert } = useAlert()
    const eth = useETH()
    const [vouchers, setVouchers] = useState(0)
    const [price, setPrice] = useState<{ ppl: number, eth: number }>({ ppl: 0, eth: 0 })
    const [count, setCount] = useState(0)
    const [maxCount, setMaxCount] = useState(0)

    const contract = eth.contracts['supl']
    const sendArgs: Record<string, string> = {
        from: eth.account
    }

    const purcase = async (quantity: number, tokens?: { addr: string[], ids: string[] }) => {
        let success = false,
            error: Error | null = null
        try {
            if (tokens) {
                await contract.methods.mintVouchersFromTokens(quantity, tokens.addr, tokens.ids).send(sendArgs)
            } else {
                await contract.methods.mintVouchersFromAccount(quantity).send(sendArgs)
            }
            success = true
        } catch (e) {
            if (e instanceof Error)
                error = e
        }
        if (!success) {
            sendArgs['type'] = '0x1'
            try {
                if (tokens) {
                    await contract.methods.mintVouchersFromTokens(quantity, tokens.addr, tokens.ids).send(sendArgs)
                } else {
                    await contract.methods.mintVouchersFromAccount(quantity).send(sendArgs)
                }
                success = true
            } catch (e) {
                if (e instanceof Error)
                    error = e
            }
        }
        if (success)
            openAlert && openAlert(`${quantity} vouchers${quantity > 1 ? 's' : ''} bought!`, "info")
        else if (error)
            openAlert && openAlert(error.message, "error")
    }

    const checkWallet = async (address?: string) => {
        contract.methods.vouchers(address || eth.account)
    }

    const getCounters = async () => {
        if (!contract)
            return
        const base10 = Web3.utils.toBN('10');
        try {
            const divisorPpl = base10.pow(Web3.utils.toBN('16'));
            const divisorEth = base10.pow(Web3.utils.toBN('14'));
            let ppl = await contract.methods.PPL_PRICE().call()
            let eth = await contract.methods.ETH_PRICE().call()
            ppl = Web3.utils.toBN(ppl)
            ppl = ppl.div(divisorPpl)
            eth = Web3.utils.toBN(eth)
            eth = eth.div(divisorEth)
            console.log({ ppl, eth })
            setPrice({ ppl: ppl / 100, eth: eth / 10000 })
        } catch (e) {
            console.error(e)
        }
        try {
            const max = await contract.methods.MAX_VOUCHERS().call()
            const data = await contract.methods.voucherCount().call()
            setCount(max - data)
            setMaxCount(max)
        } catch (e) {
            console.error(e)
        }
    }

    useEffect(() => {
        if (contract)
            getCounters()
    }, [contract])

    return {
        price,
        vouchers,
        count,
        maxCount,
        purcase,
        checkWallet
    }
}
