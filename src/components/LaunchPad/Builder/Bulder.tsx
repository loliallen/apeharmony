import {useEffect, useState} from "react";
import {getLayers, getLayerSrc} from "./helper";
import styles from './builder.module.scss'
import {TraitSelect} from "./TraitSelect";


const LAYER_ORDER = [
    "Background",
    "Skin",
    "Clothing",
    "Clothing-Accessory",
    "Accessory",
    "Earring",
    "Necklace",
    "Hair-and-Headgear",
    "Eyes",
    "Brows-and-Furrow",
    "Mouth",
    "Shades",
    "Weapon",
    "Lasers",
    "Wing"
]



export const Builder = () => {
    const [layers, setLayers] = useState<Record<string, any>>({})
    const [gender, setGender] = useState('male')

    const [selectedTraits, setSelectedTraits] = useState<Record<string, string>>({})

    const updateLayers = async () => {
        const data = await getLayers()
        setLayers(data)
    }

    const setSelectedValue = (k: string) => (v: string) => setSelectedTraits(p => ({ ...p, [k]: v}))

    useEffect(()=>{
        updateLayers()
    },[])

    return <>

        <div className={styles.img_container}>
            <div>
                {LAYER_ORDER.map(k => selectedTraits[k] ?
                    <img key={k} src={getLayerSrc(gender, k, selectedTraits[k])} alt={k}/>
                    :
                    null
                )}
            </div>
        </div>
        <div className={styles.trait_container}>
            <TraitSelect
                title='Gender'
                value={gender}
                setValue={setGender}
                values={['male', 'female']}
            />
            {layers[gender] && Object.keys(layers[gender]).map(k => (
                <TraitSelect title={k} value={selectedTraits[k]} setValue={setSelectedValue(k)} values={layers[gender][k]} />
            ))}
        </div>
    </>
}