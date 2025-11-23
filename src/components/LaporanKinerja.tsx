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

  const waktuPelayananData: { name: string; value: number }[] = dokterDataList
    .map((item, index) => {
      const start = item.history.find((h) => h.status === "Diproses");
      const end = item.history.find((h) => h.status === "Selesai");

      if (!start || !end) return null;

      const diff = (new Date(end.timestamp).getTime() - new Date(start.timestamp).getTime()) / 60000; // minutes
      return { name: `Resep #${index + 1}`, value: Number(diff.toFixed(2)) };
    })
    .filter(Boolean) as { name: string; value: number }[];

  const totalTime = waktuPelayananData.reduce((acc, cur) => acc + cur.value, 0);
  const rataRataPelayanan = waktuPelayananData.length > 0 ? Number((totalTime / waktuPelayananData.length).toFixed(2)) : 0;

  const getServiceRating = (avg: number) => {
    if (avg === 0) return "-";
    if (avg <= 5) return "Sangat Baik";
    if (avg <= 10) return "Baik";
    if (avg <= 15) return "Cukup";
    return "Buruk";
  };

  const formatDuration = (minutes: number) => {
    if (minutes < 1) {
      const seconds = Math.round(minutes * 60);
      return `${seconds} detik`;
    } else if (minutes >= 60) {
      const hours = (minutes / 60).toFixed(2);
      return `${hours} jam`;
    } else {
      return `${minutes.toFixed(2)} menit`;
    }
  };

  const getBarColor = (minutes: number) => {
    if (minutes <= 5) return "#22c55e"; // hijau
    if (minutes <= 10) return "#3b82f6"; // biru
    if (minutes <= 15) return "#facc15"; // kuning
    return "#ef4444"; // merah
  };

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

          {/* Kinerja apoteker */}
          <div className="mt-6 p-4 bg-yellow-50 rounded-lg shadow-sm">
            <p className="font-semibold text-gray-700">⏱️ Rata-rata Waktu Pelayanan:</p>
            <p className="text-2xl font-bold text-blue-700">{formatDuration(rataRataPelayanan)}</p>
            <p className="font-medium mt-1 text-gray-800">Penilaian: {getServiceRating(rataRataPelayanan)}</p>
          </div>

          <div className="h-64 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={waktuPelayananData}>
                <XAxis dataKey="name" />
                <YAxis label={{ value: "Menit", angle: -90, position: "insideLeft" }} />
                <Tooltip formatter={(value: number) => formatDuration(value)} />

                <Bar dataKey="value" radius={[10, 10, 0, 0]}>
                  {waktuPelayananData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={getBarColor(entry.value)} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-gray-500 text-sm mt-2">Grafik: Durasi pelayanan per resep</p>
        </div>
      </div>
    </motion.div>
  );
};

export default LaporanKinerja;
