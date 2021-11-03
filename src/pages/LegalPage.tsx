import { useEffect } from 'react'
import { Header } from '../containers/Header'

import { Legal } from '../containers/Legal/Legal'

export const LegalPage = () => {
    useEffect(()=>{
        window.scroll({top: 0})
    },[])
    return (
        <>
            <Header offMusic/>
            <Legal/>
        </>
    )
}
