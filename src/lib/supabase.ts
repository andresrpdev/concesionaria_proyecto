// supabase.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://wcrrmlsditnvxoilybxn.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndjcnJtbHNkaXRudnhvaWx5YnhuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzcxNDkwNzMsImV4cCI6MjA1MjcyNTA3M30.N5neGO_-JNzWOSWhswr9iZg7g8EUc1OxnEK3K3ZQzJM';
export const supabase = createClient(supabaseUrl, supabaseKey);
