import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, Reorder } from 'framer-motion';
import { Y2KContainer } from '../components/Y2KContainer';
import { NeonButton } from '../components/NeonButton';
import { VibeLoading } from '../components/VibeLoading';
import { usePubSearch } from '../hooks/usePubSearch';
import { ShareQRCode } from '../utils/qr';
import { useCrawlState } from '../hooks/useCrawlState';
import { Trash2, GripVertical, Search } from 'lucide-react';

export const HostBuilder = () => {
  const navigate = useNavigate();
  const { searchPubs, results, loading, error } = usePubSearch();
  const [searchQuery, setSearchQuery] = useState(''); 
  const [crawlData, setCrawlData] = useCrawlState('crawl_draft', {
    name: '',
    theme: '',
    date: '',
    message: '',
    pubs: [],
    showRules: true,
    rules: [
      { id: '1', emoji: '🚶', text: 'No one gets left behind — we move as a unit or not at all' },
      { id: '2', emoji: '🥤', text: 'Every pub = at least one drink, no exceptions, no debates' },
      { id: '3', emoji: '📸', text: 'Designated photographer per pub — host assigns, no negotiating' },
      { id: '4', emoji: '🚫', text: 'No ordering shots for the group without a vote (democracy in the streets)' },
      { id: '5', emoji: '💸', text: 'Settle your tab BEFORE we move to the next spot fr fr' },
      { id: '6', emoji: '🤙', text: 'What happens on the crawl stays on the crawl (except the photos, those go everywhere)' },
      { id: '7', emoji: '🏆', text: 'Last person standing gets eternal glory and a free round next time' },
    ]
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

  const onReorder = (newPubs) => {
    setCrawlData(prev => ({ ...prev, pubs: newPubs }));
  };

  const onReorderRules = (newRules) => {
    setCrawlData(prev => ({ ...prev, rules: newRules }));
  };

  const handleAddRule = () => {
    const newRule = {
      id: Math.random().toString(36).substring(2, 9),
      emoji: '📜',
      text: ''
    };
    setCrawlData(prev => ({ ...prev, rules: [...(prev.rules || []), newRule] }));
  };

  const handleUpdateRule = (id, field, value) => {
    setCrawlData(prev => ({
      ...prev,
      rules: (prev.rules || []).map(r => r.id === id ? { ...r, [field]: value } : r)
    }));
  };

  const handleRemoveRule = (id) => {
    setCrawlData(prev => ({
      ...prev,
      rules: (prev.rules || []).filter(r => r.id !== id)
    }));
  };

  return (
    <Y2KContainer>
      <div className="flex flex-col flex-1 p-4 bg-darkBg/90 border-[3px] border-neonBlue shadow-[8px_8px_0px_#3a86ff] backdrop-blur-md relative">
        <div className="absolute -top-3 -right-3 bg-neonYellow text-darkBg font-y2k text-[10px] px-2 py-1 rotate-3 shadow-md z-20">
          HOST_MODE.EXE
        </div>

        <h1 className="font-y2k text-neonBlue text-xl md:text-2xl mb-8 mt-4 text-center tracking-tighter">
          CREATE YOUR LEGACY 🍺
        </h1>

        {step === 1 && (
          <div className="space-y-6 animate-[fadeIn_0.5s_ease-in]">
            <div className="space-y-4">
              <div>
                <label className="block text-neonPink font-y2k text-[10px] mb-2">CRAWL NAME 🏷️</label>
                <input
                  type="text"
                  value={crawlData.name}
                  onChange={e => setCrawlData({...crawlData, name: e.target.value})}
                  className="w-full bg-black border-2 border-neonPink p-3 text-white outline-none focus:shadow-neon-pink transition-all font-body"
                  placeholder="drop the name bestie 🍺"
                />
              </div>
              <div>
                <label className="block text-neonGreen font-y2k text-[10px] mb-2">VIBE / THEME ✨</label>
                <input
                  type="text"
                  value={crawlData.theme}
                  onChange={e => setCrawlData({...crawlData, theme: e.target.value})}
                  className="w-full bg-black border-2 border-neonGreen p-3 text-white outline-none focus:shadow-neon-green transition-all font-body"
                  placeholder="e.g. Y2K Chaos / 90s Retro"
                />
              </div>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-neonYellow font-y2k text-[10px] mb-2">WHEN WE MOVING? ⏰</label>
                  <input
                    type="datetime-local"
                    value={crawlData.date}
                    onChange={e => setCrawlData({...crawlData, date: e.target.value})}
                    className="w-full bg-black border-2 border-neonYellow p-3 text-white outline-none focus:shadow-neon-yellow transition-all font-body invert"
                  />
                </div>
              </div>
              <div>
                <label className="block text-neonBlue font-y2k text-[10px] mb-2">HYPE MESSAGE 🗣️</label>
                <textarea
                  value={crawlData.message}
                  onChange={e => setCrawlData({...crawlData, message: e.target.value})}
                  className="w-full bg-black border-2 border-neonBlue p-3 text-white outline-none focus:shadow-neon-blue transition-all h-24 font-body"
                  placeholder="tell 'em why we're doing this... 😤"
                />
              </div>
            </div>
            
            <div className="pt-4 border-t-2 border-dashed border-white/10">
              <div className="flex justify-between items-center mb-4">
                <label className="text-neonYellow font-y2k text-[10px]">THE RULES 📜</label>
                <div className="flex items-center gap-2">
                  <span className="text-[8px] font-y2k text-white/40 uppercase">SHOW RULES SCREEN</span>
                  <input
                    type="checkbox"
                    checked={crawlData.showRules}
                    onChange={e => setCrawlData({...crawlData, showRules: e.target.checked})}
                    className="accent-neonYellow"
                  />
                </div>
              </div>

              {crawlData.showRules && (
                <div className="space-y-4">
                  <Reorder.Group axis="y" values={crawlData.rules || []} onReorder={onReorderRules} className="space-y-2">
                    {(crawlData.rules || []).map((rule) => (
                      <Reorder.Item key={rule.id} value={rule} className="bg-white/5 border border-white/10 p-2 flex items-center gap-2">
                        <div className="cursor-grab active:cursor-grabbing text-white/20">
                          <GripVertical size={14} />
                        </div>
                        <input
                          className="w-8 bg-transparent text-center border-b border-white/20 outline-none"
                          value={rule.emoji}
                          onChange={e => handleUpdateRule(rule.id, 'emoji', e.target.value)}
                        />
                        <input
                          className="flex-1 bg-transparent text-xs outline-none focus:text-neonYellow"
                          value={rule.text}
                          placeholder="enter rule text bestie..."
                          onChange={e => handleUpdateRule(rule.id, 'text', e.target.value)}
                        />
                        <button onClick={() => handleRemoveRule(rule.id)} className="text-white/20 hover:text-red-500">
                          <Trash2 size={14} />
                        </button>
                      </Reorder.Item>
                    ))}
                  </Reorder.Group>
                  <button
                    onClick={handleAddRule}
                    className="w-full border-2 border-dashed border-white/20 py-2 text-[10px] font-y2k text-white/40 hover:border-neonBlue hover:text-neonBlue transition-all"
                  >
                    + ADD CUSTOM RULE
                  </button>
                </div>
              )}
            </div>

            <NeonButton color="pink" className="w-full mt-4 py-4" onClick={() => setStep(2)}>
              NEXT: ADD THE SPOTS &gt;&gt;
            </NeonButton>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 animate-[fadeIn_0.5s_ease-in] flex flex-col flex-1 h-full">
            <div className="flex gap-2">
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && searchPubs(searchQuery)}
                placeholder="search by name / location 🔍"
                className="flex-1 bg-black border-2 border-neonGreen p-3 text-white outline-none focus:shadow-neon-green font-body"
              />
              <NeonButton color="green" onClick={() => searchPubs(searchQuery)} className="!px-4">
                <Search size={20} />
              </NeonButton>
            </div>

            {loading && <VibeLoading />}

            {error && (
              <div className="text-red-500 font-y2k text-[10px] text-center border-2 border-dashed border-red-500 p-4 bg-red-500/10 animate-pulse">
                😭 {error}
              </div>
            )}
            
            {results.length > 0 && (
              <div className="flex gap-4 overflow-x-auto pb-6 snap-x scrollbar-hide">
                {results.map(pub => (
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    key={pub.id}
                    className="min-w-[220px] border-2 border-white/20 bg-black/40 p-3 snap-center shrink-0 flex flex-col gap-3 relative group"
                  >
                    <div className="relative overflow-hidden h-28">
                      <img src={pub.photoUrl} alt={pub.name} className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="font-bold text-sm truncate">{pub.name}</span>
                      <span className="text-[10px] text-white/50 truncate">{pub.address}</span>
                    </div>
                    <button 
                      onClick={() => handleAddPub(pub)}
                      className="bg-neonPink text-darkBg text-[10px] font-y2k py-2 mt-auto active:scale-95 transition-all shadow-[4px_4px_0px_#000]"
                    >
                      + ADD TO LIST
                    </button>
                  </motion.div>
                ))}
              </div>
            )}

            <div className="border-t-2 border-dashed border-white/10 my-2"></div>
            
            <div className="flex-1 overflow-y-auto space-y-4 pr-2 scrollbar-hide min-h-[300px]">
              <div className="flex justify-between items-center sticky top-0 bg-darkBg/90 backdrop-blur-sm z-10 py-2">
                <h3 className="font-y2k text-neonYellow text-[10px]">THE LINEUP ({(crawlData.pubs || []).length}/10) 🗺️</h3>
                {(crawlData.pubs || []).length === 0 && <span className="text-[10px] text-white/30 animate-pulse italic">no pubs?? that's crazy work bestie 💀</span>}
              </div>

              <Reorder.Group axis="y" values={crawlData.pubs || []} onReorder={onReorder} className="space-y-4">
                {(crawlData.pubs || []).map((pub, idx) => (
                  <Reorder.Item
                    key={pub.id}
                    value={pub}
                    className="bg-white/5 border-2 border-white/10 p-4 flex flex-col gap-4 relative group active:border-neonBlue"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        <div className="cursor-grab active:cursor-grabbing text-white/30 hover:text-white">
                          <GripVertical size={18} />
                        </div>
                        <div className="flex flex-col">
                          <span className="font-y2k text-neonBlue text-[10px]">STOP {idx + 1}</span>
                          <span className="font-bold text-sm">{pub.name}</span>
                        </div>
                      </div>
                      <button onClick={() => handleRemovePub(pub.id)} className="text-white/20 hover:text-neonPink transition-colors">
                        <Trash2 size={18} />
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-[9px] font-y2k text-white/40 uppercase">Time Slot</label>
                        <input
                          type="text"
                          placeholder="e.g. 8PM-9PM"
                          value={pub.timeSlot}
                          onChange={(e) => handleUpdatePub(pub.id, 'timeSlot', e.target.value)}
                          className="w-full bg-black/50 border border-white/20 p-2 text-xs outline-none focus:border-neonBlue"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-y2k text-white/40 uppercase">Drink Prices</label>
                        <input
                          type="text"
                          placeholder="e.g. $5 Pints"
                          value={pub.drinkPrice}
                          onChange={(e) => handleUpdatePub(pub.id, 'drinkPrice', e.target.value)}
                          className="w-full bg-black/50 border border-white/20 p-2 text-xs outline-none focus:border-neonGreen"
                        />
                      </div>
                    </div>
                  </Reorder.Item>
                ))}
              </Reorder.Group>
            </div>

            <div className="flex gap-4 mt-auto pt-6 sticky bottom-0 bg-darkBg/95 py-4 border-t-2 border-white/5">
              <NeonButton color="yellow" className="flex-1 py-4 text-xs" onClick={() => setStep(1)}>
                &lt; PREV
              </NeonButton>
              <NeonButton
                color="pink"
                className="flex-[2] py-4 text-xs"
                onClick={generateShareLink}
                disabled={(crawlData.pubs || []).length < 2}
              >
                LOCKED IN FR FR 🔥
              </NeonButton>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="flex flex-col items-center justify-center flex-1 space-y-8 animate-[fadeIn_0.5s_ease-in] py-8">
            <h2 className="font-y2k text-neonGreen text-xl text-center animate-bounce-slow">LOCKED IN FR FR 🔥</h2>
            
            <div className="p-4 bg-white border-[4px] border-darkBg shadow-[8px_8px_0px_#06d6a0]">
              <ShareQRCode url={shareUrl} size={200} />
            </div>
            
            <div className="w-full text-center space-y-4">
              <p className="font-y2k text-[10px] text-white/70">DROP THE LINK IN THE GC 🔗</p>
              <div className="relative">
                <input
                  type="text"
                  readOnly
                  value={shareUrl}
                  className="w-full bg-black border-2 border-neonGreen p-4 text-neonGreen font-mono text-[10px] text-center outline-none"
                  onClick={e => {
                    e.target.select();
                    navigator.clipboard.writeText(shareUrl);
                  }}
                />
                <div className="absolute -bottom-2 right-2 bg-neonGreen text-darkBg font-y2k text-[8px] px-2 py-0.5">
                  CLICK TO COPY
                </div>
              </div>
            </div>

            <NeonButton color="blue" className="w-full py-4" onClick={() => navigate(`/dashboard/${shareUrl.split('/').pop()}`)}>
              GO TO DASHBOARD 🏁
            </NeonButton>
          </div>
        )}
      </div>
    </Y2KContainer>
  );
};
