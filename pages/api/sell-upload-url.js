import { getServiceClient } from '../../lib/supabase'

// Hands the browser a short-lived, pre-authorized URL to upload one photo
// straight to Supabase Storage. The service role signs it server-side, so no
// public write access to the bucket is needed and large files never pass
// through this function.
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const db = getServiceClient()
  if (!db) return res.status(503).json({ error: 'Photo uploads are not configured.' })

  try {
    const { filename } = req.body || {}
    const ext = (String(filename || '').split('.').pop() || 'jpg').toLowerCase().replace(/[^a-z0-9]/g, '') || 'jpg'
    const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`

    const { data, error } = await db.storage.from('sell-uploads').createSignedUploadUrl(path)
    if (error) return res.status(500).json({ error: error.message })

    const { data: pub } = db.storage.from('sell-uploads').getPublicUrl(path)
    return res.status(200).json({ path: data.path, token: data.token, publicUrl: pub.publicUrl })
  } catch (e) {
    return res.status(500).json({ error: e.message || 'Could not prepare upload.' })
  }
}
