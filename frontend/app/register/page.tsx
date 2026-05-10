'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://shehab-work-backend.vercel.app/api';

export default function RegisterPage() {
  const router = useRouter();
  const [role, setRole] = useState<'freelancer' | 'team_leader'>('freelancer');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [country, setCountry] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          password,
          name,
          role,
          age: parseInt(age),
          country,
          phone,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        // Redirect to login after registration
        alert('تم إنشاء الحساب بنجاح! يرجى مراجعة بريدك الإلكتروني لتفعيله، ثم تسجيل الدخول.');
        router.push('/login');
      } else {
        setError(data.message || 'فشل إنشاء الحساب');
      }
    } catch (err) {
      setError('تعذر الاتصال بالسيرفر');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-main)', padding: '20px', fontFamily: 'Tahoma, Arial, sans-serif' }}>
      <div className="glass-panel" style={{ width: '100%', maxWidth: '500px', padding: '40px' }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h1 style={{ fontSize: '1.8rem', color: 'var(--primary)', marginBottom: '10px' }}>إنشاء حساب جديد</h1>
          <p style={{ color: 'var(--text-muted)' }}>انضم إلى أسرة شهاب تك اليوم</p>
        </div>

        {error && (
          <div style={{ background: 'rgba(239,68,68,0.1)', color: 'var(--danger)', padding: '10px', borderRadius: '6px', marginBottom: '20px', textAlign: 'center', fontSize: '0.9rem' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
            <button 
              type="button" 
              onClick={() => setRole('freelancer')}
              className={role === 'freelancer' ? 'btn-primary' : 'btn-secondary'}
              style={{ flex: 1, padding: '10px' }}
            >
              مستقل
            </button>
            <button 
              type="button" 
              onClick={() => setRole('team_leader')}
              className={role === 'team_leader' ? 'btn-primary' : 'btn-secondary'}
              style={{ flex: 1, padding: '10px' }}
            >
              قائد فريق
            </button>
          </div>

          <div className="input-group">
            <label className="input-label">الاسم الكامل</label>
            <input type="text" className="input-field" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>

          <div className="input-group">
            <label className="input-label">البريد الإلكتروني</label>
            <input type="email" className="input-field" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>

          <div className="input-group">
            <label className="input-label">كلمة المرور</label>
            <input type="password" className="input-field" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
            <div className="input-group">
              <label className="input-label">السن</label>
              <input type="number" className="input-field" value={age} onChange={(e) => setAge(e.target.value)} required />
            </div>
            <div className="input-group">
              <label className="input-label">الدولة</label>
              <input type="text" className="input-field" value={country} onChange={(e) => setCountry(e.target.value)} required />
            </div>
          </div>

          <div className="input-group">
            <label className="input-label">رقم الهاتف</label>
            <input type="text" className="input-field" value={phone} onChange={(e) => setPhone(e.target.value)} required />
          </div>

          <button type="submit" className="btn-primary" style={{ width: '100%', padding: '12px', marginTop: '10px' }} disabled={loading}>
            {loading ? 'جاري إنشاء الحساب...' : 'إنشاء حساب'}
          </button>
        </form>

        <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '0.9rem' }}>
          لديك حساب بالفعل؟ <Link href="/login" style={{ color: 'var(--primary)', fontWeight: 600 }}>سجل دخولك</Link>
        </div>
      </div>
    </div>
  );
}
