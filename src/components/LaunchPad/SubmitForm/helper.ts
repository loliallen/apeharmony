type Data = {
    data: {
        email: string
        title: string
        description: string
    }
    wallet_address: string
    signature: string
}
export const sendData = async (data: Data) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/application`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })

    return res.json()
}
