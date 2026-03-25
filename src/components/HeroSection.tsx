import heroImg from "@/assets/hero-hydro.jpg";
import { ArrowDown } from "lucide-react";

const HeroSection = () => (
  <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden">
    <img src={heroImg} alt="Represa hidroeléctrica" className="absolute inset-0 w-full h-full object-cover" width={1920} height={1080} />
    <div className="absolute inset-0 bg-foreground/60" />
    <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
      <h1 className="font-display text-5xl md:text-7xl font-800 text-primary-foreground mb-6 leading-tight">
        Energía <span className="text-gradient">Hidroeléctrica</span>
      </h1>
      <p className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-10 font-light leading-relaxed">
        Descubre el poder del agua como fuente de energía limpia y renovable.
        Explora datos históricos globales de 1965 a 2022 y calcula tu huella energética renovable.
      </p>
      <a
        href="#info"
        className="inline-flex items-center gap-2 gradient-hero text-primary-foreground px-8 py-3 rounded-full font-display font-semibold text-lg hover:opacity-90 transition-opacity"
      >
        Explorar
        <ArrowDown className="h-5 w-5 animate-bounce" />
      </a>
    </div>
  </section>
);

export default HeroSection;
