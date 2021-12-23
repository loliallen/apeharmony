import { Header } from '../containers/Header'
import { Layout } from '../containers/Layout'

import { Legal } from '../containers/Legal/Legal'

export const LegalPage = () => {
    return (
        <Layout>
            <Header offMusic links={[{ to: '/', href: "https://opensea.io/collection/apeharmonymonsterclub", label: "Purchase on OpenSea" }, { to: "/ppl", label: "My ApeHarmony" }]} />

            <Legal/>
        </Layout>
    )
}
