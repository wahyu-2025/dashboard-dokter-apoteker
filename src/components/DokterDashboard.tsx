import { useState } from "react";
import { useDokterContextProvider } from "./hooks/useDokterContext";
import type { DokterFormData } from "./hooks/DokterContext";
import PasienList from "./PasienList";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

const DokterDashboard = () => {
  const { addData, pasienDataList, updatePasienStatus, deletePasien } = useDokterContextProvider();

  const initialFormData: DokterFormData = {
    penyakit: null,
    gejala: null,
    resep: null,
    status: "Menunggu",
    history: [{ status: "Menunggu", timestamp: new Date().toISOString() }],
  };

  const [formData, setFormData] = useState<DokterFormData>(initialFormData);
  const [selectedPasien, setSelectedPasien] = useState<number | null>(null);
  const [showPasienList, setShowPasienList] = useState(false);

  console.log(selectedPasien);

  const handleInputChange = (field: keyof DokterFormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    if (!formData.penyakit || !formData.gejala || !formData.resep) {
      toast.error("Mohon isi semua field terlebih dahulu!");
      return;
    }

    if (selectedPasien === null) {
      toast.error("Pilih pasien terlebih dahulu");
      return;
    }

    const newData: DokterFormData = {
      ...formData,
      status: "Menunggu",
      history: [{ status: "Menunggu", timestamp: new Date().toISOString() }],
    };

    addData(newData);
    updatePasienStatus(selectedPasien, "Sudah Didiagnosa");
    toast.success("Berhasil menambahkan resep!");
    setFormData(initialFormData);
    setSelectedPasien(null);
  };

  const handleOpenPasienList = () => {
    setShowPasienList(true);
  };

  // filter hanya pasien yg belum didiagnosa
  const pasienBelum = pasienDataList.filter((p) => p.status === "Menunggu Dokter");

  return (
    <>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full h-full">
        <div className="allComponentWrapper flex justify-center">
          <div className="p-6 space-y-6">
            <div className="formDokterCard bg-white-100 min-w-3xl max-w-3xl mr-15 pt-5 pb-1 shadow-xl mt-15 outline outline-sky-200 rounded-md">
              <div className="formDokterHeader mb-3">
                <h1 className="text-xl font-bold mb-2 text-center text-sky-900">Form Dokter</h1>
                <p className="text-center text-xs italic">Pilih pasien lalu isi diagnosis dan resep obat.</p>
              </div>

              <hr className="w-full" />

              <div className="formDokterBody px-4 mb-4 mt-3">
                <button
                  onClick={handleOpenPasienList}
                  className="inline-flex items-center justify-center gap-2 rounded bg-black px-4 py-2 text-sm/6 font-semibold text-white hover:bg-sky-800 dark:bg-sky-700 dark:hover:bg-sky-600 cursor-pointer"
                >
                  Lihat daftar pasien
                </button>

                {/* Dropdown hanya pasien yang belum didiagnosis */}
                <div className="max-w-3xl mx-auto my-3">
                  <label className="block text-sm font-semibold">Pilih Pasien</label>
                  <select value={selectedPasien ?? ""} onChange={(e) => setSelectedPasien(e.target.value ? Number(e.target.value) : null)} className="border px-2 py-1 rounded w-full">
                    <option value="">-- Pilih Pasien --</option>
                    {pasienBelum.map((p, i) => (
                      <option key={i} value={pasienDataList.indexOf(p)}>
                        {p.nama} ({p.umur} th)
                      </option>
                    ))}
                  </select>
                </div>

                {/* Form Diagnosis */}
                <div className="p-6 space-y-4 max-w-3xl mx-auto outline outline-gray-400 rounded mb-3">
                  <div className="grid grid-cols-[120px_1fr] items-center gap-4">
                    <label className="text-sm text-gray-700 text-right">
                      <span className="text-red-500">*</span> Nama Penyakit
                    </label>
                    <input value={formData.penyakit ?? ""} onChange={(e) => handleInputChange("penyakit", e.target.value)} className="h-9 border border-gray-300 px-2 rounded" />
                  </div>

                  <div className="grid grid-cols-[120px_1fr] items-center gap-4">
                    <label className="text-sm text-gray-700 text-right">
                      <span className="text-red-500">*</span> Gejala
                    </label>
                    <input value={formData.gejala ?? ""} onChange={(e) => handleInputChange("gejala", e.target.value)} className="h-9 border border-gray-300 px-2 rounded" />
                  </div>

                  <div className="grid grid-cols-[120px_1fr] items-center gap-4">
                    <label className="text-sm text-gray-700 text-right">
                      <span className="text-red-500">*</span> Resep
                    </label>
                    <textarea value={formData.resep ?? ""} onChange={(e) => handleInputChange("resep", e.target.value)} className="border border-gray-300 p-2 px-2 rounded resize-y min-h-[80px]" />
                  </div>

                  <div className="flex justify-end">
                    <button onClick={handleSave} disabled={!selectedPasien} className={`px-4 py-2 rounded ${selectedPasien === null ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 text-white cursor-pointer"}`}>
                      Simpan
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Komponen PasienList */}
          <PasienList isOpen={showPasienList} onClose={() => setShowPasienList(false)} onDelete={deletePasien} pasienData={pasienDataList} onSelect={(i) => setSelectedPasien(i)} selectedIndex={selectedPasien} />
        </div>
      </motion.div>
    </>
  );
};

export default DokterDashboard;
