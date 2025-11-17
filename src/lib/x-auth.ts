/**
 * X (Twitter) OAuth utility functions
 * 
 * These utilities help manage X OAuth tokens and make authenticated API requests.
 */

export interface XTokenData {
  access_token: string
  refresh_token?: string
  expires_in?: number
  token_type?: string
}

export interface XUser {
  id: string
  name: string
  username: string
}

/**
 * Get X access token from cookies (server-side only)
 * Use this in API routes or server components
 */
export async function getXAccessToken(): Promise<string | null> {
  if (typeof window !== 'undefined') {
    // Client-side: tokens are in httpOnly cookies, not accessible via JS
    // Use an API route to retrieve them
    try {
      const response = await fetch('/api/auth/x/token')
      if (response.ok) {
        const data = await response.json()
        return data.access_token || null
      }
    } catch (error) {
      console.error('Error fetching X token:', error)
    }
    return null
  }
  
  // Server-side: import cookies from 'next/headers'
  // This is just a type definition - actual implementation should be in API routes
  return null
}

/**
 * Refresh X access token using refresh token
 */
export async function refreshXToken(refreshToken: string): Promise<XTokenData | null> {
  const clientId = process.env.X_CLIENT_ID
  const clientSecret = process.env.X_CLIENT_SECRET

  if (!clientId || !clientSecret) {
    throw new Error('X OAuth credentials not configured')
  }

  try {
    const response = await fetch('https://api.twitter.com/2/oauth2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
      },
      body: new URLSearchParams({
        refresh_token: refreshToken,
        grant_type: 'refresh_token',
        client_id: clientId,
      }),
    })

    if (!response.ok) {
      const error = await response.text()
      console.error('Token refresh error:', error)
      return null
    }

    return await response.json()
  } catch (error) {
    console.error('Error refreshing token:', error)
    return null
  }
}

/**
 * Get X user information
 */
export async function getXUser(accessToken: string): Promise<XUser | null> {
  try {
    const response = await fetch('https://api.twitter.com/2/users/me?user.fields=name,username', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    if (!response.ok) {
      const error = await response.text()
      console.error('User fetch error:', error)
      return null
    }

    const data = await response.json()
    return data.data || null
  } catch (error) {
    console.error('Error fetching user:', error)
    return null
  }
}

/**
 * Make authenticated X API request
 */
export async function xApiRequest(
  endpoint: string,
  accessToken: string,
  options?: RequestInit
): Promise<Response> {
  return fetch(`https://api.twitter.com/2${endpoint}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  })
}

