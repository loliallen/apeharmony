import { Typography } from '@mui/material'
import styles from './style.module.scss'

export const Legal = () => {
    return (
        <div className={styles.legal}>
            <Typography variant="h5" color="white" align="center" sx={{ textTransform: "uppercase" }}>
                TERMS AND CONDITIONS
            </Typography>
            <Typography variant="h6" color="white" align="center" sx={{ textTransform: "uppercase", marginTop: "2rem"}}>
                Ape Harmony Monster Club is a collection of digital artworks running on the Ethereum network via non fungible tokens(NFTs). Apeharmony.com is only a visual interface to allow users to acquire the digital artworks. Users are responsible for the safety and management of their own Ethereum wallet and validating all transactions and contracts related and generated by Apeharmony.com before approval. Also be aware that, since our Ape Harmony Monster Club smart contract runs on the Ethereum network, it is not possible to undo, reverse or restore any transactions. Apeharmony.com and its connected services are provided “as is” and “as available” without warranty of any kind. By using Apeharmony.com you are accepting sole responsibility for any and all transactions involving Ape Harmony digital artworks.
            </Typography>
            <Typography variant="h5" color="white" align="center" sx={{ textTransform: "uppercase",  marginTop: "1rem"}}>
                OWNERSHIP
            </Typography>
            <Typography variant="h6" color="white" align="center" sx={{ textTransform: "uppercase", marginTop: "2rem"}}>
                i. The user that is buying and minting our Ape Harmony Monster Club artwork is the owner of the Non Fungible Token (NFT) created by validating the transaction. Each Ape Monster is an NFT on the Ethereum blockchain. When you purchase an NFT, you own all the rights to the underlying Ape Monster. Ownership of the NFT is mediated entirely and only by the Smart Contract and the Ethereum Network which means that, at no point, may we seize, freeze, or otherwise modify the ownership of any Ape Monster
            </Typography>
            <Typography variant="h6" color="white" align="center" sx={{ textTransform: "uppercase" }}>
                ii. Personal Use. Subject to your continued compliance with these Terms, Apeharmony.com grants you a worldwide, royalty-free license to use, copy, and display the purchased Ape Monster(s), along with any extensions that you choose to create or use, solely for the following purposes: (i) for your own personal, non-commercial use; (ii) as part of a marketplace that permits the purchase and sale of your Ape Harmony Monster Club NFT, provided that the marketplace cryptographically verifies each Ape Monster owner’s rights to display the Ape Monster and ensures that only the actual owner can display the Ape Monster; or (iii) as part of a third party website or application that permits the inclusion, involvement, or participation of your Ape Monster, provided that the website/application cryptographically verifies each Ape Monster owner’s rights to display the Ape Monster and ensures that only the actual owner can display the Ape Harmony Monster, and provided that the Ape Monster is no longer visible once the owner of the Ape Monster leaves the website/application.
            </Typography>
            <Typography variant="h6" color="white" align="center" sx={{ textTransform: "uppercase" }}>
            iii. Commercial Use. Subject to your continued compliance with these Terms, Apeharmony.com grants you an unlimited, worldwide license to use, copy, and display the purchased Ape Monster for the purpose of creating derivative works based upon the Ape Monster (“Commercial Use”). Examples of such Commercial Use would be the use of the Ape Monster to produce and sell merchandise products (T-Shirts etc.) displaying copies of the Ape Monster. For the sake of clarity, nothing in this Section will be deemed to restrict you from (i) owning or operating a marketplace that permits the use and sale of Ape Monsters generally, provided that the marketplace cryptographically verifies each Ape Monster owner’s rights to display the Ape Monster and ensures that only the actual owner can display the Ape Monster; (ii) owning or operating a third party website or application that permits the inclusion, involvement, or participation of Ape Monsters generally, provided that the third party website or application cryptographically verifies each Ape Monster owner’s rights to display the Ape Monster and ensures that only the actual owner can display the Ape Monster, and provided that the Ape Monster is no longer visible once the owner of the purchased Ape Monster leaves the website/application; or (iii) earning revenue from any of the foregoing.
            </Typography>
        </div>
    )
}
