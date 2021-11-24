import React from 'react'
import { PPL } from '../containers/PPL'
import { Header } from '../containers/Header'
import { Layout } from '../containers/Layout'
import { PPLProvider } from '../hooks/usePPL'

export const PPLPage = () => {
  return (
    <PPLProvider>
      <Layout ppl>
        <Header />
        <PPL />
      </Layout>
    </PPLProvider>
  )
}
