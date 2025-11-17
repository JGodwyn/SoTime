import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

/**
 * API route to retrieve X access token (client-side accessible)
 * This allows client components to check if user is authenticated
 */
export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const accessToken = cookieStore.get('x_access_token')?.value
    const userId = cookieStore.get('x_user_id')?.value

    if (!accessToken) {
      return NextResponse.json(
        { authenticated: false },
        { status: 200 }
      )
    }

    return NextResponse.json({
      authenticated: true,
      access_token: accessToken,
      user_id: userId,
    })
  } catch (error) {
    console.error('Error retrieving X token:', error)
    return NextResponse.json(
      { error: 'Failed to retrieve token' },
      { status: 500 }
    )
  }
}

