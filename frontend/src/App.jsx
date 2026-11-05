import React, { useState, useEffect, useRef } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import './App.css';

// مكون الصفحة الرئيسية
function Home({ events, isOpen, toggleChat, messages, loading, input, setInput, sendMessage, chatBodyRef }) {
  return (
    <div className="app-container">
      {/* شريط التنقل العلوي */}
      <header className="navbar">
        <div className="logo">نادي ITC - جامعة سعد دحلب</div>
        <nav className="nav-links">
          <Link to="/">الرئيسية</Link>
          <Link to="/about">نبذة</Link>
          <a href="#activities">الورشات والفعاليات</a>
        </nav>
      </header>

      {/* القسم الرئيسي للموقع */}
      <section id="home" className="hero-section">
        <div className="hero-content">
          <h1><span>اصنع </span>المستقبل التقني<span> معنا</span></h1>
          <p>نادي التكنولوجيا والابتكار (ITC) - بوابتك لاكتشاف عالم البرمجة، الذكاء الاصطناعي، وتطوير الويب.</p>
          <button className="cta-btn" onClick={toggleChat}>تحدث مع المساعد الذكي</button>
        </div>
      </section>

      {/* قسم الأنشطة والفعاليات */}
      <section id="activities" className="activities-section">
        <h2>أبرز فعاليات وورشات النادي</h2>
        <div className="cards-grid">
          {events.length > 0 ? (
            events.map(event => (
              <div className="card" key={event.id}>
                <span className="event-cat">{event.category}</span>
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <small style={{color: '#c59b9b'}}>التاريخ: {event.date}</small>
              </div>
            ))
          ) : (
            <>
              <div className="card">
                <h3>الورشات البرمجية</h3>
                <p>دورات تطبيقية في تطوير الويب، واجهات المستخدم، وتقنيات الموبايل.</p>
              </div>
              <div className="card">
                <h3>الذكاء الاصطناعي</h3>
                <p>استكشاف عالم الذكاء الاصطناعي، وتطوير أدوات ذكية تخدم المجتمع الجامعي.</p>
              </div>
              <div className="card">
                <h3>الهاكاثون والمسابقات</h3>
                <p>تحديات برمجية جماعية لاختبار مهارات حل المشكلات والابتكار.</p>
              </div>
            </>
          )}
        </div>
      </section>

      <ChatWidget 
        isOpen={isOpen} 
        toggleChat={toggleChat} 
        messages={messages} 
        loading={loading} 
        input={input} 
        setInput={setInput} 
        sendMessage={sendMessage} 
        chatBodyRef={chatBodyRef} 
      />
    </div>
  );
}

// مكون صفحة "نبذه" المستقلة
function AboutPage({ isOpen, toggleChat, messages, loading, input, setInput, sendMessage, chatBodyRef }) {
  return (
    <div className="app-container">
      <header className="navbar">
        <div className="logo">نادي ITC - جامعة سعد دحلب</div>
        <nav className="nav-links">
          <Link to="/">الرئيسية</Link>
          <Link to="/about">عن النادي</Link>
        </nav>
      </header>

      <section className="hero-section" style={{ minHeight: '60vh', padding: '4rem 2rem' }}>
        <div className="hero-content" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'right' }}>
          <h1>Yousra Sara Houdane <span> my name is</span></h1>
          <p style={{ lineHeight: '1.8', marginTop: '1.5rem', color: '#c59b9b' }}>
            كنت مترددةً في البداية بشأن اختيار هذا التحدي، ولكن نظراً لأن وقتاً طويلاً جداً قد مرّ منذ أن جربت شيئاً جديداً، شعرت أنه الوقت المناسب لأحاول تعلّم شيء جديد، واستذكار أمور كنت قد نسيتها لأنني لم أطبقها منذ وقت طويل

          </p>
          <Link to="/" className="cta-btn" style={{ display: 'inline-block', marginTop: '2rem', textDecoration: 'none' }}>
            ← العودة إلى الرئيسية
          </Link>
        </div>
      </section>

      <ChatWidget 
        isOpen={isOpen} 
        toggleChat={toggleChat} 
        messages={messages} 
        loading={loading} 
        input={input} 
        setInput={setInput} 
        sendMessage={sendMessage} 
        chatBodyRef={chatBodyRef} 
      />
    </div>
  );
}

// مكون الشات المشترك
function ChatWidget({ isOpen, toggleChat, messages, loading, input, setInput, sendMessage, chatBodyRef }) {
  return (
    <div className="chat-bubble-container">
      {!isOpen && (
        <button className="chat-bubble-btn" onClick={toggleChat} title="تحدث مع المساعد الذكي">
          💬
        </button>
      )}

      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <span>مساعد نادي ITC الذكي</span>
            <button className="close-btn" onClick={toggleChat}>✕</button>
          </div>
          
          <div className="chat-body" ref={chatBodyRef}>
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.role === 'user' ? 'user' : 'ai'}`}>
                <span className="msg-bubble">{msg.text}</span>
              </div>
            ))}
            {loading && (
              <div className="message ai">
                <span className="msg-bubble">جاري التفكير...</span>
              </div>
            )}
          </div>

          <form onSubmit={sendMessage} className="chat-footer">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="اسأل عن النادي، الورشات..."
              disabled={loading}
              maxLength={1000}
            />
            <button type="submit" disabled={loading || !input.trim()}>
              {loading ? '...' : 'إرسال'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

// المكون الرئيسي الذي يدير المسارات
function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const [messages, setMessages] = useState(() => {
    const saved = sessionStorage.getItem('itc_chat_history');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return [
      { role: 'assistant', text: 'أهلاً بك في نادي التكنولوجيا والابتكار (ITC)! كيف يمكنني مساعدتك اليوم؟' }
    ];
  });
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatBodyRef = useRef(null);

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    fetch(`${apiUrl}/api/events`)
      .then(res => res.json())
      .then(data => { if (Array.isArray(data)) setEvents(data); })
      .catch(err => console.log('تعذر جلب الفعاليات'));
  }, []);

  useEffect(() => {
    sessionStorage.setItem('itc_chat_history', JSON.stringify(messages));
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages]);

  const toggleChat = () => setIsOpen(!isOpen);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessageText = input.trim();
    if (userMessageText.length > 1000) {
      alert('الرسالة طويلة جداً');
      return;
    }

    const updatedMessages = [...messages, { role: 'user', text: userMessageText }];
    setMessages(updatedMessages);
    setInput('');
    setLoading(true);

    try {
      const historyForApi = messages.map(msg => ({
        role: msg.role === 'ai' ? 'assistant' : msg.role,
        content: msg.text
      }));

      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await fetch(`${apiUrl}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessageText, history: historyForApi }),
      });

      const data = await response.json();
      if (data.reply) {
        setMessages(prev => [...prev, { role: 'ai', text: data.reply }]);
      } else {
        setMessages(prev => [...prev, { role: 'ai', text: 'عذراً، حدث خطأ.' }]);
      }
    } catch (error) {
      setMessages(prev => [...prev, { role: 'ai', text: 'تعذر الاتصال بالخادم.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Routes>
      <Route path="/" element={
        <Home 
          events={events} 
          isOpen={isOpen} 
          toggleChat={toggleChat} 
          messages={messages} 
          loading={loading} 
          input={input} 
          setInput={setInput} 
          sendMessage={sendMessage} 
          chatBodyRef={chatBodyRef} 
        />
      } />
      <Route path="/about" element={
        <AboutPage 
          isOpen={isOpen} 
          toggleChat={toggleChat} 
          messages={messages} 
          loading={loading} 
          input={input} 
          setInput={setInput} 
          sendMessage={sendMessage} 
          chatBodyRef={chatBodyRef} 
        />
      } />
    </Routes>
  );
}

export default App;