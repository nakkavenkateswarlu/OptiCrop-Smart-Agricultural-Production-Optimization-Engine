import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';

const technologies = [
  {
    name: 'Python',
    description: 'Core programming language for ML development',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
    color: 'from-blue-500 to-blue-600',
  },
  {
    name: 'React',
    description: 'Modern frontend framework for interactive UI',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
    color: 'from-cyan-500 to-cyan-600',
  },
  {
    name: 'TypeScript',
    description: 'Type-safe JavaScript for robust applications',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
    color: 'from-blue-600 to-blue-700',
  },
  {
    name: 'Scikit-Learn',
    description: 'Machine learning library for classification',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/scikitlearn/scikitlearn-original.svg',
    color: 'from-orange-500 to-orange-600',
  },
  {
    name: 'Random Forest',
    description: 'Ensemble learning method for predictions',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg',
    color: 'from-green-500 to-green-600',
  },
  {
    name: 'Tailwind CSS',
    description: 'Utility-first CSS framework for styling',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg',
    color: 'from-teal-500 to-teal-600',
  },
  {
    name: 'Framer Motion',
    description: 'Production-ready animations for React',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
    color: 'from-pink-500 to-rose-600',
  },
  {
    name: 'Vite',
    description: 'Next-generation frontend build tooling',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg',
    color: 'from-purple-500 to-purple-600',
  },
];

export function TechnologySection() {
  const { ref, inView } = useInView(0.2);

  return (
    <section id="technology" className="py-20 md:py-32 bg-gray-50 dark:bg-slate-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-sm font-medium mb-4">
            Tech Stack
          </span>
          <h2 className="section-title">
            Technology <span className="gradient-text">Behind OptiCrop</span>
          </h2>
          <p className="section-subtitle">
            Built with cutting-edge technologies for performance, scalability, and accuracy
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {technologies.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="group"
            >
              <div className="h-full p-5 md:p-6 rounded-2xl glass-card card-hover text-center">
                <div className={`w-14 h-14 mx-auto rounded-xl bg-gradient-to-br ${tech.color} p-2 mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <img
                    src={tech.logo}
                    alt={tech.name}
                    className="w-full h-full object-contain filter brightness-0 invert"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>

                <h3 className="font-display font-semibold text-gray-900 dark:text-white mb-2">
                  {tech.name}
                </h3>

                <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
                  {tech.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}