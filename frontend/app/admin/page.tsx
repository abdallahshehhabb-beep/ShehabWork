'use client';

import { AppLayout } from '../../components/AppLayout';
import { useState, useEffect } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  country?: string;
  phone?: string;
  idCardUrl?: string;
  createdAt: string;
};

type Project = {
  id: string;
  title: string;
  type: string;
  reward: string;
  adminCommission?: string;
  status: string;
  user?: { name: string };
};

export default function AdminPanelPage() {
  const [activeTab, setActiveTab] = useState<'pending' | 'all' | 'projects'>('pending');
  const [users, setUsers] = useState<User[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedIdCard, setSelectedIdCard] = useState<string | null>(null);
  const [actionMsg, setActionMsg] = useState('');

  useEffect(() => {
    if (activeTab === 'projects') {
      fetchProjects();
    } else {
      fetchUsers();
    }
  }, [activeTab]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('access_token');
      const res = await fetch(`${API_URL}/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setUsers(data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/projects`);
      if (res.ok) {
        const data = await res.json();
        setProjects(data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleUserAction = async (userId: string, action: 'approve' | 'ban') => {
    try {
      const token = localStorage.getItem('access_token');
      const newStatus = action === 'approve' ? 'active' : 'banned';
      const res = await fetch(`${API_URL}/users/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setUsers(prev => prev.map(u => u.id === userId ? { ...u, status: newStatus } : u));
        setActionMsg(action === 'approve' ? '✅ تمت الموافقة على الحساب' : '🚫 تم حظر الحساب');
        setTimeout(() => setActionMsg(''), 3000);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleProjectStatus = async (projectId: string, currentStatus: string) => {
    const newStatus = currentStatus === 'paused' ? 'open' : 'paused';
    try {
      const token = localStorage.getItem('access_token');
      const res = await fetch(`${API_URL}/projects/${projectId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setProjects(prev => prev.map(p => p.id === projectId ? { ...p, status: newStatus } : p));
        setActionMsg(`✅ تم ${newStatus === 'paused' ? 'إيقاف' : 'تفعيل'} المشروع بنجاح`);
        setTimeout(() => setActionMsg(''), 3000);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const updateCommission = async (projectId: string, value: string) => {
    try {
      const token = localStorage.getItem('access_token');
      const res = await fetch(`${API_URL}/projects/${projectId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ adminCommission: value }),
      });
      if (res.ok) {
        setProjects(prev => prev.map(p => p.id === projectId ? { ...p, adminCommission: value } : p));
        setActionMsg('✅ تم تحديث عمولة المشروع');
        setTimeout(() => setActionMsg(''), 3000);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const pendingUsers = users.filter(u => u.status === 'pending' && u.role === 'team_leader');
  const displayedUsers = activeTab === 'pending' ? pendingUsers : users;

  return (
    <AppLayout>
      <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
        <h1 style={{ marginBottom: '20px', fontSize: '2rem', color: 'var(--text-main)' }}>لوحة التحكم الشاملة (Admin)</h1>

        {actionMsg && (
          <div style={{ background: 'rgba(20,168,0,0.1)', border: '1px solid var(--success)', padding: '12px 20px', borderRadius: '8px', marginBottom: '20px', color: 'var(--success)', fontWeight: 500 }}>
            {actionMsg}
          </div>
        )}

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '15px', marginBottom: '25px' }}>
          <button className={activeTab === 'pending' ? 'btn-primary' : 'btn-secondary'} onClick={() => setActiveTab('pending')}>
            طلبات التوثيق {pendingUsers.length > 0 && <span style={{marginLeft:'5px', background:'var(--danger)', color:'white', borderRadius:'50%', padding:'2px 6px', fontSize:'0.7rem'}}>{pendingUsers.length}</span>}
          </button>
          <button className={activeTab === 'all' ? 'btn-primary' : 'btn-secondary'} onClick={() => setActiveTab('all')}>
            إدارة المستخدمين
          </button>
          <button className={activeTab === 'projects' ? 'btn-primary' : 'btn-secondary'} onClick={() => setActiveTab('projects')}>
            إدارة المشاريع والعمولات
          </button>
        </div>

        <div className="glass-panel" style={{ padding: 0, overflow: 'hidden' }}>
          {loading ? (
            <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>جاري التحميل...</div>
          ) : (
            <>
              {activeTab !== 'projects' ? (
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'right' }}>
                  <thead style={{ background: '#f9f9f9', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    <tr>
                      <th style={{ padding: '15px 20px' }}>المستخدم</th>
                      <th style={{ padding: '15px 20px' }}>الدور</th>
                      <th style={{ padding: '15px 20px' }}>الحالة</th>
                      <th style={{ padding: '15px 20px' }}>الهوية</th>
                      <th style={{ padding: '15px 20px' }}>الإجراء</th>
                    </tr>
                  </thead>
                  <tbody>
                    {displayedUsers.map(user => (
                      <tr key={user.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                        <td style={{ padding: '15px 20px' }}>
                          <div style={{ fontWeight: 600 }}>{user.name}</div>
                          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{user.email}</div>
                        </td>
                        <td style={{ padding: '15px 20px' }}>
                          <span style={{ padding: '2px 8px', borderRadius: '4px', background: user.role === 'team_leader' ? '#eef2ff' : '#f3f4f6', color: user.role === 'team_leader' ? '#4f46e5' : '#4b5563', fontSize: '0.8rem' }}>
                            {user.role === 'team_leader' ? 'قائد فريق' : 'مستقل'}
                          </span>
                        </td>
                        <td style={{ padding: '15px 20px' }}>
                          <span style={{ color: user.status === 'active' ? 'var(--success)' : user.status === 'pending' ? '#f59e0b' : 'var(--danger)', fontSize: '0.8rem', fontWeight: 600 }}>
                            {user.status === 'active' ? 'نشط' : user.status === 'pending' ? 'معلق' : 'محظور'}
                          </span>
                        </td>
                        <td style={{ padding: '15px 20px' }}>
                          {user.idCardUrl ? <button onClick={() => setSelectedIdCard(user.idCardUrl!)} style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer', textDecoration: 'underline' }}>عرض</button> : '---'}
                        </td>
                        <td style={{ padding: '15px 20px' }}>
                          <div style={{ display: 'flex', gap: '10px' }}>
                            {user.status === 'pending' && <button className="btn-primary" style={{ padding: '5px 10px', fontSize: '0.75rem' }} onClick={() => handleUserAction(user.id, 'approve')}>تفعيل</button>}
                            {user.status !== 'banned' && <button className="btn-secondary" style={{ padding: '5px 10px', fontSize: '0.75rem', color: 'var(--danger)', borderColor: 'var(--danger)' }} onClick={() => handleUserAction(user.id, 'ban')}>حظر</button>}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'right' }}>
                  <thead style={{ background: '#f9f9f9', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    <tr>
                      <th style={{ padding: '15px 20px' }}>المشروع</th>
                      <th style={{ padding: '15px 20px' }}>القائد</th>
                      <th style={{ padding: '15px 20px' }}>الميزانية</th>
                      <th style={{ padding: '15px 20px' }}>العمولة الإضافية</th>
                      <th style={{ padding: '15px 20px' }}>الحالة</th>
                      <th style={{ padding: '15px 20px' }}>تحكم</th>
                    </tr>
                  </thead>
                  <tbody>
                    {projects.map(project => (
                      <tr key={project.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                        <td style={{ padding: '15px 20px' }}>
                          <div style={{ fontWeight: 600 }}>{project.title}</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{project.type} | {project.language}</div>
                        </td>
                        <td style={{ padding: '15px 20px', fontSize: '0.9rem' }}>{project.user?.name}</td>
                        <td style={{ padding: '15px 20px', color: 'var(--success)', fontWeight: 600 }}>{project.reward}</td>
                        <td style={{ padding: '15px 20px' }}>
                          <input 
                            type="text" 
                            defaultValue={project.adminCommission} 
                            placeholder="مثال: $5" 
                            onBlur={(e) => updateCommission(project.id, e.target.value)}
                            style={{ width: '80px', padding: '5px', borderRadius: '4px', border: '1px solid var(--border-color)' }}
                          />
                        </td>
                        <td style={{ padding: '15px 20px' }}>
                          <span style={{ fontSize: '0.8rem', color: project.status === 'paused' ? 'var(--danger)' : 'var(--success)' }}>
                            {project.status === 'paused' ? 'موقوف' : 'متاح'}
                          </span>
                        </td>
                        <td style={{ padding: '15px 20px' }}>
                          <button 
                            className="btn-secondary" 
                            style={{ padding: '5px 10px', fontSize: '0.75rem', borderColor: project.status === 'paused' ? 'var(--success)' : 'var(--danger)', color: project.status === 'paused' ? 'var(--success)' : 'var(--danger)' }}
                            onClick={() => handleProjectStatus(project.id, project.status)}
                          >
                            {project.status === 'paused' ? 'استئناف العمل' : 'إيقاف العمل'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </>
          )}
        </div>

        {selectedIdCard && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }} onClick={() => setSelectedIdCard(null)}>
            <div style={{ background: 'white', padding: '20px', borderRadius: '12px', maxWidth: '500px', width: '90%' }} onClick={e => e.stopPropagation()}>
              <h3 style={{ marginBottom: '15px' }}>مراجعة الهوية</h3>
              <img src={selectedIdCard} style={{ width: '100%', borderRadius: '8px' }} alt="ID Card" />
              <button className="btn-primary" style={{ width: '100%', marginTop: '15px' }} onClick={() => setSelectedIdCard(null)}>إغلاق</button>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}