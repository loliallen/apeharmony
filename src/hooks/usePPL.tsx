import Web3 from "web3"
import config from "../app/config"
import { useAlert } from "./useAlert"
import { useETH } from "./useETH"


export type Token = {
    id: string
    src: string
    accamulated?: number
    claimed?: number
    collection?: string
    registered?: boolean
}

export const usePPL = () => {
    const { openAlert } = useAlert()
    const eth = useETH()

    const pplx = eth.contracts['pplx']
    const ppl20 = eth.contracts['ppl20']
    const ahmc = eth.contracts['ahmc']
    const artw = eth.contracts['artw']


    const register = async (address: string, tokenIds: string | string[] | number | number[]) => {
        console.log([address], [tokenIds])
        try {
            if (Array.isArray(tokenIds))
                await pplx.methods.registerTokens(tokenIds.map(() => address), tokenIds, true).call()
            else
                await pplx.methods.registerTokens([address], [tokenIds], true).call()
            openAlert && openAlert(`Token${Array.isArray(tokenIds) ? 's' : ''} was registered!`, "info")
        } catch (e) {
            console.log("register:", e)
            if (e instanceof Error)
                openAlert && openAlert(e.message, "error")
        }
    }

    const claim = async (address: string, tokenIds: string | string[]) => {
        try {
            if (Array.isArray(tokenIds))
                await pplx.methods.claimToTokens(tokenIds.map(() => address), tokenIds).call()
            else
                await pplx.methods.claimToTokens([address], [tokenIds]).call()
            openAlert && openAlert(`Token${Array.isArray(tokenIds) ? 's' : ''} was claimed!`, "info")
        } catch (e) {
            console.log("claim:", e)
            if (e instanceof Error)
                openAlert && openAlert(e.message, "error")
        }
    }
    const transfer = async (wallet_address: string, address: string, tokenIds: string | string[]) => {
        try {
            if (Array.isArray(tokenIds))
                await ppl20.methods.transferTokens2Account(tokenIds.map(() => address), tokenIds, wallet_address).call()
            else
                await ppl20.methods.transferTokens2Account([address], [tokenIds], wallet_address).call()
            openAlert && openAlert(`Token${Array.isArray(tokenIds) ? 's' : ''} was transfered!`, "info")
        } catch (e) {
            console.log("transfer:", e)
            if (e instanceof Error)
                openAlert && openAlert(e.message, "error")
        }
    }

    const getTokenMetadata = async (addr: string, tokenId: string) => {
        const base10 = Web3.utils.toBN('10');
        let decimals = await ppl20.methods.decimals().call();
        decimals = Web3.utils.toBN(decimals - 3);
        const divisor = base10.pow(decimals);

        let accamulated = await pplx.methods.checkToken(addr, tokenId).call()
        accamulated = Web3.utils.toBN(accamulated)
        accamulated = accamulated.div(divisor)
        let registered = await pplx.methods.isRegistered(addr, tokenId).call()
        // const data = await contractX.methods.claimToTokens(addr, parseInt(tokenId)).call()
        // console.log('claimToToken', data)
        const claimed = await ppl20.methods.balanceOfToken(addr, tokenId).call()
        return {
            accamulated: Number(accamulated) / 1000,
            claimed: Number(claimed) / 1000,
            registered: registered
        }

    }

    const getAHMCTokens = async (): Promise<{ id: string, src: string }[]> => {
        const name = "AHMC #"
        let balance = await ahmc.methods.balanceOf(eth.account).call();
        if (isNaN(balance))
            return []
        balance = parseInt(balance);
        if (balance < 0)
            return []

        const tIds: any[] = []
        for (let i = 0; i < balance; ++i) {
            const tokenId = await ahmc.methods.tokenOfOwnerByIndex(eth.account, i).call()
            tIds.push({ id: tokenId, name: name + tokenId });
        }
        for (let tokenId of tIds) {
            try {
                const url = await ahmc.methods.tokenURI(tokenId.id).call();
                const response = await fetch(url, { mode: 'no-cors' });
                if (response.ok) {
                    const data = await response.json();
                    console.log("data", data)
                    tokenId.src = data.image;
                }
                else {
                    tokenId.src = 'https://apeharmony.com/incubator-2048.gif';
                }
            }
            catch (err) {
                console.log(err)
            }
        }
        return tIds
    }

    const getARTWTokens = async (): Promise<{ id: string, src: string }[]> => {
        const name = "ARTW #"
        let balance = await artw.methods.balanceOf(eth.account).call();
        if (isNaN(balance)) return []
        balance = parseInt(balance)
        if (balance <= 0) return []
        const tids: any[] = []
        const _tids = await artw.methods.walletOfOwner(eth.account).call()
        for (let tokenId of _tids) {
            const url = await artw.methods.tokenURI(tokenId).call();
            try {
                const response = await fetch(url, { mode: 'no-cors' });
                if (response.ok) {
                    const data = await response.json();
                    tids.push({ id: tokenId, src: data.image, name: name + tokenId })
                }
                else {
                    tids.push({ id: tokenId, src: `https://dhsv99qu6u1yj.cloudfront.net/images/${tokenId}.png`, name: name + tokenId })
                }
            }
            catch (err) {
                console.log(err)
            }
        }
        return tids
    }

    const getTokens = async (cName: "ahmc" | "artw") => {
        // eth.account = "0xC7f02456dD3FC26aAE2CA1d68528CF9764bf5598"
        let contract_addresses = ""
        let loadFn: () => Promise<{ id: string, src: string }[]>;
        if (cName === "ahmc") {
            contract_addresses = config.contract_addresses.ahmc
            loadFn = getAHMCTokens
        } else {
            contract_addresses = config.contract_addresses.artw
            loadFn = getARTWTokens
        }
        const tokens: Token[] = await loadFn()
        for (let token of tokens) {
            token.collection = cName
            try {
                const metadata = await getTokenMetadata(contract_addresses, token.id)
                token.accamulated = metadata.accamulated
                token.claimed = metadata.claimed
                token.registered = metadata.registered
            } catch {
                token.accamulated = 0
                token.claimed = 0
                token.registered = false
            }

        }
        return tokens
    }

    return {
        contractX: pplx,
        contract20: ppl20,
        register,
        claim,
        transfer,
        getTokens
    }
}