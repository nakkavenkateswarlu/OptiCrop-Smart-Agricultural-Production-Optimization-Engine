import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Sprout, Brain, Target, Layers, Wheat } from 'lucide-react';
import { useInView } from '../hooks/useInView';
import { getSupportedCrops, getSoilTypes } from '../services/cropService';

interface CounterProps {
  end: number;
  duration?: number;
  suffix?: string;
}

function Counter({ end, duration = 2000, suffix = '' }: CounterProps) {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView(0.5);

  useEffect(() => {
    if (!inView) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [inView, end, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

const stats = [
  { icon: Sprout, label: 'Input Features', value: 5, suffix: '', color: 'from-green-500 to-emerald-600' },
  { icon: Brain, label: 'ML Classification', value: 1, suffix: '+', color: 'from-blue-500 to-cyan-600' },
  { icon: Target, label: 'Prediction Accuracy', value: 92, suffix: '%', color: 'from-purple-500 to-pink-600' },
  { icon: Layers, label: 'Soil Types', value: 5, suffix: '', color: 'from-amber-500 to-orange-600' },
  { icon: Wheat, label: 'Crop Classes', value: 12, suffix: '', color: 'from-teal-500 to-green-600' },
];

export function StatisticsSection() {
  const { ref, inView } = useInView(0.2);
  const crops = getSupportedCrops();
  const soilTypes = getSoilTypes();

  return (
    <section className="py-20 md:py-32 bg-gradient-to-b from-gray-50 to-white dark:from-slate-900/50 dark:to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-sm font-medium mb-4">
            By The Numbers
          </span>
          <h2 className="section-title">
            System <span className="gradient-text">Statistics</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div className="glass-card rounded-2xl p-6 text-center card-hover h-full">
                <div className={`w-14 h-14 mx-auto rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4 shadow-lg`}>
                  <stat.icon className="w-7 h-7 text-white" />
                </div>

                <p className="text-3xl md:text-4xl font-display font-bold text-gray-900 dark:text-white mb-2">
                  <Counter end={stat.value} suffix={stat.suffix} />
                </p>

                <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">
                  {stat.label}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <p className="text-gray-600 dark:text-gray-400 mb-4">Supported Crops</p>
          <div className="flex flex-wrap justify-center gap-2">
            {crops.map((crop, index) => (
              <motion.span
                key={crop}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3, delay: 0.6 + index * 0.05 }}
                className="px-4 py-2 rounded-full bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300 text-sm font-medium shadow-sm border border-gray-200 dark:border-slate-700"
              >
                {crop}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}