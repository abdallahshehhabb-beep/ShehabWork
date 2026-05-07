'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="app-container">
      <aside className="sidebar">
        <div className="sidebar-logo">Shehab Tech</div>
        <nav className="sidebar-nav">
          <Link href="/dashboard" className={`nav-item ${pathname === '/dashboard' ? 'active' : ''}`}>
            <span>📊</span> لوحة التحكم
          </Link>
          <Link href="/projects/1/record" className={`nav-item ${pathname.includes('/record') ? 'active' : ''}`}>
            <span>🎙️</span> تسجيل الصوت
          </Link>
          <Link href="/projects/1/conversation" className={`nav-item ${pathname.includes('/conversation') ? 'active' : ''}`}>
            <span>💬</span> المحادثات
          </Link>
          <Link href="/transcriptions/1" className={`nav-item ${pathname.includes('/transcriptions') ? 'active' : ''}`}>
            <span>📝</span> التفريغ الصوتي
          </Link>
          <Link href="/admin" className={`nav-item ${pathname.includes('/admin') ? 'active' : ''}`}>
            <span>⚙️</span> الإدارة
          </Link>
          <Link href="/login" className="nav-item" style={{ marginTop: 'auto', color: 'var(--danger)' }}>
            <span>🚪</span> تسجيل الخروج
          </Link>
        </nav>
      </aside>
      <main className="main-content">
        {children}
      </main>
    </div>
  );
}
