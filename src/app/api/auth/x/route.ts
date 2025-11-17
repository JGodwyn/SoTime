import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import crypto from 'crypto'

// X OAuth 2.0 endpoints
const X_AUTH_URL = 'https://twitter.com/i/oauth2/authorize'
const X_TOKEN_URL = 'https://api.twitter.com/2/oauth2/token'

// Generate PKCE code verifier and challenge
function generatePKCE() {
  const codeVerifier = crypto.randomBytes(32).toString('base64url')
  const codeChallenge = crypto
    .createHash('sha256')
    .update(codeVerifier)
    .digest('base64url')
  
  return { codeVerifier, codeChallenge }
}

export async function GET(request: NextRequest) {
  try {
    const clientId = process.env.X_CLIENT_ID
    const redirectUri = process.env.X_REDIRECT_URI
    const appUrl = process.env.APP_URL || process.env.NEXTAUTH_URL || 'http://localhost:3000'

    if (!clientId || !redirectUri) {
      console.error('Missing X OAuth credentials')
      return NextResponse.json(
        { error: 'OAuth configuration error' },
        { status: 500 }
      )
    }

    // Generate PKCE values
    const { codeVerifier, codeChallenge } = generatePKCE()

    // Build authorization URL
    const params = new URLSearchParams({
      response_type: 'code',
      client_id: clientId,
      redirect_uri: redirectUri,
      scope: 'tweet.read users.read offline.access',
      state: crypto.randomBytes(16).toString('hex'),
      code_challenge: codeChallenge,
      code_challenge_method: 'S256',
    })

    const authUrl = `${X_AUTH_URL}?${params.toString()}`

    // Create redirect response
    const redirectResponse = NextResponse.redirect(authUrl)
    
    // Store code verifier in httpOnly cookie for security
    // Set cookie on the response object to ensure it's included in headers
    redirectResponse.cookies.set('x_oauth_code_verifier', codeVerifier, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 600, // 10 minutes
      path: '/',
    })
    
    console.log('Code verifier cookie set on redirect response:', {
      hasValue: !!codeVerifier,
      length: codeVerifier.length,
      redirectUri,
    })

    // Redirect to X authorization page with cookie set
    return redirectResponse
  } catch (error) {
    console.error('OAuth initiation error:', error)
    return NextResponse.json(
      { error: 'Failed to initiate OAuth flow' },
      { status: 500 }
    )
  }
}

