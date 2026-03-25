// Sample renewable energy data based on the Kaggle dataset structure (1965-2022)
// In production, this would be loaded from the CSV

export interface RenewableDataRow {
  year: number;
  country: string;
  windGeneration: number;
  solarConsumption: number;
  hydropowerConsumption: number;
  biofuelProduction: number;
  geothermalCapacity: number;
  shareElecRenewables: number;
  shareElecWind: number;
  shareElecSolar: number;
  shareElecHydro: number;
  windCapacity: number;
  solarPVCapacity: number;
  modernRenewableConsumption: number;
  primaryEnergyConsumption: number;
}

// Generate realistic sample data
function generateData(): RenewableDataRow[] {
  const countries = ["World", "China", "United States", "Brazil", "India", "Germany"];
  const data: RenewableDataRow[] = [];

  for (const country of countries) {
    for (let year = 1965; year <= 2022; year++) {
      const t = (year - 1965) / (2022 - 1965);
      const countryFactor = country === "World" ? 5 : country === "China" ? 3 : country === "United States" ? 2 : 1;

      data.push({
        year,
        country,
        windGeneration: Math.round(t * t * 800 * countryFactor + Math.random() * 20),
        solarConsumption: Math.round(t * t * t * 500 * countryFactor + Math.random() * 10),
        hydropowerConsumption: Math.round((200 + t * 600) * countryFactor + Math.random() * 30),
        biofuelProduction: Math.round(t * t * 100 * countryFactor + Math.random() * 5),
        geothermalCapacity: Math.round((5 + t * 30) * countryFactor + Math.random() * 2),
        shareElecRenewables: Math.round((10 + t * 20) * 10) / 10,
        shareElecWind: Math.round(t * t * 10 * 10) / 10,
        shareElecSolar: Math.round(t * t * t * 8 * 10) / 10,
        shareElecHydro: Math.round((8 + t * 8) * 10) / 10,
        windCapacity: Math.round(t * t * 400 * countryFactor),
        solarPVCapacity: Math.round(t * t * t * 600 * countryFactor),
        modernRenewableConsumption: Math.round(t * t * 3000 * countryFactor + Math.random() * 50),
        primaryEnergyConsumption: Math.round((8000 + t * 6000) * countryFactor + Math.random() * 100),
      });
    }
  }
  return data;
}

export const renewableData = generateData();

export const getCountries = () => [...new Set(renewableData.map(d => d.country))];

export const getDataByCountry = (country: string) =>
  renewableData.filter(d => d.country === country);

export const getLatestYear = () => 2022;

export const getDataByYear = (year: number) =>
  renewableData.filter(d => d.year === year);
