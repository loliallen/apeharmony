import { Header } from '../containers/Header'
import { Legal } from '../containers/Legal/Legal'

import {Layout} from "../containers/Layout";
const LegalPage = () => {
    return (
        <Layout>
            <Header offMusic links={[{ to: '/', href: "https://opensea.io/collection/apeharmonymonsterclub", label: "Purchase on OpenSea" }, { to: "/ppl", label: "My ApeHarmony" }]} />
            <Legal/>
        </Layout>
    )
}
export default LegalPage