'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // محاكاة عملية تسجيل الدخول
    setTimeout(() => {
      setLoading(false);
      router.push('/dashboard');
    }, 1500);
  };

  return (
    <div className="auth-container">
      <div className="auth-card glass-panel">
        <h1 style={{ textAlign: 'center', marginBottom: '10px' }}>
          <span style={{ color: 'var(--primary)' }}>Shehab</span> Tech
        </h1>
        <p style={{ textAlign: 'center', marginBottom: '30px' }}>مرحباً بك في منصة تجميع وتفريغ البيانات الصوتية</p>
        
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label className="input-label">البريد الإلكتروني</label>
            <input 
              type="email" 
              className="input-field" 
              placeholder="name@example.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="input-group">
            <label className="input-label">كلمة المرور</label>
            <input 
              type="password" 
              className="input-field" 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <button 
            type="submit" 
            className="btn-primary" 
            style={{ width: '100%', marginTop: '10px' }}
            disabled={loading}
          >
            {loading ? 'جاري تسجيل الدخول...' : 'دخول'}
          </button>
        </form>
      </div>
    </div>
  );
}