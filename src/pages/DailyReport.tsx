import { useState, useEffect, useCallback } from 'react';
import Markdown from 'react-markdown';
import { motion } from 'motion/react';
import { Calendar, Loader2, Sparkles, AlertCircle, Clock, Moon, Sun, RefreshCw } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function DailyReport() {
  const { t, language } = useLanguage();
  const [report, setReport] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sources, setSources] = useState<any[]>([]);
  const [japanTime, setJapanTime] = useState<Date>(new Date());
  const [refreshKey, setRefreshKey] = useState(0);

  // Update Japan time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setJapanTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const handleRefresh = useCallback(() => {
    const cacheKey = `punch_report_${language}`;
    const cacheDateKey = `punch_report_date_${language}`;
    localStorage.removeItem(cacheKey);
    localStorage.removeItem(cacheDateKey);
    localStorage.removeItem(`${cacheKey}_sources`);
    setRefreshKey(prev => prev + 1);
  }, [language]);

  // Calculate Japan Time
  const jstString = japanTime.toLocaleString("en-US", {timeZone: "Asia/Tokyo"});
  const jstDate = new Date(jstString);
  const jstHour = jstDate.getHours();
  const jstDateString = jstDate.toISOString().split('T')[0]; // YYYY-MM-DD in JST

  const langMap: Record<string, { locale: string, name: string }> = {
    tr: { locale: 'tr-TR', name: 'Turkish' },
    en: { locale: 'en-US', name: 'English' },
    de: { locale: 'de-DE', name: 'German' },
    fr: { locale: 'fr-FR', name: 'French' },
    ru: { locale: 'ru-RU', name: 'Russian' },
    ja: { locale: 'ja-JP', name: 'Japanese' },
    zh: { locale: 'zh-CN', name: 'Chinese' },
  };
  const currentLang = langMap[language] || langMap.en;

  let activityStatus = '';
  let ActivityIcon = Sun;
  if (jstHour >= 19 || jstHour < 6) {
    activityStatus = t('status.sleeping');
    ActivityIcon = Moon;
  } else if (jstHour >= 6 && jstHour < 9) {
    activityStatus = t('status.waking');
  } else if (jstHour >= 9 && jstHour < 12) {
    activityStatus = t('status.playing');
  } else if (jstHour >= 12 && jstHour < 14) {
    activityStatus = t('status.resting');
  } else {
    activityStatus = t('status.active');
  }

  useEffect(() => {
    async function fetchDailyReport() {
      try {
        setLoading(true);
        setError(null);
        
        const cacheKey = `punch_report_${language}`;
        const cacheDateKey = `punch_report_date_${language}`;
        
        const cachedReport = localStorage.getItem(cacheKey);
        const cachedDate = localStorage.getItem(cacheDateKey);
        const cachedSources = localStorage.getItem(`${cacheKey}_sources`);

        if (cachedReport && cachedDate === jstDateString) {
          setReport(cachedReport);
          if (cachedSources) {
            try {
              setSources(JSON.parse(cachedSources));
            } catch(e) {}
          }
          setLoading(false);
          return;
        }

        const today = jstDate.toLocaleDateString(currentLang.locale, {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          weekday: 'long',
        });

        const prompt = `Today is ${today}. Research the latest news and updates about Punch, the baby macaque (snow monkey) living in Ichikawa City Zoo, Japan.
        Focus on what he did today or recently, his relationship with other monkeys, and his plush toy.
        Write a daily report in ${currentLang.name}, using a friendly, engaging, and informative tone.
        If you can't find anything specific for today, talk about his general current status and development.
        Please write in markdown format.`;

        // Call backend API instead of directly using Gemini
        const response = await fetch('/api/generate-report', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            prompt,
            tools: [{ googleSearch: {} }],
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to generate report');
        }

        const data = await response.json();
        const reportText = data.text || t('report.error');
        setReport(reportText);
        setSources(data.sources || []);

        // Save to cache
        localStorage.setItem(cacheKey, reportText);
        localStorage.setItem(cacheDateKey, jstDateString);
        localStorage.setItem(`${cacheKey}_sources`, JSON.stringify(data.sources || []));

      } catch (err: any) {
        console.error('Error fetching report:', err);
        setError(err.message || t('report.fetch_error'));
      } finally {
        setLoading(false);
      }
    }

    fetchDailyReport();
  }, [language, jstDateString, refreshKey]); // Re-fetch if language changes, day changes, or refresh is triggered

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, type: 'spring', bounce: 0.4 }}
        className="text-center space-y-4"
      >
        <div className="inline-flex items-center justify-center p-4 bg-emerald-100/50 backdrop-blur-sm rounded-3xl mb-4 shadow-inner border border-emerald-200/50">
          <Calendar className="w-10 h-10 text-emerald-600 animate-sway" />
        </div>
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-stone-900 drop-shadow-sm font-serif">
          {t('report.title')}
        </h1>
        <p className="text-lg text-stone-600 max-w-xl mx-auto font-medium">
          {t('report.subtitle')}
        </p>
      </motion.div>

      {/* Current Status Card */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="bg-gradient-to-br from-emerald-600 via-teal-600 to-emerald-800 rounded-[2.5rem] p-8 text-white shadow-[0_20px_50px_-12px_rgba(16,185,129,0.4)] relative overflow-hidden group border border-emerald-500/30"
      >
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-emerald-400/20 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-1000"></div>
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/20 to-transparent"></div>
        
        <div className="absolute -top-10 -right-10 p-4 opacity-10 group-hover:opacity-20 transition-opacity duration-500 group-hover:scale-110 transform rotate-12">
          <ActivityIcon className="w-64 h-64 animate-float" />
        </div>
        
        <div className="relative z-10">
          <h2 className="text-2xl font-bold mb-8 flex items-center gap-3 text-emerald-50 font-serif tracking-wide">
            <Sparkles className="w-6 h-6 text-amber-300 animate-pulse" />
            {t('status.title')}
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/10 hover:bg-white/15 transition-all duration-300 shadow-lg group/card">
              <div className="text-emerald-100/80 text-xs uppercase tracking-wider mb-3 flex items-center gap-2 font-bold">
                <Clock className="w-4 h-4" /> {t('status.japan_time')}
              </div>
              <div className="text-5xl font-bold tracking-tighter font-sans group-hover/card:scale-105 transition-transform origin-left">
                {jstDate.toLocaleTimeString(currentLang.locale, { hour: '2-digit', minute: '2-digit' })}
              </div>
              <div className="text-emerald-200/60 text-sm mt-1 font-medium">
                {jstDate.toLocaleDateString(currentLang.locale, { weekday: 'long', month: 'short', day: 'numeric' })}
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/10 hover:bg-white/15 transition-all duration-300 shadow-lg">
              <div className="text-emerald-100/80 text-xs uppercase tracking-wider mb-3 font-bold">{t('status.current_activity')}</div>
              <div className="text-xl font-medium leading-snug font-serif text-emerald-50">
                {activityStatus}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-white/60 overflow-hidden"
      >
        <div className="bg-stone-50/50 border-b border-stone-100 px-8 py-6 flex items-center justify-between backdrop-blur-sm">
          <div className="flex items-center gap-2 text-stone-800 font-bold font-serif text-lg">
            <Sparkles className="w-5 h-5 text-amber-500" />
            {t('report.ai_powered')}
          </div>
          <div className="flex items-center gap-3">
            <div className="text-xs font-bold text-stone-500 bg-stone-200/50 px-4 py-1.5 rounded-full uppercase tracking-wide">
              {jstDate.toLocaleDateString(currentLang.locale)}
            </div>
            <button
              onClick={handleRefresh}
              disabled={loading}
              className="p-2 text-stone-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              title="Refresh Report"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        <div className="p-8 md:p-12 min-h-[300px]">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-full space-y-8 text-stone-400 py-12">
              <div className="relative">
                <div className="absolute inset-0 bg-emerald-200 rounded-full blur-2xl animate-pulse opacity-40"></div>
                <Loader2 className="w-16 h-16 animate-spin text-emerald-500 relative z-10" />
              </div>
              <p className="animate-pulse font-medium text-lg font-serif text-stone-500">{t('report.loading')}</p>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center h-full space-y-6 text-rose-500 py-12">
              <div className="p-4 bg-rose-50 rounded-full">
                <AlertCircle className="w-12 h-12" />
              </div>
              <p className="font-medium text-center text-lg max-w-md text-rose-700">{error}</p>
            </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="prose prose-lg prose-stone prose-emerald max-w-none 
                prose-headings:font-serif prose-headings:font-bold prose-headings:text-stone-800 
                prose-h1:text-3xl prose-h2:text-2xl 
                prose-p:text-stone-600 prose-p:leading-relaxed 
                prose-a:text-emerald-600 prose-a:no-underline hover:prose-a:text-emerald-500 hover:prose-a:underline 
                prose-strong:text-stone-800 prose-strong:font-bold
                prose-img:rounded-3xl prose-img:shadow-xl prose-img:border prose-img:border-stone-100
                prose-li:marker:text-emerald-400"
            >
              <Markdown>{report}</Markdown>
            </motion.div>
          )}
        </div>
        
        {!loading && !error && sources.length > 0 && (
          <div className="bg-stone-50/50 border-t border-stone-100 px-8 py-8">
            <h3 className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-6 flex items-center gap-2">
              {t('report.sources')}
            </h3>
            <ul className="space-y-3">
              {sources.map((chunk, index) => {
                if (chunk.web?.uri) {
                  return (
                    <motion.li 
                      key={index} 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 + 0.3 }}
                      className="text-sm"
                    >
                      <a 
                        href={chunk.web.uri} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-stone-600 hover:text-emerald-600 transition-colors flex items-center gap-3 group p-2 hover:bg-white rounded-xl border border-transparent hover:border-stone-100"
                      >
                        <span className="w-2 h-2 rounded-full bg-stone-300 group-hover:bg-emerald-400 transition-colors"></span>
                        <span className="truncate font-medium flex-1">{chunk.web.title || chunk.web.uri}</span>
                      </a>
                    </motion.li>
                  );
                }
                return null;
              })}
            </ul>
          </div>
        )}
      </motion.div>
    </div>
  );
}
