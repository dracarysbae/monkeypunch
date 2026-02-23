import { motion } from 'motion/react';
import { MapPin, Navigation } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function MapPage() {
  const { t } = useLanguage();

  const handleDirections = () => {
    // Universal link for directions
    window.open('https://www.google.com/maps/dir/?api=1&destination=Ichikawa+City+Zoo,+Japan', '_blank');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto space-y-8"
    >
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-full mb-4">
          <MapPin className="w-8 h-8 text-blue-600" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-stone-900">
          {t('map.title')}
        </h1>
        <p className="text-lg text-stone-600 max-w-2xl mx-auto">
          {t('map.subtitle')}
        </p>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-white p-4 rounded-[2.5rem] shadow-xl border border-stone-100"
      >
        <div className="aspect-video w-full rounded-[2rem] overflow-hidden bg-stone-100 relative shadow-inner">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3238.406733355325!2d139.9546050763261!3d35.74083897256801!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6018816555555555%3A0x8b5b5b5b5b5b5b5b!2sIchikawa%20City%20Zoo!5e0!3m2!1sen!2str!4v1700000000000!5m2!1sen!2str" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Ichikawa City Zoo Map"
            className="grayscale-[20%] hover:grayscale-0 transition-all duration-700"
          ></iframe>
        </div>
        
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-6 px-4 pb-4">
          <div>
            <h3 className="font-bold text-xl text-stone-900 font-serif">Ichikawa City Zoo</h3>
            <p className="text-stone-500 font-medium mt-1">284 Omachi, Ichikawa, Chiba 272-0801, Japan</p>
          </div>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleDirections}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-2xl font-bold shadow-lg shadow-emerald-200 transition-all"
          >
            <Navigation className="w-5 h-5" />
            {t('map.directions')}
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}
