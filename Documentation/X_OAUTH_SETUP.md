# X (Twitter) OAuth 2.0 Setup Guide

This guide explains how to set up X (Twitter) OAuth 2.0 authentication for the SoTime app.

## Prerequisites

1. X Developer Account
2. X App created in the [X Developer Portal](https://developer.twitter.com/en/portal/dashboard)

## Step 1: Create X App

1. Go to [X Developer Portal](https://developer.twitter.com/en/portal/dashboard)
2. Create a new app or use an existing one
3. Navigate to your app's settings
4. Enable OAuth 2.0
5. Set the following:
   - **App permissions**: Read (at minimum)
   - **Type of App**: Web App, Automated App or Bot
   - **Website URL**:
     - Use your production domain (e.g., `https://sotime.app`)
     - This field does NOT accept `localhost` or `127.0.0.1`
     - The Website URL is informational and doesn't need to match your local dev server
   - **Callback URI / Redirect URL**:
     - Development: `http://127.0.0.1:3000/api/auth/x/callback`
     - Production: `https://yourdomain.com/api/auth/x/callback`
     - **Important**: X does NOT accept `localhost` for callback URLs - use `127.0.0.1` instead

## Step 2: Get OAuth Credentials

1. In your X app settings, find:
   - **Client ID** (also called Consumer Key)
   - **Client Secret** (also called Consumer Secret)
2. Copy these values - you'll need them for environment variables

## Step 3: Configure Environment Variables

Create a `.env.local` file in the root of your project with the following variables:

```env
# X (Twitter) OAuth 2.0 Configuration
# Get these from https://developer.twitter.com/en/portal/dashboard

# Your X OAuth 2.0 Client ID
X_CLIENT_ID=your_client_id_here

# Your X OAuth 2.0 Client Secret
X_CLIENT_SECRET=your_client_secret_here

# Callback URL - must match EXACTLY the one registered in your X app settings
# For local development: use 127.0.0.1 (NOT localhost)
# For production: https://yourdomain.com/api/auth/x/callback
X_REDIRECT_URI=http://127.0.0.1:3000/api/auth/x/callback

# Base URL of your application
# For local development: http://127.0.0.1:3000
# For production: https://yourdomain.com
APP_URL=http://127.0.0.1:3000
```

**Important Notes:**

- The `X_REDIRECT_URI` must **exactly match** the Callback URI in your X app settings
- Use `127.0.0.1` instead of `localhost` for local development (X doesn't accept localhost)
- The Website URL in X Developer Portal can be your production domain (e.g., `https://sotime.app`) even during development

## Step 4: OAuth Flow

The OAuth flow works as follows:

1. **User clicks "Connect X Account"** in the overlay
2. **Redirect to `/api/auth/x`** - This generates PKCE values and redirects to X authorization
3. **User authorizes on X** - X redirects back to your callback URL
4. **Callback handler** (`/api/auth/x/callback`) - Exchanges authorization code for access token
5. **Tokens stored** - Access token and refresh token stored in httpOnly cookies
6. **Redirect to app** - User redirected back to app with success/error status

## API Routes

### `/api/auth/x` (GET)

- Initiates OAuth flow
- Generates PKCE code verifier and challenge
- Stores code verifier in httpOnly cookie
- Redirects to X authorization URL

### `/api/auth/x/callback` (GET)

- Handles OAuth callback from X
- Exchanges authorization code for access token
- Stores tokens in httpOnly cookies
- Fetches user information
- Redirects back to app with status

### `/api/auth/x/token` (GET)

- Returns current access token (if authenticated)
- Used by client components to check authentication status

## Token Storage

Tokens are stored securely in httpOnly cookies:

- `x_access_token` - Access token (expires based on X API settings)
- `x_refresh_token` - Refresh token (30 days)
- `x_user_id` - X user ID (30 days)

## Using X API

After authentication, you can use the X API with the stored access token:

```typescript
import { getXAccessToken, xApiRequest } from '@/lib/x-auth';

// In an API route
const accessToken = await getXAccessToken();
if (accessToken) {
  const response = await xApiRequest('/tweets/search/recent', accessToken, {
    method: 'GET',
  });
  // Use response
}
```

## Error Handling

The OAuth flow includes comprehensive error handling:

- Missing credentials
- User denial
- Token exchange failures
- Network errors

Errors are displayed in the overlay with appropriate messages.

## Security Notes

1. **Never expose Client Secret** - Keep it in server-side environment variables only
2. **Use HTTPS in production** - Required for secure cookie transmission
3. **PKCE** - The implementation uses PKCE (Proof Key for Code Exchange) for enhanced security
4. **HttpOnly Cookies** - Tokens stored in httpOnly cookies prevent XSS attacks
5. **SameSite Cookies** - Set to 'lax' for CSRF protection

## Troubleshooting

### "OAuth configuration error"

- Check that `X_CLIENT_ID` and `X_REDIRECT_URI` are set in `.env.local`
- Restart your development server after adding environment variables

### "Token exchange failed"

- Verify `X_CLIENT_SECRET` is correct
- Ensure callback URL matches exactly what's registered in X app settings
- Check that PKCE code verifier cookie is present (should be set during initiation)

### "Missing code verifier"

- User may have navigated away during OAuth flow
- Code verifier cookie expires after 10 minutes
- Try the OAuth flow again

### Redirect URI mismatch

- The callback URL in `.env.local` must exactly match the one in X app settings
- Check for trailing slashes, http vs https, and port numbers
- Remember: Use `127.0.0.1` not `localhost` for local development callback URLs

### "Invalid website URL" error

- The Website URL field in X Developer Portal does NOT accept `localhost` or `127.0.0.1`
- Use your production domain (e.g., `https://sotime.app`) even during development
- The Website URL is informational and doesn't affect the OAuth flow - only the Callback URI matters

## Production Deployment

1. **Update X Developer Portal:**
   - Update Callback URI to: `https://yourdomain.com/api/auth/x/callback`
   - Website URL should already be set to your production domain
2. **Update environment variables:**
   - Update `X_REDIRECT_URI` to your production callback URL
   - Update `APP_URL` to your production domain
3. Ensure environment variables are set in your hosting platform
4. Verify HTTPS is enabled (required for secure cookies)
5. Test the OAuth flow in production

**Note:** You may need to add both development and production callback URLs in the X Developer Portal if you want to test both environments.

## Next Steps

- Implement token refresh logic for expired access tokens
- Add user profile display after authentication
- Implement disconnect/logout functionality
- Add additional X API endpoints as needed

