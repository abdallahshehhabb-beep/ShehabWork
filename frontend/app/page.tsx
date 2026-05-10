'use client';
import Link from 'next/link';
import { useState } from 'react';

const content = {
  ar: {
    login: 'تسجيل الدخول',
    register: 'ابدأ الآن',
    title: 'مرحباً بكم في',
    company: 'شركة شهاب تك',
    subtitle: 'للمشاريع الصوتية',
    desc: 'المنصة الرائدة في إدارة مشاريع التسجيل والتفريغ الصوتي. انضم إلى فريقنا المتميز من المستقلين وقادة الفرق، وابدأ رحلتك في عالم الإنتاج الصوتي الاحترافي.',
    createAcc: 'إنشاء حساب جديد',
    memberLogin: 'دخول الأعضاء',
    features: [
      { icon: '🎙️', title: 'مشاريع تسجيل', desc: 'فرص عمل متنوعة في مجال التعليق الصوتي وتدريب نماذج الذكاء الاصطناعي.' },
      { icon: '📝', title: 'تفريغ صوتي', desc: 'تحويل الملفات الصوتية إلى نصوص بدقة عالية في مختلف المجالات.' },
      { icon: '⚖️', title: 'نظام عادل', desc: 'عمولات واضحة ونظام دفع موثوق يضمن حقوق جميع الأطراف لمشاريع التسجيل والتفريغ والترجمة.' }
    ],
    footer: '© 2026 شركة شهاب تك للمشاريع الصوتية. جميع الحقوق محفوظة.',
    langBtn: 'English'
  },
  en: {
    login: 'Login',
    register: 'Get Started',
    title: 'Welcome to',
    company: 'Shehab Tech',
    subtitle: 'for Audio Projects',
    desc: 'The leading platform for managing audio recording and transcription projects. Join our elite team of freelancers and team leaders, and start your journey in the professional audio production world.',
    createAcc: 'Create New Account',
    memberLogin: 'Member Login',
    features: [
      { icon: '🎙️', title: 'Recording Projects', desc: 'Diverse job opportunities in voice-over and AI model training.' },
      { icon: '📝', title: 'Transcription', desc: 'Converting audio files into text with high accuracy in various fields.' },
      { icon: '⚖️', title: 'Fair System', desc: 'Clear commissions and a reliable payment system ensuring rights for all parties for recording, transcription, and translation projects.' }
    ],
    footer: '© 2026 Shehab Tech for Audio Projects. All rights reserved.',
    langBtn: 'العربية'
  }
};

export default function LandingPage() {
  const [lang, setLang] = useState<'ar' | 'en'>('ar');
  const t = content[lang];

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-main)', color: 'var(--text-main)', fontFamily: 'Tahoma, Arial, sans-serif', direction: lang === 'ar' ? 'rtl' : 'ltr' }}>
      {/* Navbar */}
      <nav style={{ padding: '20px 50px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(10px)', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary)', letterSpacing: '-1px' }}>
          SHEHAB <span style={{ color: 'var(--text-main)' }}>TECH</span>
        </div>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <button onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')} style={{ background: 'none', border: 'none', color: 'var(--primary)', fontWeight: 'bold', cursor: 'pointer', fontSize: '1rem' }}>
            {t.langBtn}
          </button>
          <Link href="/login" style={{ textDecoration: 'none', color: 'var(--text-main)', fontWeight: 600 }}>{t.login}</Link>
          <Link href="/register" className="btn-primary" style={{ textDecoration: 'none' }}>{t.register}</Link>
        </div>
      </nav>

      {/* Hero Section with Background Image */}
      <div style={{ 
        position: 'relative',
        padding: '120px 50px', 
        textAlign: 'center', 
        minHeight: '60vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundImage: 'url("https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=2000")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'white'
      }}>
        {/* Black Overlay */}
        <div style={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          right: 0, 
          bottom: 0, 
          background: 'rgba(0, 0, 0, 0.75)',
          zIndex: 1
        }}></div>

        <div style={{ position: 'relative', zIndex: 2, maxWidth: '1000px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '3.5rem', fontWeight: 900, marginBottom: '25px', lineHeight: 1.1 }}>
            {t.title} <span style={{ color: 'var(--primary)' }}>{t.company}</span> <br /> {t.subtitle}
          </h1>
          <p style={{ fontSize: '1.2rem', color: '#e0e0e0', marginBottom: '40px', lineHeight: 1.6 }}>
            {t.desc}
          </p>
          
          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
            <Link href="/register" className="btn-primary" style={{ padding: '15px 40px', fontSize: '1.1rem', textDecoration: 'none' }}>{t.createAcc}</Link>
            <Link href="/login" className="btn-secondary" style={{ padding: '15px 40px', fontSize: '1.1rem', textDecoration: 'none', background: 'rgba(255,255,255,0.1)', color: 'white', borderColor: 'white' }}>{t.memberLogin}</Link>
          </div>
        </div>
      </div>

      {/* Features */}
      <div style={{ padding: '80px 50px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', maxWidth: '1200px', margin: '0 auto' }}>
        {t.features.map((feature, i) => (
          <div key={i} className="glass-panel" style={{ padding: '40px', textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: '20px' }}>{feature.icon}</div>
            <h3 style={{ marginBottom: '15px' }}>{feature.title}</h3>
            <p style={{ color: 'var(--text-muted)' }}>{feature.desc}</p>
          </div>
        ))}
      </div>

      {/* Footer */}
      <footer style={{ padding: '50px', borderTop: '1px solid var(--border-color)', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
        {t.footer}
      </footer>
    </div>
  );
}