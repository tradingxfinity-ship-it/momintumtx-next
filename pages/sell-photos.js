import Head from 'next/head'
import { useState } from 'react'

export function getServerSideProps({ query }) {
  const raw = typeof query.imgs === 'string' ? query.imgs : ''
  const name = typeof query.name === 'string' ? query.name : ''
  const supaPrefix = `${process.env.NEXT_PUBLIC_SUPABASE_URL || ''}/storage/v1/object/public/sell-uploads/`
  const urls = raw
    ? raw.split(',').filter(Boolean).map(p => {
        if (/^https?:\/\//.test(p)) return p          // full URL
        if (p.includes('/')) return `https://i.ibb.co/${p}` // legacy ImgBB links
        return `${supaPrefix}${p}`                    // Supabase filename
      })
    : []
  return { props: { urls, name } }
}

const fileName = (url, i) => {
  const last = url.split('/').pop() || ''
  return /\.(jpe?g|png|webp|gif|heic)$/i.test(last) ? last : `momintum-photo-${i + 1}.jpg`
}

// Fetch the image and trigger a real download (ImgBB allows cross-origin).
async function downloadImage(url, name) {
  try {
    const res = await fetch(url)
    const blob = await res.blob()
    const objectUrl = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = objectUrl
    a.download = name
    document.body.appendChild(a)
    a.click()
    a.remove()
    setTimeout(() => URL.revokeObjectURL(objectUrl), 1000)
  } catch {
    window.open(url, '_blank') // fallback: open so it can be saved manually
  }
}

export default function SellPhotos({ urls, name }) {
  const [busy, setBusy] = useState(false)

  const downloadAll = async () => {
    setBusy(true)
    for (let i = 0; i < urls.length; i++) {
      // eslint-disable-next-line no-await-in-loop
      await downloadImage(urls[i], fileName(urls[i], i))
      // eslint-disable-next-line no-await-in-loop
      await new Promise(r => setTimeout(r, 400)) // let the browser queue each download
    }
    setBusy(false)
  }

  return (
    <>
      <Head>
        <title>Sell Submission Photos — Momintum</title>
        <meta name="robots" content="noindex, nofollow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="min-h-screen bg-brand-navy-dark text-white font-inter">
        {/* Header */}
        <header className="border-b border-white/10 sticky top-0 bg-brand-navy-dark/90 backdrop-blur z-20">
          <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo-white.png" alt="Momintum" className="h-7 w-auto" />
              <span className="hidden sm:inline text-[10px] font-bold tracking-[0.2em] uppercase text-brand-yellow">Sell Submission</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-white/50">{urls.length} photo{urls.length === 1 ? '' : 's'}</span>
              {urls.length > 0 && (
                <button
                  onClick={downloadAll}
                  disabled={busy}
                  className="px-4 py-2 bg-brand-yellow text-brand-navy-dark text-xs font-bold rounded-full hover:bg-brand-yellow-dark transition-colors disabled:opacity-60"
                >
                  {busy ? 'Downloading…' : 'Download all'}
                </button>
              )}
            </div>
          </div>
        </header>

        <div className="max-w-6xl mx-auto px-6 py-10">
          <h1 className="font-bebas text-4xl tracking-wide mb-1">
            {name ? `${name}'s ` : ''}<span className="text-brand-yellow">Photos</span>
          </h1>
          <p className="text-white/40 text-sm mb-8">Tap a photo to open it full size, or use the download button.</p>

          {urls.length === 0 ? (
            <p className="text-white/40 py-20 text-center">No photos in this submission.</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {urls.map((src, i) => (
                <div key={i} className="group relative aspect-square rounded-xl overflow-hidden border border-white/10 bg-white/5">
                  <a href={src} target="_blank" rel="noopener noreferrer" className="block w-full h-full">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={src} alt={`Photo ${i + 1}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  </a>
                  <button
                    onClick={() => downloadImage(src, fileName(src, i))}
                    aria-label={`Download photo ${i + 1}`}
                    className="absolute top-2 right-2 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-black/60 text-white hover:bg-brand-yellow hover:text-brand-navy-dark transition-colors"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
                      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                  </button>
                  <span className="absolute bottom-2 left-2 text-[10px] font-bold bg-black/60 text-white px-2 py-0.5 rounded-full">
                    {i + 1}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  )
}
