import React from 'react'
import { PPL } from '../containers/PPL'
import { Header } from '../containers/Header'
import { Layout } from '../containers/Layout'

export const PPLPage = () => {
  return (
    <Layout ppl>
      <Header musicUrl="/waves.mp3" links={[{ to: '/', href: "https://opensea.io/collection/apeharmonymonsterclub", label: "Purchase on OpenSea" }, { to: "/ppl", label: "" }]} />
      <PPL />
    </Layout>
  )
}
