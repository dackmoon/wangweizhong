import React, { useState, useEffect } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, AreaChart, Area, BarChart, Bar
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
  Maximize2,
  Zap,
  BarChart2,
  Target,
  Circle,
  TrendingDown
} from 'lucide-react';

// --- GaugeChart组件定义（移到外部避免重复渲染） ---
// 优化说明：移除内部 state 和 effect，完全依赖 Recharts 原生动画机制，解决重渲染导致的卡顿
const GaugeChart = React.memo(({ data, label }) => {
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
              isAnimationActive={true}
              animationDuration={1400} // 延长动画时间，增加丝滑感
              animationEasing="ease-out" // 使用缓出效果，结束时更自然
              stroke="none" // 移除边框描边，减少渲染锯齿
            >
              <Cell fill={data.color} />
              <Cell fill="#1e293b" />
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
});

GaugeChart.displayName = 'GaugeChart';

const App = () => {
  // --- 状态管理 ---
  const [currentSlide, setCurrentSlide] = useState(0);
  const [pretrainSlide, setPretrainSlide] = useState(0); // 0: Loss, 1: Benchmarks
  const [currentTime, setCurrentTime] = useState('');

  // --- 模拟数据: M4 模型训练详情 ---
  const m4Data = {
    pretrain: {
      status: 'Phase 2: Context Extension',
      lossData: [
        { step: '0k', val: 6.5 }, { step: '10k', val: 4.2 }, { step: '20k', val: 2.8 },
        { step: '30k', val: 1.5 }, { step: '40k', val: 0.9 }, { step: '50k', val: 0.24 },
        { step: '55k', val: 0.21 } 
      ],
      currentLoss: 0.210,
      benchmarks: [
        { name: 'CMMLU', score: 72.4, color: '#3b82f6' },
        { name: 'MMLU', score: 68.9, color: '#8b5cf6' },
        { name: 'BBH', score: 65.2, color: '#ec4899' },
        { name: 'MATH', score: 58.7, color: '#10b981' }, // 新增第4个指标
      ]
    },
    posttrain: {
      leaderboard: [
        { 
          rank: 1, 
          model: 'Qwen3-235B-A22B-Instruct-2507', 
          metrics: { overall: 92.3, IFEval: 89.5, MMLU: 88.7 },
          tag: 'BASELINE' 
        },
        { 
          rank: 2, 
          model: 'm4_pretrained_full_v2_ensemble_pretrained_full-Qwen3_D_0.7-iter_0006362', 
          metrics: { overall: 91.8, IFEval: 90.2, MMLU: 87.9 },
          tag: 'OURS' 
        },
        { 
          rank: 3, 
          model: 'm4_pretrained_full_v2_ensemble_pretrained_full-Qwen3_D_0.7-iter_0006124', 
          metrics: { overall: 91.2, IFEval: 89.8, MMLU: 87.3 },
          tag: 'OURS' 
        },
        { 
          rank: 4, 
          model: 'm4_pretrained_full_v2_ensemble_pretrained_full-Qwen3_D_0.7-iter_0005891', 
          metrics: { overall: 90.5, IFEval: 88.9, MMLU: 86.8 },
          tag: 'OURS' 
        },
        { 
          rank: 5, 
          model: 'm4_pretrained_full_v2_ensemble_pretrained_full-Qwen3_D_0.7-iter_0005652', 
          metrics: { overall: 89.9, IFEval: 88.2, MMLU: 86.1 },
          tag: 'OURS' 
        },
      ]
    }
  };

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
    { rank: 1, name: 'CC', amount: '12.5kg', desc: '模型MMLU分数远低于预期。' },
    { rank: 2, name: 'TT', amount: '8.2kg', desc: 'M4模型幻觉过大' },
    { rank: 3, name: 'MM', amount: '5.7kg', desc: '项目delay了一周' },
  ];

  // --- 全局轮播逻辑 (30秒) ---
  const totalSlides = 3;
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 30000); 
    return () => clearInterval(timer);
  }, []);

  // --- Pretrain 内部轮播逻辑 (15秒) ---
  useEffect(() => {
    const timer = setInterval(() => {
      setPretrainSlide((prev) => (prev + 1) % 2);
    }, 15000); 
    return () => clearInterval(timer);
  }, []);

  // --- 实时时间更新 (UTC+8) ---
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // 格式化为 UTC+8 时间：YYYY-MM-DD HH:mm:ss
      const formatter = new Intl.DateTimeFormat('zh-CN', {
        timeZone: 'Asia/Shanghai',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      });
      
      const parts = formatter.formatToParts(now);
      const year = parts.find(p => p.type === 'year').value;
      const month = parts.find(p => p.type === 'month').value;
      const day = parts.find(p => p.type === 'day').value;
      const hour = parts.find(p => p.type === 'hour').value;
      const minute = parts.find(p => p.type === 'minute').value;
      const second = parts.find(p => p.type === 'second').value;
      
      setCurrentTime(`${year}-${month}-${day} ${hour}:${minute}:${second}`);
    };
    
    updateTime(); // 立即执行一次
    const timer = setInterval(updateTime, 1000); // 每秒更新
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % totalSlides);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);

  // --- 轮播内容渲染 ---
  const renderSlideContent = () => {
    switch (currentSlide) {
      case 0: // LLM M4 训练详情
        return (
          <div className="h-full flex flex-col px-8 animate-fade-in">
             <div className="flex items-center gap-3 mb-6 shrink-0">
              <div className="p-3 bg-blue-500/20 rounded-xl">
                <Cpu className="text-blue-400 w-8 h-8" />
              </div>
              <div>
                <h2 className="text-2xl lg:text-3xl font-bold text-white">LLM Model (M4) Status</h2>
                <div className="flex items-center gap-2 mt-1">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                  <p className="text-slate-400 text-sm lg:text-base font-mono">{m4Data.pretrain.status}</p>
                </div>
              </div>
            </div>

            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-8 min-h-0 pb-4">
              
              {/* Left Column: Pre-train (Internal Carousel) */}
              <div className="bg-slate-800/30 border border-slate-700/50 rounded-2xl p-6 flex flex-col relative overflow-hidden group">
                <div className="flex items-center justify-between gap-2 text-blue-300 mb-6 shrink-0 z-20">
                  <div className="flex items-center gap-2">
                    <Activity size={20} />
                    <h3 className="font-bold uppercase text-sm lg:text-base tracking-wider">Pre-train Metrics</h3>
                  </div>
                  {/* Internal Carousel Indicators */}
                  <div className="flex gap-1.5">
                    <div className={`h-1.5 rounded-full transition-all duration-500 ${pretrainSlide === 0 ? 'bg-blue-400 w-4' : 'bg-slate-700 w-1.5'}`}></div>
                    <div className={`h-1.5 rounded-full transition-all duration-500 ${pretrainSlide === 1 ? 'bg-blue-400 w-4' : 'bg-slate-700 w-1.5'}`}></div>
                  </div>
                </div>

                {/* Internal Carousel Content Area */}
                <div className="flex-1 relative w-full min-h-0">
                  
                  {/* Slide 0: Loss Chart (Expanded Layout for Big Screen) */}
                  <div className={`absolute inset-0 transition-all duration-700 ease-in-out ${pretrainSlide === 0 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10 pointer-events-none'}`}>
                    <div className="flex h-full items-center gap-6">
                      {/* Left: Stats - 增加宽度占比，放大文字 */}
                      <div className="w-[35%] flex flex-col justify-center gap-2">
                         <div>
                            <span className="text-xs lg:text-sm text-slate-500 uppercase font-bold tracking-wider">Current Loss</span>
                            <div className="text-5xl lg:text-6xl font-black text-white tracking-tighter leading-none mt-1">{m4Data.pretrain.currentLoss}</div>
                         </div>
                         <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-2 py-1.5 rounded-lg w-fit">
                            <TrendingDown size={18} className="text-emerald-400" />
                            <span className="text-sm lg:text-base font-bold text-emerald-400">12%</span>
                         </div>
                         <p className="text-xs lg:text-sm text-slate-500 font-mono leading-tight">vs. 10k ago</p>
                      </div>

                      {/* Right: Area Chart (占据剩余空间，自然变短) */}
                      <div className="flex-1 h-full bg-slate-900/40 rounded-xl border border-slate-700/30 p-2 relative overflow-hidden">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={m4Data.pretrain.lossData} margin={{ top: 5, right: 0, left: 0, bottom: 0 }}>
                            <defs>
                              <linearGradient id="colorLoss" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.5}/>
                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                              </linearGradient>
                            </defs>
                            <Tooltip 
                              cursor={{ stroke: '#fff', strokeWidth: 1, strokeDasharray: '4 4' }}
                              contentStyle={{backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', padding: '8px'}} 
                              itemStyle={{fontSize: 12, fontWeight: 'bold', color: '#fff'}}
                              labelStyle={{display: 'none'}}
                              formatter={(value) => [value, 'Loss']}
                            />
                            <Area 
                              type="monotone" 
                              dataKey="val" 
                              stroke="#3b82f6" 
                              strokeWidth={3}
                              fill="url(#colorLoss)" 
                              animationDuration={1500}
                            />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>

                  {/* Slide 1: Benchmarks (4 Items Compact Layout) */}
                  <div className={`absolute inset-0 transition-all duration-700 ease-in-out flex flex-col justify-center gap-4 py-2 ${pretrainSlide === 1 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10 pointer-events-none'}`}>
                     {m4Data.pretrain.benchmarks.map((bench) => (
                      <div key={bench.name} className="w-full group">
                        <div className="flex justify-between items-end mb-2">
                          <span className="text-sm lg:text-base font-bold text-slate-300 group-hover:text-white transition-colors">{bench.name}</span>
                          <span className="text-sm lg:text-base font-mono font-black text-white">{bench.score}</span>
                        </div>
                        {/* Custom Progress Bar */}
                        <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-700/50 relative">
                          <div 
                            className="h-full rounded-full transition-all duration-1000 relative" 
                            style={{ width: `${bench.score}%`, backgroundColor: bench.color }}
                          >
                             {/* Glossy Effect */}
                             <div className="absolute top-0 left-0 right-0 h-[50%] bg-white/20 rounded-t-full"></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                </div>
              </div>

              {/* Right Column: Post-train (Leaderboard) */}
              <div className="bg-slate-800/30 border border-slate-700/50 rounded-2xl p-6 flex flex-col h-full overflow-hidden">
                <div className="flex items-center justify-between gap-2 text-purple-300 mb-4 shrink-0">
                  <div className="flex items-center gap-2">
                    <Target size={20} />
                    <h3 className="font-bold uppercase text-sm lg:text-base tracking-wider">Post-train Ladder</h3>
                  </div>
                </div>
                
                <div className="flex-1 overflow-y-auto pr-2 space-y-3 custom-scrollbar min-h-0">
                  {m4Data.posttrain.leaderboard.map((item, idx) => (
                    <div 
                      key={idx} 
                      className={`relative flex items-center justify-between p-4 rounded-xl border transition-all ${
                        item.rank === 1 
                          ? 'bg-gradient-to-r from-purple-500/20 to-blue-500/10 border-purple-500/50 shadow-[0_0_20px_rgba(168,85,247,0.1)]' 
                          : 'bg-slate-900/40 border-slate-700/30 hover:border-slate-600/50'
                      }`}
                    >
                      {/* Left: Rank & Name */}
                      <div className="flex items-center gap-4 min-w-0 flex-1">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-black text-lg shadow-inner shrink-0 ${
                          item.rank === 1 ? 'bg-purple-600 text-white' : 
                          item.tag === 'OURS' ? 'bg-blue-600/80 text-white' : 'bg-slate-800 text-slate-500'
                        }`}>
                          #{item.rank}
                        </div>
                        <div className="min-w-0 flex-1 flex flex-col justify-center">
                          <div className="flex items-center gap-2">
                            <span className="text-white font-bold text-sm lg:text-base truncate" title={item.model}>
                              {item.model.length > 28 ? item.model.slice(0, 28) + '...' : item.model}
                            </span>
                            {item.tag === 'OURS' && <span className="text-[10px] bg-blue-500 text-white px-2 py-0.5 rounded-sm font-bold tracking-wider shrink-0">OURS</span>}
                            {item.tag === 'BASELINE' && <span className="text-[10px] bg-amber-500 text-white px-2 py-0.5 rounded-sm font-bold tracking-wider shrink-0">BASE</span>}
                          </div>
                        </div>
                      </div>
                      
                      {/* Right: Detailed Metrics (Side by Side) */}
                      <div className="flex items-center gap-4 shrink-0 ml-4">
                         {/* IFEval */}
                         <div className="flex flex-col items-end hidden xl:flex">
                            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">IFEval</span>
                            <span className="text-sm font-mono font-bold text-slate-300">{item.metrics.IFEval}</span>
                         </div>
                         {/* MMLU */}
                         <div className="flex flex-col items-end hidden xl:flex">
                            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">MMLU</span>
                            <span className="text-sm font-mono font-bold text-slate-300">{item.metrics.MMLU}</span>
                         </div>
                         {/* Overall (Highlighted) */}
                         <div className="flex flex-col items-end bg-slate-800/60 border border-slate-700/50 px-3 py-1.5 rounded-md min-w-[60px]">
                            <span className="text-[10px] text-purple-400 font-bold uppercase tracking-wider">Overall</span>
                            <span className="text-lg font-black font-mono text-white">{item.metrics.overall}</span>
                         </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
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
      {/* Scrollbar Styles */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #334155;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: #475569;
        }
      `}</style>

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
          <span className="text-slate-500 font-mono text-sm hidden md:block">{currentTime}</span>
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