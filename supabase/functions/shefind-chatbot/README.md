# SheFind Guide Edge Function

This function keeps the Gemini API key on the Supabase server and exposes only a narrow chat endpoint to the SheFind frontend.

Configure the existing Supabase project secret before deploying:

```bash
supabase secrets set GEMINI_API_KEY="<your Gemini API key>"
supabase secrets set GEMINI_MODEL="gemini-3.8-flash"
supabase functions deploy shefind-chatbot
```

Do not place `GEMINI_API_KEY` in `VITE_*` variables or commit it to the repository. The frontend calls this function through `supabase.functions.invoke('shefind-chatbot')`.
