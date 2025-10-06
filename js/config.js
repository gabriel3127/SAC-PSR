// js/config.js
const SUPABASE_URL = 'https://fcuzfvgkciblbkrjoosk.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZjdXpmdmdrY2libGJrcmpvb3NrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk0MzY0ODQsImV4cCI6MjA3NTAxMjQ4NH0.Iia8Zx4o-8TmdfZNk7fdQ5zwoUp43L7Fh5cwloCH2H8';

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);