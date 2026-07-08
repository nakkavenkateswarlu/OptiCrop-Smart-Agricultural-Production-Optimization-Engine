import { motion } from 'framer-motion';
import { Table, Thermometer, CloudRain, Droplets, Layers, FlaskConical, Wheat } from 'lucide-react';
import { useInView } from '../hooks/useInView';
import { getSupportedCrops, getSoilTypes } from '../services/cropService';

const features = [
  { name: 'Temperature', unit: '°C', icon: Thermometer, range: '0 - 50', description: 'Ambient temperature for crop growth' },
  { name: 'Rainfall', unit: 'mm', icon: CloudRain, range: '0 - 500', description: 'Annual rainfall measurement' },
  { name: 'Humidity', unit: '%', icon: Droplets, range: '0 - 100', description: 'Relative humidity level' },
  { name: 'Soil Type', unit: '-', icon: Layers, range: '5 types', description: 'Soil texture classification' },
  { name: 'pH Level', unit: 'pH', icon: FlaskConical, range: '0 - 14', description: 'Soil acidity/alkalinity' },
];

export function DatasetSection() {
  const { ref, inView } = useInView(0.2);
  const crops = getSupportedCrops();
  const soilTypes = getSoilTypes();

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
            Data Model
          </span>
          <h2 className="section-title">
            Dataset <span className="gradient-text">Features</span>
          </h2>
          <p className="section-subtitle">
            Comprehensive parameters analyzed for accurate crop recommendations
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="glass-card rounded-2xl overflow-hidden">
              <div className="px-6 py-4 bg-gradient-to-r from-primary-600 to-primary-500 flex items-center gap-2">
                <Table className="w-5 h-5 text-white" />
                <h3 className="text-lg font-semibold text-white">Input Features</h3>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 dark:bg-slate-800">
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">Feature</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">Unit</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">Range</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-slate-700">
                    {features.map((feature, index) => (
                      <motion.tr
                        key={feature.name}
                        initial={{ opacity: 0, y: 10 }}
                        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                        transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                        className="hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <feature.icon className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                            <span className="font-medium text-gray-900 dark:text-white">{feature.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{feature.unit}</td>
                        <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{feature.range}</td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="space-y-6"
          >
            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Wheat className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Target Variable</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {crops.map(crop => (
                  <span key={crop} className="px-3 py-1.5 rounded-lg bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-sm font-medium">
                    {crop}
                  </span>
                ))}
              </div>
            </div>

            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Layers className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Soil Categories</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {soilTypes.map(soil => (
                  <span key={soil} className="px-3 py-1.5 rounded-lg bg-earth-100 dark:bg-earth-900/30 text-earth-700 dark:text-earth-300 text-sm font-medium">
                    {soil}
                  </span>
                ))}
              </div>
            </div>

            <div className="glass-card rounded-2xl p-4 bg-gradient-to-r from-primary-500 to-primary-600">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-primary-100 text-sm">Total Classes</p>
                  <p className="text-white text-2xl font-display font-bold">{crops.length}</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                  <Wheat className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}