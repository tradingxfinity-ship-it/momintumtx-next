import Head from 'next/head'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import Hero from '../components/sections/Hero'
import Ticker from '../components/sections/Ticker'
import About from '../components/sections/About'
import Products from '../components/sections/Products'
import LiveBreaks from '../components/sections/LiveBreaks'
import UpcomingEvents from '../components/sections/UpcomingEvents'
import Gallery from '../components/sections/Gallery'
import Reviews from '../components/sections/Reviews'
import SellWithUs from '../components/sections/SellWithUs'
import SellForm from '../components/sections/SellForm'
import Blog from '../components/sections/Blog'
import Contact from '../components/sections/Contact'
import ContactForm from '../components/sections/ContactForm'

export default function Home() {
  return (
    <>
      <Head>
        <title>Momintum Cards & Collectibles — San Antonio, TX</title>
        <meta name="description" content="Sports cards, Pokémon, One Piece, graded slabs, sealed product, and collectibles. Live breaks, events, and we buy collections — walk in, get a fair offer, walk out with cash." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <Hero />
      <Ticker />
      <About />
      <Products />
      <LiveBreaks />
      <UpcomingEvents />
      <Gallery />
      <Reviews />
      <SellWithUs />
      <SellForm />
      <Blog />
      <Contact />
      <ContactForm />
      <Footer />
    </>
  )
}
