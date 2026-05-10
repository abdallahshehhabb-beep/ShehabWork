'use client';
import { AppLayout } from '../../../components/AppLayout';
import { useState } from 'react';

export default function MyTeamPage() {
  const [copied, setCopied] = useState(false);
  const inviteLink = "http://localhost:3000/invite/team-7f8a9b2";

  const [teamMembers] = useState<any[]>([]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(inviteLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AppLayout>
      <div style={{ maxWidth: '900px', margin: '0 auto', width: '100%' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h1 style={{ margin: 0, fontSize: '1.8rem' }}>My Agency / Team</h1>
        </div>
        <p style={{ color: 'var(--text-muted)', marginBottom: '30px' }}>
          أضف مستقلين إلى فريقك لتتمكن من تعيينهم مباشرة في مشاريعك الخاصة.
        </p>

        <div className="glass-panel" style={{ marginBottom: '30px' }}>
          <h3 style={{ marginBottom: '15px' }}>رابط دعوة الفريق (Unified Invite Link)</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '15px' }}>
            قم بنسخ هذا الرابط ومشاركته مع المستقلين. أي شخص يسجل من خلال هذا الرابط سيتم إضافته فوراً إلى فريقك.
          </p>
          <div style={{ display: 'flex', gap: '15px' }}>
            <input 
              type="text" 
              className="input-field" 
              value={inviteLink}
              readOnly
              style={{ flex: 1, direction: 'ltr', background: '#f9f9f9', color: 'var(--text-muted)' }}
            />
            <button className="btn-primary" onClick={handleCopyLink} style={{ padding: '12px 30px', minWidth: '150px' }}>
              {copied ? '✅ تم النسخ' : 'نسخ الرابط 🔗'}
            </button>
          </div>
        </div>

        <div className="glass-panel" style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ padding: '20px', borderBottom: '1px solid var(--border-color)', background: '#fcfcfc' }}>
            <h3 style={{ margin: 0, fontSize: '1.2rem' }}>Team Members ({teamMembers.length})</h3>
          </div>
          
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'right' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                <th style={{ padding: '15px 20px', fontWeight: 600 }}>Name</th>
                <th style={{ padding: '15px 20px', fontWeight: 600 }}>Email</th>
                <th style={{ padding: '15px 20px', fontWeight: 600 }}>Role</th>
                <th style={{ padding: '15px 20px', fontWeight: 600 }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {teamMembers.map((member, index) => (
                <tr key={member.id} style={{ borderBottom: index < teamMembers.length - 1 ? '1px solid var(--border-color)' : 'none' }}>
                  <td style={{ padding: '15px 20px', fontWeight: 500, color: 'var(--primary)' }}>{member.name}</td>
                  <td style={{ padding: '15px 20px', color: 'var(--text-muted)' }}>{member.email}</td>
                  <td style={{ padding: '15px 20px' }}>{member.role}</td>
                  <td style={{ padding: '15px 20px' }}>
                    <span style={{ 
                      background: member.status === 'Active' ? 'rgba(20, 168, 0, 0.1)' : '#f2f2f2', 
                      color: member.status === 'Active' ? 'var(--primary)' : 'var(--text-muted)',
                      padding: '4px 10px',
                      borderRadius: '12px',
                      fontSize: '0.85rem',
                      fontWeight: 500
                    }}>
                      {member.status}
                    </span>
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
