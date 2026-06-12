import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Y2KContainer } from '../components/Y2KContainer';
import { NeonButton } from '../components/NeonButton';
import { usePubSearch } from '../hooks/usePubSearch';
import { ShareQRCode } from '../utils/qr';
import { useCrawlState } from '../hooks/useCrawlState';
import { Trash2, GripVertical, Search } from 'lucide-react';

export const HostBuilder = () => {
  const navigate = useNavigate();
  const { searchPubs, results, loading, error } = usePubSearch(); // <-- Fixed! Added 'error'  const [searchQuery, setSearchQuery] = useState('');
  const [searchQuery, setSearchQuery] = useState(''); 
  const [crawlData, setCrawlData] = useCrawlState('crawl_draft', {
    name: '',
    theme: '',
    date: '',
    message: '',
    pubs: [],
  });

  const [step, setStep] = useState(1);
  const [shareUrl, setShareUrl] = useState('');

  const handleAddPub = (pub) => {
    const currentPubs = crawlData.pubs || [];
    if (currentPubs.length >= 10) return;
    if (!currentPubs.find(p => p.id === pub.id)) {
      setCrawlData(prev => ({
        ...prev,
        pubs: [...(prev.pubs || []), { ...pub, timeSlot: '', drinkPrice: '' }]
      }));
    }
  };

  const handleRemovePub = (id) => {
    setCrawlData(prev => ({
      ...prev,
      pubs: (prev.pubs || []).filter(p => p.id !== id)
    }));
  };

  const handleUpdatePub = (id, field, value) => {
    setCrawlData(prev => ({
      ...prev,
      pubs: (prev.pubs || []).map(p => p.id === id ? { ...p, [field]: value } : p)
    }));
  };

  const generateShareLink = () => {
    // Generate a pseudo-random ID for the crawl
    const crawlId = Math.random().toString(36).substring(2, 9);
    // In a real app we'd save to DB here. For now, save to local storage with ID
    localStorage.setItem(`crawl_${crawlId}`, JSON.stringify(crawlData));
    const url = `${window.location.origin}/invite/${crawlId}`;
    setShareUrl(url);
    setStep(3);
  };

  return (
    <Y2KContainer>
      <div className="flex flex-col flex-1 p-4 bg-darkBg/90 border-2 border-neonBlue shadow-neon-blue backdrop-blur-md">
        <h1 className="font-y2k text-neonBlue text-2xl mb-6 text-center">BUILD-A-CRAWL.EXE</h1>

        {step === 1 && (
          <div className="space-y-4 animate-[fadeIn_0.5s_ease-in]">
            <div>
              <label className="block text-neonPink font-y2k text-xs mb-2">CRAWL NAME</label>
              <input
                type="text"
                value={crawlData.name}
                onChange={e => setCrawlData({...crawlData, name: e.target.value})}
                className="w-full bg-transparent border-2 border-neonPink p-2 text-white outline-none focus:shadow-neon-pink transition-shadow"
                placeholder="e.g. SICK NIGHT OUT"
              />
            </div>
            <div>
              <label className="block text-neonGreen font-y2k text-xs mb-2">THEME</label>
              <input
                type="text"
                value={crawlData.theme}
                onChange={e => setCrawlData({...crawlData, theme: e.target.value})}
                className="w-full bg-transparent border-2 border-neonGreen p-2 text-white outline-none focus:shadow-neon-green transition-shadow"
                placeholder="e.g. 90s Neon / Cyberpunk"
              />
            </div>
            <div>
              <label className="block text-neonYellow font-y2k text-xs mb-2">DATE & TIME</label>
              <input
                type="datetime-local"
                value={crawlData.date}
                onChange={e => setCrawlData({...crawlData, date: e.target.value})}
                className="w-full bg-transparent border-2 border-neonYellow p-2 text-white outline-none focus:shadow-neon-yellow transition-shadow"
              />
            </div>
            <div>
              <label className="block text-neonBlue font-y2k text-xs mb-2">HOST HYPE MESSAGE</label>
              <textarea
                value={crawlData.message}
                onChange={e => setCrawlData({...crawlData, message: e.target.value})}
                className="w-full bg-transparent border-2 border-neonBlue p-2 text-white outline-none focus:shadow-neon-blue transition-shadow h-24"
                placeholder="Get ready to get wrecked..."
              />
            </div>
            
            <NeonButton color="pink" className="w-full mt-6" onClick={() => setStep(2)}>
              NEXT: ADD PUBS &gt;&gt;
            </NeonButton>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 animate-[fadeIn_0.5s_ease-in] flex flex-col flex-1">
            <div className="flex gap-2">
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && searchPubs(searchQuery)}
                placeholder="Search pubs..."
                className="flex-1 bg-transparent border-2 border-neonGreen p-2 text-white outline-none focus:shadow-neon-green"
              />
              <NeonButton color="green" onClick={() => searchPubs(searchQuery)} className="!px-3">
                <Search size={20} />
              </NeonButton>
            </div>

            {loading && <div className="text-neonYellow font-y2k text-xs animate-pulse text-center">SEARCHING...</div>}
            {error && <div className="text-red-500 font-y2k text-xs text-center border border-red-500 p-2 bg-red-500/10">{error}</div>}
            
            {results.length > 0 && (
              <div className="flex gap-2 overflow-x-auto pb-4 snap-x">
                {results.map(pub => (
                  <div key={pub.id} className="min-w-[200px] border-2 border-white/20 p-2 snap-center shrink-0 flex flex-col gap-2">
                    <img src={pub.photoUrl} alt={pub.name} className="w-full h-24 object-cover filter grayscale hover:grayscale-0 transition-all duration-300" />
                    <span className="font-bold text-xs truncate">{pub.name}</span>
                    <button 
                      onClick={() => handleAddPub(pub)}
                      className="bg-neonPink text-darkBg text-xs font-y2k py-1 mt-auto hover:scale-105 transition-transform"
                    >
                      + ADD
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="border-t-2 border-white/20 my-4"></div>
            
            <div className="flex-1 overflow-y-auto space-y-4">
              <h3 className="font-y2k text-neonYellow text-sm">SELECTED PUBS ({(crawlData.pubs || []).length}/10)</h3>
              {(crawlData.pubs || []).map((pub, idx) => (
                <div key={pub.id} className="bg-white/5 border border-white/20 p-3 flex flex-col gap-3">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                      <span className="font-y2k text-neonBlue">#{idx + 1}</span>
                      <span className="font-bold">{pub.name}</span>
                    </div>
                    <button onClick={() => handleRemovePub(pub.id)} className="text-red-500 hover:text-red-400">
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      placeholder="Time (e.g. 8-9PM)"
                      value={pub.timeSlot}
                      onChange={(e) => handleUpdatePub(pub.id, 'timeSlot', e.target.value)}
                      className="bg-transparent border border-white/30 p-1 text-xs w-1/2"
                    />
                    <input 
                      type="text" 
                      placeholder="Price (e.g. $5 Pints)"
                      value={pub.drinkPrice}
                      onChange={(e) => handleUpdatePub(pub.id, 'drinkPrice', e.target.value)}
                      className="bg-transparent border border-white/30 p-1 text-xs w-1/2"
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-4 mt-auto pt-4">
              <NeonButton color="yellow" className="flex-1" onClick={() => setStep(1)}>
                &lt; BACK
              </NeonButton>
              <NeonButton color="pink" className="flex-1" onClick={generateShareLink} disabled={(crawlData.pubs || []).length < 2}>
                FINISH & SHARE
              </NeonButton>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="flex flex-col items-center justify-center flex-1 space-y-8 animate-[fadeIn_0.5s_ease-in]">
            <h2 className="font-y2k text-neonGreen text-xl text-center">CRAWL LOCKED!</h2>
            
            <ShareQRCode url={shareUrl} size={250} />
            
            <div className="w-full text-center space-y-2">
              <p className="font-y2k text-xs text-white/70">SHARE THIS LINK:</p>
              <input 
                type="text" 
                readOnly 
                value={shareUrl} 
                className="w-full bg-black/50 border border-neonGreen p-2 text-neonGreen font-mono text-xs text-center"
                onClick={e => {
                  e.target.select();
                  navigator.clipboard.writeText(shareUrl);
                }}
              />
            </div>

            <NeonButton color="blue" className="w-full" onClick={() => navigate(`/dashboard/${shareUrl.split('/').pop()}`)}>
              GO TO DASHBOARD
            </NeonButton>
          </div>
        )}
      </div>
    </Y2KContainer>
  );
};
