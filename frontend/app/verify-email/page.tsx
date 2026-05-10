'use client';
import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://audio-platform-backend-v2.vercel.app/api';

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const token = searchParams.get('token');

  useEffect(() => {
    if (token) {
      verify();
    } else {
      setStatus('error');
    }
  }, [token]);

  const verify = async () => {
    try {
      const res = await fetch(`${API_URL}/auth/verify-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch (e) {
      setStatus('error');
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8f9fa', fontFamily: 'Tahoma, Arial, sans-serif' }}>
      <div style={{ background: 'white', padding: '40px', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', maxWidth: '450px', width: '90%', textAlign: 'center' }}>
        {status === 'loading' && (
          <div>
            <div className="spinner" style={{ border: '4px solid #f3f3f3', borderTop: '4px solid var(--primary)', borderRadius: '50%', width: '40px', height: '40px', animation: 'spin 1s linear infinite', margin: '0 auto 20px' }}></div>
            <h2>جاري تفعيل الحساب...</h2>
          </div>
        )}

        {status === 'success' && (
          <div>
            <div style={{ fontSize: '4rem', marginBottom: '20px' }}>✅</div>
            <h2 style={{ color: 'var(--success)', marginBottom: '15px' }}>تم تفعيل الحساب بنجاح!</h2>
            <p style={{ color: '#666', marginBottom: '30px' }}>يمكنك الآن تسجيل الدخول والبدء في استخدام المنصة.</p>
            <Link href="/login" className="btn-primary" style={{ display: 'inline-block', padding: '12px 30px', textDecoration: 'none' }}>تسجيل الدخول</Link>
          </div>
        )}

        {status === 'error' && (
          <div>
            <div style={{ fontSize: '4rem', marginBottom: '20px' }}>❌</div>
            <h2 style={{ color: 'var(--danger)', marginBottom: '15px' }}>فشل تفعيل الحساب</h2>
            <p style={{ color: '#666', marginBottom: '30px' }}>الرابط قد يكون منتهي الصلاحية أو غير صحيح. يرجى التأكد من الرابط أو التواصل مع الدعم.</p>
            <Link href="/login" className="btn-secondary" style={{ display: 'inline-block', padding: '12px 30px', textDecoration: 'none' }}>العودة للرئيسية</Link>
          </div>
        )}
      </div>
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyEmailContent />
    </Suspense>
  );
}
