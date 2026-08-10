import { supabase } from '../lib/supabase'

const SITE = 'https://www.momintumtx.com'

// Flip to true when the online shop launches — the sitemap will then include
// /shop and every product page automatically.
const INCLUDE_SHOP = false

function buildXml(urls) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`
}

export async function getServerSideProps({ res }) {
  const urls = [{ loc: `${SITE}/`, changefreq: 'weekly', priority: '1.0' }]

  if (INCLUDE_SHOP) {
    urls.push({ loc: `${SITE}/shop`, changefreq: 'weekly', priority: '0.8' })
    if (supabase) {
      const { data } = await supabase.from('products').select('id')
      for (const p of data || []) {
        urls.push({ loc: `${SITE}/shop/${p.id}`, changefreq: 'weekly', priority: '0.6' })
      }
    }
  }

  res.setHeader('Content-Type', 'application/xml')
  res.setHeader('Cache-Control', 'public, max-age=3600')
  res.write(buildXml(urls))
  res.end()
  return { props: {} }
}

export default function Sitemap() {
  return null
}
