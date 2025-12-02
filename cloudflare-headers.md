# Cloudflare Headers Configuration for Web-TTS

Your Web-TTS app requires these headers for WebAssembly/SharedArrayBuffer:

## Required Headers
```
Cross-Origin-Opener-Policy: same-origin
Cross-Origin-Embedder-Policy: require-corp
```

## How to Add Headers in Cloudflare

### Method 1: Transform Rules (Recommended)
1. Go to your Cloudflare dashboard
2. Select your domain (wahthefox.com)
3. Go to **Rules** → **Transform Rules** → **Modify Response Header**
4. Click **Create rule**
5. Name: "WebAssembly Headers for TTS"
6. When incoming requests match: `Hostname equals tts.wahthefox.com`
7. Then:
   - **Set static** → Header name: `Cross-Origin-Opener-Policy` → Value: `same-origin`
   - **Set static** → Header name: `Cross-Origin-Embedder-Policy` → Value: `require-corp`
8. Click **Deploy**

### Method 2: Cloudflare Workers
Create a worker with this code:

```javascript
export default {
  async fetch(request, env) {
    const response = await fetch(request)
    const newResponse = new Response(response.body, response)

    newResponse.headers.set('Cross-Origin-Opener-Policy', 'same-origin')
    newResponse.headers.set('Cross-Origin-Embedder-Policy', 'require-corp')

    return newResponse
  }
}
```

Deploy and add route: `tts.wahthefox.com/*`

## Alternative: Switch to Cloudflare Pages

Cloudflare Pages supports custom headers via `_headers` file:

```
/*
  Cross-Origin-Opener-Policy: same-origin
  Cross-Origin-Embedder-Policy: require-corp
```

## Testing Headers

After configuration, test with:
```bash
curl -I https://tts.wahthefox.com
```

You should see both headers in the response.
