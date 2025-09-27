import { Route, Routes } from "react-router-dom";
import DokterDashboard from "./components/DokterDashboard";
import DashboardHomePage from "./components/DashboardHomePage";
import ApotekerDashboard from "./components/AptokerDashboard";
import { DokterContextProvider } from "./components/hooks/DokterContext";
import LaporanKinerja from "./components/LaporanKinerja";
import PasienDashboard from "./components/PasienDashboard";

const App = () => {
  return (
    <DokterContextProvider>
      <Routes>
        <Route path="/pasien" element={<PasienDashboard />} />
        <Route path="/" element={<DashboardHomePage />} />
        <Route path="/dokter" element={<DokterDashboard />} />
        <Route path="/apoteker" element={<ApotekerDashboard />} />
        <Route path="/laporan" element={<LaporanKinerja />} />
      </Routes>
    </DokterContextProvider>
  );
};

export default App;
