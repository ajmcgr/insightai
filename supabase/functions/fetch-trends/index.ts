import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import FirecrawlApp from 'https://esm.sh/@mendable/firecrawl-js'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { keywords } = await req.json()
    const firecrawlApiKey = Deno.env.get('FIRECRAWL_API_KEY')
    
    if (!firecrawlApiKey) {
      throw new Error('Firecrawl API key not configured')
    }

    // Initialize Firecrawl
    const firecrawl = new FirecrawlApp({ apiKey: firecrawlApiKey })

    // Create Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    )

    // Fetch data for each keyword
    const results = await Promise.all(
      keywords.map(async (keyword: string) => {
        // Use Firecrawl to get trend data
        const searchUrl = `https://trends.google.com/trends/explore?q=${encodeURIComponent(keyword)}`
        const crawlResponse = await firecrawl.crawlUrl(searchUrl, {
          limit: 1,
          scrapeOptions: {
            formats: ['html'],
          }
        })

        if (!crawlResponse.success) {
          console.error(`Failed to crawl for keyword: ${keyword}`)
          return null
        }

        // Process the crawled data to extract trend information
        const volume = Math.floor(Math.random() * 1000) // Placeholder: replace with actual parsing logic
        const changePercentage = Math.floor(Math.random() * 100) // Placeholder: replace with actual parsing logic

        // Insert the trend data into Supabase
        const { data, error } = await supabaseClient
          .from('search_trends')
          .insert({
            keyword,
            volume,
            change_percentage: changePercentage,
            country: 'us',
            category: 'all',
            device: 'all'
          })
          .select()
          .single()

        if (error) {
          console.error('Error inserting trend data:', error)
          return null
        }

        return data
      })
    )

    // Filter out null results and return
    const validResults = results.filter(result => result !== null)

    return new Response(
      JSON.stringify({ success: true, data: validResults }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )
  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    )
  }
})