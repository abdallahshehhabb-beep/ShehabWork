'use client';

import { AppLayout } from '../../components/AppLayout';
import { useEffect, useState } from 'react';

export default function DashboardPage() {
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    setRole(localStorage.getItem('user_role') || 'freelancer');
  }, []);

  return (
    <AppLayout>
      <div style={{ maxWidth: '1000px', margin: '0 auto', width: '100%' }}>
        <h1 style={{ marginBottom: '20px', fontSize: '1.8rem', color: 'var(--text-main)' }}>
          {role === 'team_leader' ? 'لوحة تحكم قائد الفريق' : 'لوحة تحكم المستقل'}
        </h1>
        
        {role === 'team_leader' ? (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '40px' }}>
              <div className="glass-panel" style={{ padding: '30px 20px', textAlign: 'center' }}>
                <div style={{ color: 'var(--text-muted)', marginBottom: '10px', fontSize: '0.9rem', fontWeight: 600 }}>إجمالي المنفق</div>
                <div style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--primary)' }}>$0</div>
              </div>
              <div className="glass-panel" style={{ padding: '30px 20px', textAlign: 'center' }}>
                <div style={{ color: 'var(--text-muted)', marginBottom: '10px', fontSize: '0.9rem', fontWeight: 600 }}>مشاريع نشطة</div>
                <div style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--text-main)' }}>0</div>
              </div>
              <div className="glass-panel" style={{ padding: '30px 20px', textAlign: 'center' }}>
                <div style={{ color: 'var(--text-muted)', marginBottom: '10px', fontSize: '0.9rem', fontWeight: 600 }}>أعضاء الفريق</div>
                <div style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--text-main)' }}>0</div>
              </div>
              <div className="glass-panel" style={{ padding: '30px 20px', textAlign: 'center' }}>
                <div style={{ color: 'var(--text-muted)', marginBottom: '10px', fontSize: '0.9rem', fontWeight: 600 }}>معدل الإنجاز</div>
                <div style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--success)' }}>0%</div>
              </div>
            </div>

            <h2 style={{ marginBottom: '15px', fontSize: '1.3rem' }}>أحدث المشاريع</h2>
            <div className="glass-panel" style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
              لا توجد مشاريع حالية. قم بنشر مشروعك الأول.
            </div>
          </>
        ) : (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '40px' }}>
              <div className="glass-panel" style={{ padding: '30px 20px', textAlign: 'center' }}>
                <div style={{ color: 'var(--text-muted)', marginBottom: '10px', fontSize: '0.9rem', fontWeight: 600 }}>الأرباح المتاحة</div>
                <div style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--primary)' }}>$0.00</div>
              </div>
              <div className="glass-panel" style={{ padding: '30px 20px', textAlign: 'center' }}>
                <div style={{ color: 'var(--text-muted)', marginBottom: '10px', fontSize: '0.9rem', fontWeight: 600 }}>عقود نشطة</div>
                <div style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--text-main)' }}>0</div>
              </div>
              <div className="glass-panel" style={{ padding: '30px 20px', textAlign: 'center' }}>
                <div style={{ color: 'var(--text-muted)', marginBottom: '10px', fontSize: '0.9rem', fontWeight: 600 }}>التقديمات المرسلة</div>
                <div style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--text-main)' }}>0</div>
              </div>
              <div className="glass-panel" style={{ padding: '30px 20px', textAlign: 'center' }}>
                <div style={{ color: 'var(--text-muted)', marginBottom: '10px', fontSize: '0.9rem', fontWeight: 600 }}>نسبة النجاح</div>
                <div style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--success)' }}>0%</div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
              <div>
                <h2 style={{ marginBottom: '15px', fontSize: '1.3rem' }}>عقودي النشطة</h2>
                <div className="glass-panel" style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
                  لا توجد عقود نشطة حالياً.
                </div>
              </div>
              <div>
                <h2 style={{ marginBottom: '15px', fontSize: '1.3rem' }}>إحصائيات الملف الشخصي</h2>
                <div className="glass-panel" style={{ padding: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px', paddingBottom: '15px', borderBottom: '1px solid var(--border-color)' }}>
                    <span style={{ color: 'var(--text-muted)' }}>مشاهدات الملف</span>
                    <span style={{ fontWeight: 600 }}>0</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-muted)' }}>الدعوات</span>
                    <span style={{ fontWeight: 600 }}>0</span>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </AppLayout>
  );
}