const apiUrl = process.env.VITE_API_URL;

if (!apiUrl) {
  console.error('[release] VITE_API_URL is required for Steam release builds.');
  console.error('[release] Example: $env:VITE_API_URL=\"https://your-server.example.com/api\"');
  process.exit(1);
}

if (!/^https:\/\/.+\/api\/?$/.test(apiUrl)) {
  console.error('[release] VITE_API_URL must be an HTTPS /api endpoint.');
  console.error(`[release] Received: ${apiUrl.replace(/\/\/[^/]+/, '//<host>')}`);
  process.exit(1);
}

console.log('[release] VITE_API_URL is configured.');
