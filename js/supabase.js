const SUPABASE_URL = "https://hyqlhnraoumjsxaxefez.supabase.co";
const SUPABASE_ANON = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh5cWxobnJhb3VtanN4YXhlZmV6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE5NTI2NzcsImV4cCI6MjA4NzUyODY3N30.GpeVAVBQEoqU_CTw8jehBra4Z5RrAmcEV9qYLp-g02U";

const supabaseClient = supabase.createClient(
  SUPABASE_URL,
  SUPABASE_ANON
);

async function requireBusinessAuth() {
  const { data } = await supabaseClient.auth.getUser();
  if (!data.user || data.user.user_metadata.role !== "business") {
    window.location.href = "/login.html";
    return null;
  }
  return data.user.user_metadata.business_id;
}

async function requireAdminAuth() {
  const { data } = await supabaseClient.auth.getUser();
  if (!data.user || data.user.user_metadata.role !== "admin") {
    window.location.href = "/login.html";
    return null;
  }
  return true;
}

async function logout() {
  await supabaseClient.auth.signOut();
  window.location.href = "/login.html";
}
