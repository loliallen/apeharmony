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
        if (Array.isArray(tokenIds) && tokenIds.length === 0)
            return openAlert && openAlert('0 tokens are avalibe to register', "warning")
        try {
            if (Array.isArray(tokenIds))
                await pplx.methods.registerTokens(Array.isArray(address) ? address : tokenIds.map(() => address), tokenIds, true).send({ from: eth.account })
            else
                await pplx.methods.registerTokens([address], [tokenIds], true).send({ from: eth.account })
            openAlert && openAlert(`Token${Array.isArray(tokenIds) ? 's' : ''} registered!`, "info")
        } catch (e) {
            console.log("register:", e)
            if (e instanceof Error)
                openAlert && openAlert(e.message, "error")
        }
    }

    const claim = async (address: string | string[], tokenIds: string | string[]) => {
        if (Array.isArray(tokenIds) && tokenIds.length === 0)
            return openAlert && openAlert('0 tokens are avalibe to claim', "warning")
        try {
            if (Array.isArray(tokenIds))
                await pplx.methods.claimToTokens(Array.isArray(address) ? address : tokenIds.map(() => address), tokenIds).send({ from: eth.account })
            else
                await pplx.methods.claimToTokens([address], [tokenIds]).send({ from: eth.account })
            openAlert && openAlert(`Token${Array.isArray(tokenIds) ? 's' : ''} claimed!`, "info")
        } catch (e) {
            console.log("claim:", e)
            if (e instanceof Error)
                openAlert && openAlert(e.message, "error")
        }
    }
    const transfer = async (wallet_address: string, address: string | string[], tokenIds: string | string[]) => {
        console.log('transfer', tokenIds)
        if (Array.isArray(tokenIds) && tokenIds.length === 0)
            return openAlert && openAlert('0 tokens are avalibe to transfer', "warning")
        try {
            if (Array.isArray(tokenIds))
                await ppl20.methods.transferTokens2Account(Array.isArray(address) ? address : tokenIds.map(() => address), tokenIds, wallet_address).send({ from: eth.account })
            else
                await ppl20.methods.transferTokens2Account([address], [tokenIds], wallet_address).send({ from: eth.account })
            openAlert && openAlert(`Token${Array.isArray(tokenIds) ? 's' : ''} transfered!`, "info")
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
        const registered = await pplx.methods.isRegistered(addr, tokenId).call()
        // const data = await contractX.methods.claimToTokens(addr, parseInt(tokenId)).call()
        // console.log('claimToToken', data)
        let claimed = await ppl20.methods.balanceOfToken(addr, tokenId).call()
        claimed = Web3.utils.toBN(claimed)
        claimed = claimed.div(divisor)
        return {
            accamulated: accamulated / 1000,
            claimed: claimed / 1000,
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
    const getAHMCToken = async (tokenId: string) => {
        const token: Record<string, any> = {
            id: tokenId,
            name: `AHMC #${tokenId}`
        }
        let balance = await ahmc.methods.balanceOf(eth.account).call();
        if (isNaN(balance))
            return []
        balance = parseInt(balance);
        if (balance < 0)
            return []

        try {
            const url = await ahmc.methods.tokenURI(tokenId).call();
            console.log('url', url)
            const response = await fetch(url, { mode: 'no-cors' });
            if (response.ok) {
                const data = await response.json();
                console.log("data", data)
                token.src = data.image;
            }
            else {
                token.src = 'https://apeharmony.com/incubator-2048.gif';
            }
        }
        catch (err) {
            console.log('err')
            token.src = 'https://apeharmony.com/incubator-2048.gif';
        }
        return token
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

    const getARTWToken = async (tokenId: string) => {
        const token: Record<string, any> = {
            id: tokenId,
            name: `ARTW #${tokenId}`
        }
        let balance = await artw.methods.balanceOf(eth.account).call();
        if (isNaN(balance)) return []
        balance = parseInt(balance)
        if (balance <= 0) return null
        const url = await artw.methods.tokenURI(tokenId).call();
        try {
            const response = await fetch(url, { mode: 'no-cors' });
            if (response.ok) {
                const data = await response.json();
                token.src = data.image
            }
            else {
                token.src = `https://dhsv99qu6u1yj.cloudfront.net/images/${tokenId}.png`
            }
        }
        catch (err) {
            console.log(err)
        }
        return token
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

    const getTokenById = async (tokenId: string) => {
        try {
            let ahmcT = await getAHMCToken(tokenId)
            let artwT = await getARTWToken(tokenId)
            const ahmcMD = await getTokenMetadata(config.contract_addresses.ahmc, tokenId)
            const artwMD = await getTokenMetadata(config.contract_addresses.artw, tokenId)
            ahmcT = { ...ahmcT, ...ahmcMD, collection: "ahmc" }
            artwT = { ...artwT, ...artwMD, collection: "artw" }
            console.log({
                ahmcT,
                artwT
            })
            return [ahmcT, artwT]
        } catch (e) {
            console.error(e)
            return []
        }
    }

    return {
        contractX: pplx,
        contract20: ppl20,
        register,
        claim,
        transfer,
        getTokens,
        getTokenById
    }
}