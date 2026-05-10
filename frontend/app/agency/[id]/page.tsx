'use client';

import { AppLayout } from '../../../components/AppLayout';

export default function AgencyProfilePage({ params }: { params: { id: string } }) {
  return (
    <AppLayout>
      <div style={{ maxWidth: '1000px', margin: '0 auto', width: '100%' }}>
        <div className="glass-panel" style={{ marginBottom: '30px', padding: '40px', display: 'flex', gap: '30px', alignItems: 'center' }}>
          <div style={{ width: '120px', height: '120px', borderRadius: '50%', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem', color: 'white' }}>
            👑
          </div>
          <div style={{ flex: 1 }}>
            <h1 style={{ margin: 0, marginBottom: '10px', fontSize: '2.2rem' }}>Shehab Tech Agency</h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '15px' }}>
              وكالة متخصصة في جمع وتفريغ البيانات الصوتية لتدريب نماذج الذكاء الاصطناعي.
            </p>
            <div style={{ display: 'flex', gap: '20px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                ⭐ 4.9/5 (120 تقييم)
              </span>
              <span>•</span>
              <span>15 عضو في الفريق</span>
              <span>•</span>
              <span>مصر</span>
            </div>
          </div>
          <div>
            <button className="btn-primary" style={{ padding: '12px 30px' }}>مراسلة القائد</button>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '30px' }}>
          <div>
            <h2 style={{ marginBottom: '20px', fontSize: '1.4rem' }}>المشاريع الحالية المفتوحة</h2>
            <div className="glass-panel" style={{ padding: 0, overflow: 'hidden' }}>
              <div style={{ padding: '20px', borderBottom: '1px solid var(--border-color)', background: '#fcfcfc' }}>
                <h3 style={{ margin: 0, fontSize: '1.1rem', color: 'var(--primary)' }}>تجميع أصوات لهجة مصرية</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '5px' }}>$50.00 Fixed-price • Posted 2 hours ago</p>
              </div>
              <div style={{ padding: '20px', background: '#fcfcfc' }}>
                <h3 style={{ margin: 0, fontSize: '1.1rem', color: 'var(--primary)' }}>تفريغ مقابلات طبية</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '5px' }}>$12.00/hr • Posted 1 day ago</p>
              </div>
            </div>

            <h2 style={{ marginTop: '40px', marginBottom: '20px', fontSize: '1.4rem' }}>أحدث التقييمات</h2>
            <div className="glass-panel">
              <div style={{ marginBottom: '20px', paddingBottom: '20px', borderBottom: '1px solid var(--border-color)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <strong>تفريغ 10 ساعات صوتية</strong>
                  <span style={{ color: 'var(--success)', fontWeight: 'bold' }}>⭐⭐⭐⭐⭐ 5.0</span>
                </div>
                <p style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>"قائد فريق ممتاز، تعليمات واضحة ودفع سريع جداً. أنصح بالعمل معه بشدة."</p>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>- مستقل (Freelancer)</span>
              </div>
            </div>
          </div>

          <div>
            <div className="glass-panel">
              <h3 style={{ marginBottom: '20px', fontSize: '1.2rem' }}>إحصائيات الوكالة</h3>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px', paddingBottom: '15px', borderBottom: '1px solid var(--border-color)' }}>
                <span style={{ color: 'var(--text-muted)' }}>مجموع المنفق</span>
                <strong style={{ color: 'var(--text-main)' }}>$15,000+</strong>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px', paddingBottom: '15px', borderBottom: '1px solid var(--border-color)' }}>
                <span style={{ color: 'var(--text-muted)' }}>متوسط الراتب بالساعة</span>
                <strong style={{ color: 'var(--text-main)' }}>$14.50/hr</strong>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>عدد المشاريع المكتملة</span>
                <strong style={{ color: 'var(--text-main)' }}>45</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
