'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    setRole(localStorage.getItem('user_role') || 'freelancer');
  }, []);

  return (
    <div className="app-container">
      <header className="top-navbar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
          <Link href="/dashboard" className="navbar-logo">ShehabWork</Link>
          
          <nav className="navbar-nav">
            
            {role === 'freelancer' && (
              <>
                <Link href="/freelancer/projects" className={`nav-item ${pathname.includes('/freelancer/projects') ? 'active' : ''}`}>
                  البحث عن عمل (Find Work)
                </Link>
                <Link href="/freelancer/my-projects" className={`nav-item ${pathname.includes('/freelancer/my-projects') ? 'active' : ''}`}>
                  مشاريعي (My Jobs)
                </Link>
              </>
            )}

            {role === 'team_leader' && (
              <>
                <Link href="/dashboard" className={`nav-item ${pathname === '/dashboard' ? 'active' : ''}`}>
                  لوحة التحكم (Dashboard)
                </Link>
                <Link href="/teamleader/projects/new" className={`nav-item ${pathname.includes('/teamleader/projects/new') ? 'active' : ''}`}>
                  نشر مشروع
                </Link>
                <Link href="/teamleader/my-team" className={`nav-item ${pathname.includes('/teamleader/my-team') ? 'active' : ''}`}>
                  فريق العمل (My Team)
                </Link>
                <Link href="/teamleader/applications" className={`nav-item ${pathname.includes('/teamleader/applications') ? 'active' : ''}`}>
                  المتقدمون (Proposals)
                </Link>
              </>
            )}

            {role === 'admin' && (
              <>
                <Link href="/admin" className={`nav-item ${pathname.includes('/admin') ? 'active' : ''}`}>
                  لوحة الإدارة
                </Link>
              </>
            )}
          </nav>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <Link href="/notifications" className="nav-item" style={{ position: 'relative' }} title="الإشعارات">
            🔔
            <span style={{ position: 'absolute', top: '0', right: '0', background: 'var(--danger)', color: 'white', fontSize: '0.7rem', width: '16px', height: '16px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>3</span>
          </Link>
          <div style={{ fontSize: '0.9rem', fontWeight: 'bold', color: 'var(--primary)', background: 'rgba(20, 168, 0, 0.1)', padding: '5px 10px', borderRadius: '15px' }}>
            {role === 'team_leader' ? 'قائد فريق' : role === 'admin' ? 'مدير المنصة' : 'مستقل'}
          </div>
          <Link href="/profile" className={`nav-item ${pathname === '/profile' ? 'active' : ''}`}>
            الملف الشخصي
          </Link>
          <Link href="/login" className="nav-item" style={{ color: 'var(--danger)' }}>
            خروج
          </Link>
        </div>
      </header>

      <main className="main-content">
        {children}
      </main>
    </div>
  );
}
