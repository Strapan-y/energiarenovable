import { useState, useMemo } from "react";
import { getCountries, getDataByCountry } from "@/data/renewableData";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell,
  LineChart, Line,
  AreaChart, Area,
} from "recharts";

const COLORS = ["#0891b2", "#eab308", "#3b82f6", "#ef4444", "#22c55e"];

const DashboardSection = () => {
  const [country, setCountry] = useState("World");
  const countries = getCountries();
  const data = useMemo(() => getDataByCountry(country), [country]);

  const latestData = data[data.length - 1];

  // Bar chart: production by source (latest year)
  const barData = [
    { name: "Eólica", value: latestData?.windGeneration || 0 },
    { name: "Solar", value: latestData?.solarConsumption || 0 },
    { name: "Hidro", value: latestData?.hydropowerConsumption || 0 },
    { name: "Geotérmica", value: latestData?.geothermalCapacity || 0 },
    { name: "Biocombustible", value: latestData?.biofuelProduction || 0 },
  ];

  // Pie chart: share of renewables
  const pieData = [
    { name: "Eólica", value: latestData?.shareElecWind || 0 },
    { name: "Solar", value: latestData?.shareElecSolar || 0 },
    { name: "Hidro", value: latestData?.shareElecHydro || 0 },
    { name: "Otras", value: Math.max(0, (latestData?.shareElecRenewables || 0) - (latestData?.shareElecWind || 0) - (latestData?.shareElecSolar || 0) - (latestData?.shareElecHydro || 0)) },
  ];

  // Line chart: installed capacity over time
  const lineData = data.filter((_, i) => i % 3 === 0).map(d => ({
    year: d.year,
    Eólica: d.windCapacity,
    Solar: d.solarPVCapacity,
    Geotérmica: d.geothermalCapacity,
  }));

  // Area chart: renewable vs conventional
  const areaData = data.filter((_, i) => i % 3 === 0).map(d => ({
    year: d.year,
    Renovable: d.modernRenewableConsumption,
    Convencional: d.primaryEnergyConsumption - d.modernRenewableConsumption,
  }));

  return (
    <section id="dashboard" className="py-24">
      <div className="container mx-auto px-4">
        <h2 className="font-display text-4xl md:text-5xl font-bold text-center mb-4">
          Dashboard de <span className="text-gradient">Energía Renovable</span>
        </h2>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-8">
          Visión integral de la producción y consumo de energía renovable
        </p>

        <div className="flex justify-center mb-10">
          <select
            value={country}
            onChange={e => setCountry(e.target.value)}
            className="px-4 py-2 rounded-lg border border-border bg-background text-foreground font-body"
          >
            {countries.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Bar Chart */}
          <div className="glass-card p-6">
            <h3 className="font-display text-lg font-semibold mb-1">Producción por Fuente ({latestData?.year})</h3>
            <p className="text-xs text-muted-foreground mb-4">Energía producida por cada fuente renovable</p>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(200 20% 88%)" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="value" name="Producción">
                  {barData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Pie Chart */}
          <div className="glass-card p-6">
            <h3 className="font-display text-lg font-semibold mb-1">Participación de Renovables</h3>
            <p className="text-xs text-muted-foreground mb-4">Porcentaje de cada tipo en el consumo eléctrico</p>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" outerRadius={100} dataKey="value" label={({ name, value }) => `${name}: ${value}%`}>
                  {pieData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Line Chart */}
          <div className="glass-card p-6">
            <h3 className="font-display text-lg font-semibold mb-1">Capacidad Instalada</h3>
            <p className="text-xs text-muted-foreground mb-4">Evolución de la capacidad instalada a lo largo del tiempo</p>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={lineData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(200 20% 88%)" />
                <XAxis dataKey="year" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="Eólica" stroke={COLORS[0]} strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="Solar" stroke={COLORS[1]} strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="Geotérmica" stroke={COLORS[3]} strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Area Chart */}
          <div className="glass-card p-6">
            <h3 className="font-display text-lg font-semibold mb-1">Renovable vs Convencional</h3>
            <p className="text-xs text-muted-foreground mb-4">Comparación del consumo a lo largo del tiempo</p>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={areaData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(200 20% 88%)" />
                <XAxis dataKey="year" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="Renovable" stackId="1" stroke={COLORS[4]} fill={COLORS[4]} fillOpacity={0.6} />
                <Area type="monotone" dataKey="Convencional" stackId="1" stroke={COLORS[3]} fill={COLORS[3]} fillOpacity={0.3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardSection;
