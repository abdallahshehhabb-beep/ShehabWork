'use client';

import { AppLayout } from '../../components/AppLayout';

export default function DashboardPage() {
  return (
    <AppLayout>
      <h1>نظرة عامة</h1>
      <p style={{ marginBottom: '30px' }}>مرحباً بك في لوحة تحكم Shehab Tech</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '40px' }}>
        <div className="glass-panel" style={{ borderTop: '4px solid var(--primary)' }}>
          <h3 style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>إجمالي التسجيلات</h3>
          <p style={{ fontSize: '2.5rem', color: 'white', fontWeight: 'bold' }}>1,248</p>
          <p style={{ color: 'var(--success)', fontSize: '0.9rem' }}>+12% هذا الأسبوع</p>
        </div>
        
        <div className="glass-panel" style={{ borderTop: '4px solid var(--secondary)' }}>
          <h3 style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>المشاريع النشطة</h3>
          <p style={{ fontSize: '2.5rem', color: 'white', fontWeight: 'bold' }}>12</p>
        </div>
        
        <div className="glass-panel" style={{ borderTop: '4px solid var(--accent)' }}>
          <h3 style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>ساعات التفريغ</h3>
          <p style={{ fontSize: '2.5rem', color: 'white', fontWeight: 'bold' }}>340</p>
          <p style={{ color: 'var(--success)', fontSize: '0.9rem' }}>معدل دقة 98%</p>
        </div>
      </div>

      <h2>المشاريع الأخيرة</h2>
      <div className="glass-panel">
        <table style={{ width: '100%', textAlign: 'right', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
              <th style={{ padding: '12px', color: 'var(--text-muted)' }}>اسم المشروع</th>
              <th style={{ padding: '12px', color: 'var(--text-muted)' }}>النوع</th>
              <th style={{ padding: '12px', color: 'var(--text-muted)' }}>الإنجاز</th>
              <th style={{ padding: '12px', color: 'var(--text-muted)' }}>الحالة</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <td style={{ padding: '16px 12px' }}>تجميع لهجة مصرية</td>
              <td style={{ padding: '16px 12px' }}>تسجيل جمل</td>
              <td style={{ padding: '16px 12px' }}>75%</td>
              <td style={{ padding: '16px 12px' }}><span style={{ color: 'var(--success)' }}>نشط</span></td>
            </tr>
            <tr>
              <td style={{ padding: '16px 12px' }}>تفريغ مقابلات طبية</td>
              <td style={{ padding: '16px 12px' }}>تفريغ صوتي</td>
              <td style={{ padding: '16px 12px' }}>30%</td>
              <td style={{ padding: '16px 12px' }}><span style={{ color: 'var(--primary)' }}>قيد المراجعة</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </AppLayout>
  );
}