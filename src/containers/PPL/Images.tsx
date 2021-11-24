import styles from './style.module.scss'

export const Images = () => {
    return (
        <>
            <img src="/ppls/rt.png" className={styles.image} style={{ right: "1rem", top: "1rem"}}/>
            <img src="/ppls/lc.png" className={styles.image} style={{ right: "8%", top: "10%", transform: "scaleX(-1)"}}/>
            
            <img src="/ppls/rt.png" className={styles.image} style={{ left: "10%", top: "30%"}}/>
            <img src="/ppls/lc.png" className={styles.image} style={{ left: "1rem", bottom: "50%", transform: "scaleX(-1)"}}/>

            <img src="/ppls/ccr.png" className={styles.image} style={{ right: "60%", bottom: "50%", transform: "scale(1.3)"}}/>

            <img src="/ppls/ccr.png" className={styles.image} style={{ right: "5%", bottom: "5%", transform: "scale(1.3)"}}/>
        </>
    )
}
