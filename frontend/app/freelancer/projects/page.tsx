'use client';
import { AppLayout } from '../../../components/AppLayout';
import { useState, useEffect } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://audio-platform-backend-v2.vercel.app/api';

type Project = {
  id: string;
  title: string;
  type: string;
  reward: string;
  adminCommission?: string;
  description: string;
  language: any;
  createdAt: any;
  status: string;
  user?: any;
};

export default function FreelancerProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    type: '',
    language: ''
  });

  useEffect(() => {
    fetchProjects();
  }, [filters]);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const query = new URLSearchParams();
      if (filters.type) query.append('type', filters.type);
      if (filters.language) query.append('language', filters.language);
      
      const res = await fetch(`${API_URL}/projects?${query.toString()}`);
      if (res.ok) {
        const data = await res.json();
        // تصفية المشاريع النشطة فقط للمستقلين
        setProjects(data.filter((p: Project) => p.status === 'open' || p.status === 'in_progress'));
      }
    } catch (e) {
      console.error('Error fetching projects:', e);
    } finally {
      setLoading(false);
    }
  };

  const handleApply = (id: string) => {
    alert('تم إرسال طلب التقديم بنجاح! في انتظار موافقة قائد الفريق.');
  };

  const toggleType = (type: string) => {
    setFilters(prev => ({ ...prev, type: prev.type === type ? '' : type }));
  };

  const setLanguage = (lang: string) => {
    setFilters(prev => ({ ...prev, language: prev.language === lang ? '' : lang }));
  };

  return (
    <AppLayout>
      <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
        <h1 style={{ marginBottom: '5px', fontSize: '1.8rem', color: 'var(--text-main)' }}>تصفح المشاريع المتاحة</h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '30px' }}>ابحث عن فرص عمل جديدة تناسب خبراتك في التسجيل والتفريغ الصوتي.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '250px 1fr', gap: '30px' }}>
          {/* Filters Sidebar */}
          <div>
            <div className="glass-panel" style={{ padding: '20px', position: 'sticky', top: '20px' }}>
              <h3 style={{ marginBottom: '20px', fontSize: '1.1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px' }}>تصفية النتائج</h3>
              
              <div style={{ marginBottom: '25px' }}>
                <h4 style={{ marginBottom: '12px', fontSize: '0.95rem', color: 'var(--text-main)' }}>نوع المشروع</h4>
                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px', cursor: 'pointer', color: filters.type === 'recording' ? 'var(--primary)' : 'var(--text-muted)', fontWeight: filters.type === 'recording' ? 600 : 400 }}>
                  <input type="radio" checked={filters.type === 'recording'} onChange={() => toggleType('recording')} /> تسجيل صوتي (Recording)
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px', cursor: 'pointer', color: filters.type === 'transcription' ? 'var(--primary)' : 'var(--text-muted)', fontWeight: filters.type === 'transcription' ? 600 : 400 }}>
                  <input type="radio" checked={filters.type === 'transcription'} onChange={() => toggleType('transcription')} /> تفريغ صوتي (Transcription)
                </label>
                {filters.type && <button onClick={() => setFilters({...filters, type: ''})} style={{ fontSize: '0.8rem', color: 'var(--danger)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>إلغاء الفلتر</button>}
              </div>

              <div style={{ marginBottom: '20px' }}>
                <h4 style={{ marginBottom: '12px', fontSize: '0.95rem', color: 'var(--text-main)' }}>اللغة</h4>
                <select 
                  value={filters.language} 
                  onChange={(e) => setLanguage(e.target.value)}
                  style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid var(--border-color)', outline: 'none' }}
                >
                  <option value="">كل اللغات</option>
                  <option value="ar">العربية</option>
                  <option value="en">الإنجليزية</option>
                  <option value="tr">التركية</option>
                  <option value="fr">الفرنسية</option>
                  <option value="de">الألمانية</option>
                </select>
              </div>

              <button 
                className="btn-secondary" 
                style={{ width: '100%', marginTop: '10px', fontSize: '0.85rem' }}
                onClick={() => setFilters({ type: '', language: '' })}
              >
                إعادة ضبط الكل
              </button>
            </div>
          </div>

          {/* Job Feed */}
          <div className="glass-panel" style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{ padding: '20px', borderBottom: '1px solid var(--border-color)', background: '#fcfcfc', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0, fontSize: '1.1rem' }}>المشاريع المناسبة لك ({projects.length})</h3>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {loading ? (
                <div style={{ padding: '60px', textAlign: 'center', color: 'var(--text-muted)' }}>جاري البحث عن مشاريع...</div>
              ) : projects.length === 0 ? (
                <div style={{ padding: '60px', textAlign: 'center', color: 'var(--text-muted)' }}>
                  <div style={{ fontSize: '3rem', marginBottom: '15px' }}>🔍</div>
                  لا توجد مشاريع تطابق اختياراتك حالياً.
                </div>
              ) : (
                projects.map((project, index) => (
                  <div key={project.id} style={{ 
                    padding: '24px', 
                    borderBottom: index < projects.length - 1 ? '1px solid var(--border-color)' : 'none',
                    transition: 'background 0.2s',
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '5px' }}>
                          <span style={{ background: project.type === 'recording' ? 'rgba(20,168,0,0.1)' : 'rgba(59,130,246,0.1)', color: project.type === 'recording' ? 'var(--success)' : 'var(--primary)', padding: '2px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase' }}>
                            {project.type === 'recording' ? 'تسجيل' : 'تفريغ'}
                          </span>
                          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                            نُشر بواسطة: {project.user?.name || 'قائد فريق'}
                          </span>
                        </div>
                        <h3 style={{ margin: 0, fontSize: '1.3rem', color: 'var(--text-main)' }}>{project.title}</h3>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--success)', marginBottom: '2px' }}>{project.reward}</div>
                        {project.adminCommission && <div style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 600, marginBottom: '5px' }}>+ عمولة: {project.adminCommission}</div>}
                        <button 
                          className="btn-primary"
                          style={{ padding: '8px 20px', fontSize: '0.9rem' }}
                          onClick={() => handleApply(project.id)}
                        >
                          تقديم طلب
                        </button>
                      </div>
                    </div>
                    
                    <p style={{ color: 'var(--text-main)', marginBottom: '15px', fontSize: '0.95rem', lineHeight: '1.5' }}>
                      {project.description}
                    </p>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', gap: '15px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                        <span>🌐 اللغة: {project.language === 'ar' ? 'العربية' : project.language === 'en' ? 'الإنجليزية' : project.language}</span>
                        <span>📅 تاريخ النشر: {new Date(project.createdAt).toLocaleDateString('ar-EG')}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

