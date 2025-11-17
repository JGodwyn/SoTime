import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import crypto from 'crypto'

const X_TOKEN_URL = 'https://api.twitter.com/2/oauth2/token'

/**
 * Get the correct base URL for redirects
 * Uses APP_URL from env, or extracts from X_REDIRECT_URI, or defaults to 127.0.0.1:3000
 * This ensures we always redirect to the same domain that has the cookies
 */
function getBaseUrl(): string {
  // Try APP_URL first
  if (process.env.APP_URL) {
    return process.env.APP_URL
  }
  
  // Extract from X_REDIRECT_URI if available
  if (process.env.X_REDIRECT_URI) {
    try {
      const url = new URL(process.env.X_REDIRECT_URI)
      return `${url.protocol}//${url.host}`
    } catch (e) {
      // Fall through to default
    }
  }
  
  // Default to 127.0.0.1:3000 for local development
  return 'http://127.0.0.1:3000'
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const code = searchParams.get('code')
    const error = searchParams.get('error')
    const errorDescription = searchParams.get('error_description')

    // Get base URL for consistent redirects
    const baseUrl = getBaseUrl()

    // Handle OAuth errors - redirect to homepage with error
    if (error) {
      console.error('OAuth error:', error, errorDescription)
      return NextResponse.redirect(
        new URL(`/homepage?error=${encodeURIComponent(errorDescription || error)}`, baseUrl)
      )
    }

    if (!code) {
      return NextResponse.redirect(
        new URL('/homepage?error=missing_authorization_code', baseUrl)
      )
    }

    // Retrieve code verifier from cookie
    const cookieStore = await cookies()
    const codeVerifierCookie = cookieStore.get('x_oauth_code_verifier')
    const codeVerifier = codeVerifierCookie?.value

    // Debug logging
    const requestUrl = request.url
    const requestHost = new URL(requestUrl).hostname
    console.log('Callback received:', {
      requestUrl,
      requestHost,
      hasCode: !!code,
      hasCodeVerifierCookie: !!codeVerifierCookie,
      hasCodeVerifierValue: !!codeVerifier,
      allCookies: cookieStore.getAll().map(c => ({ name: c.name, value: c.value?.substring(0, 20) + '...' })),
    })

    if (!codeVerifier) {
      const allCookies = cookieStore.getAll()
      console.error('Missing code verifier cookie.', {
        requestHost,
        availableCookies: allCookies.map(c => c.name),
        redirectUri: process.env.X_REDIRECT_URI,
      })
      
      // Check if there's a hostname mismatch
      const redirectUriHost = process.env.X_REDIRECT_URI ? new URL(process.env.X_REDIRECT_URI).hostname : null
      if (requestHost !== redirectUriHost) {
        const errorMsg = `Domain mismatch: Access the app via ${redirectUriHost || '127.0.0.1'} instead of ${requestHost}. Cookies set for one domain won't work for the other.`
        console.error(errorMsg)
        return NextResponse.redirect(
          new URL(`/homepage?error=${encodeURIComponent(errorMsg)}`, baseUrl)
        )
      }
      
      return NextResponse.redirect(
        new URL('/homepage?error=missing_code_verifier', baseUrl)
      )
    }

    const clientId = process.env.X_CLIENT_ID
    const clientSecret = process.env.X_CLIENT_SECRET
    const redirectUri = process.env.X_REDIRECT_URI

    if (!clientId || !clientSecret || !redirectUri) {
      console.error('Missing X OAuth credentials')
      return NextResponse.redirect(
        new URL('/homepage?error=configuration_error', baseUrl)
      )
    }

    // Exchange authorization code for access token
    const tokenParams = new URLSearchParams({
      code,
      grant_type: 'authorization_code',
      client_id: clientId,
      redirect_uri: redirectUri,
      code_verifier: codeVerifier,
    })

    const tokenResponse = await fetch(X_TOKEN_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
      },
      body: tokenParams.toString(),
    })

    if (!tokenResponse.ok) {
      const errorData = await tokenResponse.text()
      console.error('Token exchange error:', errorData)
      return NextResponse.redirect(
        new URL('/homepage?error=token_exchange_failed', baseUrl)
      )
    }

    const tokenData = await tokenResponse.json()

    // Store tokens securely in httpOnly cookies
    const maxAge = tokenData.expires_in || 7200 // Default to 2 hours if not provided
    
    cookieStore.set('x_access_token', tokenData.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge,
      path: '/',
    })

    if (tokenData.refresh_token) {
      cookieStore.set('x_refresh_token', tokenData.refresh_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/',
      })
    }

    // Clean up code verifier cookie
    cookieStore.delete('x_oauth_code_verifier')

    // Fetch user info to verify connection and store for display
    try {
      const userResponse = await fetch('https://api.twitter.com/2/users/me?user.fields=name,username', {
        headers: {
          Authorization: `Bearer ${tokenData.access_token}`,
        },
      })

      if (userResponse.ok) {
        const userData = await userResponse.json()
        // Store user info for display
        if (userData.data) {
          cookieStore.set('x_user_id', userData.data.id, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24 * 30, // 30 days
            path: '/',
          })
          
          // Store user name and username for display
          if (userData.data.name) {
            cookieStore.set('x_user_name', userData.data.name, {
              httpOnly: true,
              secure: process.env.NODE_ENV === 'production',
              sameSite: 'lax',
              maxAge: 60 * 60 * 24 * 30, // 30 days
              path: '/',
            })
          }
          
          if (userData.data.username) {
            cookieStore.set('x_user_username', userData.data.username, {
              httpOnly: true,
              secure: process.env.NODE_ENV === 'production',
              sameSite: 'lax',
              maxAge: 60 * 60 * 24 * 30, // 30 days
              path: '/',
            })
          }
        }
      }
    } catch (userError) {
      console.error('Error fetching user info:', userError)
      // Continue even if user info fetch fails
    }

    // Redirect to homepage after successful authentication
    // Use baseUrl to ensure we redirect to the correct domain (127.0.0.1, not localhost)
    return NextResponse.redirect(new URL('/homepage', baseUrl))
  } catch (error) {
    console.error('OAuth callback error:', error)
    const baseUrl = getBaseUrl()
    return NextResponse.redirect(
      new URL('/homepage?error=callback_processing_failed', baseUrl)
    )
  }
}

