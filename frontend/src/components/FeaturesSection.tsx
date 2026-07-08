import { motion } from 'framer-motion';
import { Sprout, Bot, Cloud, Globe, TrendingUp, Recycle } from 'lucide-react';
import { useInView } from '../hooks/useInView';

const features = [
  {
    icon: Sprout,
    title: 'AI Crop Recommendation',
    description: 'Advanced machine learning algorithms analyze environmental conditions to recommend the most suitable crop for your farm.',
    color: 'from-green-500 to-emerald-600',
  },
  {
    icon: Bot,
    title: 'Machine Learning Prediction',
    description: 'Powered by Random Forest Classifier trained on comprehensive agricultural datasets for accurate predictions.',
    color: 'from-blue-500 to-cyan-600',
  },
  {
    icon: Cloud,
    title: 'Climate Analysis',
    description: 'Temperature, rainfall, and humidity parameters are analyzed to ensure optimal growing conditions.',
    color: 'from-sky-500 to-blue-600',
  },
  {
    icon: Globe,
    title: 'Soil Intelligence',
    description: 'Soil type and pH level assessment for precise crop compatibility analysis and soil health optimization.',
    color: 'from-amber-500 to-orange-600',
  },
  {
    icon: TrendingUp,
    title: 'Productivity Optimization',
    description: 'Maximize your agricultural yield with data-driven recommendations tailored to your specific conditions.',
    color: 'from-purple-500 to-pink-600',
  },
  {
    icon: Recycle,
    title: 'Sustainable Agriculture',
    description: 'Promote eco-friendly farming practices by selecting crops that thrive in your natural environment.',
    color: 'from-teal-500 to-green-600',
  },
];

export function FeaturesSection() {
  const { ref, inView } = useInView(0.2);

  return (
    <section id="features" className="py-20 md:py-32 bg-gray-50 dark:bg-slate-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">
            Powerful <span className="gradient-text">Features</span>
          </h2>
          <p className="section-subtitle">
            Discover how OptiCrop revolutionizes agricultural decision-making with cutting-edge technology
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="h-full p-6 md:p-8 rounded-2xl glass-card card-hover">
                <div
                  className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                >
                  <feature.icon className="w-7 h-7 text-white" />
                </div>

                <h3 className="text-xl font-display font-semibold text-gray-900 dark:text-white mb-3">
                  {feature.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}