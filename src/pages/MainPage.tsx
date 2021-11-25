import { Header } from '../containers/Header'
import { Mint } from '../containers/Mint'
import { Body, BodyContainer } from '../containers/Body'
import { Footer } from '../containers/Footer'
import { Authors } from '../containers/Authors'
import { Description } from '../containers/Description'
import { Layout } from '../containers/Layout'
import { useRef } from 'react'

export const MainPage = () => {
    const aboutRef = useRef<HTMLDivElement>(null)
    const teamRef = useRef<HTMLDivElement>(null)
    const plansRef = useRef<HTMLDivElement>(null)
    return (
        <Layout>
            <Header 
                refs={[
                    {ref: aboutRef, label: "About"},
                    {ref: teamRef, label: "Team"},
                    {ref: plansRef, label: "Future"},
                ]}
                links={[
                    {to: '/ppl', label: "Staking"}
                ]}
            />
            <BodyContainer>
                <Body
                    srcs={[
                        '/apes/1.gif',
                        '/apes/2.gif',
                        '/apes/3.gif',
                    ]}
                />
                <Body
                    srcs={[
                        '/apes/5.gif',
                        '/apes/4.gif',
                        '/apes/6.gif',
                    ]}
                    childIndex={1}
                />
                <Body
                    srcs={[
                        '/apes/7.gif',
                        '/apes/8.gif',
                        '/apes/9.gif',
                    ]}
                />
            </BodyContainer>
            <Mint soldOut />
            <Description ref={aboutRef}/>
            <Authors ref={teamRef}/>
            <Footer ref={plansRef} />
        </Layout>
    )
}
