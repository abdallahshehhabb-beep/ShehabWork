'use client';
import { AppLayout } from '../../../components/AppLayout';
import { useState } from 'react';

export default function TeamLeaderApplicationsPage() {
  const [applications, setApplications] = useState([
    { id: '1', freelancer: 'أحمد محمد', project: 'تجميع أصوات لهجة مصرية', status: 'pending', rating: 0, notes: '' },
    { id: '2', freelancer: 'سارة خالد', project: 'تفريغ مقابلات طبية', status: 'approved', rating: 4, notes: 'عمل ممتاز وتسليم في الوقت المحدد' },
    { id: '3', freelancer: 'عمر محمود', project: 'تفريغ مقابلات طبية', status: 'pending', rating: 0, notes: '' },
  ]);

  const handleAction = (id: string, newStatus: string) => {
    setApplications(applications.map(app => app.id === id ? { ...app, status: newStatus } : app));
  };

  const updateRating = (id: string, rating: number) => {
    setApplications(applications.map(app => app.id === id ? { ...app, rating } : app));
  };

  const updateNotes = (id: string, notes: string) => {
    setApplications(applications.map(app => app.id === id ? { ...app, notes } : app));
  };

  return (
    <AppLayout>
      <div style={{ maxWidth: '1000px', margin: '0 auto', width: '100%', paddingBottom: '50px' }}>
        <h1 style={{ marginBottom: '20px' }}>إدارة التقديمات وتقييم المستقلين</h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '30px' }}>
          يمكنك هنا مراجعة طلبات التقديم للمشاريع وتقييم أداء المستقلين في المشاريع المكتملة.
        </p>

        <div className="glass-panel">
          <table style={{ width: '100%', textAlign: 'right', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                <th style={{ padding: '15px' }}>المستقل</th>
                <th style={{ padding: '15px' }}>المشروع</th>
                <th style={{ padding: '15px' }}>الحالة</th>
                <th style={{ padding: '15px' }}>التقييم والملاحظات</th>
                <th style={{ padding: '15px', textAlign: 'center' }}>الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {applications.map(app => (
                <tr key={app.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <td style={{ padding: '20px 15px', fontWeight: 'bold' }}>{app.freelancer}</td>
                  <td style={{ padding: '20px 15px', color: 'var(--text-muted)' }}>{app.project}</td>
                  <td style={{ padding: '20px 15px' }}>
                    {app.status === 'pending' && <span style={{ color: 'orange' }}>⏳ قيد المراجعة</span>}
                    {app.status === 'approved' && <span style={{ color: 'var(--success)' }}>✅ مقبول</span>}
                    {app.status === 'rejected' && <span style={{ color: 'var(--danger)' }}>❌ مرفوض</span>}
                  </td>
                  <td style={{ padding: '20px 15px' }}>
                    {app.status === 'approved' ? (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <div style={{ display: 'flex', gap: '5px' }}>
                          {[1, 2, 3, 4, 5].map(star => (
                            <span 
                              key={star} 
                              onClick={() => updateRating(app.id, star)}
                              style={{ cursor: 'pointer', color: star <= app.rating ? '#fbbf24' : '#4b5563', fontSize: '1.2rem' }}
                            >
                              ★
                            </span>
                          ))}
                        </div>
                        <input 
                          type="text" 
                          className="input-field" 
                          placeholder="أضف ملاحظاتك هنا..." 
                          value={app.notes}
                          onChange={(e) => updateNotes(app.id, e.target.value)}
                          style={{ padding: '8px', fontSize: '0.9rem' }}
                        />
                      </div>
                    ) : (
                      <span style={{ color: '#4b5563', fontSize: '0.9rem' }}>يتوفر التقييم بعد القبول</span>
                    )}
                  </td>
                  <td style={{ padding: '20px 15px', textAlign: 'center' }}>
                    {app.status === 'pending' ? (
                      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                        <button onClick={() => handleAction(app.id, 'approved')} className="btn-primary" style={{ background: 'var(--success)', border: 'none', padding: '8px 15px', fontSize: '0.9rem' }}>موافقة</button>
                        <button onClick={() => handleAction(app.id, 'rejected')} className="btn-primary" style={{ background: 'var(--danger)', border: 'none', padding: '8px 15px', fontSize: '0.9rem' }}>رفض</button>
                      </div>
                    ) : (
                      <button onClick={() => handleAction(app.id, 'pending')} className="btn-secondary" style={{ padding: '8px 15px', fontSize: '0.9rem' }}>إعادة ضبط</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AppLayout>
  );
}
