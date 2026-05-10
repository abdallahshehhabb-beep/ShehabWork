'use client';
import { AppLayout } from '../../components/AppLayout';
import { useState, useEffect } from 'react';

export default function ProfilePage() {
  const [role, setRole] = useState<string>('freelancer');
  const [name, setName] = useState('أحمد محمد');
  const [bio, setBio] = useState('أنا معلق صوتي محترف ولدي خبرة في تفريغ المقابلات الصوتية والنصوص الطبية.');
  const [skills, setSkills] = useState('تعليق صوتي, تفريغ صوتي, ترجمة');
  const [phone, setPhone] = useState('+201000000000');
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    setRole(localStorage.getItem('user_role') || 'freelancer');
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <AppLayout>
      <div style={{ maxWidth: '800px', margin: '0 auto', width: '100%', paddingBottom: '50px' }}>
        <h1 style={{ marginBottom: '20px' }}>الملف الشخصي</h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '30px' }}>
          أكمل ملفك الشخصي لزيادة فرص قبولك في المشاريع المتاحة.
        </p>

        <div className="glass-panel" style={{ display: 'flex', gap: '20px', alignItems: 'center', marginBottom: '30px' }}>
          <div style={{ position: 'relative' }}>
            <div style={{ width: '100px', height: '100px', borderRadius: '50%', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem' }}>
              👤
            </div>
            <label htmlFor="avatar-upload" style={{ position: 'absolute', bottom: 0, right: 0, background: 'var(--surface-hover)', padding: '5px', borderRadius: '50%', cursor: 'pointer', border: '1px solid var(--border-color)' }}>
              📷
            </label>
            <input type="file" id="avatar-upload" style={{ display: 'none' }} accept="image/*" />
          </div>
          <div>
            <h2 style={{ margin: 0, marginBottom: '5px' }}>{name}</h2>
            <div style={{ color: 'var(--primary)', fontWeight: 'bold' }}>
              {role === 'team_leader' ? '👑 قائد فريق' : '🧑‍💻 مستقل (Freelancer)'}
            </div>
          </div>
        </div>

        <form onSubmit={handleSave} className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="input-group" style={{ marginBottom: 0 }}>
            <label className="input-label">الاسم الكامل</label>
            <input 
              type="text" 
              className="input-field" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="input-group" style={{ marginBottom: 0 }}>
            <label className="input-label">رقم الهاتف</label>
            <input 
              type="text" 
              className="input-field" 
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              direction="ltr"
            />
          </div>

          <div className="input-group" style={{ marginBottom: 0 }}>
            <label className="input-label">المهارات والخبرات (مفصولة بفاصلة)</label>
            <input 
              type="text" 
              className="input-field" 
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              placeholder="مثال: تسجيل صوتي، تفريغ طبي، إكسيل..."
            />
          </div>

          <div className="input-group" style={{ marginBottom: 0 }}>
            <label className="input-label">نبذة عنك (Bio)</label>
            <textarea 
              className="input-field" 
              rows={4}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="تحدث عن خبراتك السابقة ومؤهلاتك..."
            ></textarea>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
            {isSaved ? (
              <span style={{ color: 'var(--success)' }}>✅ تم الحفظ بنجاح!</span>
            ) : (
              <span></span>
            )}
            <button type="submit" className="btn-primary" style={{ padding: '10px 30px' }}>
              حفظ التعديلات
            </button>
          </div>
        </form>
      </div>
    </AppLayout>
  );
}
