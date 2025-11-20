import { useNavigate } from "react-router-dom";
import MedicineVisual from "../undraw_medicine_hqqg_theme.svg";
import { FaUserDoctor } from "react-icons/fa6";
import { BsPeopleFill } from "react-icons/bs";
import { FaBriefcaseMedical } from "react-icons/fa6";
import { TbReportAnalytics } from "react-icons/tb";
import type React from "react";
import { motion } from "framer-motion";

interface MenuItem {
  privName: string;
  path: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const DashboardHomePage = () => {
  const navigate = useNavigate();

  const data: MenuItem[] = [
    { privName: "Pasien", path: "/pasien", title: "Pasien", description: "Form pengisian data identitas dan informasi medis pasien.", icon: <BsPeopleFill /> },
    { privName: "Dokter", path: "/dokter", title: "Dokter", description: "Form pencatatan hasil pemeriksaan serta diagnosis pasien.", icon: <FaUserDoctor /> },
    { privName: "Apoteker", path: "/apoteker", title: "Apoteker", description: "Pengelolaan obat dan layanan farmasi.", icon: <FaBriefcaseMedical /> },
    { privName: "Laporan", path: "/laporan", title: "Laporan Kinerja", description: "Laporan jumlah pasien, penyakit terbanyak dan jumlah distribusi obat.", icon: <TbReportAnalytics /> },
  ];

  return (
    <>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full h-full">
        <div
          className="min-h-screen w-full bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${MedicineVisual})`,
            backgroundSize: "500px",
          }}
        >
          <div className="py-10 min-h-screen flex items-center justify-center">
            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-y-6 gap-x-20">
              {data.map((item) => (
                <div key={item.privName} className="bg-white/90 p-6 rounded-xl shadow-sm flex items-start gap-4 hover:shadow-md transition cursor-pointer" onClick={() => navigate(item.path)}>
                  <div className="bg-blue-100 p-3 rounded-md text-blue-700 text-2xl">{item.icon}</div>
                  <div>
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default DashboardHomePage;
