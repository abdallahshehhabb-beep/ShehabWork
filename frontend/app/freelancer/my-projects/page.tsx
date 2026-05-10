'use client';
import { AppLayout } from '../../../components/AppLayout';
import Link from 'next/link';

export default function MyProjectsPage() {
  const approvedProjects = [
    { id: '1', title: 'تجميع أصوات لهجة مصرية', type: 'recording', reward: '50 دولار', progress: '30%' },
    { id: '2', title: 'تفريغ مقابلات طبية', type: 'transcription', reward: '120 دولار', progress: '0%' },
  ];

  return (
    <AppLayout>
      <div style={{ maxWidth: '1000px', margin: '0 auto', width: '100%' }}>
        <h1 style={{ marginBottom: '20px' }}>مشاريعي الحالية</h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '30px' }}>
          هذه هي المشاريع التي قمت بالتقديم عليها وتمت الموافقة من قبل قائد الفريق. يمكنك البدء في العمل عليها الآن.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {approvedProjects.map(project => (
            <div key={project.id} className="glass-panel" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
              <div>
                <h3 style={{ marginBottom: '10px', color: 'white' }}>{project.title}</h3>
                <div style={{ display: 'flex', gap: '15px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                  <span>المكافأة: <strong style={{ color: 'var(--success)' }}>{project.reward}</strong></span>
                  <span>الإنجاز: <strong>{project.progress}</strong></span>
                </div>
              </div>
              
              <div>
                {project.type === 'recording' ? (
                  <Link href={`/projects/${project.id}/record`} className="btn-primary" style={{ display: 'inline-block', textDecoration: 'none' }}>
                    بدء التسجيل الصوتي 🎙️
                  </Link>
                ) : (
                  <Link href={`/transcriptions/${project.id}`} className="btn-primary" style={{ display: 'inline-block', textDecoration: 'none', background: 'var(--secondary)' }}>
                    بدء التفريغ 📝
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
