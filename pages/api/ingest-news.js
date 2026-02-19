import { createClient } from '@supabase/supabase-js'
import axios from 'axios'

export default async function handler(req, res) {
  try {
    const response = await axios.get('https://newsapi.org/v2/top-headlines', {
      params: {
        apiKey: process.env.NEWSAPI_KEY,
        language: 'en',
        category: 'business'
      }
    })

    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SECRET_KEY,
    )

    const articles = response.data.articles || []

    const { data, error } = await supabaseAdmin
      .from('news_feed')
      .insert(
        articles.map(a => ({
          headline: a.title,
          source: a.source.name,
          created_at: new Date(a.publishedAt)
        }))
      )

    if (error) return res.status(500).json({ error: error.message })
    res.status(200).json({ data })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
