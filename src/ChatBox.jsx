import React, { useState } from 'react';

export default function ChatBox() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Assalamu alaykum! I\'m Nour — ask me about UAE culture, greetings, or Arabic phrases.' }
  ]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = { sender: 'user', text: input };
    setMessages(m => [...m, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const resp = await fetch('/chatWithGemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg.text })
      });
      const data = await resp.json();
      setMessages(m => [...m, { sender: 'bot', text: data.reply }]);
    } catch (err) {
      console.error(err);
      setMessages(m => [...m, { sender: 'bot', text: 'Error contacting server.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{border: '1px solid #ddd', padding: 12, borderRadius: 8}}>
      <div style={{height: 320, overflowY: 'auto', padding: 8, background: '#fafafa'}}>
        {messages.map((m, i) => (
          <div key={i} style={{margin: '8px 0'}}>
            <strong style={{color: m.sender === 'user' ? '#0b5fff' : '#00897b'}}>
              {m.sender === 'user' ? 'You' : 'Nour'}:
            </strong>
            <div>{m.text}</div>
          </div>
        ))}
        {loading && <div>...Nour is thinking</div>}
      </div>
      <div style={{display: 'flex', marginTop: 8}}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Ask about greetings, etiquette, or Arabic/Urdu phrases..."
          style={{flex: 1, padding: 8}}
        />
        <button onClick={sendMessage} style={{marginLeft: 8, padding: '8px 12px'}}>Send</button>
      </div>
    </div>
  );
}
