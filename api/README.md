# SheFind Gemini API

The chatbot frontend calls `/api/chat`, which runs server-side on Vercel. Configure these variables in **Vercel Project Settings → Environment Variables** for Production, Preview, and Development:

```text
GEMINI_API_KEY=<your Gemini API key>
GEMINI_MODEL=gemini-3.8-flash
```

Do not prefix these variables with `VITE_`; that would expose the Gemini key to the browser. Redeploy the Vercel project after adding or changing the variables.

The older Supabase Edge Function remains in `supabase/functions/shefind-chatbot` for reference, but the deployed frontend now uses the Vercel route so it does not depend on that function being deployed.
