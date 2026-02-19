import { createClient } from '@supabase/supabase-js'

export default async function handler(req, res) {
  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SECRET_KEY,
  )

  const mockHeadlines = [
    { headline: "US regulators announce new stablecoin guidelines", source: "Reuters" },
    { headline: "Bitcoin price hits $90k amid market frenzy", source: "CoinDesk" },
    { headline: "Major hack reported on decentralized exchange", source: "Bloomberg" },
    { headline: "Ethereum upgrade reduces gas fees significantly", source: "TechCrunch" }
  ]

  const { data, error } = await supabaseAdmin
    .from('news_feed')
    .insert(mockHeadlines.map(h => ({
      headline: h.headline,
      source: h.source,
    })))
    .select()

  if (error) return res.status(500).json({ error: error.message })
  res.status(200).json({ data })
}
