import { createClient } from '@supabase/supabase-js'

export default async function handler(req, res) {
  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SECRET_KEY,
  )

  const { data, error } = await supabaseAdmin.from('users').insert({
    name: 'Test User',
    email: 'test@example.com',
  }).select()

  if (error) return res.status(500).json({ error: error.message })
  res.status(200).json({ data })
}
