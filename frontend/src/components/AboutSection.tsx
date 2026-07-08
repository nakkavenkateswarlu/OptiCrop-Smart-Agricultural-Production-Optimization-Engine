import { motion } from 'framer-motion';
import { Target, Zap, Users, Lightbulb, ArrowRight } from 'lucide-react';
import { useInView } from '../hooks/useInView';

const points = [
  {
    icon: Target,
    title: 'Project Objective',
    description: 'To empower farmers with AI-driven insights for optimal crop selection, reducing resource waste and maximizing yield potential.',
  },
  {
    icon: Zap,
    title: 'AI Revolution',
    description: 'Artificial Intelligence transforms agriculture by analyzing complex environmental factors faster and more accurately than ever before.',
  },
  {
    icon: Users,
    title: 'Farmer Benefits',
    description: 'Farmers gain access to scientific recommendations, reducing trial-and-error and improving their livelihoods sustainably.',
  },
  {
    icon: Lightbulb,
    title: 'Future Scope',
    description: 'Integration with IoT sensors, satellite imagery, and real-time weather data for even more precise recommendations.',
  },
];

export function AboutSection() {
  const { ref, inView } = useInView(0.2);

  return (
    <section id="about" className="py-20 md:py-32 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-sm font-medium mb-4">
              About OptiCrop
            </span>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-gray-900 dark:text-white mb-6">
              Revolutionizing Agriculture with <span className="gradient-text">Smart AI</span>
            </h2>

            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
              OptiCrop is an innovative agricultural technology platform that leverages machine learning
              to help farmers make data-driven decisions. By analyzing environmental conditions like
              temperature, rainfall, humidity, and soil parameters, our system predicts the most suitable
              crops for your land.
            </p>

            <div className="space-y-4">
              {points.map((point, index) => (
                <motion.div
                  key={point.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                  className="flex gap-4"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
                    <point.icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-1">{point.title}</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">{point.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/265216/pexels-photo-265216.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Smart Agriculture"
                className="rounded-3xl shadow-2xl w-full object-cover h-[400px] md:h-[500px]"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-primary-900/50 via-transparent to-transparent rounded-3xl" />

              <motion.div
                className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl glass"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.5 }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Why Crop Recommendation</p>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">Smart Farming Decisions</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-primary-500 flex items-center justify-center">
                    <ArrowRight className="w-5 h-5 text-white" />
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}