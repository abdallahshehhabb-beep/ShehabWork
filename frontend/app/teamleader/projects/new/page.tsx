'use client';
import { AppLayout } from '../../../../components/AppLayout';
import { useState } from 'react';

export default function CreateProjectPage() {
  const [title, setTitle] = useState('');
  const [type, setType] = useState('recording');
  const [reward, setReward] = useState('');
  
  // Audio specific settings
  const [format, setFormat] = useState('wav');
  const [sampleRate, setSampleRate] = useState('44100');
  const [channels, setChannels] = useState('mono');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('تم نشر المشروع بنجاح!');
    // Redirect or clear form
  };

  return (
    <AppLayout>
      <div style={{ maxWidth: '800px', margin: '0 auto', width: '100%', paddingBottom: '50px' }}>
        <h1 style={{ marginBottom: '20px' }}>نشر مشروع جديد</h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '30px' }}>قم بتحديد تفاصيل المشروع واختيار الإعدادات التقنية المناسبة.</p>

        <form onSubmit={handleSubmit} className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          <div className="input-group" style={{ marginBottom: 0 }}>
            <label className="input-label">اسم المشروع</label>
            <input 
              type="text" 
              className="input-field" 
              placeholder="مثال: تجميع أصوات لهجة سعودية"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="input-group" style={{ marginBottom: 0 }}>
            <label className="input-label">نوع المشروع</label>
            <select 
              className="input-field" 
              value={type}
              onChange={(e) => setType(e.target.value)}
              style={{ padding: '12px 16px' }}
            >
              <option value="recording" style={{ color: 'black' }}>تسجيل صوتي (Recording)</option>
              <option value="transcription" style={{ color: 'black' }}>تفريغ صوتي (Transcription)</option>
              <option value="conversation" style={{ color: 'black' }}>محادثة نصية (Conversation)</option>
            </select>
          </div>

          <div className="input-group" style={{ marginBottom: 0 }}>
            <label className="input-label">اللغة المطلوبة</label>
            <input 
              type="text" 
              className="input-field" 
              placeholder="اكتب اللغة يدوياً (مثال: العربية، الإنجليزية، الصينية...)"
              required
            />
          </div>

          <div className="input-group" style={{ marginBottom: 0 }}>
            <label className="input-label">الجنسية أو الفئة المطلوبة (اختياري)</label>
            <input 
              type="text" 
              className="input-field" 
              placeholder="مثال: مصريين فقط، ذكور فوق 30 سنة، طبيب..."
            />
            <p style={{ margin: 0, marginTop: '5px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>اتركها فارغة إذا كان المشروع متاحاً للجميع.</p>
          </div>

          <div className="input-group" style={{ marginBottom: 0 }}>
            <label className="input-label">عدد المستقلين المطلوبين</label>
            <input 
              type="number" 
              className="input-field" 
              placeholder="مثال: 5"
              min="1"
              required
            />
          </div>

          <div className="input-group" style={{ marginBottom: 0 }}>
            <label className="input-label">الموعد النهائي للتسليم (Deadline)</label>
            <input 
              type="datetime-local" 
              className="input-field" 
              required
            />
          </div>

          <div className="input-group" style={{ marginBottom: 0 }}>
            <label className="input-label">خيارات متقدمة</label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', color: 'var(--text-main)' }}>
              <input type="checkbox" defaultChecked /> توليد وإعطاء كود تعريفي (ID Code) تلقائي لكل متقدم يتم قبوله
            </label>
          </div>

          <div className="input-group" style={{ marginBottom: 0 }}>
            <label className="input-label">هل القبول تلقائي لكل المتقدمين؟</label>
            <div style={{ display: 'flex', gap: '20px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <input type="radio" name="autoAccept" value="no" defaultChecked /> لا (يتطلب موافقة يدوية)
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <input type="radio" name="autoAccept" value="yes" /> نعم (قبول فوري)
              </label>
            </div>
          </div>

          <div className="input-group" style={{ marginBottom: 0 }}>
            <label className="input-label">المكافأة (الراتب المخصص للمستقل)</label>
            <input 
              type="text" 
              className="input-field" 
              placeholder="مثال: 50 دولار أو 15 دولار/ساعة"
              value={reward}
              onChange={(e) => setReward(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn-primary" style={{ marginTop: '10px', padding: '15px', fontSize: '1.1rem' }}>
            نشر المشروع للعامة 🚀
          </button>
        </form>
      </div>
    </AppLayout>
  );
}
