import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronRight, 
  Crown, 
  Globe, 
  LayoutDashboard, 
  Settings, 
  Shield, 
  Trophy, 
  Zap,
  TrendingUp,
  Target,
  RefreshCcw,
  Briefcase,
  Home,
  UserPlus,
  Lock,
  Mail,
  X,
  CreditCard,
  PieChart
} from 'lucide-react';
import { format } from 'date-fns';
import { cn } from './lib/utils';
import { getExecutiveInsight } from './lib/gemini';

function NavItem({ icon: Icon, label, active, onClick }: { icon: any; label: string; active?: boolean; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 px-6 py-4 w-full transition-all duration-500 group outline-none relative",
        active ? "text-[#D4AF37]" : "text-slate-500 hover:text-white"
      )}
    >
      {active && (
        <motion.div 
          layoutId="nav-bg"
          className="absolute inset-0 bg-[#D4AF37]/10 border-r-4 border-[#D4AF37]"
          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
        />
      )}
      <Icon className={cn("w-5 h-5 relative z-10 transition-transform group-hover:scale-110", active && "text-[#D4AF37]")} />
      <span className="text-[10px] font-black tracking-[0.2em] uppercase relative z-10">{label}</span>
    </button>
  );
}

function MetricCard({ label, value, trend, icon: Icon, onClick }: { label: string; value: string; trend?: string; icon: any; onClick?: () => void }) {
  return (
    <motion.button 
      whileHover={{ scale: 1.02, y: -5 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="bg-[#0a0a0a] border border-slate-900 p-8 rounded-[2.5rem] hover:border-[#D4AF37]/40 transition-all duration-700 group relative overflow-hidden text-left w-full outline-none"
    >
      <div className="absolute top-0 right-0 w-48 h-48 bg-[#D4AF37]/5 blur-[80px] rounded-full -mr-24 -mt-24 group-hover:bg-[#D4AF37]/10 transition-all duration-700" />
      <div className="flex justify-between items-start mb-6 relative z-10">
        <div className="p-3 bg-slate-900 rounded-2xl group-hover:bg-[#D4AF37]/20 transition-colors border border-slate-800">
          <Icon className="w-5 h-5 text-[#D4AF37]" />
        </div>
        {trend && (
          <span className="text-[10px] font-black text-emerald-400 bg-emerald-400/10 px-3 py-1 rounded-full border border-emerald-400/20">
            {trend}
          </span>
        )}
      </div>
      <p className="text-slate-600 text-[10px] mb-2 font-black uppercase tracking-[0.3em] relative z-10">{label}</p>
      <p className="text-4xl font-black text-white tracking-tighter relative z-10 tabular-nums">{value}</p>
      
      <div className="mt-6 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity relative z-10">
        <span className="text-[9px] font-black text-[#D4AF37] uppercase tracking-widest">Tizimga kirish</span>
        <ChevronRight className="w-3 h-3 text-[#D4AF37]" />
      </div>
    </motion.button>
  );
}

export default function App() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeTab, setActiveTab] = useState('dashboard');
  const [insight, setInsight] = useState<string>("Tizim Muhammadali uchun tahlil qilinmoqda...");
  const [isGenerating, setIsGenerating] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  
  const [projects, setProjects] = useState([
    { id: 1, name: "New York Hub Expansion", progress: 65, status: "Active" },
    { id: 2, name: "Global Asset Liquidity", progress: 30, status: "Planned" },
    { id: 3, name: "AI Core Governance", progress: 90, status: "Verifying" },
  ]);
  const [devLevel, setDevLevel] = useState(4.2);

  const generateInsight = useCallback(async () => {
    setIsGenerating(true);
    const result = await getExecutiveInsight("Muhammadali Oripov is leading a prestigious global enterprise. Focus on prestige, power, and architectural elegance.");
    setInsight(result);
    setIsGenerating(false);
  }, []);

  const addProject = () => {
    const newId = projects.length + 1;
    setProjects([...projects, { id: newId, name: `Yangi Strategik Loyiha #${newId}`, progress: 0, status: "Yangi" }]);
    setDevLevel(prev => +(prev + 0.1).toFixed(1));
  };

  const updateProgress = (id: number) => {
    setProjects(projects.map(p => p.id === id ? { ...p, progress: Math.min(100, p.progress + 10) } : p));
    setDevLevel(prev => +(prev + 0.05).toFixed(1));
  };

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    generateInsight();
    return () => clearInterval(timer);
  }, [generateInsight]);

  return (
    <div className="min-h-screen bg-[#020202] text-slate-200 font-['Inter'] selection:bg-[#D4AF37]/30 flex flex-col lg:flex-row overflow-hidden">
      {/* Dynamic Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#D4AF37]/5 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/5 blur-[120px] rounded-full" />
      </div>

      {/* Global Typography Styles */}
      <style>{`
        .font-display { font-family: 'Playfair Display', serif; }
        .text-gold { color: #D4AF37; }
        .bg-gold { background-color: #D4AF37; }
        .gradient-gold {
          background: linear-gradient(135deg, #D4AF37 0%, #F5E0A3 50%, #B8860B 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #334155; border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: #D4AF37; }
      `}</style>

      {/* Sidebar - Desktop Only */}
      <aside className="hidden lg:flex flex-col w-80 border-r border-slate-900 bg-[#050505]/90 backdrop-blur-2xl z-50 fixed inset-y-0">
        <div className="p-12">
          <div className="flex items-center gap-4 mb-16">
            <div className="w-12 h-12 bg-[#D4AF37] p-3 rounded-2xl shadow-[0_0_30px_rgba(212,175,55,0.3)] rotate-3">
              <Crown className="w-full h-full text-black transform -rotate-3" />
            </div>
            <span className="font-display text-2xl font-black text-white italic tracking-tighter uppercase">ORIPOV</span>
          </div>

          <nav className="space-y-4">
            <NavItem icon={Home} label="Dashboard" active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} />
            <NavItem icon={Globe} label="Geo-Net" active={activeTab === 'network'} onClick={() => setActiveTab('network')} />
            <NavItem icon={PieChart} label="Assets" active={activeTab === 'assets'} onClick={() => setActiveTab('assets')} />
            <NavItem icon={Shield} label="Security" active={activeTab === 'security'} onClick={() => setActiveTab('security')} />
            <NavItem icon={Settings} label="Settings" active={activeTab === 'settings'} onClick={() => setActiveTab('settings')} />
          </nav>
        </div>

        <div className="mt-auto p-10">
          <div className="flex items-center gap-4 bg-slate-900/50 p-4 rounded-3xl border border-slate-800">
            <div className="w-12 h-12 rounded-2xl bg-[#D4AF37] flex items-center justify-center font-black text-black text-sm">OM</div>
            <div>
              <p className="text-[11px] font-black text-white uppercase tracking-tighter">O. MUHAMMADALI</p>
              <p className="text-[9px] font-bold text-[#D4AF37] uppercase tracking-widest">Level S Admin</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Container */}
      <main className="flex-1 relative z-10 overflow-y-auto h-screen custom-scrollbar">
        <div className="max-w-7xl mx-auto p-6 md:p-12 lg:p-20">
          
          {/* Top Bar */}
          <div className="flex justify-between items-center mb-16 relative z-50">
            <div className="flex items-center gap-6">
              <button 
                onClick={() => {
                  setActiveTab('dashboard');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#D4AF37] hover:text-black transition-all group/home active:scale-90"
                title="Bosh sahifa"
              >
                <Home className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-4">
                <div className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse shadow-[0_0_10px_#D4AF37]" />
                <span className="text-[10px] font-black tracking-[0.4em] text-slate-500 uppercase">Executive Node: Secure</span>
              </div>
            </div>
            
            <div className="md:flex items-center gap-10 hidden">
              <div className="flex flex-col items-end">
                <span className="text-3xl font-light text-white tracking-[0.1em] font-mono">{format(currentTime, 'HH:mm:ss')}</span>
                <span className="text-[9px] font-black text-[#D4AF37] uppercase tracking-[0.4em]">{format(currentTime, 'EEEE, d MMMM')}</span>
              </div>
              <div className="h-10 w-[1px] bg-slate-800" />
              <div className="flex items-center gap-4">
                 <div className="text-right">
                    <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest">System Dev Level</p>
                    <p className="text-xl font-black text-white italic">v{devLevel}</p>
                 </div>
                 <div className="w-12 h-12 rounded-full border border-[#D4AF37]/30 flex items-center justify-center bg-[#D4AF37]/5">
                    <Zap className="w-5 h-5 text-[#D4AF37]" />
                 </div>
              </div>
            </div>
          </div>

          <div className="lg:hidden block mb-8 text-center border-b border-white/5 pb-8">
             <h1 className="font-display text-4xl font-black text-white italic uppercase tracking-tighter">ORIPOV MUHAMMADALI</h1>
          </div>

          {/* Hero Section */}
          <header className="mb-32 relative">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-center gap-4 mb-4">
                <span className="w-10 h-[2px] bg-[#D4AF37]" />
                <span className="text-[11px] font-black text-[#D4AF37] uppercase tracking-[0.6em]">Presidential Status</span>
              </div>
              <h1 className="font-display text-5xl md:text-8xl font-black leading-tight text-white uppercase tracking-tighter">
                ORIPOV <span className="gradient-gold">MUHAMMADALI</span>
              </h1>
              <div className="mt-12 flex flex-col md:flex-row md:items-center gap-12">
                <div className="flex items-center gap-4 bg-white/5 border border-white/10 px-6 py-3 rounded-full backdrop-blur-md">
                   <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                   <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-200 italic">Prezident Statusi Faol</span>
                </div>
                <p className="text-slate-500 text-sm max-w-sm font-medium leading-relaxed italic border-l-2 border-gold/20 pl-6">
                  Ushbu platforma Muhammadali uchun mahsus yaratilgan. Sayt bilan qancha ko'p ishlansa, u shunchalik rivojlanadi.
                </p>
              </div>
            </motion.div>
          </header>

          {/* Tab Views */}
          <AnimatePresence mode="wait">
            {activeTab === 'dashboard' ? (
              <motion.div 
                key="dashboard"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                {/* AI Insight Bar */}
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="mb-20 bg-gradient-to-r from-[#D4AF37]/15 to-transparent border border-[#D4AF37]/20 rounded-[3rem] p-10 md:p-12 flex flex-col lg:flex-row items-center gap-10 relative overflow-hidden group hover:border-[#D4AF37]/50 transition-all duration-700 shadow-[20px_20px_50px_rgba(0,0,0,0.5)]"
                >
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5" />
                  <div className="relative">
                    <div className="bg-[#D4AF37] p-6 rounded-full shadow-[0_0_40px_rgba(212,175,55,0.4)] relative z-10 group-hover:scale-110 transition-transform duration-500 border-4 border-black">
                      <Crown className="w-8 h-8 text-black" />
                    </div>
                    <div className="absolute inset-0 bg-[#D4AF37]/40 rounded-full animate-ping" />
                  </div>
                  <div className="flex-1 text-center lg:text-left relative z-10">
                    <div className="flex flex-col lg:flex-row lg:items-center gap-3 mb-3">
                      <span className="text-[11px] font-black tracking-[0.4em] text-[#D4AF37] uppercase">Shaxsiy Strategik Maslahat</span>
                      <span className="hidden lg:block w-20 h-[1px] bg-white/10" />
                      {isGenerating && <RefreshCcw className="w-3 h-3 text-[#D4AF37] animate-spin" />}
                    </div>
                    <AnimatePresence mode="wait">
                      <motion.p 
                        key={insight}
                        initial={{ opacity: 0, filter: "blur(10px)" }}
                        animate={{ opacity: 1, filter: "blur(0px)" }}
                        exit={{ opacity: 0, filter: "blur(10px)" }}
                        className="text-xl md:text-2xl font-display font-medium text-white leading-relaxed italic"
                      >
                        "{insight}"
                      </motion.p>
                    </AnimatePresence>
                  </div>
                  <button 
                    onClick={generateInsight}
                    disabled={isGenerating}
                    className="px-8 py-4 bg-white/5 hover:bg-[#D4AF37] hover:text-black border border-white/10 hover:border-[#D4AF37] rounded-full text-[11px] font-black uppercase tracking-[0.3em] text-white transition-all duration-500 flex items-center gap-3 active:scale-95 group/btn"
                  >
                    Yangi Fikir
                    <RefreshCcw className={cn("w-4 h-4 transition-transform duration-700 group-hover/btn:rotate-180", isGenerating && "animate-spin")} />
                  </button>
                </motion.div>

                {/* Central Dash Components */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                  
                  {/* Primary Metrics Column */}
                  <div className="lg:col-span-8 space-y-10">
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                       <MetricCard icon={TrendingUp} label="Entity Growth" value="+274%" trend="Optimal" onClick={() => setActiveTab('assets')} />
                       <MetricCard icon={Zap} label="System Load" value="12ms" trend="Peak" onClick={() => setActiveTab('security')} />
                       <MetricCard icon={Briefcase} label="Active Assets" value="1,492" onClick={() => setActiveTab('assets')} />
                    </div>

                    {/* Dynamic Project Hub */}
                    <section className="bg-[#080808]/80 backdrop-blur-2xl border border-slate-900 rounded-[3rem] p-12 shadow-2xl">
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                        <div>
                          <h2 className="font-display text-4xl font-black text-white italic uppercase tracking-tighter shadow-gold/10">Strategik Markaz</h2>
                          <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.4em] mt-2 border-l-2 border-[#D4AF37] pl-3">Loyiha Boshqaruvi & Rivojlanish</p>
                        </div>
                        <button 
                          onClick={addProject}
                          className="group bg-[#D4AF37] text-black px-6 py-3 rounded-full font-black text-[11px] uppercase tracking-widest flex items-center gap-3 hover:scale-105 active:scale-95 transition-all shadow-[0_10px_20px_rgba(212,175,55,0.3)]"
                        >
                          Yangi Loyiha
                          <Target className="w-4 h-4 group-hover:rotate-45 transition-transform" />
                        </button>
                      </div>

                      <div className="space-y-6">
                         {projects.map((project, i) => (
                          <motion.div 
                            key={project.id}
                            layout
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="group p-8 bg-slate-900/10 border border-slate-900/50 rounded-3xl hover:bg-slate-900/30 hover:border-[#D4AF37]/30 transition-all duration-500 relative overflow-hidden"
                          >
                            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
                              <div className="flex items-center gap-6">
                                <div className="w-14 h-14 flex items-center justify-center bg-black border border-slate-800 rounded-2xl group-hover:border-[#D4AF37] transition-all">
                                  <span className="font-mono text-xs font-bold text-slate-500 group-hover:text-[#D4AF37]">0{project.id}</span>
                                </div>
                                <div>
                                  <h4 className="text-lg font-bold text-white mb-1 uppercase tracking-tight group-hover:text-gold transition-colors">{project.name}</h4>
                                  <div className="flex items-center gap-3">
                                    <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">{project.status}</span>
                                    <span className="w-1 h-1 rounded-full bg-slate-800" />
                                    <span className="text-[10px] font-black text-[#D4AF37] tabular-nums">{project.progress}%</span>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="flex-1 max-w-[200px] h-1 bg-slate-900 rounded-full overflow-hidden mx-4">
                                 <motion.div 
                                   initial={{ width: 0 }}
                                   animate={{ width: `${project.progress}%` }}
                                   className="h-full bg-gradient-to-r from-gold/50 to-gold"
                                 />
                              </div>

                              <button 
                                 onClick={() => updateProgress(project.id)}
                                 className="p-4 bg-black rounded-full border border-slate-800 hover:border-[#D4AF37] hover:bg-[#D4AF37]/10 transition-all text-slate-400 hover:text-[#D4AF37]"
                              >
                                <TrendingUp className="w-5 h-5" />
                              </button>
                            </div>
                            <div className="absolute top-0 right-0 w-32 h-full bg-[#D4AF37]/2 blur-[60px] transform skew-x-12 translate-x-32 group-hover:translate-x-0 transition-transform duration-1000" />
                          </motion.div>
                         ))}
                      </div>
                    </section>

                    {/* World View Card */}
                    <div className="bg-gradient-to-br from-[#D4AF37]/10 to-blue-500/5 border border-white/5 rounded-[3rem] p-12 relative overflow-hidden group min-h-[300px]">
                       <div className="relative z-10">
                          <h3 className="font-display text-4xl font-black text-white leading-tight mb-4 uppercase">
                            World Domination <br />
                            <span className="text-gold italic">Global Node Status</span>
                          </h3>
                          <p className="max-w-md text-slate-400 text-sm leading-relaxed mb-8">
                             Oripov Muhammadali's influence expands across 12 sectors with active systems in London, Dubai, Tokyo, and New York.
                          </p>
                          <div className="flex items-center gap-8">
                             <div className="flex flex-col">
                                <span className="text-2xl font-black text-white">100%</span>
                                <span className="text-[9px] font-bold text-emerald-400 uppercase tracking-widest mt-1">Uptime</span>
                             </div>
                             <div className="w-[1px] h-10 bg-slate-800" />
                             <div className="flex flex-col">
                                <span className="text-2xl font-black text-white">4.8M</span>
                                <span className="text-[9px] font-bold text-[#D4AF37] uppercase tracking-widest mt-1">Interactions</span>
                             </div>
                          </div>
                       </div>
                       <Globe className="absolute -bottom-20 -right-20 w-80 h-80 text-white/5 group-hover:text-[#D4AF37]/10 transition-all duration-1000 rotate-12" />
                    </div>

                  </div>

                  {/* Right Meta Column */}
                  <div className="lg:col-span-4 space-y-10">
                    
                    {/* Profile Card */}
                    <div className="bg-[#0a0a0a] border border-slate-900 rounded-[3rem] p-10 text-center relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
                      <div className="relative mb-6 inline-block">
                        <div className="w-32 h-32 rounded-full border-2 border-[#D4AF37] p-1 bg-slate-900/50 backdrop-blur shadow-[0_0_40px_rgba(212,175,55,0.2)]">
                          <div className="w-full h-full rounded-full bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center overflow-hidden">
                            <Crown className="w-12 h-12 text-[#D4AF37]" />
                          </div>
                        </div>
                        <div className="absolute bottom-1 right-1 w-8 h-8 bg-black border border-[#D4AF37] rounded-full flex items-center justify-center">
                          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        </div>
                      </div>
                      <h3 className="font-display text-2xl font-black text-white leading-none uppercase tracking-tighter mb-2">Muhammadali</h3>
                      <p className="text-[10px] font-black text-[#D4AF37] uppercase tracking-[0.3em] mb-6">Master Architect</p>
                      <div className="flex justify-center gap-4">
                        <div className="px-5 py-2 rounded-full bg-white/5 border border-white/10 text-[9px] font-black uppercase tracking-widest text-slate-300">
                          S-Rank
                        </div>
                        <div className="px-5 py-2 rounded-full bg-white/5 border border-white/10 text-[9px] font-black uppercase tracking-widest text-slate-300">
                          Immortal
                        </div>
                      </div>
                    </div>

                    {/* Resource Allocation */}
                    <section className="bg-slate-900/20 border border-slate-900 rounded-[2.5rem] p-8">
                      <h4 className="text-[10px] font-black text-[#D4AF37] uppercase tracking-[0.3em] mb-8">Asset Allocation</h4>
                      <div className="space-y-8">
                        {[
                          { label: 'Intelligence', val: 94 },
                          { label: 'Strategic Ops', val: 82 },
                          { label: 'Capital Flow', val: 67 },
                          { label: 'Authority', val: 100 },
                        ].map((res) => (
                          <div key={res.label}>
                            <div className="flex justify-between text-[10px] font-black uppercase tracking-widest mb-3">
                              <span className="text-slate-400">{res.label}</span>
                              <span className="text-white">{res.val}%</span>
                            </div>
                            <div className="h-1 bg-slate-900 rounded-full overflow-hidden">
                              <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: `${res.val}%` }}
                                className={cn("h-full", res.val === 100 ? "bg-white shadow-[0_0_10px_white]" : "bg-[#D4AF37]")}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </section>

                    {/* System Messages */}
                    <section className="bg-black/40 border border-slate-900 rounded-[2.5rem] p-8">
                       <h4 className="text-[10px] font-black text-slate-600 uppercase tracking-[0.3em] mb-6">Neural Log Feed</h4>
                       <div className="space-y-4 font-mono text-[10px] text-slate-500">
                         <div className="flex items-start gap-3 group">
                            <span className="text-emerald-500 font-bold">14:22</span>
                            <p className="group-hover:text-slate-300 transition-colors uppercase tracking-widest">Quantum parity secured for Node-A7.</p>
                         </div>
                         <div className="flex items-start gap-3 group">
                            <span className="text-[#D4AF37] font-bold">14:45</span>
                            <p className="group-hover:text-slate-300 transition-colors uppercase tracking-widest">AI Hub evolved to v4.2.1-Alpha.</p>
                         </div>
                         <div className="flex items-start gap-3 group">
                            <span className="text-blue-500 font-bold">15:01</span>
                            <p className="group-hover:text-white transition-colors uppercase tracking-widest">Waiting for Oripov signature...</p>
                         </div>
                       </div>
                    </section>

                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="other"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="min-h-[600px] flex items-center justify-center border border-slate-900 rounded-[3rem] bg-slate-900/10 p-20 text-center"
              >
                 <div className="max-w-md">
                    <div className="w-20 h-20 bg-[#D4AF37]/10 rounded-3xl flex items-center justify-center mx-auto mb-10 border border-[#D4AF37]/20">
                       <Lock className="w-10 h-10 text-[#D4AF37]" />
                    </div>
                    <h3 className="font-display text-4xl font-black text-white uppercase italic tracking-tighter mb-4">Secure Access Required</h3>
                    <p className="text-slate-500 text-sm font-medium leading-relaxed mb-10">
                       The <span className="text-gold uppercase font-black">{activeTab}</span> module is currently restricted to Muhammadali Oripov. Please authenticate to continue structural expansion.
                    </p>
                    <button 
                      onClick={() => setShowAuthModal(true)}
                      className="px-8 py-4 bg-[#D4AF37] text-black rounded-full font-black text-xs uppercase tracking-widest shadow-lg shadow-gold/20 hover:scale-105 transition-all"
                    >
                      Authenticate Now
                    </button>
                 </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Detailed Footer Branding */}
          <footer className="mt-40 pt-20 border-t border-slate-900 text-center pb-0 overflow-hidden">
             <div className="mb-20 px-6">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowAuthModal(true)}
                  className="bg-[#D4AF37] text-black px-12 py-6 rounded-full font-black text-lg uppercase tracking-[0.3em] shadow-[0_20px_50px_rgba(212,175,55,0.4)] hover:shadow-[0_30px_70px_rgba(212,175,55,0.6)] transition-all flex items-center gap-4 mx-auto"
                >
                  BOSHLASH
                  <ChevronRight className="w-6 h-6" />
                </motion.button>
             </div>

             <div className="relative mb-20">
                <div className="inline-block p-4 border border-[#D4AF37]/20 rounded-full mb-8 relative z-10 bg-[#020202]">
                   <Crown className="w-8 h-8 text-[#D4AF37]" />
                </div>
                <h2 className="font-display text-4xl md:text-5xl font-black text-white italic uppercase tracking-tighter mb-4 relative z-10">
                   ORIPOV <span className="text-gold">MUHAMMADALI</span>
                </h2>
                <p className="text-[11px] font-black text-slate-600 uppercase tracking-[0.5em] mb-12 relative z-10">
                   United States Operational Center • Global Leadership Network
                </p>

                <div className="flex flex-wrap justify-center gap-x-12 gap-y-4 text-[9px] font-black text-slate-500 uppercase tracking-widest relative z-10 mb-20">
                   <button onClick={() => setActiveTab('settings')} className="hover:text-white transition-colors underline-offset-8 hover:underline">Nexus Privacy</button>
                   <button onClick={() => setActiveTab('settings')} className="hover:text-white transition-colors underline-offset-8 hover:underline">Strategic Terms</button>
                   <button onClick={() => setActiveTab('network')} className="hover:text-white transition-colors underline-offset-8 hover:underline">Ecosystem Status</button>
                   <button onClick={() => setActiveTab('dashboard')} className="hover:text-white transition-colors underline-offset-8 hover:underline">Direct Command</button>
                </div>

                {/* US Skyline Image Background */}
                <div className="relative h-[28rem] md:h-[40rem] w-full mt-20 opacity-60 grayscale group hover:grayscale-0 transition-all duration-1000">
                   <img 
                      src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=2000" 
                      alt="American Skyline" 
                      className="w-full h-full object-cover object-bottom shadow-[0_0_100px_rgba(212,175,55,0.1)]"
                      referrerPolicy="no-referrer"
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-transparent to-[#020202]/50" />
                </div>
             </div>
          </footer>
        </div>
      </main>

      {/* Auth Modal */}
      <AnimatePresence>
        {showAuthModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAuthModal(false)}
              className="absolute inset-0 bg-black/90 backdrop-blur-xl"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-[#0a0a0a] border border-slate-800 p-12 rounded-[3.5rem] shadow-[0_50px_100px_rgba(0,0,0,0.8)] overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
              
              <div className="text-center mb-10">
                <div className="w-16 h-16 bg-[#D4AF37]/10 border border-[#D4AF37]/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Shield className="w-8 h-8 text-[#D4AF37]" />
                </div>
                <h3 className="font-display text-3xl font-black text-white uppercase italic tracking-tighter mb-2">Executive Access</h3>
                <p className="text-slate-500 text-xs font-bold uppercase tracking-[0.2em]">Oripov Hub x Identity Protocol</p>
              </div>

              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">Full Identity</label>
                  <input 
                    type="text" 
                    placeholder="Muhammadali Oripov"
                    className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl px-6 py-4 text-white focus:border-[#D4AF37] focus:outline-none transition-all placeholder:text-slate-700 font-bold"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">Secure Passcode</label>
                  <input 
                    type="password" 
                    placeholder="••••••••"
                    className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl px-6 py-4 text-white focus:border-[#D4AF37] focus:outline-none transition-all placeholder:text-slate-700 font-bold"
                  />
                </div>
                <button 
                  className="w-full bg-[#D4AF37] text-black py-5 rounded-2xl font-black uppercase tracking-[0.3em] hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-[#D4AF37]/20"
                >
                  Access Tizimiga Kirish
                </button>
              </form>

              <div className="mt-8 text-center">
                <button className="text-[10px] font-black text-slate-600 uppercase tracking-widest hover:text-[#D4AF37] transition-colors">
                  Identity unutilgan? Recover ↗
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
