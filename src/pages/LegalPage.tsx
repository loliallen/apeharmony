import { Header } from '../containers/Header'
import { Layout } from '../containers/Layout'

import { Legal } from '../containers/Legal/Legal'

export const LegalPage = () => {
    return (
        <Layout>
            <Header offMusic/>
            <Legal/>
        </Layout>
    )
}
