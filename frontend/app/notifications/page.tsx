'use client';
import { AppLayout } from '../../components/AppLayout';
import { useEffect, useState } from 'react';

export default function NotificationsPage() {
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    setRole(localStorage.getItem('user_role') || 'freelancer');
  }, []);

  const freelancerNotifications: any[] = [];
  const teamLeaderNotifications: any[] = [];

  const notifications = role === 'team_leader' ? teamLeaderNotifications : freelancerNotifications;

  return (
    <AppLayout>
      <div style={{ maxWidth: '800px', margin: '0 auto', width: '100%' }}>
        <h1 style={{ marginBottom: '5px', fontSize: '1.8rem' }}>الإشعارات</h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '30px' }}>
          {role === 'team_leader' ? 'تابع تحديثات مشاريعك، ومواعيد التسليم وإنجازات فريقك.' : 'تابع أحدث التحديثات المتعلقة بمشاريعك وعملك.'}
        </p>

        <div className="glass-panel" style={{ padding: 0, overflow: 'hidden' }}>
          {notifications.length > 0 ? (
            notifications.map((note, index) => (
              <div key={note.id} style={{ 
                padding: '20px 24px', 
                borderBottom: index < notifications.length - 1 ? '1px solid var(--border-color)' : 'none',
                background: note.read ? 'transparent' : 'rgba(20, 168, 0, 0.03)',
                display: 'flex',
                gap: '15px',
                alignItems: 'flex-start'
              }}>
                <div style={{ 
                  width: '10px', height: '10px', borderRadius: '50%', marginTop: '6px',
                  background: note.read ? 'transparent' : note.type === 'danger' ? 'var(--danger)' : 'var(--primary)' 
                }}></div>
                <div style={{ flex: 1 }}>
                  <p style={{ color: 'var(--text-main)', margin: 0, marginBottom: '5px', fontWeight: note.read ? 400 : 600 }}>
                    {note.text}
                  </p>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{note.time}</span>
                </div>
              </div>
            ))
          ) : (
            <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
              لا توجد إشعارات حالياً.
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
