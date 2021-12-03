
const genereateData = () => {
    const start = '0x'
    const addr = [1,2].reduce((r, _) => {
        const rnds = Math.random().toString(36).slice(2)
        console.log('rnd',rnds)
        return r + rnds 
    }, "")
    console.log(addr)
    return {
        address: start + addr,
        ammount: Math.round(Math.random() * 99 + 1)
    }
}

export const addresses = [
    genereateData(),
    genereateData(),
    genereateData(),
    genereateData(),
    genereateData(),
    genereateData(),
    genereateData(),
    genereateData(),
    genereateData(),
    genereateData(),
    genereateData(),
    genereateData(),
    genereateData(),
    genereateData(),
    genereateData(),
    genereateData(),
    genereateData(),
    genereateData(),
    genereateData()
]
