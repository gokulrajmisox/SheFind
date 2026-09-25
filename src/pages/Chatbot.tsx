import { useState } from 'react';
import type { FormEvent } from 'react';
import { Bot, Check, LoaderCircle, Send, Sparkles, UserRound } from 'lucide-react';
import { supabase } from '@/lib/supabase';

type ChatMessage = { role: 'user' | 'assistant'; content: string };

const starters = [
  'Find scholarships for a girl pursuing engineering',
  'What support is available for women entrepreneurs?',
  'Help me understand the documents I may need',
];

const welcome: ChatMessage = {
  role: 'assistant',
  content: 'Hello, I’m SheFind Guide. Tell me what you are working toward, and I’ll help you discover relevant scholarships, schemes, eligibility hints, and next steps.',
};

export function Chatbot() {
  const [messages, setMessages] = useState<ChatMessage[]>([welcome]);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');

  async function sendMessage(event?: FormEvent, draft?: string) {
    event?.preventDefault();
    const message = (draft ?? input).trim();
    if (!message || sending) return;
    setInput('');
    setError('');
    const nextMessages = [...messages, { role: 'user' as const, content: message }];
    setMessages(nextMessages);
    setSending(true);
    try {
      const { data, error: functionError } = await supabase.functions.invoke('shefind-chatbot', {
        body: { message, history: nextMessages.slice(-8) },
      });
      if (functionError) throw functionError;
      if (!data?.reply) throw new Error('The assistant returned an empty response.');
      setMessages(current => [...current, { role: 'assistant', content: data.reply }]);
    } catch (requestError) {
      const errorMessage = requestError instanceof Error ? requestError.message : String(requestError);
      setError(errorMessage.includes('404') || errorMessage.includes('NOT_FOUND') ? 'The SheFind Guide Edge Function is not deployed in Supabase yet. Deploy shefind-chatbot, then try again.' : errorMessage || 'Unable to reach SheFind Guide right now.');
    } finally {
      setSending(false);
    }
  }

  return <div className="chatbot-shell">
    <section className="chatbot-intro">
      <span className="section-kicker"><Sparkles size={13} /> SheFind intelligence</span>
      <h1>Guidance that meets you where you are.</h1>
      <p>Ask about scholarships, government schemes, eligibility, documents, or the next best step. SheFind Guide turns a broad question into a clearer path.</p>
      <div className="chatbot-promise"><Check size={15} /><span>Answers are designed to guide your search—not replace official programme information.</span></div>
      <div className="chatbot-starters"><span>Try asking</span>{starters.map(prompt => <button key={prompt} type="button" onClick={() => void sendMessage(undefined, prompt)}>{prompt}</button>)}</div>
    </section>

    <section className="chatbot-card" aria-label="SheFind chatbot">
      <div className="chatbot-card-head"><div className="chatbot-avatar"><Bot size={19} /></div><div><strong>SheFind Guide</strong><span>Scholarships & support, thoughtfully explained</span></div><span className="chatbot-status"><i /> Online</span></div>
      <div className="chatbot-messages" aria-live="polite">
        {messages.map((item, index) => <div className={`chat-message ${item.role}`} key={`${item.role}-${index}`}><div className="message-icon">{item.role === 'assistant' ? <Bot size={14} /> : <UserRound size={14} />}</div><div className="message-copy">{item.content}</div></div>)}
        {sending && <div className="chat-message assistant"><div className="message-icon"><Bot size={14} /></div><div className="message-copy typing"><span /><span /><span /></div></div>}
      </div>
      {error && <p className="chatbot-error" role="alert">{error}</p>}
      <form className="chatbot-composer" onSubmit={sendMessage}><textarea value={input} onChange={event => setInput(event.target.value)} onKeyDown={event => { if (event.key === 'Enter' && !event.shiftKey) { event.preventDefault(); void sendMessage(event); } }} placeholder="Ask SheFind Guide anything…" rows={1} aria-label="Message SheFind Guide" /><button type="submit" disabled={!input.trim() || sending} aria-label="Send message">{sending ? <LoaderCircle className="spin" size={18} /> : <Send size={18} />}</button></form>
      <p className="chatbot-disclaimer">Never share passwords, OTPs, or sensitive identity details in chat.</p>
    </section>
  </div>;
}
