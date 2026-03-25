import { Droplets } from "lucide-react";

const Footer = () => (
  <footer className="py-12 bg-foreground text-primary-foreground">
    <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 font-display text-lg font-bold">
          <Droplets className="h-5 w-5" />
          HidroEnergía
        </div>
        <p className="text-sm text-primary-foreground/60">
          Datos basados en el conjunto de datos de{" "}
          <a href="https://www.kaggle.com/datasets/belayethossainds/renewable-energy-world-wide-19652022" target="_blank" rel="noreferrer" className="underline hover:text-primary-foreground/80">
            Kaggle — Renewable Energy 1965–2022
          </a>
        </p>
        <p className="text-sm text-primary-foreground/60">© {new Date().getFullYear()} Proyecto Académico</p>
      </div>
    </div>
  </footer>
);

export default Footer;
