import { motion } from 'framer-motion';
import { Mail, Linkedin, Github, Globe, Leaf } from 'lucide-react';
import { useInView } from '../hooks/useInView';

export function ContactSection() {
  const { ref, inView } = useInView(0.2);

  return (
    <section id="contact" className="py-20 md:py-32 bg-gray-50 dark:bg-slate-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-sm font-medium mb-4">
            Get In Touch
          </span>
          <h2 className="section-title">
            Contact <span className="gradient-text">Developer</span>
          </h2>
          <p className="section-subtitle">
            Have questions or want to collaborate? Connect with us
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-lg mx-auto"
        >
          <div className="glass-card rounded-3xl p-8 md:p-10 shadow-xl text-center">
            <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-xl mb-6">
              <Leaf className="w-10 h-10 text-white" />
            </div>

            <h3 className="text-2xl font-display font-bold text-gray-900 dark:text-white mb-2">
              OptiCrop
            </h3>

            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Smart Agricultural Production Optimization Engine
            </p>

            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 justify-center text-gray-600 dark:text-gray-400">
                <Mail className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                <span>contact@opticrop.ai</span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3">
              <motion.a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-slate-800 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-primary-100 hover:text-primary-600 dark:hover:bg-primary-900/30 dark:hover:text-primary-400 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Github className="w-5 h-5" />
              </motion.a>

              <motion.a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-slate-800 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-blue-100 hover:text-blue-600 dark:hover:bg-blue-900/30 dark:hover:text-blue-400 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Linkedin className="w-5 h-5" />
              </motion.a>

              <motion.a
                href="https://portfolio.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-slate-800 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-primary-100 hover:text-primary-600 dark:hover:bg-primary-900/30 dark:hover:text-primary-400 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Globe className="w-5 h-5" />
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}