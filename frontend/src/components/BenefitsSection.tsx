import { motion } from 'framer-motion';
import { TrendingUp, Target, Recycle, Brain, Zap, Leaf } from 'lucide-react';
import { useInView } from '../hooks/useInView';

const benefits = [
  {
    icon: TrendingUp,
    title: 'Better Productivity',
    description: 'Optimize your agricultural output with data-driven crop selection.',
    stat: '40%',
    statLabel: 'Yield Increase',
  },
  {
    icon: Target,
    title: 'Higher Yield',
    description: 'Achieve maximum crop potential through optimal condition matching.',
    stat: '92%',
    statLabel: 'Prediction Accuracy',
  },
  {
    icon: Recycle,
    title: 'Reduced Waste',
    description: 'Minimize resource waste by planting crops suited to your environment.',
    stat: '35%',
    statLabel: 'Resource Savings',
  },
  {
    icon: Brain,
    title: 'Smart Decisions',
    description: 'Make informed farming choices backed by AI analysis.',
    stat: '100%',
    statLabel: 'Data-Driven',
  },
  {
    icon: Zap,
    title: 'AI Automation',
    description: 'Automated analysis saves time-instant recommendations.',
    stat: '<2s',
    statLabel: 'Response Time',
  },
  {
    icon: Leaf,
    title: 'Sustainability',
    description: 'Promote eco-friendly farming with suitable crop selection.',
    stat: 'Eco',
    statLabel: 'Friendly',
  },
];

export function BenefitsSection() {
  const { ref, inView } = useInView(0.2);

  return (
    <section className="py-20 md:py-32 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-sm font-medium mb-4">
            Why OptiCrop
          </span>
          <h2 className="section-title">
            Key <span className="gradient-text">Benefits</span>
          </h2>
          <p className="section-subtitle">
            Transform your agricultural practices with AI-powered insights
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div className="h-full p-6 rounded-2xl glass-card card-hover group relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary-500/10 to-transparent rounded-bl-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-500" />

                <div className="relative">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-lg">
                      <benefit.icon className="w-6 h-6 text-white" />
                    </div>

                    <div className="text-right">
                      <p className="text-2xl font-display font-bold text-primary-600 dark:text-primary-400">{benefit.stat}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{benefit.statLabel}</p>
                    </div>
                  </div>

                  <h3 className="text-lg font-display font-semibold text-gray-900 dark:text-white mb-2">
                    {benefit.title}
                  </h3>

                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {benefit.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}