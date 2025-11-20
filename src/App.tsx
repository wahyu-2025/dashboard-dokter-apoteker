import { Route, Routes } from "react-router-dom";
import DokterDashboard from "./components/DokterDashboard";
import DashboardHomePage from "./components/DashboardHomePage";
import ApotekerDashboard from "./components/AptokerDashboard";
import { DokterContextProvider } from "./components/hooks/DokterContext";
import LaporanKinerja from "./components/LaporanKinerja";
import PasienDashboard from "./components/PasienDashboard";
import { AnimatePresence } from "framer-motion";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <DokterContextProvider>
      <AnimatePresence>
        <Toaster position="bottom-right"/>
        <Routes location={location} key={location.pathname}>
          <Route path="/pasien" element={<PasienDashboard />} />
          <Route path="/" element={<DashboardHomePage />} />
          <Route path="/dokter" element={<DokterDashboard />} />
          <Route path="/apoteker" element={<ApotekerDashboard />} />
          <Route path="/laporan" element={<LaporanKinerja />} />
        </Routes>
      </AnimatePresence>
    </DokterContextProvider>
  );
};

export default App;
