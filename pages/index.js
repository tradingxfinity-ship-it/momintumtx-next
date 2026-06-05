import Head from 'next/head'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import SellWithUs from '../components/sections/SellWithUs'
import SellForm from '../components/sections/SellForm'

export default function Home() {
  return (
    <>
      <Head>
        <title>Momintum — Sell Your Cards</title>
        <meta name="description" content="Sell sports cards, Pokémon, One Piece, graded slabs, sealed product, and collectibles. Walk in, get a fair offer, walk out with cash." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <SellWithUs />
      <SellForm />
      <Footer />
    </>
  )
}
