import Head from 'next/head'

export function getServerSideProps({ query }) {
  const raw = typeof query.imgs === 'string' ? query.imgs : ''
  const name = typeof query.name === 'string' ? query.name : ''
  const urls = raw
    ? raw.split(',').filter(Boolean).map(p => (/^https?:\/\//.test(p) ? p : `https://i.ibb.co/${p}`))
    : []
  return { props: { urls, name } }
}

export default function SellPhotos({ urls, name }) {
  return (
    <>
      <Head>
        <title>Sell Submission Photos — Momintum</title>
        <meta name="robots" content="noindex, nofollow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="min-h-screen bg-brand-navy-dark text-white font-inter">
        {/* Header */}
        <header className="border-b border-white/10">
          <div className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo-white.png" alt="Momintum" className="h-7 w-auto" />
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-brand-yellow">Sell Submission</span>
            </div>
            <span className="text-sm text-white/50">{urls.length} photo{urls.length === 1 ? '' : 's'}</span>
          </div>
        </header>

        <div className="max-w-6xl mx-auto px-6 py-10">
          <h1 className="font-bebas text-4xl tracking-wide mb-1">
            {name ? `${name}'s ` : ''}<span className="text-brand-yellow">Photos</span>
          </h1>
          <p className="text-white/40 text-sm mb-8">Tap any photo to open it full size.</p>

          {urls.length === 0 ? (
            <p className="text-white/40 py-20 text-center">No photos in this submission.</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {urls.map((src, i) => (
                <a
                  key={i}
                  href={src}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative block aspect-square rounded-xl overflow-hidden border border-white/10 bg-white/5"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={src} alt={`Photo ${i + 1}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  <span className="absolute bottom-2 right-2 text-[10px] font-bold bg-black/60 text-white px-2 py-0.5 rounded-full">
                    {i + 1}
                  </span>
                </a>
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  )
}
