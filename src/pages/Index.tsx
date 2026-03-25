import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import InfoSection from "../components/InfoSection";
import DataTableSection from "../components/DataTableSection";
import CalculatorSection from "../components/CalculatorSection";
import DashboardSection from "../components/DashboardSection";
import Footer from "../components/Footer";

const Index = () => (
  <div className="min-h-screen">
    <Navbar />
    <HeroSection />
    <InfoSection />
    <DataTableSection />
    <CalculatorSection />
    <DashboardSection />
    <Footer />
  </div>
);

export default Index;
