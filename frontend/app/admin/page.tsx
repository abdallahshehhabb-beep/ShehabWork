'use client';

import { AppLayout } from '../../components/AppLayout';

export default function AdminPage() {
  return (
    <AppLayout>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1>إدارة المنصة</h1>
        <button className="btn-primary">+ إنشاء مشروع جديد</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
        {/* Quick Actions */}
        <div className="glass-panel">
          <h3 style={{ marginBottom: '20px', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px' }}>إجراءات سريعة</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <button className="btn-secondary" style={{ textAlign: 'right', display: 'flex', justifyContent: 'space-between' }}>
              <span>رفع ملف Excel للجمل</span>
              <span>📄</span>
            </button>
            <button className="btn-secondary" style={{ textAlign: 'right', display: 'flex', justifyContent: 'space-between' }}>
              <span>إضافة مستخدم جديد</span>
              <span>👤</span>
            </button>
            <button className="btn-secondary" style={{ textAlign: 'right', display: 'flex', justifyContent: 'space-between' }}>
              <span>إعدادات Google Drive</span>
              <span>☁️</span>
            </button>
          </div>
        </div>

        {/* System Status */}
        <div className="glass-panel" style={{ borderTop: '4px solid var(--primary)' }}>
          <h3 style={{ marginBottom: '20px', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px' }}>حالة النظام</h3>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <li style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-muted)' }}>قاعدة البيانات</span>
              <span style={{ color: 'var(--success)', fontWeight: 'bold' }}>متصل (SQLite)</span>
            </li>
            <li style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-muted)' }}>Google Drive API</span>
              <span style={{ color: 'var(--danger)', fontWeight: 'bold' }}>غير مهيأ</span>
            </li>
            <li style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-muted)' }}>النسخ الاحتياطي</span>
              <span style={{ color: 'var(--success)', fontWeight: 'bold' }}>يعمل (منذ 2 ساعة)</span>
            </li>
          </ul>
        </div>
      </div>

      <h2 style={{ marginTop: '40px', marginBottom: '20px' }}>المستخدمون النشطون</h2>
      <div className="glass-panel">
        <table style={{ width: '100%', textAlign: 'right', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
              <th style={{ padding: '12px', color: 'var(--text-muted)' }}>الاسم</th>
              <th style={{ padding: '12px', color: 'var(--text-muted)' }}>البريد الإلكتروني</th>
              <th style={{ padding: '12px', color: 'var(--text-muted)' }}>الصلاحية</th>
              <th style={{ padding: '12px', color: 'var(--text-muted)' }}>الإنجازات</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <td style={{ padding: '16px 12px' }}>أحمد محمد</td>
              <td style={{ padding: '16px 12px' }}>ahmed@example.com</td>
              <td style={{ padding: '16px 12px' }}><span style={{ background: 'var(--surface-hover)', padding: '4px 8px', borderRadius: '4px' }}>مسجل صوت</span></td>
              <td style={{ padding: '16px 12px' }}>450 جملة</td>
            </tr>
            <tr>
              <td style={{ padding: '16px 12px' }}>سارة أحمد</td>
              <td style={{ padding: '16px 12px' }}>sara@example.com</td>
              <td style={{ padding: '16px 12px' }}><span style={{ background: 'var(--primary)', color: 'white', padding: '4px 8px', borderRadius: '4px' }}>مفرغ صوتي</span></td>
              <td style={{ padding: '16px 12px' }}>12 ساعة</td>
            </tr>
          </tbody>
        </table>
      </div>
    </AppLayout>
  );
}