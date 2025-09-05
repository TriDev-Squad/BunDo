// assets/js/supabaseClient.js
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const SUPABASE_URL = "https://hmagcsbiafpipzgwiyzn.supabase.co"; // <-- replace
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhtYWdjc2JpYWZwaXB6Z3dpeXpuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY5ODIxNTEsImV4cCI6MjA3MjU1ODE1MX0.nAJkiaqINOqwY26N_j88gDyNkxi_kIHKM6O_YAN6G0A";                  // <-- replace

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
