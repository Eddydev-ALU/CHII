import { Helmet } from 'react-helmet-async'
import Hero from '../components/Hero'
import Intro from '../components/Intro'
import Mission from '../components/Mission'
import Events from '../components/Events'

function Home() {
  return (
    <>
      <Helmet>
        <title>CHII @ ALU | Center for Health Innovation and Impact</title>
        <meta
          name="description"
          content="A multidisciplinary, mission-driven team at African Leadership University transforming healthcare outcomes across Africa."
        />
        <meta property="og:title" content="CHII @ ALU" />
        <meta
          property="og:description"
          content="Transforming healthcare outcomes across Africa through entrepreneurship, workforce development and primary healthcare innovation."
        />
      </Helmet>
      <Hero />
      <Intro />
      <Mission />
      <Events />
    </>
  )
}

export default Home
