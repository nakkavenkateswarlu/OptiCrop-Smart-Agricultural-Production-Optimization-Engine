import { motion } from 'framer-motion';
import { Keyboard, ShieldCheck, Settings, Cpu, Target, Wheat, ArrowRight } from 'lucide-react';
import { useInView } from '../hooks/useInView';

const steps = [
  { icon: Keyboard, title: 'User Input', description: 'Enter environmental parameters' },
  { icon: ShieldCheck, title: 'Validation', description: 'Verify input data quality' },
  { icon: Settings, title: 'Preprocessing', description: 'Normalize and prepare data' },
  { icon: Cpu, title: 'ML Model', description: 'Random Forest prediction' },
  { icon: Target, title: 'Prediction', description: 'Generate crop recommendation' },
  { icon: Wheat, title: 'Result', description: 'Display optimal crop' },
];

export function WorkflowSection() {
  const { ref, inView } = useInView(0.2);

  return (
    <section id="workflow" className="py-20 md:py-32 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-sm font-medium mb-4">
            How It Works
          </span>
          <h2 className="section-title">
            Prediction <span className="gradient-text">Workflow</span>
          </h2>
          <p className="section-subtitle">
            Our AI-powered system follows a systematic approach to deliver accurate crop recommendations
          </p>
        </motion.div>

        <div className="relative">
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-200 via-primary-400 to-primary-200 dark:from-primary-800 dark:via-primary-600 dark:to-primary-800 -translate-y-1/2" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 lg:gap-2">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative flex flex-col items-center"
              >
                <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-xl mb-4 z-10 group-hover:scale-110 transition-transform">
                  <step.icon className="w-9 h-9 text-white" />
                </div>

                <h3 className="text-lg font-display font-semibold text-gray-900 dark:text-white text-center mb-1">
                  {step.title}
                </h3>

                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                  {step.description}
                </p>

                {index < steps.length - 1 && (
                  <motion.div
                    className="hidden lg:flex absolute top-10 -right-2 z-20"
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}