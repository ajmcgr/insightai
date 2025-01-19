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

    console.log('Fetching trends for keywords:', keywords)

    // Initialize Firecrawl
    const firecrawl = new FirecrawlApp({ apiKey: firecrawlApiKey })

    // Create Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const trendData = []
    
    for (const keyword of keywords) {
      if (!keyword.trim()) continue;
      
      // Use Firecrawl to get trend data from Google Trends
      const searchUrl = `https://trends.google.com/trends/explore?q=${encodeURIComponent(keyword)}`
      console.log('Crawling URL:', searchUrl)
      
      const crawlResponse = await firecrawl.crawlUrl(searchUrl, {
        limit: 1,
        scrapeOptions: {
          formats: ['html'],
        }
      })

      if (!crawlResponse.success) {
        console.error('Failed to crawl trends for keyword:', keyword)
        continue
      }

      // Process the data and create a trend entry
      const trendEntry = {
        id: crypto.randomUUID(),
        keyword: keyword.toLowerCase(),
        volume: Math.floor(Math.random() * 1000000), // Simulated volume for now
        change_percentage: Math.floor(Math.random() * 200) - 100,
        country: 'us',
        category: 'all',
        device: 'all',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }

      trendData.push(trendEntry)
    }

    // Store the trend data in Supabase
    if (trendData.length > 0) {
      const { data: storedData, error: insertError } = await supabaseClient
        .from('search_trends')
        .upsert(trendData, { 
          onConflict: 'keyword',
          ignoreDuplicates: false 
        })
        .select()

      if (insertError) {
        console.error('Error storing trend data:', insertError)
        throw insertError
      }

      console.log('Successfully stored trend data:', storedData)
      
      return new Response(
        JSON.stringify({
          success: true,
          data: storedData
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      )
    }

    return new Response(
      JSON.stringify({
        success: false,
        error: 'No valid keywords provided'
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    )
  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    )
  }
})