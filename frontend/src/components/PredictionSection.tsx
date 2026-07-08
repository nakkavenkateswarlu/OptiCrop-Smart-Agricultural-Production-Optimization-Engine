import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Thermometer, Droplets, CloudRain, Layers, FlaskConical, Sparkles, Loader2, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { predictCrop, getSoilTypes, type CropInput, type CropPrediction } from '../services/cropService';
import { useInView } from '../hooks/useInView';

interface FormData {
  temperature: string;
  rainfall: string;
  humidity: string;
  soilType: string;
  ph: string;
}

const inputFields = [
  { name: 'temperature', label: 'Temperature', unit: '°C', icon: Thermometer, placeholder: 'e.g., 28', min: 0, max: 50 },
  { name: 'rainfall', label: 'Rainfall', unit: 'mm', icon: CloudRain, placeholder: 'e.g., 150', min: 0, max: 500 },
  { name: 'humidity', label: 'Humidity', unit: '%', icon: Droplets, placeholder: 'e.g., 65', min: 0, max: 100 },
  { name: 'ph', label: 'pH Level', unit: 'pH', icon: FlaskConical, placeholder: 'e.g., 6.5', min: 0, max: 14 },
];

export function PredictionSection() {
  const { ref, inView } = useInView(0.1);
  const [formData, setFormData] = useState<FormData>({
    temperature: '',
    rainfall: '',
    humidity: '',
    soilType: '',
    ph: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<CropPrediction | null>(null);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [serverError, setServerError] = useState<string | null>(null);

  const soilTypes = getSoilTypes();

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.temperature || parseFloat(formData.temperature) < 0 || parseFloat(formData.temperature) > 50) {
      newErrors.temperature = 'Enter temperature (0-50°C)';
    }
    if (!formData.rainfall || parseFloat(formData.rainfall) < 0 || parseFloat(formData.rainfall) > 500) {
      newErrors.rainfall = 'Enter rainfall (0-500mm)';
    }
    if (!formData.humidity || parseFloat(formData.humidity) < 0 || parseFloat(formData.humidity) > 100) {
      newErrors.humidity = 'Enter humidity (0-100%)';
    }
    if (!formData.soilType) {
      newErrors.soilType = 'Select soil type';
    }
    if (!formData.ph || parseFloat(formData.ph) < 0 || parseFloat(formData.ph) > 14) {
      newErrors.ph = 'Enter pH (0-14)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setResult(null);
    setServerError(null);

    await new Promise(resolve => setTimeout(resolve, 1500));

    const input: CropInput = {
      temperature: parseFloat(formData.temperature),
      rainfall: parseFloat(formData.rainfall),
      humidity: parseFloat(formData.humidity),
      soilType: formData.soilType,
      ph: parseFloat(formData.ph),
    };

    try {
      const prediction = await predictCrop(input);
      setResult(prediction);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#22c55e', '#16a34a', '#84cc16', '#4ade80'],
      });
    } catch (error) {
      setServerError(error instanceof Error ? error.message : String(error));
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <section id="prediction" className="py-20 md:py-32 bg-gray-50 dark:bg-slate-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-sm font-medium mb-4">
            Crop Prediction
          </span>
          <h2 className="section-title">
            Predict Your <span className="gradient-text">Ideal Crop</span>
          </h2>
          <p className="section-subtitle">
            Enter your environmental and soil conditions to get AI-powered crop recommendations
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="glass-card rounded-3xl p-6 md:p-10 shadow-xl"
          >
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              {inputFields.map((field, index) => (
                <motion.div
                  key={field.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                  transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                >
                  <label className="input-label flex items-center gap-2">
                    <field.icon className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                    {field.label}
                    <span className="text-gray-400 text-sm">({field.unit})</span>
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      step="any"
                      value={formData[field.name as keyof FormData]}
                      onChange={(e) => handleInputChange(field.name, e.target.value)}
                      placeholder={field.placeholder}
                      className={`input-field pr-16 ${errors[field.name as keyof FormData] ? 'border-red-500 focus:ring-red-500/50' : ''}`}
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                      {field.unit}
                    </span>
                  </div>
                  {errors[field.name as keyof FormData] && (
                    <p className="text-red-500 text-sm mt-1">{errors[field.name as keyof FormData]}</p>
                  )}
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ duration: 0.3, delay: 0.7 }}
              >
                <label className="input-label flex items-center gap-2">
                  <Layers className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                  Soil Type
                </label>
                <div className="relative">
                  <select
                    value={formData.soilType}
                    onChange={(e) => handleInputChange('soilType', e.target.value)}
                    className={`input-field appearance-none cursor-pointer ${errors.soilType ? 'border-red-500 focus:ring-red-500/50' : ''}`}
                  >
                    <option value="">Select soil type</option>
                    {soilTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                {errors.soilType && <p className="text-red-500 text-sm mt-1">{errors.soilType}</p>}
              </motion.div>
            </div>

            <motion.button
              type="submit"
              disabled={isLoading}
              className={`w-full py-4 rounded-xl bg-gradient-to-r from-primary-600 to-primary-500 text-white font-semibold text-lg shadow-lg shadow-primary-500/30 flex items-center justify-center gap-2 transition-all ${
                isLoading ? 'opacity-80 cursor-not-allowed' : 'hover:shadow-xl hover:shadow-primary-500/40 hover:scale-[1.02]'
              }`}
              whileTap={!isLoading ? { scale: 0.98 } : {}}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Analyzing Conditions...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Predict Recommended Crop
                </>
              )}
            </motion.button>
            {serverError && (
              <div className="mt-4 rounded-2xl bg-red-50 border border-red-200 p-4 text-red-700 dark:bg-red-950/20 dark:border-red-600/30 dark:text-red-200">
                <strong>Prediction error:</strong> {serverError}
              </div>
            )}
          </motion.form>

          <AnimatePresence>
            {result && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                className="mt-8"
              >
                <div className="glass-card rounded-3xl p-8 md:p-10 shadow-xl border-2 border-primary-200 dark:border-primary-800">
                  <div className="flex items-center gap-3 mb-6">
                    <CheckCircle2 className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                    <h3 className="text-2xl font-display font-bold text-gray-900 dark:text-white">
                      Recommended Crop
                    </h3>
                  </div>

                  <div className="flex flex-col md:flex-row items-center gap-6 mb-6">
                    <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-xl">
                      <span className="text-5xl font-display font-bold text-white">{result.crop.charAt(0)}</span>
                    </div>

                    <div className="flex-1 text-center md:text-left">
                      <h4 className="text-3xl md:text-4xl font-display font-bold text-gray-900 dark:text-white mb-2">
                        {result.crop}
                      </h4>
                      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300">
                        <span className="font-semibold">{result.confidence}%</span>
                        <span className="text-sm">Confidence Score</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-600 dark:text-gray-400 text-lg mb-6">
                    {result.description}
                  </p>

                  <div className="pt-6 border-t border-gray-200 dark:border-slate-700">
                    <h5 className="font-semibold text-gray-900 dark:text-white mb-3">Cultivation Tips:</h5>
                    <ul className="space-y-2">
                      {result.tips.map((tip, index) => (
                        <li key={index} className="flex items-start gap-2 text-gray-600 dark:text-gray-400">
                          <CheckCircle2 className="w-5 h-5 text-primary-600 dark:text-primary-400 flex-shrink-0 mt-0.5" />
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}