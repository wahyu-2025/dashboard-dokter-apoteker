import { motion } from "framer-motion";
import { useDokterContextProvider } from "./hooks/useDokterContext";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const LaporanKinerja = () => {
  const { dokterDataList } = useDokterContextProvider();

  // Statistik Dokter
  const jumlahPasien = dokterDataList.length;

  // hitung penyakit terbanyak
  const penyakitCount: Record<string, number> = {};
  dokterDataList.forEach((d) => {
    if (d.penyakit) {
      penyakitCount[d.penyakit] = (penyakitCount[d.penyakit] || 0) + 1;
    }
  });
  const penyakitData = Object.entries(penyakitCount).map(([name, value]) => ({ name, value }));

  // Statistik Apoteker
  const jumlahSelesai = dokterDataList.filter((d) => d.status === "Selesai").length;

  // distribusi obat
  const obatCount: Record<string, number> = {};
  dokterDataList.forEach((d) => {
    if (d.resep) {
      d.resep.split(",").forEach((obat) => {
        const namaObat = obat.trim();
        if (namaObat) {
          obatCount[namaObat] = (obatCount[namaObat] || 0) + 1;
        }
      });
    }
  });
  const obatData = Object.entries(obatCount).map(([name, value]) => ({ name, value }));

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full h-full">
      <div className="p-6 max-w-6xl mx-auto space-y-8">
        <h1 className="text-2xl font-bold text-center text-sky-900">📊 Laporan Kinerja</h1>

        {/* Statistik Dokter */}
        <div className="bg-white rounded-xl shadow-xl p-6 outline outline-sky-100">
          <h2 className="text-xl font-semibold mb-4">👨‍⚕️ Dokter</h2>
          <p>
            Total Pasien: <span className="font-bold">{jumlahPasien}</span>
          </p>

          <div className="h-64 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={penyakitData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-gray-500 text-sm mt-2">Grafik: Penyakit terbanyak</p>
        </div>

        {/* Statistik Apoteker */}
        <div className="bg-white rounded-xl shadow-xl p-6 outline outline-sky-100">
          <h2 className="text-xl font-semibold mb-4">💊 Apoteker</h2>
          <p>
            Resep Selesai: <span className="font-bold">{jumlahSelesai}</span>
          </p>

          <div className="h-64 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={obatData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                  {obatData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <p className="text-gray-500 text-sm mt-2">Grafik: Distribusi obat</p>
        </div>
      </div>
    </motion.div>
  );
};

export default LaporanKinerja;
