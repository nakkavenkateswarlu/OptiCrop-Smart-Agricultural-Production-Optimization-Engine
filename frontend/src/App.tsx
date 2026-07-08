import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { FeaturesSection } from './components/FeaturesSection';
import { AboutSection } from './components/AboutSection';
import { PredictionSection } from './components/PredictionSection';
import { WorkflowSection } from './components/WorkflowSection';
import { TechnologySection } from './components/TechnologySection';
import { DatasetSection } from './components/DatasetSection';
import { StatisticsSection } from './components/StatisticsSection';
import { BenefitsSection } from './components/BenefitsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 transition-colors duration-300">
      <Navbar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <AboutSection />
        <PredictionSection />
        <WorkflowSection />
        <TechnologySection />
        <DatasetSection />
        <BenefitsSection />
        <StatisticsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;