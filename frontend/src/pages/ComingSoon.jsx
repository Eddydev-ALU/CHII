import { Helmet } from 'react-helmet-async'

function ComingSoon() {
  return (
    <main className="grid min-h-svh place-items-center bg-navy-deep px-6 text-center">
      <Helmet>
        <title>Coming soon | CHII @ ALU</title>
      </Helmet>
      <h1 className="font-hero text-5xl uppercase text-sky md:text-8xl">Coming soon</h1>
    </main>
  )
}

export default ComingSoon
