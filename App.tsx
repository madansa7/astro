
import React, { useEffect, useState, useRef, useMemo } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, ShieldCheck, ChevronDown, Stars, Moon, Compass, Eye, Map, Globe } from 'lucide-react';

const CTA_URL = "https://8a781evdyr71g54eji3dorp987.hop.clickbank.net/?&traffic_source=fb";

const Section: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => (
  <motion.section
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
    className={`relative z-10 w-full max-w-6xl mx-auto px-6 ${className}`}
  >
    {children}
  </motion.section>
);

const FloatingElement: React.FC<{ children: React.ReactNode; delay?: number }> = ({ children, delay = 0 }) => (
  <motion.div
    animate={{ y: [0, -15, 0] }}
    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay }}
  >
    {children}
  </motion.div>
);

const App: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const smoothYProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCTAClick = () => {
    window.open(CTA_URL, '_blank', 'noopener,noreferrer');
  };

  // Parallax transforms for various elements
  const bgTranslate = useTransform(smoothYProgress, [0, 1], [0, -200]);
  const heroOpacity = useTransform(smoothYProgress, [0, 0.2], [1, 0]);
  const starOpacity = useTransform(smoothYProgress, [0, 0.5], [0.3, 0.8]);

  return (
    <div ref={containerRef} className="relative bg-[#020205] text-white min-h-screen overflow-hidden selection:bg-amber-900/40">
      
      {/* BACKGROUND ELEMENTS */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <motion.div style={{ y: bgTranslate }} className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
        <div className="ambient-orb w-[80vw] h-[80vw] -top-1/4 -left-1/4 bg-blue-900/20" />
        <div className="ambient-orb w-[60vw] h-[60vw] bottom-0 -right-1/4 bg-amber-900/10" />
        
        {/* Particle Stars */}
        {useMemo(() => [...Array(40)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white rounded-full"
            style={{
              width: Math.random() * 2 + 1,
              height: Math.random() * 2 + 1,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.5 + 0.2,
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        )), [])}
      </div>

      {/* STICKY NAV */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-700 ${isScrolled ? 'bg-black/60 backdrop-blur-xl border-b border-white/5 py-4' : 'bg-transparent py-8'}`}>
        <div className="max-w-7xl mx-auto px-8 flex justify-between items-center">
          <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-3 cursor-pointer">
            <div className="w-8 h-8 rounded-full border border-amber-500/30 flex items-center justify-center">
              <Stars size={16} className="text-amber-500" />
            </div>
            <div className="flex flex-col">
              <span className="font-cinzel text-[10px] tracking-[0.4em] text-white leading-none">ZODIAC SIGN</span>
              <span className="font-cinzel text-[8px] tracking-[0.2em] text-amber-500/70">DIVINE STARS ASTROLOGY</span>
            </div>
          </motion.div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleCTAClick}
            className="hidden md:block font-cinzel text-[10px] tracking-widest px-6 py-2 border border-white/10 hover:border-amber-500/50 transition-colors"
          >
            THE OBSERVATION
          </motion.button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <header className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-6 pt-20">
        <motion.div style={{ opacity: heroOpacity }} className="max-w-4xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-3 px-5 py-2 mb-10 rounded-full border border-amber-500/20 bg-amber-500/5 text-amber-200/80 text-[10px] tracking-[0.5em] font-cinzel uppercase"
          >
            <Eye size={14} className="animate-pulse" />
            Patterns of the Unseen
          </motion.div>

          <h1 className="text-5xl md:text-8xl font-serif font-light leading-[1] mb-10 tracking-tight">
            The Celestial <br /> 
            <span className="italic text-zinc-500">Alignment of Fate</span>
          </h1>

          <p className="text-lg md:text-2xl text-zinc-400 font-light max-w-2xl mx-auto mb-16 leading-relaxed">
            There is a quiet, recurring symmetry in your timeline. Most sense it, but few ever stop to identify the source of these invisible rhythms.
          </p>

          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(197, 160, 89, 0.4)" }}
            whileTap={{ scale: 0.98 }}
            onClick={handleCTAClick}
            className="group relative inline-flex items-center gap-5 px-12 py-6 bg-[#c5a059] text-black font-semibold rounded-sm transition-all overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-3 font-cinzel tracking-widest text-sm">
              REVEAL THE INSIGHT
              <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
          </motion.button>
        </motion.div>

        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute bottom-12 opacity-30 flex flex-col items-center gap-2"
        >
          <span className="text-[9px] font-cinzel tracking-[0.4em] uppercase">Scroll to Reflect</span>
          <ChevronDown size={20} />
        </motion.div>
      </header>

      {/* PATTERN INTERRUPT */}
      <Section className="py-32 text-center">
        <div className="relative">
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 opacity-5">
            <Globe size={200} className="animate-[spin_60s_linear_infinite]" />
          </div>
          <h2 className="text-3xl md:text-5xl font-serif text-white mb-12 italic font-light tracking-wide relative z-10">
            “Have you ever noticed the deep silence <br className="hidden md:block"/> that precedes a major shift in your path?”
          </h2>
          <div className="w-16 h-px bg-amber-500/50 mx-auto mb-12" />
          <p className="text-xl md:text-2xl text-zinc-400 font-light leading-relaxed max-w-3xl mx-auto italic">
            Many spend their lives sensing a slight misalignment with the natural flow of events... a quiet resistance that suggests the timing is 'just slightly off.'
          </p>
        </div>
      </Section>

      {/* HIGH-CTR IMAGE & CONTENT GRID */}
      <Section className="py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="order-2 lg:order-1 space-y-12">
            <h3 className="text-4xl md:text-5xl font-serif text-white leading-tight">
              Recognizing the <br/><span className="italic text-zinc-500">Invisible Architecture</span>
            </h3>
            <p className="text-zinc-400 text-lg font-light leading-relaxed">
              It is a persistent, internal echo—the feeling that your path is being shaped by forces that operate just beneath your daily consciousness.
            </p>
            <ul className="space-y-10">
              {[
                { title: "Stalled Progress", desc: "A feeling of being 'stuck' despite consistent effort and growth." },
                { title: "Muffled Intuition", desc: "A deep sense of knowing that is constantly clouded by external noise." },
                { title: "Temporal Friction", desc: "Missing key windows of opportunity by just moments, repeatedly." }
              ].map((item, i) => (
                <motion.li 
                  key={i} 
                  whileHover={{ x: 15 }}
                  className="flex gap-6 group cursor-default"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-full border border-amber-500/20 flex items-center justify-center group-hover:border-amber-500 transition-colors">
                    <span className="text-amber-500 font-serif italic">{i + 1}</span>
                  </div>
                  <div>
                    <h4 className="text-white font-cinzel text-sm tracking-widest mb-2 uppercase">{item.title}</h4>
                    <p className="text-zinc-500 font-light text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>

          <div className="order-1 lg:order-2 relative group">
            <motion.div 
              style={{ rotateY: 10 }}
              whileHover={{ rotateY: 0, scale: 1.02 }}
              className="relative aspect-[4/5] overflow-hidden rounded-sm border border-white/5 transition-all duration-700"
            >
              <img 
                src="https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?auto=format&fit=crop&q=80&w=1000" 
                alt="Cosmic Pattern" 
                className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-8 left-8">
                <div className="flex items-center gap-3 text-amber-500/80 mb-2">
                  <Map size={16} />
                  <span className="font-cinzel text-[10px] tracking-[0.4em]">STELAR COORDINATE</span>
                </div>
                <div className="text-white font-serif italic text-lg">The Point of Origin</div>
              </div>
            </motion.div>
            <div className="absolute -inset-4 border border-amber-500/10 pointer-events-none translate-x-4 translate-y-4 -z-10 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform" />
          </div>
        </div>
      </Section>

      {/* CURIOUSITY DEEPENING */}
      <Section className="py-32">
        <div className="bg-gradient-to-br from-zinc-900/50 to-black p-12 md:p-24 border border-white/5 rounded-sm text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 p-12 opacity-5">
            <Compass size={240} className="animate-[spin_100s_linear_infinite]" />
          </div>
          <h3 className="text-3xl font-serif text-white mb-8 relative z-10 italic">A Knowledge Rarely Encountered</h3>
          <p className="text-zinc-400 text-xl font-light leading-relaxed mb-12 max-w-2xl mx-auto relative z-10">
            There exists a simple but profoundly uncommon explanation for why these cycles persist. It is not taught openly, yet once identified, the architecture of your past—and your future—becomes unmistakable.
          </p>
          <div className="inline-block p-1 bg-amber-500/10 rounded-full mb-10">
            <div className="px-6 py-2 rounded-full border border-amber-500/20 text-amber-500 text-[10px] tracking-[0.3em] font-cinzel">
              THE UNSPOKEN TRUTH
            </div>
          </div>
        </div>
      </Section>

      {/* FINAL INVITATION */}
      <Section className="py-40 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-7xl font-serif text-white mb-10 tracking-tight">Witness the <br className="hidden md:block"/> Celestial Symmetry</h2>
          <p className="text-zinc-400 text-xl font-light mb-16 leading-relaxed">
            Words can only describe the surface. A brief, silent visual breakdown has been prepared to illustrate the connection between your alignment and the path ahead.
          </p>

          <div className="flex flex-col items-center gap-10">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 50px rgba(197, 160, 89, 0.4)" }}
              whileTap={{ scale: 0.98 }}
              onClick={handleCTAClick}
              className="px-16 py-7 bg-white text-black font-bold rounded-sm group overflow-hidden relative"
            >
              <span className="relative z-10 font-cinzel tracking-[0.2em] text-sm flex items-center gap-3">
                REVEAL THE INSIGHT
                <ArrowRight size={22} className="group-hover:translate-x-2 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-[#c5a059] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            </motion.button>

            <div className="flex gap-12 text-[10px] font-cinzel tracking-[0.3em] text-zinc-500 uppercase">
              <span className="flex items-center gap-2"><ShieldCheck size={14} className="text-zinc-600" /> No Registration</span>
              <span className="flex items-center gap-2"><ShieldCheck size={14} className="text-zinc-600" /> Pure Clarity</span>
            </div>
          </div>
        </div>
      </Section>

      {/* FOOTER */}
      <footer className="relative z-10 pt-32 pb-16 px-8 border-t border-white/5 bg-black/40">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-12 mb-20">
            <div className="text-center md:text-left">
              <div className="font-cinzel text-lg tracking-[0.4em] text-white mb-2">ZODIAC SIGN</div>
              <div className="font-cinzel text-[10px] tracking-[0.2em] text-amber-500/60 uppercase">Divine Stars Astrology</div>
            </div>
            
            <nav className="flex flex-wrap justify-center gap-10 text-[10px] text-zinc-500 uppercase tracking-[0.3em] font-light">
              <a href="#" className="hover:text-amber-500 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-amber-500 transition-colors">Disclaimer</a>
              <a href="#" className="hover:text-amber-500 transition-colors">Terms of Use</a>
              <a href="#" className="hover:text-amber-500 transition-colors">Contact</a>
            </nav>
          </div>

          <div className="w-full h-px bg-white/5 mb-10" />

          <p className="text-[10px] text-zinc-600 text-center max-w-4xl mx-auto leading-relaxed uppercase tracking-widest font-light">
            Disclaimer: The content provided by Divine Stars Astrology is for educational and entertainment purposes only. The observation of celestial patterns is a tool for self-reflection and does not constitute professional advice or a guarantee of specific outcomes. Your path is yours to navigate.
          </p>
          <p className="mt-8 text-[9px] text-zinc-700 text-center tracking-[0.2em]">
            &copy; {new Date().getFullYear()} DIVINE STARS ASTROLOGY. ALL RIGHTS RESERVED.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
