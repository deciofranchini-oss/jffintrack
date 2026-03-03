// Family FinTrack - Supabase configuration (auto-connect)
// Public anon key (safe to expose). Keep RLS enabled.

(function() {
  const URL = "https://wkiytjwuztnytygpxooe.supabase.co";
  const KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndraXl0and1enRueXR5Z3B4b29lIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIyODc3NzUsImV4cCI6MjA4Nzg2Mzc3NX0.Z3fyYRDobzarCEdqkobTjQQd1J9HAUR2CCdnBbLC0QA";

  // Newer config keys (some modules read these)
  window.SUPABASE_URL = URL;
  window.SUPABASE_ANON_KEY = KEY;

  // Legacy keys used by app.js boot logic
  try {
    if (!localStorage.getItem('sb_url')) localStorage.setItem('sb_url', URL);
    if (!localStorage.getItem('sb_key')) localStorage.setItem('sb_key', KEY);
  } catch(e) {}

  // Optional: also keep compatibility with previous naming
  try {
    if (!localStorage.getItem('SUPABASE_URL')) localStorage.setItem('SUPABASE_URL', URL);
    if (!localStorage.getItem('SUPABASE_ANON_KEY')) localStorage.setItem('SUPABASE_ANON_KEY', KEY);
  } catch(e) {}
})();
