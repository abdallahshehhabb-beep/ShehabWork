'use client';
import { AppLayout } from '../../components/AppLayout';
import { useState, useEffect } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://audio-platform-backend-v2.vercel.app/api';

export default function ProfilePage() {
  const [userId, setUserId] = useState<string | null>(null);
  const [role, setRole] = useState<string>('freelancer');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState('');
  const [skills, setSkills] = useState('');
  const [phone, setPhone] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [idCardUrl, setIdCardUrl] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedId = localStorage.getItem('user_id');
    const storedRole = localStorage.getItem('user_role');
    setUserId(storedId);
    setRole(storedRole || 'freelancer');

    if (storedId) {
      fetchUser(storedId);
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUser = async (id: string) => {
    try {
      const res = await fetch(`${API_URL}/users/${id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
      });
      if (res.ok) {
        const user = await res.json();
        setName(user.name || '');
        setEmail(user.email || '');
        setPhone(user.phone || '');
        setBio(user.bio || '');
        setSkills(Array.isArray(user.skills) ? user.skills.join(', ') : (user.skills || ''));
        setPhotoUrl(user.photoUrl || '');
        setIdCardUrl(user.idCardUrl || '');
      }
    } catch (err) {
      console.error('Error fetching user:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: 'profile-photo' | 'id-card') => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch(`${API_URL}/upload/${type}`, {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        if (type === 'profile-photo') setPhotoUrl(data.url);
        else setIdCardUrl(data.url);
      } else {
        alert('فشل رفع الملف');
      }
    } catch (err) {
      console.error('Upload error:', err);
      alert('حدث خطأ أثناء الرفع');
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) return;

    try {
      const res = await fetch(`${API_URL}/users/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        },
        body: JSON.stringify({
          name,
          phone,
          bio,
          skills: skills.split(',').map(s => s.trim()).filter(s => s !== ''),
          photoUrl,
          idCardUrl,
        }),
      });

      if (res.ok) {
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 3000);
        localStorage.setItem('user_name', name); // Update name in storage
      } else {
        alert('فشل حفظ البيانات');
      }
    } catch (err) {
      console.error('Save error:', err);
      alert('تعذر الاتصال بالسيرفر');
    }
  };

  if (loading) {
    return <AppLayout><div style={{ textAlign: 'center', padding: '50px' }}>جاري التحميل...</div></AppLayout>;
  }

  return (
    <AppLayout>
      <div style={{ maxWidth: '800px', margin: '0 auto', width: '100%', paddingBottom: '50px' }}>
        <h1 style={{ marginBottom: '20px' }}>الملف الشخصي</h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '30px' }}>
          أكمل ملفك الشخصي لزيادة فرص قبولك في المشاريع المتاحة.
        </p>

        <div className="glass-panel" style={{ display: 'flex', gap: '20px', alignItems: 'center', marginBottom: '30px' }}>
          <div style={{ position: 'relative' }}>
            <div style={{ 
              width: '100px', 
              height: '100px', 
              borderRadius: '50%', 
              background: photoUrl ? `url(${API_URL.replace('/api', '')}${photoUrl})` : 'var(--primary)', 
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              fontSize: '2.5rem',
              overflow: 'hidden'
            }}>
              {!photoUrl && '👤'}
            </div>
            <label htmlFor="avatar-upload" style={{ position: 'absolute', bottom: 0, right: 0, background: 'var(--surface-hover)', padding: '5px', borderRadius: '50%', cursor: 'pointer', border: '1px solid var(--border-color)' }}>
              📷
            </label>
            <input 
              type="file" 
              id="avatar-upload" 
              style={{ display: 'none' }} 
              accept="image/*" 
              onChange={(e) => handleFileUpload(e, 'profile-photo')}
            />
          </div>
          <div>
            <h2 style={{ margin: 0, marginBottom: '5px' }}>{name || 'مستخدم جديد'}</h2>
            <div style={{ color: 'var(--primary)', fontWeight: 'bold' }}>
              {role === 'admin' ? '🛡️ مسؤول (Admin)' : role === 'team_leader' ? '👑 قائد فريق' : '🧑‍💻 مستقل (Freelancer)'}
            </div>
            <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{email}</div>
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
              style={{ direction: 'ltr' }}
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

          <div className="input-group" style={{ marginBottom: 0 }}>
            <label className="input-label">صورة البطاقة الشخصية (للتوثيق)</label>
            <div 
              style={{ 
                border: '2px dashed var(--border-color)', 
                borderRadius: '8px', 
                padding: '20px', 
                textAlign: 'center', 
                cursor: 'pointer', 
                background: idCardUrl ? `url(${API_URL.replace('/api', '')}${idCardUrl})` : '#f9f9f9',
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                minHeight: '150px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: idCardUrl ? 'transparent' : 'inherit'
              }}
              onClick={() => document.getElementById('id-upload')?.click()}
            >
              {idCardUrl ? '' : 'اضغط هنا لرفع/تحديث صورة البطاقة'}
            </div>
            <input 
              type="file" 
              id="id-upload" 
              style={{ display: 'none' }} 
              accept="image/*" 
              onChange={(e) => handleFileUpload(e, 'id-card')}
            />
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
