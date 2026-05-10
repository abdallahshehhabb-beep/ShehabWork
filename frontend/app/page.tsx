'use client';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-main)', color: 'var(--text-main)', fontFamily: 'Tahoma, Arial, sans-serif' }}>
      {/* Navbar */}
      <nav style={{ padding: '20px 50px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(10px)', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary)', letterSpacing: '-1px' }}>
          SHEHAB <span style={{ color: 'var(--text-main)' }}>TECH</span>
        </div>
        <div style={{ display: 'flex', gap: '20px' }}>
          <Link href="/login" style={{ textDecoration: 'none', color: 'var(--text-main)', fontWeight: 600 }}>تسجيل الدخول</Link>
          <Link href="/register" className="btn-primary" style={{ textDecoration: 'none' }}>ابدأ الآن</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div style={{ padding: '100px 50px', textAlign: 'center', maxWidth: '1000px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '3.5rem', fontWeight: 900, marginBottom: '25px', lineHeight: 1.1 }}>
          مرحباً بكم في <span style={{ color: 'var(--primary)' }}>شركة شهاب تك</span> <br /> للمشاريع الصوتية
        </h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', marginBottom: '40px', lineHeight: 1.6 }}>
          المنصة الرائدة في إدارة مشاريع التسجيل والتفريغ الصوتي. انضم إلى فريقنا المتميز من المستقلين وقادة الفرق، وابدأ رحلتك في عالم الإنتاج الصوتي الاحترافي.
        </p>
        
        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
          <Link href="/register" className="btn-primary" style={{ padding: '15px 40px', fontSize: '1.1rem', textDecoration: 'none' }}>إنشاء حساب جديد</Link>
          <Link href="/login" className="btn-secondary" style={{ padding: '15px 40px', fontSize: '1.1rem', textDecoration: 'none' }}>دخول الأعضاء</Link>
        </div>
      </div>

      {/* Features */}
      <div style={{ padding: '80px 50px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', maxWidth: '1200px', margin: '0 auto' }}>
        <div className="glass-panel" style={{ padding: '40px', textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '20px' }}>🎙️</div>
          <h3 style={{ marginBottom: '15px' }}>مشاريع تسجيل</h3>
          <p style={{ color: 'var(--text-muted)' }}>فرص عمل متنوعة في مجال التعليق الصوتي وتدريب نماذج الذكاء الاصطناعي.</p>
        </div>
        <div className="glass-panel" style={{ padding: '40px', textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '20px' }}>📝</div>
          <h3 style={{ marginBottom: '15px' }}>تفريغ صوتي</h3>
          <p style={{ color: 'var(--text-muted)' }}>تحويل الملفات الصوتية إلى نصوص بدقة عالية في مختلف المجالات الطبية والقانونية.</p>
        </div>
        <div className="glass-panel" style={{ padding: '40px', textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '20px' }}>⚖️</div>
          <h3 style={{ marginBottom: '15px' }}>نظام عادل</h3>
          <p style={{ color: 'var(--text-muted)' }}>عمولات واضحة ونظام دفع موثوق يضمن حقوق جميع الأطراف.</p>
        </div>
      </div>

      {/* Footer */}
      <footer style={{ padding: '50px', borderTop: '1px solid var(--border-color)', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
        © 2026 شركة شهاب تك للمشاريع الصوتية. جميع الحقوق محفوظة.
      </footer>
    </div>
  );
}