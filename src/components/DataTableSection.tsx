import { useState, useMemo } from "react";
import { renewableData, getCountries } from "@/data/renewableData";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Upload, ChevronLeft, ChevronRight } from "lucide-react";

const PAGE_SIZE = 15;

const DataTableSection = () => {
  const [country, setCountry] = useState("World");
  const [page, setPage] = useState(0);
  const [csvData, setCsvData] = useState<string[][] | null>(null);

  const countries = getCountries();

  const filtered = useMemo(
    () => renewableData.filter(d => d.country === country),
    [country]
  );

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const pageData = filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const text = ev.target?.result as string;
      const rows = text.split("\n").map(r => r.split(","));
      setCsvData(rows.slice(0, 100)); // Show first 100 rows
    };
    reader.readAsText(file);
  };

  return (
    <section id="datos" className="py-24">
      <div className="container mx-auto px-4">
        <h2 className="font-display text-4xl md:text-5xl font-bold text-center mb-4">
          Datos <span className="text-gradient">Históricos</span>
        </h2>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-8">
          Conjunto de datos globales sobre energía renovable (1965–2022)
        </p>

        {/* Upload CSV */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <label className="inline-flex items-center gap-2 cursor-pointer gradient-hero text-primary-foreground px-6 py-2 rounded-full font-display font-medium hover:opacity-90 transition-opacity">
            <Upload className="h-4 w-4" />
            Cargar CSV
            <input type="file" accept=".csv" className="hidden" onChange={handleFileUpload} />
          </label>
          <select
            value={country}
            onChange={(e) => { setCountry(e.target.value); setPage(0); }}
            className="px-4 py-2 rounded-lg border border-border bg-background text-foreground font-body"
          >
            {countries.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        {/* CSV uploaded data */}
        {csvData && (
          <div className="mb-8 glass-card p-4 overflow-x-auto">
            <h3 className="font-display font-semibold mb-3">Datos cargados del CSV</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  {csvData[0]?.map((h, i) => <TableHead key={i} className="text-xs">{h}</TableHead>)}
                </TableRow>
              </TableHeader>
              <TableBody>
                {csvData.slice(1, 20).map((row, i) => (
                  <TableRow key={i}>
                    {row.map((cell, j) => <TableCell key={j} className="text-xs">{cell}</TableCell>)}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}

        {/* Sample data table */}
        <div className="glass-card p-4 overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Año</TableHead>
                <TableHead>País</TableHead>
                <TableHead>Eólica (TWh)</TableHead>
                <TableHead>Solar (TWh)</TableHead>
                <TableHead>Hidro (TWh)</TableHead>
                <TableHead>Biocomb.</TableHead>
                <TableHead>Geotérmica (GW)</TableHead>
                <TableHead>% Renovable</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pageData.map((d, i) => (
                <TableRow key={i}>
                  <TableCell className="font-medium">{d.year}</TableCell>
                  <TableCell>{d.country}</TableCell>
                  <TableCell>{d.windGeneration}</TableCell>
                  <TableCell>{d.solarConsumption}</TableCell>
                  <TableCell>{d.hydropowerConsumption}</TableCell>
                  <TableCell>{d.biofuelProduction}</TableCell>
                  <TableCell>{d.geothermalCapacity}</TableCell>
                  <TableCell>{d.shareElecRenewables}%</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="flex items-center justify-between mt-4">
            <span className="text-sm text-muted-foreground">Página {page + 1} de {totalPages}</span>
            <div className="flex gap-2">
              <button disabled={page === 0} onClick={() => setPage(p => p - 1)} className="p-2 rounded-lg border border-border disabled:opacity-30 hover:bg-muted transition-colors">
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button disabled={page >= totalPages - 1} onClick={() => setPage(p => p + 1)} className="p-2 rounded-lg border border-border disabled:opacity-30 hover:bg-muted transition-colors">
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DataTableSection;
