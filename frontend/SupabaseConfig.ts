import { createClient } from '@supabase/supabase-js';
import { SUPABASE_URL, SUPABASE_KEY } from '@env';

// Using the values directly from your .env file
const supabaseUrl = SUPABASE_URL || 'https://mdngpopbogrhbrqwrsbq.supabase.co';
const supabaseKey = SUPABASE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1kbmdwb3Bib2dyaGJycXdyc2JxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI4NTgxNTksImV4cCI6MjA1ODQzNDE1OX0.lJEsvcA9uHChz5okJKhXlF3GlKskWi89jzP1xPhw1D4';

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials');
}

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;