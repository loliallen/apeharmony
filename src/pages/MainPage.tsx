import { Header } from '../containers/Header'
import { Mint } from '../containers/Mint'
import { Body } from '../containers/Body'
import { Footer } from '../containers/Footer'
import { Authors } from '../containers/Authors'
import { Description } from '../containers/Description'

export const MainPage = () => {
    return (
        <>
            <Header />
            <Body
                male="/apes/male.gif"
                female="/apes/female.gif"
                child="/apes/child.gif"
            />
            <Mint />
            <Description />
            <Authors />
            <Footer />
        </>
    )
}
