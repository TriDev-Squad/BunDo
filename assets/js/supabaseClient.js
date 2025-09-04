// assets/js/supabaseClient.js
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const SUPABASE_URL = "https://YOUR_PROJECT_ID.supabase.co"; // <-- replace
const SUPABASE_ANON_KEY = "YOUR_ANON_KEY";                  // <-- replace

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
