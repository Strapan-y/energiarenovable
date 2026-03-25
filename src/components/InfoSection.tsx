import { Droplets, Leaf, Zap, Globe } from "lucide-react";

const features = [
  {
    icon: Droplets,
    title: "¿Qué es?",
    desc: "La energía hidroeléctrica aprovecha la fuerza del agua en movimiento para generar electricidad mediante turbinas y generadores.",
  },
  {
    icon: Zap,
    title: "Capacidad Global",
    desc: "Con más de 1,300 GW de capacidad instalada globalmente, la hidroeléctrica es la mayor fuente de energía renovable del mundo.",
  },
  {
    icon: Leaf,
    title: "Impacto Ambiental",
    desc: "Produce mínimas emisiones de CO₂ durante la operación, contribuyendo significativamente a la lucha contra el cambio climático.",
  },
  {
    icon: Globe,
    title: "Distribución Mundial",
    desc: "China, Brasil, Canadá, Estados Unidos e India son los mayores productores de energía hidroeléctrica a nivel mundial.",
  },
];

const InfoSection = () => (
  <section id="info" className="py-24 bg-card">
    <div className="container mx-auto px-4">
      <h2 className="font-display text-4xl md:text-5xl font-bold text-center mb-4">
        Energía <span className="text-gradient">Limpia</span> y Renovable
      </h2>
      <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-16">
        La energía hidroeléctrica es una de las fuentes más antiguas y confiables de generación eléctrica renovable.
      </p>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((f) => (
          <div key={f.title} className="glass-card p-6 hover:shadow-xl transition-shadow group">
            <div className="w-12 h-12 rounded-lg gradient-hero flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <f.icon className="h-6 w-6 text-primary-foreground" />
            </div>
            <h3 className="font-display text-lg font-semibold mb-2">{f.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default InfoSection;
