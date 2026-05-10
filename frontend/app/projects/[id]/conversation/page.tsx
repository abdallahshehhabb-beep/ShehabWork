'use client';
import { AppLayout } from '../../../../components/AppLayout';
import { useState } from 'react';

export default function ConversationPage({ params }: { params: { id: string } }) {
  const [searchEmail, setSearchEmail] = useState('');
  const [foundUser, setFoundUser] = useState<{name: string, email: string} | null>(null);
  const [invitationState, setInvitationState] = useState<'search' | 'sent' | 'received' | 'accepted'>('search');
  
  const [messages, setMessages] = useState([
    { id: 1, text: 'مرحباً، تم قبول دعوتك بنجاح. كيف يمكنني مساعدتك اليوم؟', sender: 'partner' },
  ]);
  const [input, setInput] = useState('');

  const handleSearch = () => {
    if (searchEmail.includes('@')) {
      // Mock finding a user
      setFoundUser({ name: 'سارة خالد', email: searchEmail });
    } else {
      alert('الرجاء إدخال بريد إلكتروني صحيح');
    }
  };

  const handleSendInvite = () => {
    setInvitationState('sent');
    
    // محاكاة: بعد 3 ثواني، تظهر دعوة وهمية للطرف الآخر (لغرض العرض)
    setTimeout(() => {
      setInvitationState('received');
    }, 3000);
  };

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { id: Date.now(), text: input, sender: 'me' }]);
    setInput('');
  };

  return (
    <AppLayout>
      <div style={{ maxWidth: '800px', margin: '0 auto', height: 'calc(100vh - 100px)', display: 'flex', flexDirection: 'column', width: '100%' }}>
        <h1 style={{ marginBottom: '20px' }}>جلسة محادثة (المشروع #{params.id})</h1>

        {invitationState === 'search' && (
          <div className="glass-panel" style={{ padding: '40px', textAlign: 'center' }}>
            <h2 style={{ marginBottom: '20px', color: 'var(--primary)' }}>ابدأ محادثة جديدة</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '30px' }}>ابحث عن المستقل أو قائد الفريق باستخدام بريده الإلكتروني لإرسال دعوة المحادثة.</p>
            
            <div style={{ display: 'flex', gap: '10px', maxWidth: '500px', margin: '0 auto', marginBottom: '20px' }}>
              <input 
                type="email" 
                className="input-field" 
                placeholder="example@shehab.tech" 
                value={searchEmail}
                onChange={(e) => setSearchEmail(e.target.value)}
                style={{ flex: 1, direction: 'ltr' }}
              />
              <button className="btn-primary" onClick={handleSearch}>بحث 🔍</button>
            </div>

            {foundUser && (
              <div style={{ background: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '12px', border: '1px solid var(--border-color)', marginTop: '20px' }}>
                <h3 style={{ marginBottom: '10px' }}>تم العثور على: {foundUser.name}</h3>
                <p style={{ color: 'var(--text-muted)', marginBottom: '20px' }}>{foundUser.email}</p>
                <button className="btn-primary" style={{ background: 'var(--success)' }} onClick={handleSendInvite}>
                  إرسال دعوة محادثة ✉️
                </button>
              </div>
            )}
          </div>
        )}

        {invitationState === 'sent' && (
          <div className="glass-panel pulse-animation" style={{ padding: '60px 40px', textAlign: 'center' }}>
            <h2 style={{ color: 'var(--primary)', marginBottom: '15px' }}>⏳ جاري انتظار الموافقة...</h2>
            <p style={{ color: 'var(--text-muted)' }}>تم إرسال الدعوة إلى {foundUser?.name}. لا يمكنك بدء المحادثة حتى يتم قبول طلبك.</p>
          </div>
        )}

        {invitationState === 'received' && (
          <div className="glass-panel" style={{ padding: '40px', textAlign: 'center', border: '2px solid var(--primary)' }}>
            <span style={{ fontSize: '3rem', display: 'block', marginBottom: '10px' }}>🔔</span>
            <h2 style={{ marginBottom: '15px' }}>دعوة محادثة جديدة!</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '30px' }}>
              لقد تلقيت دعوة محادثة من <strong>{foundUser?.name}</strong> بخصوص هذا المشروع. هل توافق؟
            </p>
            <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
              <button className="btn-primary" style={{ background: 'var(--success)', padding: '10px 30px' }} onClick={() => setInvitationState('accepted')}>
                قبول ✅
              </button>
              <button className="btn-primary" style={{ background: 'var(--danger)', padding: '10px 30px' }} onClick={() => setInvitationState('search')}>
                رفض ❌
              </button>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '20px' }}>*هذه الشاشة محاكاة لما يراه الطرف الآخر*</p>
          </div>
        )}

        {invitationState === 'accepted' && (
          <>
            <div style={{ background: 'rgba(34, 197, 94, 0.1)', border: '1px solid var(--success)', padding: '10px 20px', borderRadius: '12px', marginBottom: '15px', color: 'var(--success)', display: 'flex', justifyContent: 'space-between' }}>
              <span>تم الاتصال بنجاح مع {foundUser?.name}</span>
              <span style={{ cursor: 'pointer' }} onClick={() => setInvitationState('search')}>إنهاء المحادثة</span>
            </div>
            <div className="glass-panel" style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '20px', padding: '20px' }}>
              {messages.map(msg => (
                <div key={msg.id} style={{ 
                  alignSelf: msg.sender === 'me' ? 'flex-end' : 'flex-start',
                  background: msg.sender === 'me' ? 'var(--primary)' : 'rgba(255,255,255,0.1)',
                  padding: '12px 18px',
                  borderRadius: msg.sender === 'me' ? '16px 16px 0 16px' : '16px 16px 16px 0',
                  maxWidth: '80%'
                }}>
                  {msg.text}
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <input 
                type="text" 
                className="input-field" 
                placeholder="اكتب رسالتك هنا..." 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                style={{ flex: 1, minWidth: '200px' }}
              />
              <button className="btn-primary" onClick={handleSend} style={{ width: '100px', flexShrink: 0 }}>إرسال</button>
            </div>
          </>
        )}
      </div>
    </AppLayout>
  );
}
