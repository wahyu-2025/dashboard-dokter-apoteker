import { useState } from "react";
import { useDokterContextProvider } from "./hooks/useDokterContext";
import type { DokterFormData } from "./hooks/DokterContext";
import PasienList from "./PasienList";

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

  const handleInputChange = (field: keyof DokterFormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    if (selectedPasien === null) {
      alert("Pilih pasien dulu!");
      return;
    }

    const newData: DokterFormData = {
      ...formData,
      status: "Menunggu",
      history: [
        { status: "Menunggu", timestamp: new Date().toISOString() },
      ],
    };

    addData(newData);
    updatePasienStatus(selectedPasien, "Sudah Didiagnosa");
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
      <div className="p-6 space-y-6">
        <div className="text-center">
          <h1 className="text-xl font-bold">Dashboard Dokter</h1>
          <p>Pilih pasien lalu isi diagnosa & resep obat.</p>
        </div>

        <div className="max-w-3xl mx-auto">
          <button className="cursor-pointer bg-blue-400 p-2 rounded" onClick={handleOpenPasienList}>
            List Pasien
          </button>
        </div>

        {/* Dropdown hanya pasien yang belum didiagnosa */}
        <div className="max-w-3xl mx-auto">
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

        {/* Form Diagnosa */}
        <div className="p-6 space-y-4 max-w-3xl mx-auto border rounded">
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
            <textarea value={formData.resep ?? ""} onChange={(e) => handleInputChange("resep", e.target.value)} className="border border-gray-300 px-2 rounded resize-y min-h-[80px]" />
          </div>

          <div className="flex justify-end">
            <button onClick={handleSave} disabled={selectedPasien === null} className={`px-4 py-2 rounded cursor-pointer ${selectedPasien === null ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 text-white"}`}>
              Simpan
            </button>
          </div>
        </div>
      </div>
      {/* Komponen PasienList */}
      <PasienList isOpen={showPasienList} onClose={() => setShowPasienList(false)} onDelete={deletePasien} pasienData={pasienDataList} onSelect={(i) => setSelectedPasien(i)} selectedIndex={selectedPasien} />
    </>
  );
};

export default DokterDashboard;
