import { StyledButton } from '../StyledButton'
import { useAHMC } from '../../hooks/useAHMC'
import { useMobile } from '../../hooks/useMobile'

export const ConnectWalletButton = () => {
    
    const isMobile = useMobile()
    const { account, connectWallet } = useAHMC()

    return (
        <StyledButton
            variant="contained"
            onClick={connectWallet}
            color={account ? "success": "inherit"}
            border
            sx={{backgroundColor: "#000000"}}
        >
            {account ? "Logged" : "Connect"}
        </StyledButton>
    )
}
