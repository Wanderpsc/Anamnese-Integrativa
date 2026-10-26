import { createClient } from '@supabase/supabase-js';

// Create a Supabase client only if env vars are set. 
// This file exports either the client or null so callers can fallback.
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

let supabaseClient = null;
if (supabaseUrl && supabaseAnonKey) {
  try {
    supabaseClient = createClient(supabaseUrl, supabaseAnonKey);
  } catch (e) {
    // Ignore; will fallback to localStorage.
    console.error('Failed to create Supabase client:', e);
    supabaseClient = null;
  }
}

export default supabaseClient;
