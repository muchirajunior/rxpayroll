import { createClient } from '@supabase/supabase-js'
import { OpenAI } from 'openai/client.js'

// Create a single supabase client for interacting with your database
export const supabase = createClient(process.env.SUPABASE_PROJECT_URL ?? '', process.env.SUPABASE_ANON_KEY ?? '')

export const openAIClient = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // This is the default and can be omitted
});