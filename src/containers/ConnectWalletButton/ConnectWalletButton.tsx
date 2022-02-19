import { StyledButton } from '../StyledButton'
import { useAHMC } from '../../hooks/useAHMC'

export const ConnectWalletButton = () => {

    const { account, connectWallet } = useAHMC()

    return (
        <StyledButton
            variant="contained"
            onClick={connectWallet}
            color={account ? "primary": "inherit"}
            bordered
            style={{backgroundColor: "#000000"}}
        >
            {account ? "Logged" : "Connect"}
        </StyledButton>
    )
}
