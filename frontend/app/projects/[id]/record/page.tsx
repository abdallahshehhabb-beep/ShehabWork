'use client';
import { AppLayout } from '../../../../components/AppLayout';
import { useState, useRef } from 'react';

export default function RecordPage({ params }: { params: { id: string } }) {
  const [isRecording, setIsRecording] = useState(false);
  const [hasRecorded, setHasRecorded] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Simulated sentences from Excel
  const excelSentences = [
    "العلم يبني بيوتاً لا عماد لها، والجهل يهدم بيت العز والشرف",
    "الكلمة الطيبة صدقة، والابتسامة في وجه أخيك صدقة",
    "من جد وجد، ومن زرع حصد، ومن سار على الدرب وصل",
    "الوقت كالسيف إن لم تقطعه قطعك",
    "أنا أحب تعلم التقنيات الجديدة وبناء منصات ذكية"
  ];
  const [currentIndex, setCurrentIndex] = useState(0);

  const startRecording = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      setIsRecording(true);
      setHasRecorded(false);
    } catch (err) {
      alert("يرجى السماح بالوصول إلى الميكروفون للتسجيل.");
    }
  };

  const stopRecording = () => {
    setIsRecording(false);
    setHasRecorded(true);
  };

  const handleNext = () => {
    if (currentIndex < excelSentences.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setHasRecorded(false);
      if (audioRef.current) audioRef.current.src = "";
    } else {
      alert("لقد أكملت جميع الجمل في هذا الملف!");
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setHasRecorded(false);
      if (audioRef.current) audioRef.current.src = "";
    }
  };

  return (
    <AppLayout>
      <div style={{ maxWidth: '800px', margin: '0 auto', width: '100%' }}>
        <h1 style={{ marginBottom: '10px' }}>تسجيل الصوت (المشروع #{params.id})</h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '30px' }}>
          هذه الجمل تم استخراجها تلقائياً من ملف الإكسيل المرفوع بواسطة قائد الفريق. 
          يجب تسجيلها بصيغة (WAV - 44100Hz).
        </p>

        <div className="glass-panel" style={{ marginBottom: '30px', textAlign: 'center', padding: '40px 20px', position: 'relative' }}>
          <div style={{ position: 'absolute', top: '15px', right: '15px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            ملف الإكسيل: 📄 dataset_01.xlsx
          </div>
          <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', lineHeight: '1.6', color: 'var(--primary)', marginBottom: '20px', marginTop: '20px' }}>
            "{excelSentences[currentIndex]}"
          </h2>
          <p style={{ color: 'var(--text-muted)' }}>الجملة {currentIndex + 1} من {excelSentences.length}</p>
        </div>

        <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
          <div style={{ 
            width: '100px', 
            height: '100px', 
            borderRadius: '50%', 
            background: isRecording ? 'rgba(239, 68, 68, 0.2)' : 'rgba(59, 130, 246, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.3s'
          }} className={isRecording ? 'pulse-animation' : ''}
          onClick={isRecording ? stopRecording : startRecording}>
            <div style={{ 
              width: isRecording ? '40px' : '60px', 
              height: isRecording ? '40px' : '60px', 
              borderRadius: isRecording ? '8px' : '50%', 
              background: isRecording ? 'var(--danger)' : 'var(--primary)',
              transition: 'all 0.3s'
            }}></div>
          </div>
          
          <h3 style={{ color: isRecording ? 'var(--danger)' : 'white' }}>
            {isRecording ? 'جاري التسجيل...' : 'اضغط للتسجيل'}
          </h3>

          {hasRecorded && !isRecording && (
            <div style={{ width: '100%', marginTop: '20px' }}>
              <audio controls style={{ width: '100%' }} ref={audioRef}></audio>
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '20px', flexWrap: 'wrap' }}>
                <button className="btn-secondary" onClick={() => setHasRecorded(false)}>إعادة التسجيل</button>
                <button className="btn-primary" style={{ background: 'var(--success)', border: 'none' }} onClick={handleNext}>حفظ والانتقال للتالي</button>
              </div>
            </div>
          )}

          {!isRecording && !hasRecorded && (
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '20px', width: '100%' }}>
              <button className="btn-secondary" onClick={handleNext} disabled={currentIndex === excelSentences.length - 1}>التالي &gt;</button>
              <button className="btn-secondary" onClick={handlePrev} disabled={currentIndex === 0}>&lt; السابق</button>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
