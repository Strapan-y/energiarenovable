import { useState } from "react";
import { renewableData } from "@/data/renewableData";
import { Calculator, Zap, Leaf } from "lucide-react";

const CalculatorSection = () => {
  const [consumption, setConsumption] = useState("");
  const [result, setResult] = useState<{
    renewablePercent: number;
    renewableKwh: number;
    installedCapacity: number;
  } | null>(null);

  const calculate = () => {
    const kWh = parseFloat(consumption);
    if (isNaN(kWh) || kWh <= 0) return;

    // Get latest world data
    const latest = renewableData.find(d => d.country === "World" && d.year === 2022);
    if (!latest) return;

    // Sum installed capacities
    const installedCapacity = latest.windCapacity + latest.solarPVCapacity + latest.geothermalCapacity;

    // Calculate renewable proportion from dataset
    const renewableProduction = latest.windGeneration + latest.solarConsumption + latest.hydropowerConsumption + latest.biofuelProduction;
    const totalProduction = latest.primaryEnergyConsumption;
    const renewablePercent = (renewableProduction / totalProduction) * 100;

    // Apply to user consumption
    const renewableKwh = (renewablePercent / 100) * kWh;

    setResult({
      renewablePercent: Math.round(renewablePercent * 10) / 10,
      renewableKwh: Math.round(renewableKwh * 10) / 10,
      installedCapacity: Math.round(installedCapacity),
    });
  };

  return (
    <section id="calculadora" className="py-24 bg-card">
      <div className="container mx-auto px-4 max-w-2xl">
        <h2 className="font-display text-4xl md:text-5xl font-bold text-center mb-4">
          <span className="text-gradient">Calculadora</span> Renovable
        </h2>
        <p className="text-muted-foreground text-center mb-12">
          Estima el porcentaje de energía renovable en tu consumo eléctrico total
        </p>

        <div className="glass-card p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg gradient-hero flex items-center justify-center">
              <Calculator className="h-5 w-5 text-primary-foreground" />
            </div>
            <h3 className="font-display text-xl font-semibold">Ingresa tu consumo</h3>
          </div>

          <label className="block text-sm font-medium text-muted-foreground mb-2">
            Consumo eléctrico total (kWh)
          </label>
          <div className="flex gap-3 mb-6">
            <input
              type="number"
              value={consumption}
              onChange={e => setConsumption(e.target.value)}
              placeholder="Ej: 350"
              className="flex-1 px-4 py-3 rounded-lg border border-border bg-background text-foreground font-body focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              onClick={calculate}
              className="gradient-hero text-primary-foreground px-6 py-3 rounded-lg font-display font-semibold hover:opacity-90 transition-opacity"
            >
              Calcular
            </button>
          </div>

          {result && (
            <div className="grid sm:grid-cols-3 gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="bg-background rounded-lg p-5 text-center border border-border">
                <Zap className="h-6 w-6 text-primary mx-auto mb-2" />
                <div className="font-display text-2xl font-bold text-primary">{result.renewablePercent}%</div>
                <div className="text-xs text-muted-foreground mt-1">Energía renovable</div>
              </div>
              <div className="bg-background rounded-lg p-5 text-center border border-border">
                <Leaf className="h-6 w-6 text-accent mx-auto mb-2" />
                <div className="font-display text-2xl font-bold text-accent">{result.renewableKwh} kWh</div>
                <div className="text-xs text-muted-foreground mt-1">De fuentes renovables</div>
              </div>
              <div className="bg-background rounded-lg p-5 text-center border border-border">
                <Zap className="h-6 w-6 text-secondary mx-auto mb-2" />
                <div className="font-display text-2xl font-bold text-secondary">{result.installedCapacity} GW</div>
                <div className="text-xs text-muted-foreground mt-1">Capacidad instalada global</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CalculatorSection;
