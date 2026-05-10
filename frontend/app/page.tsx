import Link from 'next/link';

export default function Home() {
  return (
    <div className="auth-container">
      <div className="auth-card glass-panel" style={{ textAlign: 'center', padding: '40px' }}>
        <h1 className="sidebar-logo" style={{ fontSize: '2.5rem', marginBottom: '20px' }}>Shehab Tech</h1>
        <p style={{ marginBottom: '40px', fontSize: '1.1rem', color: 'var(--text-main)', lineHeight: '1.8' }}>
          أهلاً بك في منصة Shehab Tech لجمع وتفريغ البيانات الصوتية.
          <br/>
          اختر الوجهة التي تريد الانتقال إليها:
        </p>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <Link href="/dashboard" className="btn-primary" style={{ textDecoration: 'none', display: 'block' }}>
            📊 الدخول إلى لوحة التحكم
          </Link>
          <Link href="/login" className="btn-secondary" style={{ textDecoration: 'none', display: 'block' }}>
            🔐 تسجيل الدخول
          </Link>
        </div>
      </div>
    </div>
  );
}