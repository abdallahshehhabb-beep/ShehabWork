'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState<'freelancer' | 'team_leader'>('freelancer');
  const [idPhoto, setIdPhoto] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [approvalMessage, setApprovalMessage] = useState('');
  const router = useRouter();

  // تحويل الصورة لـ Base64 لتخزينها في قاعدة البيانات مباشرة
  const fileToBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 2 * 1024 * 1024) {
        setError('حجم الصورة كبير جداً. الحد الأقصى 2MB.');
        return;
      }
      setIdPhoto(file);
      setError('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setApprovalMessage('');

    try {
      if (isLogin) {
        // --- تسجيل دخول ---
        const res = await fetch(`${API_URL}/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'خطأ في تسجيل الدخول');
        localStorage.setItem('access_token', data.access_token);
        localStorage.setItem('user_role', data.user.role);
        localStorage.setItem('user_name', data.user.name);
        localStorage.setItem('user_id', data.user.id);
        router.push('/dashboard');
      } else {
        // --- إنشاء حساب ---
        // تحويل صورة الهوية إلى Base64 قبل الإرسال
        let idCardBase64 = '';
        if (idPhoto) {
          idCardBase64 = await fileToBase64(idPhoto);
        }

        const res = await fetch(`${API_URL}/auth/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password, name, role, idCardUrl: idCardBase64 }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'خطأ في إنشاء الحساب');
        if (role === 'team_leader') {
          setApprovalMessage('تم استلام طلبك للتسجيل كقائد فريق. حسابك الآن قيد المراجعة من قبل إدارة المنصة وسيتم إبلاغك عند الموافقة.');
        } else {
          localStorage.setItem('access_token', data.access_token);
          localStorage.setItem('user_role', data.user.role);
          localStorage.setItem('user_name', data.user.name);
          localStorage.setItem('user_id', data.user.id);
          router.push('/dashboard');
        }
      }
    } catch (err: any) {
      setError(err.message || 'حدث خطأ غير متوقع، يرجى المحاولة مرة أخرى.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card glass-panel" style={{ maxWidth: '500px', width: '90%' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '10px' }}>
          <span style={{ color: 'var(--primary)' }}>Shehab</span> Tech
        </h1>
        <p style={{ textAlign: 'center', marginBottom: '30px' }}>مرحباً بك في منصة تجميع وتفريغ البيانات الصوتية</p>
        
        <div style={{ display: 'flex', marginBottom: '20px', borderBottom: '1px solid var(--border-color)' }}>
          <button 
            type="button"
            onClick={() => { setIsLogin(true); setApprovalMessage(''); }}
            style={{ flex: 1, padding: '10px', background: 'transparent', border: 'none', color: isLogin ? 'var(--primary)' : 'var(--text-muted)', borderBottom: isLogin ? '2px solid var(--primary)' : 'none', cursor: 'pointer', fontWeight: isLogin ? 'bold' : 'normal' }}
          >
            تسجيل الدخول
          </button>
          <button 
            type="button"
            onClick={() => { setIsLogin(false); setApprovalMessage(''); }}
            style={{ flex: 1, padding: '10px', background: 'transparent', border: 'none', color: !isLogin ? 'var(--primary)' : 'var(--text-muted)', borderBottom: !isLogin ? '2px solid var(--primary)' : 'none', cursor: 'pointer', fontWeight: !isLogin ? 'bold' : 'normal' }}
          >
            إنشاء حساب جديد
          </button>
        </div>

        {approvalMessage ? (
          <div style={{ background: 'rgba(245, 158, 11, 0.1)', border: '1px solid var(--warning)', padding: '20px', borderRadius: '12px', textAlign: 'center', color: '#fbbf24', lineHeight: '1.6' }}>
            <span style={{ fontSize: '2rem', display: 'block', marginBottom: '10px' }}>⏳</span>
            {approvalMessage}
            <button onClick={() => setIsLogin(true)} className="btn-secondary" style={{ marginTop: '20px', width: '100%' }}>العودة لتسجيل الدخول</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {!isLogin && (
              <>
                <div className="input-group" style={{ marginBottom: 0 }}>
                  <label className="input-label">نوع الحساب</label>
                  <div style={{ display: 'flex', gap: '15px' }}>
                    <label style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', background: role === 'freelancer' ? 'rgba(59, 130, 246, 0.2)' : 'rgba(255,255,255,0.05)', padding: '10px', borderRadius: '8px', border: role === 'freelancer' ? '1px solid var(--primary)' : '1px solid var(--border-color)' }}>
                      <input type="radio" name="role" value="freelancer" checked={role === 'freelancer'} onChange={() => setRole('freelancer')} />
                      مستقل
                    </label>
                    <label style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', background: role === 'team_leader' ? 'rgba(59, 130, 246, 0.2)' : 'rgba(255,255,255,0.05)', padding: '10px', borderRadius: '8px', border: role === 'team_leader' ? '1px solid var(--primary)' : '1px solid var(--border-color)' }}>
                      <input type="radio" name="role" value="team_leader" checked={role === 'team_leader'} onChange={() => setRole('team_leader')} />
                      قائد فريق
                    </label>
                  </div>
                </div>

                <div className="input-group" style={{ marginBottom: 0 }}>
                  <label className="input-label">الاسم الكامل</label>
                  <input type="text" className="input-field" placeholder="أحمد محمد" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
              </>
            )}

            <div className="input-group" style={{ marginBottom: 0 }}>
              <label className="input-label">البريد الإلكتروني</label>
              <input type="email" className="input-field" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            
            <div className="input-group" style={{ marginBottom: 0 }}>
              <label className="input-label">كلمة المرور</label>
              <input type="password" className="input-field" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>

            {!isLogin && (
              <div className="input-group" style={{ marginBottom: 0 }}>
                <label className="input-label">صورة إثبات الشخصية (الهوية / جواز السفر)</label>
                <div style={{ border: '2px dashed var(--border-color)', borderRadius: '8px', padding: '15px', textAlign: 'center' }}>
                  <input type="file" id="id-upload" accept="image/*" onChange={handleFileChange} style={{ display: 'none' }} required />
                  <label htmlFor="id-upload" className="btn-secondary" style={{ display: 'inline-block', cursor: 'pointer', margin: 0, padding: '8px 15px' }}>
                    {idPhoto ? idPhoto.name : 'رفع صورة إثبات الهوية 📷'}
                  </label>
                  <p style={{ margin: 0, marginTop: '10px', fontSize: '0.8rem', color: 'var(--danger)' }}>
                    *مطلوب للتأكد من هوية المستخدمين الحقيقيين لحماية المنصة
                  </p>
                </div>
              </div>
            )}
            
            {/* Removed mock role selector */}

            {error && (
              <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid #ef4444', padding: '12px 16px', borderRadius: '8px', color: '#ef4444', fontSize: '0.9rem' }}>
                ❌ {error}
              </div>
            )}

            <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '10px', padding: '12px' }} disabled={loading}>
              {loading ? 'جاري المعالجة...' : (isLogin ? 'دخول' : 'إنشاء حساب جديد')}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}