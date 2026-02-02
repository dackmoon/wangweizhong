import React, { useState, useEffect } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell 
} from 'recharts';
import { 
  Activity, 
  Globe, 
  TrendingUp, 
  Trophy, 
  Cpu, 
  Mic, 
  AlertCircle,
  Clock,
  Layers,
  ChevronLeft,
  ChevronRight,
  Video,
  Radio,
  Maximize2
} from 'lucide-react';

const App = () => {
  // --- 状态管理 ---
  const [currentSlide, setCurrentSlide] = useState(0);

  // --- 模拟数据 ---
  const trainingData = [
    { name: 'LLM模型 (V1.5)', progress: 78, status: 'Training', color: '#3b82f6', icon: <Cpu className="w-6 h-6" />, eta: '12h 45m', details: 'Loss: 0.241 | Epoch: 42/50' },
    { name: 'Audio模型 (V4.0)', progress: 42, status: 'Training', color: '#8b5cf6', icon: <Mic className="w-6 h-6" />, eta: '3d 2h', details: 'Loss: 1.05 | Epoch: 12/100' },
  ];

  const crawlData = {
    cn: { total: '1.2T', progress: 85, color: '#ef4444' },
    en: { total: '850B', progress: 62, color: '#10b981' }
  };

  const productMetrics = [
    { date: '01/26', dau: 12000, pcu: 3200 },
    { date: '01/27', dau: 13500, pcu: 3800 },
    { date: '01/28', dau: 11800, pcu: 3100 },
    { date: '01/29', dau: 15600, pcu: 4500 },
    { date: '01/30', dau: 18900, pcu: 5200 },
    { date: '01/31', dau: 21000, pcu: 6100 },
    { date: '02/01', dau: 19500, pcu: 5800 },
  ];

  const shitRanking = [
    { rank: 1, name: '老张', amount: '12.5kg', desc: '在生产环境执行了没有 WHERE 条件的 DELETE，差点让公司倒闭。' },
    { rank: 2, name: '小李', amount: '8.2kg', desc: '把测试环境的鉴权密钥硬编码提到了 GitHub 公共仓库。' },
    { rank: 3, name: '阿强', amount: '5.7kg', desc: '写了一个死循环，把 128 核的服务器 CPU 跑满了三小时。' },
  ];

  // --- 轮播逻辑 ---
  const totalSlides = 3;
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % totalSlides);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);

  // --- 组件渲染 ---

  const GaugeChart = ({ data, label }) => {
    const chartData = [
      { name: 'Completed', value: data.progress },
      { name: 'Remaining', value: 100 - data.progress },
    ];
    return (
      <div className="flex flex-col items-center">
        <div className="relative w-48 h-48">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                startAngle={225}
                endAngle={-45}
                paddingAngle={0}
                dataKey="value"
              >
                <Cell fill={data.color} stroke="none" />
                <Cell fill="#1e293b" stroke="none" />
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold text-white tracking-tighter">{data.total}</span>
            <span className="text-xs text-slate-400 uppercase tracking-widest mt-1">Tokens</span>
          </div>
        </div>
        <div className="mt-[-20px] text-center relative z-10">
          <div className="bg-slate-800/80 backdrop-blur px-3 py-1 rounded-full border border-slate-700 inline-block">
            <p className="text-sm font-medium text-slate-200">{label}</p>
          </div>
          <p className="text-2xl font-black mt-2" style={{ color: data.color }}>{data.progress}%</p>
        </div>
      </div>
    );
  };

  // 轮播内容渲染
  const renderSlideContent = () => {
    switch (currentSlide) {
      case 0: // 模型训练
        return (
          <div className="h-full flex flex-col justify-center px-8 animate-fade-in">
             <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-blue-500/20 rounded-xl">
                <Activity className="text-blue-400 w-8 h-8" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Model Training</h2>
                <p className="text-slate-400">实时训练集群状态监控</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {trainingData.map((model, idx) => (
                <div key={idx} className="bg-slate-800/30 border border-slate-700/50 p-6 rounded-2xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    {model.icon}
                  </div>
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-slate-900 rounded-lg text-white shadow-lg border border-slate-700">
                        {model.icon}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white">{model.name}</h3>
                        <p className="text-xs text-slate-400 font-mono">{model.details}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-black italic" style={{ color: model.color }}>{model.progress}%</div>
                      <div className="text-xs text-slate-500 font-bold uppercase">Progress</div>
                    </div>
                  </div>
                  
                  <div className="w-full bg-slate-900 rounded-full h-4 overflow-hidden mb-3 border border-slate-700">
                    <div 
                      className="h-full rounded-full transition-all duration-1000 relative overflow-hidden"
                      style={{ width: `${model.progress}%`, backgroundColor: model.color }}
                    >
                      <div className="absolute inset-0 bg-white/20 w-full animate-[shimmer_2s_infinite]"></div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-400 bg-slate-900/50 w-fit px-3 py-1 rounded-full">
                    <Clock className="w-3 h-3" />
                    <span>ETA: <span className="text-white">{model.eta}</span></span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 1: // 通爬进度
        return (
          <div className="h-full flex flex-col justify-center px-8 animate-fade-in">
             <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-emerald-500/20 rounded-xl">
                <Globe className="text-emerald-400 w-8 h-8" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Broad Crawl Status</h2>
                <p className="text-slate-400">通爬数据采集进度</p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row justify-around items-center gap-8 py-4">
              <GaugeChart data={crawlData.cn} label="CN_Broad Crawl" />
              <div className="hidden md:block h-32 w-[1px] bg-gradient-to-b from-transparent via-slate-600 to-transparent"></div>
              <GaugeChart data={crawlData.en} label="EN_Broad_Crawl" />
            </div>
          </div>
        );
      case 2: // 产品趋势
        return (
          <div className="h-full flex flex-col px-8 py-4 animate-fade-in">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-pink-500/20 rounded-xl">
                  <TrendingUp className="text-pink-400 w-8 h-8" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Growth Metrics</h2>
                  <p className="text-slate-400">Anuneko App 活跃趋势</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex items-center gap-2 bg-slate-900/50 px-3 py-1 rounded-lg border border-slate-700">
                  <div className="w-3 h-3 rounded-full bg-pink-500"></div>
                  <span className="text-sm font-bold text-slate-300">DAU</span>
                </div>
                <div className="flex items-center gap-2 bg-slate-900/50 px-3 py-1 rounded-lg border border-slate-700">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <span className="text-sm font-bold text-slate-300">PCU</span>
                </div>
              </div>
            </div>
            <div className="flex-1 min-h-0">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={productMetrics} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                  <XAxis dataKey="date" stroke="#64748b" tickLine={false} axisLine={false} dy={10} />
                  <YAxis stroke="#64748b" tickLine={false} axisLine={false} tickFormatter={(v) => `${v/1000}k`} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.5)' }}
                    itemStyle={{ fontSize: '12px', fontWeight: 'bold' }}
                  />
                  <Line type="monotone" dataKey="dau" stroke="#ec4899" strokeWidth={4} dot={false} activeDot={{ r: 8 }} animationDuration={1000} />
                  <Line type="monotone" dataKey="pcu" stroke="#3b82f6" strokeWidth={4} strokeDasharray="6 6" dot={false} activeDot={{ r: 8 }} animationDuration={1000} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        );
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 p-4 md:p-6 font-sans flex flex-col gap-6">
      {/* Header */}
      <header className="flex justify-between items-end border-b border-slate-800/60 pb-4 shrink-0">
        <div>
          <h1 className="text-4xl font-black bg-gradient-to-r from-blue-400 via-indigo-400 to-emerald-400 bg-clip-text text-transparent italic tracking-tight">
            ANUNEKO OPS
          </h1>
          <p className="text-slate-500 text-xs font-mono uppercase tracking-[0.2em] mt-1">Central Command Interface v2.4</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-slate-900 px-4 py-2 rounded-full border border-slate-800 shadow-inner">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
            <span className="text-xs font-mono font-bold text-emerald-500">SYSTEM ONLINE</span>
          </div>
          <span className="text-slate-500 font-mono text-sm hidden md:block">2026-02-02 10:45:00</span>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col gap-6 min-h-0">
        
        {/* Top Section: Metrics Carousel */}
        <div className="h-[45vh] w-full bg-slate-900/40 border border-slate-800 rounded-3xl relative overflow-hidden backdrop-blur-sm shadow-2xl">
          {/* Carousel Content */}
          <div className="absolute inset-0 pb-12 pt-4">
            {renderSlideContent()}
          </div>

          {/* Carousel Controls */}
          <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-slate-950/80 to-transparent flex items-center justify-between px-6">
            <div className="flex gap-2">
              {[0, 1, 2].map((idx) => (
                <button 
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${currentSlide === idx ? 'w-8 bg-white' : 'w-2 bg-slate-600 hover:bg-slate-500'}`}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <button onClick={prevSlide} className="p-2 hover:bg-white/10 rounded-full transition-colors"><ChevronLeft size={20} /></button>
              <button onClick={nextSlide} className="p-2 hover:bg-white/10 rounded-full transition-colors"><ChevronRight size={20} /></button>
            </div>
          </div>
        </div>

        {/* Bottom Section: Split View */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[300px]">
          
          {/* Bottom Left: Shit Ranking */}
          <section className="lg:col-span-5 bg-slate-900/40 border border-slate-800 rounded-3xl p-6 relative overflow-hidden flex flex-col">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 via-orange-500 to-transparent"></div>
            <div className="flex items-center justify-between mb-6 shrink-0">
              <div className="flex items-center gap-2">
                <div className="bg-amber-500/10 p-2 rounded-lg"><Trophy className="text-amber-500 w-5 h-5" /></div>
                <h2 className="text-lg font-bold text-white">Incident Ranking (Top 3)</h2>
              </div>
              <span className="text-[10px] bg-amber-900/30 text-amber-500 border border-amber-900/50 px-2 py-1 rounded font-mono">WEEKLY SHAME</span>
            </div>
            
            <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
              {shitRanking.map((item) => (
                <div key={item.rank} className="relative bg-slate-950/80 p-4 rounded-xl border border-slate-800/60 group hover:border-amber-900/50 transition-colors">
                  <div className="flex justify-between items-start">
                    <div className="flex gap-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-lg shadow-lg ${
                        item.rank === 1 ? 'bg-gradient-to-br from-amber-400 to-orange-600 text-white' : 
                        item.rank === 2 ? 'bg-slate-700 text-slate-300' : 'bg-slate-800 text-slate-500 border border-slate-700'
                      }`}>
                        {item.rank}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-bold text-white">{item.name}</p>
                          {item.rank === 1 && <span className="text-[10px] bg-red-500 text-white px-1 rounded font-bold">MVP</span>}
                        </div>
                        <p className="text-xs text-slate-400 mt-1 leading-relaxed line-clamp-2 group-hover:line-clamp-none transition-all">"{item.desc}"</p>
                      </div>
                    </div>
                    <div className="text-right shrink-0 ml-2">
                      <div className="text-amber-500 font-mono font-bold text-lg">{item.amount}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Bottom Right: CCTV Monitor */}
          <section className="lg:col-span-7 bg-black border-[4px] border-slate-800 rounded-xl relative overflow-hidden shadow-2xl flex flex-col">
            {/* Camera Header Overlay */}
            <div className="absolute top-0 left-0 right-0 p-4 z-20 flex justify-between items-start bg-gradient-to-b from-black/80 to-transparent">
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <Video className="text-slate-400 w-4 h-4" />
                  <span className="text-slate-200 font-mono text-xs font-bold tracking-widest">CAM_04: DEV_AREA_SOUTH</span>
                </div>
                <span className="text-slate-500 font-mono text-[10px] mt-1">1920x1080 | 30FPS | H.265</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-600 animate-pulse shadow-[0_0_10px_#ef4444]"></div>
                <span className="text-red-600 font-mono text-xs font-bold">REC</span>
              </div>
            </div>

            {/* Video Content Placeholder */}
            <div className="flex-1 bg-slate-900 relative flex items-center justify-center group">
              {/* Grid Overlay */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
              
              {/* Vignette */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)]"></div>
              
              {/* Central Status */}
              <div className="text-center z-10 opacity-50 group-hover:opacity-100 transition-opacity">
                 <div className="w-24 h-24 border-2 border-slate-600 rounded-full flex items-center justify-center mx-auto mb-4 border-dashed animate-[spin_10s_linear_infinite]">
                    <div className="w-20 h-20 bg-slate-800/50 rounded-full flex items-center justify-center backdrop-blur-sm">
                      <Radio className="text-slate-400 w-8 h-8 animate-pulse" />
                    </div>
                 </div>
                 <p className="text-slate-500 font-mono text-sm tracking-widest">WAITING FOR SIGNAL...</p>
                 <p className="text-slate-600 font-mono text-xs mt-1">NO MOTION DETECTED</p>
              </div>

              {/* Crosshairs */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 border border-slate-500/20"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-4 bg-slate-500/20"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-1 bg-slate-500/20"></div>
            </div>

            {/* Camera Footer Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-4 z-20 flex justify-between items-end bg-gradient-to-t from-black/80 to-transparent">
              <div className="text-slate-400 font-mono text-xs">
                ISO 800 <span className="mx-2">|</span> F/2.8 <span className="mx-2">|</span> 1/60
              </div>
              <Maximize2 className="text-slate-500 hover:text-white cursor-pointer w-4 h-4 transition-colors" />
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};

export default App;