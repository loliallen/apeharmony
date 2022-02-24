export const getLayers = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/layers/all`)
    if (!res.ok)
        throw new Error('Fetch error')
    return res.json()
}

export const getLayerSrc = (gender: string, category: string, trait_name: string) => {
    let ext = '.png'
    if (category.toLowerCase() === 'background')
        ext = '.gif'
    return `${process.env.NEXT_PUBLIC_API_HOST}/layers/${gender}/${category}/${trait_name.replaceAll(' ', '-')}${ext}?w=500&h=500`
}