import { motion } from 'motion/react';
import { Video, AlertCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function LiveStream() {
  const { t } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto space-y-8"
    >
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center p-3 bg-red-100 rounded-full mb-4">
          <Video className="w-8 h-8 text-red-600" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-stone-900">
          {t('live.title')}
        </h1>
        <p className="text-lg text-stone-600 max-w-2xl mx-auto">
          {t('live.subtitle')}
        </p>
      </div>

      <div className="bg-stone-900 rounded-[2.5rem] overflow-hidden shadow-2xl border border-stone-800 relative group">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-stone-800/50 via-stone-900 to-stone-950 opacity-50"></div>
        
        <div className="aspect-video w-full bg-black flex flex-col items-center justify-center p-8 text-center relative z-10">
          
          <div className="absolute top-6 left-6 flex items-center gap-3 bg-rose-500/10 text-rose-500 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest border border-rose-500/20 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse shadow-[0_0_10px_rgba(244,63,94,0.5)]"></span>
            OFFLINE
          </div>

          <div className="w-24 h-24 bg-stone-800/50 rounded-full flex items-center justify-center mb-6 animate-pulse">
            <AlertCircle className="w-12 h-12 text-stone-600" />
          </div>
          
          <h3 className="text-2xl font-bold text-stone-200 mb-3 font-serif">{t('live.error.title')}</h3>
          <p className="text-stone-500 max-w-lg text-lg leading-relaxed">
            {t('live.error.desc')}
          </p>
          
          <div className="mt-10 p-6 bg-stone-800/30 rounded-2xl border border-stone-800 max-w-xl backdrop-blur-sm">
            <p className="text-stone-400 font-medium flex items-center gap-3 text-left">
              <span className="p-2 bg-emerald-900/30 rounded-lg text-emerald-500">
                <Video className="w-5 h-5" />
              </span>
              {t('live.error.alternative')}
            </p>
          </div>
        </div>
        
        {/* Screen Glare Effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none"></div>
      </div>
    </motion.div>
  );
}
