import React from 'react'
import { PPL } from '../containers/PPL'
import { Header } from '../containers/Header'
import {Layout} from "../containers/Layout";

const Ppl = () => {
  return (
    <Layout ppl={true}>
      <Header musicUrl="/waves.mp3" links={[{ to: '/', href: "https://opensea.io/collection/apeharmonymonsterclub", label: "Purchase on OpenSea" }, { to: "/launchpad", label: "Launchpad" }]} />
      <PPL />
    </Layout>
  )
}
export default Ppl