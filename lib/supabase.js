import { createClient } from '@supabase/supabase-js';

// Get your secret database keys from Vercel securely
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Turn on the database connection engine
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
