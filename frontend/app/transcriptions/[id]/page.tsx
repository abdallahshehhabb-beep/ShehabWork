'use client';
import { AppLayout } from '../../../components/AppLayout';
import { useState, useRef, useEffect, useCallback } from 'react';
import WaveSurfer from 'wavesurfer.js';
import RegionsPlugin from 'wavesurfer.js/dist/plugins/regions.esm.js';

type Segment = {
  id: string;
  startTime: number;
  endTime: number;
  speaker: string;
  text: string;
  status: 'valid' | 'invalid';
};

const formatTime = (seconds: number) => {
  const date = new Date(seconds * 1000);
  const hh = Math.floor(seconds / 3600).toString().padStart(2, '0');
  const mm = date.getUTCMinutes().toString().padStart(2, '0');
  const ss = date.getUTCSeconds().toString().padStart(2, '0');
  const ms = Math.floor((seconds % 1) * 100).toString().padStart(2, '0');
  return `${hh}:${mm}:${ss}.${ms}`;
};

export default function TranscriptionPage({ params }: { params: { id: string } }) {
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [segments, setSegments] = useState<Segment[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const waveformRef = useRef<HTMLDivElement | null>(null);
  const wavesurferRef = useRef<WaveSurfer | null>(null);
  const regionsRef = useRef<any>(null);

  const speakers = ['متحدث 1', 'متحدث 2', 'متحدث 3', 'متحدث 4', 'متحدث 5', 'متحدث 6'];

  const handleAudioUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setAudioUrl(url);
    }
  };

  useEffect(() => {
    if (audioUrl && waveformRef.current && !wavesurferRef.current) {
      const ws = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: 'rgba(59, 130, 246, 0.4)',
        progressColor: 'rgba(59, 130, 246, 0.9)',
        url: audioUrl,
        height: 100,
        cursorWidth: 2,
        barWidth: 2,
        barGap: 1,
        barRadius: 2,
      });

      const wsRegions = ws.registerPlugin(RegionsPlugin.create());

      wsRegions.enableDragSelection({
        color: 'rgba(34, 197, 94, 0.3)',
      });

      wsRegions.on('region-created', (region: any) => {
        setSegments(prev => {
          // Check if region already exists
          if (prev.find(s => s.id === region.id)) return prev;
          return [...prev, {
            id: region.id,
            startTime: region.start,
            endTime: region.end,
            speaker: 'متحدث 1',
            text: '',
            status: 'valid'
          }];
        });
      });

      wsRegions.on('region-updated', (region: any) => {
        setSegments(prev => prev.map(seg => 
          seg.id === region.id ? { ...seg, startTime: region.start, endTime: region.end } : seg
        ));
      });

      ws.on('play', () => setIsPlaying(true));
      ws.on('pause', () => setIsPlaying(false));

      wavesurferRef.current = ws;
      regionsRef.current = wsRegions;
    }
  }, [audioUrl]);

  const togglePlay = () => {
    wavesurferRef.current?.playPause();
  };

  const removeSegment = (id: string) => {
    setSegments(segments.filter(seg => seg.id !== id));
    // Remove from wavesurfer regions
    const regions = regionsRef.current?.getRegions();
    const region = regions?.find((r: any) => r.id === id);
    if (region) region.remove();
  };

  const updateSegment = (id: string, field: keyof Segment, value: string) => {
    setSegments(segments.map(seg => seg.id === id ? { ...seg, [field]: value } : seg));
    
    // Update wavesurfer region color if status changes
    if (field === 'status') {
      const regions = regionsRef.current?.getRegions();
      const region = regions?.find((r: any) => r.id === id);
      if (region) {
        region.setOptions({ color: value === 'invalid' ? 'rgba(239, 68, 68, 0.3)' : 'rgba(34, 197, 94, 0.3)' });
      }
    }
  };

  const jumpToSegment = (start: number) => {
    if (wavesurferRef.current) {
      wavesurferRef.current.setTime(start);
      wavesurferRef.current.play();
    }
  };

  return (
    <AppLayout>
      <div style={{ maxWidth: '1000px', margin: '0 auto', width: '100%', paddingBottom: '50px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '15px' }}>
          <h1>التفريغ الصوتي بالتقطيع (Segmentation)</h1>
          <button className="btn-primary" style={{ background: 'var(--success)', border: 'none' }}>حفظ التغييرات</button>
        </div>

        {/* Audio Section */}
        <div className="glass-panel" style={{ marginBottom: '20px' }}>
          <h3 style={{ marginBottom: '15px', color: 'var(--text-muted)' }}>الموجة الصوتية (اضغط واسحب لإنشاء مقطع)</h3>
          {!audioUrl ? (
            <div style={{ border: '2px dashed var(--border-color)', borderRadius: '12px', padding: '40px', textAlign: 'center' }}>
              <p style={{ marginBottom: '15px' }}>قم برفع ملف صوتي للبدء في تقطيعه وتفريغه</p>
              <input 
                type="file" 
                accept="audio/*" 
                id="audio-upload" 
                style={{ display: 'none' }} 
                onChange={handleAudioUpload}
              />
              <label htmlFor="audio-upload" className="btn-primary" style={{ display: 'inline-block', cursor: 'pointer' }}>
                رفع ملف صوتي 🎵
              </label>
            </div>
          ) : (
            <div>
              <div ref={waveformRef} style={{ width: '100%', background: 'rgba(0,0,0,0.2)', borderRadius: '8px', overflow: 'hidden' }}></div>
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: '15px' }}>
                <button className="btn-primary" onClick={togglePlay}>
                  {isPlaying ? '⏸️ إيقاف مؤقت' : '▶️ تشغيل'}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Segments Section */}
        {segments.length > 0 && (
          <div className="glass-panel">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ color: 'var(--text-muted)' }}>قائمة المقاطع الصوتية ({segments.length})</h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {segments.sort((a, b) => a.startTime - b.startTime).map((segment) => (
                <div key={segment.id} style={{ 
                  background: 'rgba(255,255,255,0.05)', 
                  border: segment.status === 'invalid' ? '1px solid var(--danger)' : '1px solid var(--border-color)', 
                  borderRadius: '12px', 
                  padding: '15px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '15px',
                  transition: 'border 0.3s ease'
                }}>
                  <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', alignItems: 'center' }}>
                    <button 
                      onClick={() => jumpToSegment(segment.startTime)}
                      style={{ background: 'var(--primary)', color: 'white', border: 'none', borderRadius: '50%', width: '35px', height: '35px', cursor: 'pointer' }}
                      title="تشغيل هذا المقطع"
                    >▶️</button>
                    
                    <div style={{ flex: 1, minWidth: '120px' }}>
                      <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '5px', display: 'block' }}>المتحدث</label>
                      <select 
                        className="input-field" 
                        value={segment.speaker}
                        onChange={(e) => updateSegment(segment.id, 'speaker', e.target.value)}
                        style={{ padding: '8px' }}
                      >
                        {speakers.map(s => <option key={s} value={s} style={{ color: 'black' }}>{s}</option>)}
                      </select>
                    </div>

                    <div style={{ flex: 1, minWidth: '120px' }}>
                      <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '5px', display: 'block' }}>حالة المقطع</label>
                      <select 
                        className="input-field" 
                        value={segment.status}
                        onChange={(e) => updateSegment(segment.id, 'status', e.target.value)}
                        style={{ 
                          padding: '8px', 
                          color: segment.status === 'invalid' ? '#f87171' : '#4ade80',
                          borderColor: segment.status === 'invalid' ? 'rgba(2ef, 68, 68, 0.5)' : 'rgba(34, 197, 94, 0.5)'
                        }}
                      >
                        <option value="valid" style={{ color: 'black' }}>✅ صالح (Valid)</option>
                        <option value="invalid" style={{ color: 'black' }}>❌ غير صالح (Invalid)</option>
                      </select>
                    </div>

                    <div style={{ width: '100px' }}>
                      <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '5px', display: 'block' }}>البداية</label>
                      <div style={{ padding: '8px', background: 'rgba(0,0,0,0.3)', borderRadius: '8px', textAlign: 'center', direction: 'ltr', fontSize: '0.9rem' }}>
                        {formatTime(segment.startTime)}
                      </div>
                    </div>
                    <div style={{ width: '100px' }}>
                      <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '5px', display: 'block' }}>النهاية</label>
                      <div style={{ padding: '8px', background: 'rgba(0,0,0,0.3)', borderRadius: '8px', textAlign: 'center', direction: 'ltr', fontSize: '0.9rem' }}>
                        {formatTime(segment.endTime)}
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '5px', alignSelf: 'flex-end', paddingBottom: '2px' }}>
                      <button 
                        onClick={() => removeSegment(segment.id)}
                        style={{ background: 'var(--danger)', color: 'white', border: 'none', borderRadius: '6px', width: '35px', height: '35px', cursor: 'pointer' }}
                        title="حذف المقطع"
                      >🗑️</button>
                    </div>
                  </div>
                  
                  <div>
                    <textarea 
                      className="input-field" 
                      rows={3} 
                      value={segment.text}
                      onChange={(e) => updateSegment(segment.id, 'text', e.target.value)}
                      placeholder={segment.status === 'invalid' ? "المقطع غير صالح، لا حاجة للتفريغ..." : "اكتب التفريغ الصوتي هنا..."}
                      style={{ width: '100%', resize: 'vertical', opacity: segment.status === 'invalid' ? 0.5 : 1 }}
                      disabled={segment.status === 'invalid'}
                    ></textarea>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
