import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

// Simple in-memory cache for user stats
const statsCache = new Map<string, { data: unknown; expiry: number }>()
const CACHE_DURATION_MS = 60 * 1000 // Cache for 1 minute

/**
 * API route to retrieve X user stats including tweet count
 * Uses the X API v2 to get public_metrics
 */
export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const accessToken = cookieStore.get('x_access_token')?.value
    const userId = cookieStore.get('x_user_id')?.value

    if (!accessToken || !userId) {
      return NextResponse.json(
        { authenticated: false },
        { status: 200 }
      )
    }

    // Check cache first
    const cached = statsCache.get(userId)
    if (cached && Date.now() < cached.expiry) {
      console.log('Returning cached stats for user:', userId)
      return NextResponse.json(cached.data)
    }

    // Fetch user data with public_metrics from X API
    const response = await fetch(
      `https://api.twitter.com/2/users/${userId}?user.fields=public_metrics,profile_image_url,name,username`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )

    // Log rate limit info from headers
    const rateLimitLimit = response.headers.get('x-rate-limit-limit')
    const rateLimitRemaining = response.headers.get('x-rate-limit-remaining')
    const rateLimitReset = response.headers.get('x-rate-limit-reset')
    const resetDate = rateLimitReset ? new Date(parseInt(rateLimitReset, 10) * 1000) : null
    
    console.log('X API Rate Limit Info:', {
      limit: rateLimitLimit,
      remaining: rateLimitRemaining,
      resetTime: resetDate?.toISOString(),
      status: response.status,
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('X API error:', {
        status: response.status,
        statusText: response.statusText,
        error: errorText,
        userId,
      })
      
      // Handle rate limiting - use cookie data as fallback
      if (response.status === 429) {
        const resetTimestamp = rateLimitReset ? parseInt(rateLimitReset, 10) : Math.floor(Date.now() / 1000) + 60
        const secondsUntilReset = Math.max(0, resetTimestamp - Math.floor(Date.now() / 1000))
        
        // Try to use stored cookie data as fallback
        const userName = cookieStore.get('x_user_name')?.value
        const userUsername = cookieStore.get('x_user_username')?.value
        
        if (userName && userUsername) {
          console.log('Rate limited - using cookie fallback data for user:', userName)
          const fallbackData = {
            authenticated: true,
            user: {
              id: userId,
              name: userName,
              username: userUsername,
              profileImageUrl: null, // We don't have this in cookies
              tweetCount: null, // We don't have this without the API call
              followersCount: null,
              followingCount: null,
            },
            rateLimited: true,
            rateLimit: {
              resetAt: resetDate?.toISOString(),
              secondsUntilReset,
            },
          }
          
          // Cache the fallback data for a shorter time
          statsCache.set(userId, {
            data: fallbackData,
            expiry: Date.now() + 30 * 1000, // 30 seconds
          })
          
          return NextResponse.json(fallbackData)
        }
        
        // No fallback data available
        return NextResponse.json(
          { 
            error: `Rate limit exceeded. Reset in ${secondsUntilReset} seconds.`,
            rateLimit: {
              limit: rateLimitLimit,
              remaining: '0',
              resetAt: resetDate?.toISOString(),
              secondsUntilReset,
            },
            retryAfter: secondsUntilReset,
          },
          { status: 429 }
        )
      }
      
      // If 401, likely token expired
      if (response.status === 401) {
        return NextResponse.json(
          { error: 'Your X session has expired. Please reconnect.', authenticated: false },
          { status: 401 }
        )
      }
      
      return NextResponse.json(
        { error: `X API error: ${response.status}` },
        { status: response.status }
      )
    }

    const data = await response.json()
    const user = data.data

    const responseData = {
      authenticated: true,
      user: {
        id: user.id,
        name: user.name,
        username: user.username,
        profileImageUrl: user.profile_image_url,
        tweetCount: user.public_metrics?.tweet_count || 0,
        followersCount: user.public_metrics?.followers_count || 0,
        followingCount: user.public_metrics?.following_count || 0,
      },
    }

    // Cache the response
    statsCache.set(userId, {
      data: responseData,
      expiry: Date.now() + CACHE_DURATION_MS,
    })

    return NextResponse.json(responseData)
  } catch (error) {
    console.error('Error retrieving X user stats:', error)
    return NextResponse.json(
      { error: 'Failed to retrieve user stats' },
      { status: 500 }
    )
  }
}
