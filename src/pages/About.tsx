import { motion } from 'motion/react';
import { Info, MapPin, Heart, AlertTriangle, Globe, Sparkles, Scale, Ruler, Snowflake, Droplets, Brain, Users } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function About() {
  const { t } = useLanguage();

  // Calculate dynamic age
  const birthDate = new Date('2025-07-25');
  const today = new Date();
  
  let months = (today.getFullYear() - birthDate.getFullYear()) * 12;
  months -= birthDate.getMonth();
  months += today.getMonth();
  if (today.getDate() < birthDate.getDate()) {
    months--;
  }

  // Estimated stats for a Japanese Macaque based on age
  // Average birth weight is ~0.5 kg. At 6-8 months, they are around 1.5 - 2.5 kg.
  const estimatedWeight = months <= 12 ? (0.5 + (months * 0.2)).toFixed(1) : "3.0+";
  // Average birth height is ~20 cm. At 6-8 months, they are around 30-35 cm.
  const estimatedHeight = months <= 12 ? Math.round(20 + (months * 2)) : "40+";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto space-y-12"
    >
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-stone-900">
          {t('about.title')}
        </h1>
        <p className="text-lg text-stone-600 max-w-2xl mx-auto">
          {t('about.subtitle')}
        </p>
      </div>

      {/* Hero Image */}
      <div className="rounded-[2.5rem] overflow-hidden shadow-2xl relative aspect-video bg-stone-200 group">
        <img
          src="https://picsum.photos/seed/punchmonkey/1200/600?blur=2"
          alt="Punch the monkey placeholder"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000"
          loading="eager"
          decoding="async"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-stone-900/20 to-transparent flex items-end p-8 md:p-12">
          <div className="text-white relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold mb-3 font-serif tracking-tight text-glow">Punch-kun</h2>
            <p className="text-stone-200 font-medium flex items-center gap-2 text-lg backdrop-blur-sm bg-white/10 inline-flex px-4 py-2 rounded-full border border-white/20">
              <MapPin className="w-5 h-5 text-emerald-400" /> Ichikawa City Zoo, Japan
            </p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8 md:gap-12">
        {/* Sidebar Info */}
        <div className="space-y-8">
          <div className="bg-white/80 backdrop-blur-xl p-8 rounded-[2rem] shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-white/60">
            <h3 className="font-bold text-xl mb-6 flex items-center gap-3 text-stone-800 font-serif">
              <div className="p-2 bg-emerald-100 rounded-xl text-emerald-600">
                <Info className="w-5 h-5" />
              </div>
              {t('about.id_card')}
            </h3>
            <ul className="space-y-4 text-sm">
              <li className="flex justify-between items-center border-b border-stone-100 pb-3">
                <span className="text-stone-500 font-medium">{t('about.name')}</span>
                <span className="font-bold text-stone-800">Punch</span>
              </li>
              <li className="flex justify-between items-center border-b border-stone-100 pb-3">
                <span className="text-stone-500 font-medium">{t('about.species')}</span>
                <span className="font-bold text-stone-800">{t('about.species_val')}</span>
              </li>
              <li className="flex justify-between items-center border-b border-stone-100 pb-3">
                <span className="text-stone-500 font-medium">{t('about.birth')}</span>
                <span className="font-bold text-stone-800">{t('about.birth_val')}</span>
              </li>
              <li className="flex justify-between items-center border-b border-stone-100 pb-3">
                <span className="text-stone-500 font-medium">{t('about.age')}</span>
                <span className="font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-lg">~{months} {t('about.months')}</span>
              </li>
              <li className="flex justify-between items-center border-b border-stone-100 pb-3">
                <span className="text-stone-500 font-medium flex items-center gap-1"><Scale className="w-4 h-4"/> {t('about.weight')}</span>
                <span className="font-bold text-stone-800">~{estimatedWeight} kg</span>
              </li>
              <li className="flex justify-between items-center border-b border-stone-100 pb-3">
                <span className="text-stone-500 font-medium flex items-center gap-1"><Ruler className="w-4 h-4"/> {t('about.height')}</span>
                <span className="font-bold text-stone-800">~{estimatedHeight} cm</span>
              </li>
              <li className="flex justify-between items-center border-b border-stone-100 pb-3">
                <span className="text-stone-500 font-medium">{t('about.gender')}</span>
                <span className="font-bold text-stone-800">{t('about.gender_val')}</span>
              </li>
              <li className="flex justify-between items-start pt-1">
                <span className="text-stone-500 font-medium">{t('about.location')}</span>
                <span className="font-bold text-stone-800 text-right leading-tight">Ichikawa, Chiba<br/><span className="text-stone-400 text-xs font-normal">Japan</span></span>
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-8 rounded-[2rem] border border-amber-100/50 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-200/20 rounded-full blur-2xl -mr-10 -mt-10"></div>
            <h3 className="font-bold text-amber-900 mb-4 flex items-center gap-2 relative z-10 font-serif text-lg">
              <Sparkles className="w-5 h-5 text-amber-500" />
              {t('about.viral_title')}
            </h3>
            <p className="text-sm text-amber-800/80 leading-relaxed relative z-10 font-medium">
              {t('about.viral_desc')}
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="md:col-span-2 space-y-12">
          <section className="space-y-6">
            <h2 className="text-3xl font-bold text-stone-900 flex items-center gap-3 font-serif">
              <div className="p-2 bg-rose-100 rounded-2xl text-rose-500">
                <Heart className="w-6 h-6" />
              </div>
              {t('about.early_title')}
            </h2>
            <div className="prose prose-lg prose-stone text-stone-600 leading-relaxed">
              <p>{t('about.early_p1')}</p>
              <p>{t('about.early_p2')}</p>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-3xl font-bold text-stone-900 flex items-center gap-3 font-serif">
              <div className="p-2 bg-amber-100 rounded-2xl text-amber-500">
                <AlertTriangle className="w-6 h-6" />
              </div>
              {t('about.social_title')}
            </h2>
            <div className="prose prose-lg prose-stone text-stone-600 leading-relaxed">
              <p>{t('about.social_p1')}</p>
              <p>{t('about.social_p2')}</p>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-3xl font-bold text-stone-900 flex items-center gap-3 font-serif">
              <div className="p-2 bg-blue-100 rounded-2xl text-blue-500">
                <Globe className="w-6 h-6" />
              </div>
              {t('about.plush_title')}
            </h2>
            <div className="prose prose-lg prose-stone text-stone-600 leading-relaxed">
              <p>{t('about.plush_p1')}</p>
              <p>{t('about.plush_p2')}</p>
            </div>
          </section>

          <div className="bg-emerald-50/80 backdrop-blur-sm p-8 rounded-[2rem] border border-emerald-100 mt-8 relative overflow-hidden">
             <div className="absolute bottom-0 right-0 w-64 h-64 bg-emerald-200/20 rounded-full blur-3xl -mr-20 -mb-20"></div>
            <h3 className="font-bold text-xl text-emerald-900 mb-4 font-serif relative z-10">{t('about.current_title')}</h3>
            <p className="text-emerald-800/80 text-base leading-relaxed mb-4 relative z-10">
              {t('about.current_p1')}
            </p>
            <p className="text-emerald-800/80 text-base leading-relaxed relative z-10">
              {t('about.current_p2')}
            </p>
          </div>
          
          {/* Interesting Facts Section */}
          <section className="pt-12 border-t border-stone-200">
            <h2 className="text-3xl font-bold text-stone-900 mb-8 flex items-center gap-3 font-serif">
              <div className="p-2 bg-indigo-100 rounded-2xl text-indigo-500">
                <Info className="w-6 h-6" />
              </div>
              {t('about.facts_title')}
            </h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {[
                { icon: Snowflake, color: 'blue', title: t('about.fact1_title'), desc: t('about.fact1_desc') },
                { icon: Droplets, color: 'rose', title: t('about.fact2_title'), desc: t('about.fact2_desc') },
                { icon: Brain, color: 'amber', title: t('about.fact3_title'), desc: t('about.fact3_desc') },
                { icon: Users, color: 'purple', title: t('about.fact4_title'), desc: t('about.fact4_desc') }
              ].map((fact, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ y: -5 }}
                  className="bg-white p-6 rounded-[2rem] border border-stone-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.06)] transition-all duration-300"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`p-3 bg-${fact.color}-50 text-${fact.color}-500 rounded-2xl`}>
                      <fact.icon className="w-6 h-6" />
                    </div>
                    <h4 className="font-bold text-lg text-stone-800 font-serif">{fact.title}</h4>
                  </div>
                  <p className="text-stone-600 leading-relaxed">{fact.desc}</p>
                </motion.div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </motion.div>
  );
}
