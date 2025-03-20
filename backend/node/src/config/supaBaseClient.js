const { createClient } = require("@supabase/supabase-js");
require("dotenv").config(); // Ensure environment variables are loaded

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Supabase URL and Key are required. Check your .env file.");
}

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;
