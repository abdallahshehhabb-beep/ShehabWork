'use client';
import { AppLayout } from '../../components/AppLayout';
import { useState, useEffect } from 'react';
import Link from 'next/link';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

type ProjectAssignment = {
  id: string;
  status: string;
  project: {
    id: string;
    title: string;
    type: string;
    reward: string;
  };
};

export default function FreelancerMyProjectsPage() {
  const [assignments, setAssignments] = useState<ProjectAssignment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyProjects();
  }, []);

  const fetchMyProjects = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('access_token');
      // نفترض وجود endpoint لجلب مشاريع المستقل الحالية
      const res = await fetch(`${API_URL}/recordings/my-assignments`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setAssignments(data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppLayout>
      <div style={{ maxWidth: '1000px', margin: '0 auto', width: '100%' }}>
        <h1 style={{ marginBottom: '10px' }}>مشاريعي الحالية</h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '30px' }}>تتبع حالة المشاريع التي تعمل عليها حالياً.</p>

        <div className="glass-panel" style={{ padding: 0, overflow: 'hidden' }}>
          {loading ? (
            <div style={{ padding: '40px', textAlign: 'center' }}>جاري التحميل...</div>
          ) : assignments.length === 0 ? (
            <div style={{ padding: '60px', textAlign: 'center', color: 'var(--text-muted)' }}>
              <div style={{ fontSize: '3rem', marginBottom: '20px' }}>📁</div>
              <p>لا يوجد لديك أي مشاريع حالياً.</p>
              <Link href="/freelancer/projects" className="btn-primary" style={{ display: 'inline-block', marginTop: '20px', textDecoration: 'none' }}>تصفح المشاريع المتاحة</Link>
            </div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'right' }}>
              <thead style={{ background: '#f9f9f9' }}>
                <tr>
                  <th style={{ padding: '15px 20px' }}>المشروع</th>
                  <th style={{ padding: '15px 20px' }}>النوع</th>
                  <th style={{ padding: '15px 20px' }}>الحالة</th>
                  <th style={{ padding: '15px 20px' }}>الإجراء</th>
                </tr>
              </thead>
              <tbody>
                {assignments.map(item => (
                  <tr key={item.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <td style={{ padding: '15px 20px', fontWeight: 600 }}>{item.project.title}</td>
                    <td style={{ padding: '15px 20px' }}>{item.project.type === 'recording' ? 'تسجيل' : 'تفريغ'}</td>
                    <td style={{ padding: '15px 20px' }}>
                      <span style={{ color: 'var(--primary)', fontWeight: 600 }}>{item.status}</span>
                    </td>
                    <td style={{ padding: '15px 20px' }}>
                      <Link href={`/projects/${item.project.id}/record`} className="btn-secondary" style={{ padding: '5px 15px', fontSize: '0.8rem', textDecoration: 'none' }}>فتح المجلد</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
