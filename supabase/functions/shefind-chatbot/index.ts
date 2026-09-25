const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

const systemInstruction = `You are SheFind Guide, a warm and precise assistant for an Indian women-focused scholarship and government support discovery platform.
Help users understand what kinds of opportunities may fit their situation, what eligibility details to check, and what documents are commonly requested.
Use plain language and concise sections. Ask one useful follow-up question when the user's situation is unclear.
Never invent a scholarship, benefit amount, deadline, or official URL. Explain that current eligibility and deadlines must be confirmed on the official programme page.
Do not ask users to share passwords, OTPs, Aadhaar numbers, bank details, or other sensitive personal information.
You are a guidance layer, not an official government authority, legal adviser, financial adviser, or admissions decision-maker.`;

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
}

Deno.serve(async request => {
  if (request.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  if (request.method !== 'POST') return json({ error: 'Method not allowed' }, 405);

  const apiKey = Deno.env.get('GEMINI_API_KEY');
  if (!apiKey) return json({ error: 'Gemini is not configured on the server.' }, 500);

  try {
    const body = await request.json();
    const message = typeof body.message === 'string' ? body.message.trim() : '';
    const history = Array.isArray(body.history) ? body.history.slice(-8) : [];
    if (!message) return json({ error: 'A message is required.' }, 400);
    if (message.length > 2000) return json({ error: 'Please keep your message under 2,000 characters.' }, 400);

    const contents = history
      .filter((item: unknown): item is { role: string; content: string } => Boolean(item && typeof item === 'object' && 'content' in item && typeof item.content === 'string'))
      .map(item => ({ role: item.role === 'assistant' ? 'model' : 'user', parts: [{ text: item.content.slice(0, 2500) }] }));
    if (!contents.length || contents.at(-1)?.parts[0].text !== message) contents.push({ role: 'user', parts: [{ text: message }] });

    const model = Deno.env.get('GEMINI_MODEL') || 'gemini-3.8-flash';
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(apiKey)}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ systemInstruction: { parts: [{ text: systemInstruction }] }, contents, generationConfig: { temperature: 0.35, maxOutputTokens: 700 } }),
    });
    const result = await response.json();
    if (!response.ok) return json({ error: result?.error?.message || 'Gemini could not answer right now.' }, response.status >= 500 ? 502 : 400);
    const reply = result?.candidates?.[0]?.content?.parts?.map((part: { text?: string }) => part.text || '').join('').trim();
    if (!reply) return json({ error: 'Gemini returned no text.' }, 502);
    return json({ reply });
  } catch (error) {
    return json({ error: error instanceof Error ? error.message : 'Unexpected chatbot error.' }, 500);
  }
});
