import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

/**
 * API route to retrieve X user information (client-side accessible)
 * Returns user name and username if authenticated
 */
export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const userId = cookieStore.get('x_user_id')?.value
    const userName = cookieStore.get('x_user_name')?.value
    const userUsername = cookieStore.get('x_user_username')?.value

    if (!userId) {
      return NextResponse.json(
        { authenticated: false },
        { status: 200 }
      )
    }

    return NextResponse.json({
      authenticated: true,
      user: {
        id: userId,
        name: userName || null,
        username: userUsername || null,
      },
    })
  } catch (error) {
    console.error('Error retrieving X user info:', error)
    return NextResponse.json(
      { error: 'Failed to retrieve user info' },
      { status: 500 }
    )
  }
}

