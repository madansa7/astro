
import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, ShieldCheck, ChevronDown, Stars, Moon, Compass } from 'lucide-react';

const CTA_URL = "https://8a781evdyr71g54eji3dorp987.hop.clickbank.net/?&traffic_source=fb";

const FadeInWhenVisible: React.FC<{ children: React.ReactNode; delay?: number }> = ({ children, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      {children}
    </motion.div>
  );
};

const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCTAClick = () => {
    window.open(CTA_URL, '_blank', 'noopener,noreferrer');
  };

  return (
    <div ref={containerRef} className="relative min-h-screen cosmic-gradient selection:bg-amber-900/30 overflow-x-hidden">
      
      {/* Dynamic Background */}
      <motion.div style={{ opacity: backgroundOpacity }} className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-blue-950/20 rounded-full blur-[150px] animate-pulse"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-amber-950/10 rounded-full blur-[150px]"></div>
        
        {/* Floating Stars */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white rounded-full opacity-20"
            style={{
              width: Math.random() * 3,
              height: Math.random() * 3,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.1, 0.5, 0.1],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 2 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </motion.div>

      {/* Navigation Header */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 border-b ${scrolled ? 'bg-zinc-950/80 backdrop-blur-md border-zinc-800/50 py-4' : 'bg-transparent border-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            <Stars size={18} className="text-amber-500/70" />
            <span className="font-cinzel text-xs tracking-[0.3em] text-zinc-300 font-medium">ZODIAC SIGN</span>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="font-cinzel text-[10px] tracking-[0.2em] text-zinc-500 hidden sm:block"
          >
            DIVINE STARS ASTROLOGY
          </motion.div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative z-10 max-w-5xl w-full mx-auto px-6 pt-40 pb-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-10 rounded-full border border-amber-500/10 bg-amber-500/5 text-amber-200/60 text-[10px] tracking-[0.4em] font-cinzel uppercase">
            <Moon size={12} className="text-amber-500/30" />
            Observing Cosmic Convergence
          </div>
          
          <h1 className="text-5xl md:text-8xl font-serif font-light text-white leading-[1.1] mb-8 tracking-tight">
            The Silent Geometry <br /> 
            <span className="italic text-zinc-400">of Your Timeline</span>
          </h1>
          
          <p className="text-lg md:text-2xl text-zinc-400 font-light max-w-3xl mx-auto mb-16 leading-relaxed">
            Most individuals sense a recurring rhythm in their existence, yet very few manage to isolate the patterns that quietly dictate their path.
          </p>

          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleCTAClick}
            className="group relative inline-flex items-center gap-4 px-10 py-5 bg-white text-zinc-950 font-medium rounded-sm transition-shadow hover:shadow-[0_0_30px_rgba(212,175,55,0.3)]"
          >
            <span className="relative z-10 flex items-center gap-3">
              Reveal the Insight
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </span>
          </motion.button>
        </motion.div>

        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="mt-24 opacity-20 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] font-cinzel tracking-widest uppercase">Begin Reflection</span>
          <ChevronDown size={20} />
        </motion.div>
      </header>

      {/* Visual Break */}
      <div className="relative w-full h-[60vh] overflow-hidden my-12 group">
        <motion.div 
          style={{ 
            backgroundImage: `url('https://images.unsplash.com/photo-1502134249126-9f3755a50d78?auto=format&fit=crop&q=80&w=2000')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            y: useTransform(scrollYProgress, [0, 1], [-100, 100])
          }}
          className="absolute inset-0 opacity-40 grayscale group-hover:grayscale-0 transition-all duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-zinc-950"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="p-8 border border-white/5 backdrop-blur-sm bg-zinc-950/20 rounded-full">
            <Compass size={48} className="text-amber-500/40 animate-[spin_20s_linear_infinite]" />
          </div>
        </div>
      </div>

      {/* Pattern Interrupt Section */}
      <section className="relative z-10 max-w-4xl w-full mx-auto px-6 py-32 text-center">
        <FadeInWhenVisible>
          <h2 className="text-3xl md:text-5xl font-serif text-white mb-16 italic font-light tracking-wide">
            “Have you ever noticed the silence before a major shift?”
          </h2>
          <div className="space-y-12 text-xl md:text-2xl text-zinc-400 font-light leading-relaxed italic max-w-2xl mx-auto">
            <p className="border-l border-amber-500/20 pl-8 text-left">
              Some people spend their entire lives sensing they are slightly out of sync with their own story… but can’t explain why the timing feels resisted.
            </p>
          </div>
        </FadeInWhenVisible>
      </section>

      {/* Relatability Grid */}
      <section className="relative z-10 max-w-6xl w-full mx-auto px-6 py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
          <FadeInWhenVisible>
            <div className="space-y-10">
              <h3 className="text-3xl md:text-4xl font-serif text-white leading-tight">The Recognition of <br/><span className="italic text-zinc-500">Unseen Cycles</span></h3>
              <p className="text-zinc-400 text-lg font-light leading-relaxed">
                It is a subtle, persistent weight—that sensation of rowing against an invisible current. You may recognize these internal echoes:
              </p>
              <ul className="space-y-8">
                {[
                  "A profound feeling of being 'stuck' despite continuous internal growth.",
                  "Possessing deep intuition that often gets clouded by external noise.",
                  "The recurring sense that your major windows of opportunity open and close just before you arrive."
                ].map((item, i) => (
                  <motion.li 
                    key={i}
                    whileHover={{ x: 10 }}
                    className="flex items-start gap-4 text-zinc-300 font-light text-lg"
                  >
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 shadow-[0_0_10px_rgba(212,175,55,1)]"></span>
                    {item}
                  </motion.li>
                ))}
              </ul>
            </div>
          </FadeInWhenVisible>
          
          <FadeInWhenVisible delay={0.2}>
            <div className="relative aspect-[4/5] group overflow-hidden rounded-sm border border-zinc-800">
              <motion.img 
                whileHover={{ scale: 1.05 }}
                src="https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?auto=format&fit=crop&q=80&w=800" 
                alt="Divine insight" 
                className="w-full h-full object-cover grayscale opacity-40 group-hover:opacity-60 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6 font-cinzel text-[10px] tracking-[0.5em] text-amber-500/50">STELAR OBSERVATION V.8</div>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* Deepening Section */}
      <section className="relative z-10 max-w-4xl w-full mx-auto px-6 py-32">
        <FadeInWhenVisible>
          <div className="bg-zinc-900/40 backdrop-blur-sm p-12 md:p-20 rounded-sm border border-white/5 relative overflow-hidden text-center">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <Sparkles size={120} />
            </div>
            <h3 className="text-2xl md:text-3xl font-serif text-white mb-8">A Knowledge Rarely Passed Down</h3>
            <p className="text-zinc-400 text-lg font-light leading-relaxed mb-10 max-w-2xl mx-auto">
              There exists a simple but profoundly uncommon explanation for why these cycles persist. It is not something taught in conventional settings, yet once the pattern is observed, the architecture of your path becomes clear.
            </p>
            <p className="text-amber-200/50 font-serif italic text-xl">
              “It is not a secret to be kept, but a clarity to be found.”
            </p>
          </div>
        </FadeInWhenVisible>
      </section>

      {/* Final Invitation */}
      <section className="relative z-10 max-w-4xl w-full mx-auto px-6 py-40 text-center">
        <FadeInWhenVisible>
          <h2 className="text-4xl md:text-6xl font-serif text-white mb-10">Witness the Symmetry</h2>
          <p className="text-zinc-400 text-xl font-light max-w-2xl mx-auto leading-relaxed mb-16">
            Words often fail to convey the weight of this observation. A silent, visual breakdown has been prepared to illustrate the connection more clearly.
          </p>

          <div className="flex flex-col items-center gap-6 mb-16">
            <div className="flex flex-wrap justify-center gap-8 text-zinc-500 text-[10px] font-cinzel tracking-[0.2em] uppercase">
              <span className="flex items-center gap-2"><ShieldCheck size={14} className="text-amber-600/50" /> No Personal Data Required</span>
              <span className="flex items-center gap-2"><ShieldCheck size={14} className="text-amber-600/50" /> Pure Informational Clarity</span>
            </div>
            
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleCTAClick}
              className="group relative inline-flex items-center gap-4 px-12 py-6 bg-transparent border border-zinc-700 text-white font-medium rounded-sm transition-all hover:bg-white hover:text-zinc-950"
            >
              Reveal the Insight
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </div>
        </FadeInWhenVisible>
      </section>

      {/* Footer */}
      <footer className="relative z-10 w-full py-20 px-6 border-t border-zinc-900 bg-zinc-950/50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-12 mb-20">
            <div className="text-center md:text-left">
              <div className="font-cinzel text-sm tracking-[0.4em] text-white mb-2">ZODIAC SIGN</div>
              <div className="text-[10px] tracking-[0.2em] text-zinc-600 uppercase">Divine Stars Astrology &copy; {new Date().getFullYear()}</div>
            </div>
            <nav className="flex gap-10 text-[10px] text-zinc-500 uppercase tracking-[0.3em] font-light">
              <a href="#" className="hover:text-amber-500 transition-colors">Privacy</a>
              <a href="#" className="hover:text-amber-500 transition-colors">Disclaimer</a>
              <a href="#" className="hover:text-amber-500 transition-colors">Terms</a>
            </nav>
          </div>
          
          <div className="max-w-3xl mx-auto text-[10px] text-zinc-700 text-center leading-relaxed font-light uppercase tracking-tighter">
            The insights shared here are intended for informational, educational, and entertainment purposes only. The interpretation of cosmic timing and personal patterns is subjective and should be treated as a tool for reflection rather than a definitive guarantee of outcome. Divine Stars Astrology does not provide financial or medical advice.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
