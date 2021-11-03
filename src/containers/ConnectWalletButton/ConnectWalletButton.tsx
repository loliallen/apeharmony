import { StyledButton } from '../StyledButton'
import { useEtherium } from '../../hooks/useEtherium'
import { useMobile } from '../../hooks/useMobile'

export const ConnectWalletButton = () => {
    
    const isMobile = useMobile()
    const { account, connect } = useEtherium()

    return (
        <StyledButton
            variant="contained"
            onClick={connect}
            color={account ? "success": "inherit"}
            border
            sx={{backgroundColor: "#000000"}}
        >
            {account ? "Logged" : "Connect"}
        </StyledButton>
    )
}
