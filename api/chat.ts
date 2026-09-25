const systemInstruction = `You are SheFind Guide, a warm and precise assistant for an Indian women-focused scholarship and government support discovery platform.
Help users understand what kinds of opportunities may fit their situation, what eligibility details to check, and what documents are commonly requested.
Use plain language and concise sections. Ask one useful follow-up question when the user's situation is unclear.
Never invent a scholarship, benefit amount, deadline, or official URL. Explain that current eligibility and deadlines must be confirmed on the official programme page.
Do not ask users to share passwords, OTPs, Aadhaar numbers, bank details, or other sensitive personal information.
You are a guidance layer, not an official government authority, legal adviser, financial adviser, or admissions decision-maker.`;

function response(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' } });
}

export default async function handler(request: Request) {
  if (request.method !== 'POST') return response({ error: 'Method not allowed' }, 405);
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return response({ error: 'GEMINI_API_KEY is not configured in Vercel.' }, 500);
  try {
    const body = await request.json() as { message?: unknown; history?: unknown };
    const message = typeof body.message === 'string' ? body.message.trim() : '';
    const history = Array.isArray(body.history) ? body.history.slice(-8) : [];
    if (!message) return response({ error: 'A message is required.' }, 400);
    if (message.length > 2000) return response({ error: 'Please keep your message under 2,000 characters.' }, 400);
    const contents = history
      .filter((item): item is { role: string; content: string } => Boolean(item && typeof item === 'object' && 'content' in item && typeof (item as { content?: unknown }).content === 'string'))
      .map(item => ({ role: item.role === 'assistant' ? 'model' : 'user', parts: [{ text: item.content.slice(0, 2500) }] }));
    if (!contents.length || contents.at(-1)?.parts[0].text !== message) contents.push({ role: 'user', parts: [{ text: message }] });
    const model = process.env.GEMINI_MODEL || 'gemini-3.8-flash';
    const geminiResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(apiKey)}`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ systemInstruction: { parts: [{ text: systemInstruction }] }, contents, generationConfig: { temperature: 0.35, maxOutputTokens: 700 } }),
    });
    const result = await geminiResponse.json() as { error?: { message?: string }; candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }> };
    if (!geminiResponse.ok) return response({ error: result.error?.message || 'Gemini could not answer right now.' }, geminiResponse.status >= 500 ? 502 : 400);
    const reply = result.candidates?.[0]?.content?.parts?.map(part => part.text || '').join('').trim();
    return reply ? response({ reply }) : response({ error: 'Gemini returned no text.' }, 502);
  } catch (error) {
    return response({ error: error instanceof Error ? error.message : 'Unexpected chatbot error.' }, 500);
  }
}
