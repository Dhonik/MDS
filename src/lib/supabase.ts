import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl !== 'YOUR_SUPABASE_URL' &&
  !supabaseUrl.includes('placeholder')
);

if (!isSupabaseConfigured) {
  console.info(
    'ℹ️ Supabase credentials not set in .env. Falling back to local data. ' +
    'Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to connect live backend.'
  );
}

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-anon-key',
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    }
  }
);
