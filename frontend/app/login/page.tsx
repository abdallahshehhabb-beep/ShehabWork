'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://audio-platform-backend-v2.vercel.app/api';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'login' | 'otp'>('login');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        if (data.message === 'OTP_SENT') {
          setStep('otp');
        } else {
          // Fallback if OTP is disabled or something
          completeLogin(data);
        }
      } else {
        setError(data.message || 'خطأ في تسجيل الدخول');
      }
    } catch (err) {
      setError('تعذر الاتصال بالسيرفر');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API_URL}/auth/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }),
      });
      const data = await res.json();
      if (res.ok) {
        completeLogin(data);
      } else {
        setError(data.message || 'كود التحقق غير صحيح');
      }
    } catch (err) {
      setError('تعذر الاتصال بالسيرفر');
    } finally {
      setLoading(false);
    }
  };

  const completeLogin = (data: any) => {
    localStorage.setItem('access_token', data.access_token);
    localStorage.setItem('user_id', data.user.id);
    localStorage.setItem('user_role', data.user.role);
    localStorage.setItem('user_name', data.user.name);
    
    if (data.user.role === 'admin') router.push('/admin');
    else if (data.user.role === 'team_leader') router.push('/teamleader/projects');
    else router.push('/freelancer/projects');
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-main)', fontFamily: 'Tahoma, Arial, sans-serif' }}>
      <div className="glass-panel" style={{ width: '100%', maxWidth: '400px', padding: '40px' }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h1 style={{ fontSize: '1.8rem', color: 'var(--primary)', marginBottom: '10px' }}>شهاب تك</h1>
          <h2>{step === 'login' ? 'تسجيل الدخول' : 'تأكيد الهوية'}</h2>
          <p style={{ color: 'var(--text-muted)' }}>
            {step === 'login' ? 'مرحباً بك مجدداً في المنصة' : `تم إرسال كود الدخول إلى ${email}`}
          </p>
        </div>

        {error && (
          <div style={{ background: 'rgba(239,68,68,0.1)', color: 'var(--danger)', padding: '10px', borderRadius: '6px', marginBottom: '20px', textAlign: 'center', fontSize: '0.9rem' }}>
            {error}
          </div>
        )}

        {step === 'login' ? (
          <form onSubmit={handleLogin}>
            <div className="input-group">
              <label className="input-label">البريد الإلكتروني</label>
              <input type="email" className="input-field" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="input-group">
              <label className="input-label">كلمة المرور</label>
              <input type="password" className="input-field" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <button type="submit" className="btn-primary" style={{ width: '100%', padding: '12px' }} disabled={loading}>
              {loading ? 'جاري الإرسال...' : 'دخول'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp}>
            <div className="input-group">
              <label className="input-label">أدخل الكود المكون من 6 أرقام</label>
              <input 
                type="text" 
                className="input-field" 
                value={otp} 
                onChange={(e) => setOtp(e.target.value)} 
                placeholder="000000" 
                maxLength={6}
                style={{ textAlign: 'center', fontSize: '1.5rem', letterSpacing: '5px' }}
                required 
              />
            </div>
            <button type="submit" className="btn-primary" style={{ width: '100%', padding: '12px' }} disabled={loading}>
              {loading ? 'جاري التحقق...' : 'تأكيد ودخول'}
            </button>
            <button type="button" onClick={() => setStep('login')} style={{ width: '100%', background: 'none', border: 'none', marginTop: '15px', color: 'var(--text-muted)', cursor: 'pointer' }}>
              العودة لتسجيل الدخول
            </button>
          </form>
        )}

        {step === 'login' && (
          <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '0.9rem' }}>
            ليس لديك حساب؟ <Link href="/register" style={{ color: 'var(--primary)', fontWeight: 600 }}>أنشئ حساباً الآن</Link>
          </div>
        )}
      </div>
    </div>
  );
}