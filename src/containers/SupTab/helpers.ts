import config from "../../app/config"
import { Token } from "../../hooks/usePPL"

export const prepareTokens =
    (tokens: Token[], pplPrice: number, quantity: number):
        [Error, null] | [null, {
            addr: string[];
            ids: string[];
        }] => {
        const totalPrice = quantity * pplPrice

        const filtered = (tokens as Required<Token>[]).filter(t => t.collection === "artw" && (t.claimed > 0 || t.registered) || t.collection === "ahmc")
        const tokensWithBalance = (filtered as Required<Token>[]).filter(t => t.claimed > 0 || t.claimed > 0 ).sort((a, b) => b.claimed - a.claimed)
        const tokensForPurcase: { addr: string[], ids: string[] } = {
            addr: [],
            ids: []
        }
        let currentPrice = 0
        for (let t of tokensWithBalance) {
            if (currentPrice >= totalPrice)
                break;
            currentPrice += t.claimed
            tokensForPurcase['addr'].push(t.collection === "ahmc" ? config.contract_addresses.ahmc : config.contract_addresses.artw)
            tokensForPurcase['ids'].push(t.id)
        }
        if (totalPrice > currentPrice)
            return [new Error(`Not enought $PPL (${currentPrice}/${totalPrice})`), null]
        return [null, tokensForPurcase]
    }