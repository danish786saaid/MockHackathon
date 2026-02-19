import { supabase } from "../../lib/supabaseClient";

export default async function handler(req, res) {
  if (!supabase) return res.status(503).json({ error: "Supabase not configured" });
  const { data, error } = await supabase.from("users").select("*");
  if (error) return res.status(500).json({ error: error.message });
  res.status(200).json({ data });
}
