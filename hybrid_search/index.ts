// Import the necessary client libraries for Supabase and OpenAI.
import { createClient } from 'npm:@supabase/supabase-js@2'
import OpenAI from 'npm:openai'

// --- Configuration ---
// These values will be securely read from the environment variables (secrets)
// you set in your Supabase project dashboard. This is the best practice
// for handling sensitive keys.
const supabaseUrl = Deno.env.get('SUPABASE_URL')!
const supabaseServiceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
const openaiApiKey = Deno.env.get('OPENAI_API_KEY')!

// The name of your PostgreSQL function to call.
const HYBRID_SEARCH_FUNCTION = 'hybrid_search';

// The main server function that handles incoming requests.
Deno.serve(async (req) => {
  try {
    // --- Step 1: Get the user's query from the request body ---
    const { query } = await req.json()

    // Handle cases where the query is missing.
    if (!query) {
      return new Response(JSON.stringify({ error: 'Query is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    // --- Step 2: Initialize the OpenAI client ---
    const openai = new OpenAI({ apiKey: openaiApiKey })

    // --- Step 3: Generate an embedding for the user's query ---
    const embeddingResponse = await openai.embeddings.create({
      model: 'text-embedding-3-large', // Ensure this model matches your data
      input: query,
      dimensions: 1536, // Must match the dimensions of your 'embedding' column
    })
    const [{ embedding }] = embeddingResponse.data

    // --- Step 4: Initialize the Supabase client ---
    const supabase = createClient(supabaseUrl, supabaseServiceRoleKey)

    // --- Step 5: Call the hybrid_search Postgres function via RPC ---
    const { data: documents, error } = await supabase.rpc(HYBRID_SEARCH_FUNCTION, {
      query_text: query,
      query_embedding: embedding,
      match_count: 30, // The number of results to return
    })

    // Handle any errors from the database function call.
    if (error) {
      throw new Error(`Supabase RPC Error: ${error.message}`);
    }

    // --- Step 6: Return the search results ---
    return new Response(JSON.stringify(documents), {
      headers: { 'Content-Type': 'application/json' },
    })

  } catch (err) {
    // A general error handler for any other issues.
    console.error('Error processing request:', err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
})
