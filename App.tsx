
import React, { useEffect, useState, useRef, useMemo } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, ShieldCheck, ChevronDown, Stars, Moon, Compass, Eye, Map, Globe, Wind } from 'lucide-react';

const CTA_URL = "https://8a781evdyr71g54eji3dorp987.hop.clickbank.net/?&traffic_source=fb";

const Section: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => (
  <motion.section
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
    className={`relative z-10 w-full max-w-6xl mx-auto px-6 ${className}`}
  >
    {children}
  </motion.section>
);

const App: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll();
  const smoothYProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 80);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const handleCTAClick = () => {
    window.open(CTA_URL, '_blank', 'noopener,noreferrer');
  };

  const bgTranslate = useTransform(smoothYProgress, [0, 1], [0, -150]);
  const heroOpacity = useTransform(smoothYProgress, [0, 0.3], [1, 0]);

  return (
    <div ref={containerRef} className="relative bg-[#020205] text-white min-h-screen overflow-hidden selection:bg-amber-900/40">
      
      {/* BACKGROUND ELEMENTS & INTERACTIVE STARDUST */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <motion.div style={{ y: bgTranslate }} className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
        
        {/* Dynamic Orbs */}
        <motion.div 
          animate={{ 
            x: (mousePos.x - window.innerWidth / 2) * 0.05,
            y: (mousePos.y - window.innerHeight / 2) * 0.05
          }}
          className="ambient-orb w-[80vw] h-[80vw] -top-1/4 -left-1/4 bg-blue-900/10" 
        />
        <motion.div 
          animate={{ 
            x: (mousePos.x - window.innerWidth / 2) * -0.03,
            y: (mousePos.y - window.innerHeight / 2) * -0.03
          }}
          className="ambient-orb w-[60vw] h-[60vw] bottom-0 -right-1/4 bg-amber-900/10" 
        />
        
        {/* Particle Stars */}
        {useMemo(() => [...Array(60)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white rounded-full"
            style={{
              width: Math.random() * 2 + 1,
              height: Math.random() * 2 + 1,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.4 + 0.1,
            }}
            animate={{
              scale: [1, 1.4, 1],
              opacity: [0.1, 0.6, 0.1],
            }}
            transition={{
              duration: 4 + Math.random() * 6,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        )), [])}
      </div>

      {/* STICKY NAV */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-700 ${isScrolled ? 'bg-black/80 backdrop-blur-xl border-b border-white/5 py-4' : 'bg-transparent py-10'}`}>
        <div className="max-w-7xl mx-auto px-8 flex justify-between items-center">
          <motion.div 
            whileHover={{ scale: 1.05 }} 
            className="flex items-center gap-4 cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className="w-10 h-10 rounded-full border border-amber-500/30 flex items-center justify-center relative group">
                <Stars size={18} className="text-amber-500 group-hover:rotate-180 transition-transform duration-1000" />
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-[-4px] border border-dashed border-amber-500/10 rounded-full"
                />
            </div>
            <div className="flex flex-col">
              <span className="font-cinzel text-xs tracking-[0.5em] text-white leading-none font-bold">ZODIAC SIGN</span>
              <span className="font-cinzel text-[9px] tracking-[0.25em] text-amber-500/80">DIVINE STARS ASTROLOGY</span>
            </div>
          </motion.div>
          <motion.button
            whileHover={{ scale: 1.05, borderColor: 'rgba(197, 160, 89, 0.5)' }}
            whileTap={{ scale: 0.95 }}
            onClick={handleCTAClick}
            className="hidden sm:block font-cinzel text-[10px] tracking-[0.3em] px-8 py-3 border border-white/10 text-zinc-400 hover:text-white transition-all"
          >
            THE OBSERVATION
          </motion.button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <header className="relative z-10 flex flex-col items-center justify-center min-h-[110vh] text-center px-6 pt-24 overflow-hidden">
        <motion.div style={{ opacity: heroOpacity }} className="max-w-5xl">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="inline-flex items-center gap-3 px-6 py-2.5 mb-12 rounded-full border border-amber-500/10 bg-amber-500/5 text-amber-200/90 text-[10px] tracking-[0.6em] font-cinzel uppercase shadow-[0_0_20px_rgba(197,160,89,0.05)]"
          >
            <Eye size={16} className="text-amber-500 animate-pulse" />
            Patterns of the Unseen
          </motion.div>

          <h1 className="text-6xl md:text-9xl font-serif font-light leading-[1.05] mb-12 tracking-tight">
            The Celestial <br /> 
            <span className="italic text-zinc-500 drop-shadow-sm">Alignment of Fate</span>
          </h1>

          <p className="text-xl md:text-2xl text-zinc-400 font-light max-w-2xl mx-auto mb-20 leading-relaxed">
            Every timeline possesses a hidden, recurring symmetry. Most sense it intuitively, yet few ever pause long enough to identify the architecture of their own rhythms.
          </p>

          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 0 50px rgba(197, 160, 89, 0.4)" }}
            whileTap={{ scale: 0.98 }}
            onClick={handleCTAClick}
            className="group relative inline-flex items-center gap-6 px-16 py-8 bg-[#c5a059] text-black font-bold rounded-sm transition-all overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-4 font-cinzel tracking-[0.2em] text-sm md:text-base">
              REVEAL THE INSIGHT
              <ArrowRight size={24} className="group-hover:translate-x-3 transition-transform duration-500" />
            </span>
            <motion.div 
              initial={{ x: '-100%' }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0 bg-white/30 skew-x-12"
            />
          </motion.button>
        </motion.div>

        <motion.div 
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-16 opacity-30 flex flex-col items-center gap-3"
        >
          <span className="text-[10px] font-cinzel tracking-[0.5em] uppercase text-amber-500">Scroll to Reflect</span>
          <ChevronDown size={24} className="text-zinc-500" />
        </motion.div>
      </header>

      {/* PATTERN INTERRUPT */}
      <Section className="py-40 text-center">
        <div className="relative max-w-4xl mx-auto">
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 opacity-[0.03]">
            <Globe size={300} className="animate-[spin_100s_linear_infinite]" />
          </div>
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-4xl md:text-6xl font-serif text-white mb-16 italic font-light tracking-wide relative z-10"
          >
            “Have you ever noticed the silence <br className="hidden md:block"/> that precedes a major shift in your path?”
          </motion.h2>
          <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto mb-16" />
          <p className="text-2xl md:text-3xl text-zinc-400 font-light leading-relaxed max-w-3xl mx-auto italic">
            Most spend their lives rowing against a current they cannot see... sensing a recurring resistance that suggests the timing is 'just slightly out of reach.'
          </p>
        </div>
      </Section>

      {/* HIGH-CTR IMAGE & CONTENT GRID */}
      <Section className="py-40">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="order-2 lg:order-1 space-y-16">
            <h3 className="text-5xl md:text-6xl font-serif text-white leading-tight tracking-tight">
              The Recognition of <br/><span className="italic text-zinc-500">Unseen Geometry</span>
            </h3>
            <p className="text-zinc-400 text-xl font-light leading-relaxed">
              It is a subtle, persistent weight—the sensation that your path is being shaped by forces operating just beneath the surface of your awareness.
            </p>
            <div className="space-y-12">
              {[
                { title: "Static Cycles", desc: "A feeling of being 'stuck' despite massive internal evolution." },
                { title: "Muffled Intuition", desc: "A clarity that exists just beyond the reach of daily noise." },
                { title: "Temporal Friction", desc: "The sensation that key windows of life are closing just as you arrive." }
              ].map((item, i) => (
                <motion.div 
                  key={i} 
                  whileHover={{ x: 20 }}
                  className="flex gap-8 group cursor-default"
                >
                  <div className="flex-shrink-0 w-14 h-14 rounded-full border border-amber-500/20 flex items-center justify-center group-hover:border-amber-500/60 group-hover:bg-amber-500/5 transition-all duration-500">
                    <span className="text-amber-500 font-serif italic text-lg">{i + 1}</span>
                  </div>
                  <div>
                    <h4 className="text-white font-cinzel text-sm tracking-[0.3em] mb-3 uppercase font-semibold">{item.title}</h4>
                    <p className="text-zinc-500 font-light text-base leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="order-1 lg:order-2 relative group">
            <motion.div 
              style={{ rotateY: 15 }}
              whileHover={{ rotateY: 0, scale: 1.03 }}
              className="relative aspect-[4/5] overflow-hidden rounded-sm border border-white/5 shadow-2xl transition-all duration-1000 ease-out"
            >
              <img 
                src="https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?auto=format&fit=crop&q=80&w=1200" 
                alt="Cosmic Pattern" 
                className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-90 transition-all duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />
              <div className="absolute bottom-10 left-10">
                <div className="flex items-center gap-4 text-amber-500 mb-4">
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }}>
                    <Map size={20} />
                  </motion.div>
                  <span className="font-cinzel text-[10px] tracking-[0.5em] font-bold">STELAR COORDINATE 0.1</span>
                </div>
                <div className="text-white font-serif italic text-2xl tracking-wide">The Point of Origin</div>
              </div>
            </motion.div>
            <div className="absolute -inset-6 border border-amber-500/5 pointer-events-none translate-x-6 translate-y-6 -z-10 group-hover:translate-x-3 group-hover:translate-y-3 transition-transform duration-700" />
          </div>
        </div>
      </Section>

      {/* CURIOUSITY DEEPENING */}
      <Section className="py-40">
        <div className="bg-gradient-to-br from-zinc-900/40 via-[#020205] to-zinc-900/40 p-16 md:p-32 border border-white/5 rounded-sm text-center relative overflow-hidden group">
          <motion.div 
            animate={{ rotate: -360 }}
            transition={{ duration: 200, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.02]"
          >
            <Compass size={600} />
          </motion.div>
          <h3 className="text-4xl md:text-5xl font-serif text-white mb-10 relative z-10 italic">A Perspective Rarely Observed</h3>
          <p className="text-zinc-400 text-xl md:text-2xl font-light leading-relaxed mb-16 max-w-3xl mx-auto relative z-10">
            There exists a simple but profoundly uncommon explanation for why these cycles persist. It is not taught openly, yet once identified, the architecture of your past becomes impossible to ignore.
          </p>
          <div className="inline-block p-[1px] bg-gradient-to-r from-transparent via-amber-500/50 to-transparent rounded-full mb-10 group-hover:via-amber-500 transition-all duration-1000">
            <div className="px-10 py-3 rounded-full bg-black/80 backdrop-blur-md text-amber-500 text-[11px] tracking-[0.4em] font-cinzel font-bold">
              THE UNSPOKEN TRUTH
            </div>
          </div>
        </div>
      </Section>

      {/* FINAL INVITATION */}
      <Section className="py-48 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-8xl font-serif text-white mb-12 tracking-tight">Witness the <br className="hidden md:block"/> Celestial Symmetry</h2>
          <p className="text-zinc-400 text-2xl font-light mb-20 leading-relaxed max-w-2xl mx-auto">
            Words only brush the surface. A brief, silent visual demonstration has been prepared to show the connection between your alignment and the path ahead.
          </p>

          <div className="flex flex-col items-center gap-12">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 60px rgba(197, 160, 89, 0.5)" }}
              whileTap={{ scale: 0.98 }}
              onClick={handleCTAClick}
              className="px-20 py-10 bg-white text-black font-bold rounded-sm group overflow-hidden relative shadow-2xl"
            >
              <span className="relative z-10 font-cinzel tracking-[0.3em] text-base md:text-lg flex items-center gap-5">
                REVEAL THE INSIGHT
                <ArrowRight size={28} className="group-hover:translate-x-4 transition-transform duration-500" />
              </span>
              <motion.div 
                className="absolute inset-0 bg-[#c5a059]"
                initial={{ y: '100%' }}
                whileHover={{ y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              />
            </motion.button>

            <div className="flex flex-wrap justify-center gap-16 text-[10px] font-cinzel tracking-[0.4em] text-zinc-500 uppercase font-bold">
              <span className="flex items-center gap-3"><ShieldCheck size={18} className="text-zinc-700" /> No Sign-up</span>
              <span className="flex items-center gap-3"><ShieldCheck size={18} className="text-zinc-700" /> Pure Clarity</span>
              <span className="flex items-center gap-3"><ShieldCheck size={18} className="text-zinc-700" /> Direct Access</span>
            </div>
          </div>
        </div>
      </Section>

      {/* FOOTER */}
      <footer className="relative z-10 pt-40 pb-20 px-10 border-t border-white/5 bg-black/60 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-16 mb-24">
            <div className="text-center md:text-left">
              <div className="font-cinzel text-xl tracking-[0.5em] text-white mb-3 font-bold">ZODIAC SIGN</div>
              <div className="font-cinzel text-[11px] tracking-[0.3em] text-amber-500/60 uppercase">Divine Stars Astrology</div>
            </div>
            
            <nav className="flex flex-wrap justify-center gap-12 text-[11px] text-zinc-500 uppercase tracking-[0.4em] font-bold">
              <a href="#" className="hover:text-amber-500 transition-colors">Privacy</a>
              <a href="#" className="hover:text-amber-500 transition-colors">Disclaimer</a>
              <a href="#" className="hover:text-amber-500 transition-colors">Terms</a>
              <a href="#" className="hover:text-amber-500 transition-colors">Contact</a>
            </nav>
          </div>

          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent mb-12" />

          <p className="text-[10px] text-zinc-600 text-center max-w-5xl mx-auto leading-relaxed uppercase tracking-[0.2em] font-light">
            Disclaimer: The materials provided by Divine Stars Astrology are for educational, informational, and entertainment purposes only. Cosmic interpretation is a personal tool for self-reflection and does not constitute professional advice. Results and insights vary by individual perspective. Your choices and your journey remain entirely your own.
          </p>
          <p className="mt-12 text-[10px] text-zinc-800 text-center tracking-[0.3em] font-cinzel">
            &copy; {new Date().getFullYear()} DIVINE STARS ASTROLOGY. PATTERNS OBSERVED.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
