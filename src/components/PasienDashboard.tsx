import { useState } from "react";
import { useDokterContextProvider } from "./hooks/useDokterContext";

export interface PasienFormData {
  nama: string | null;
  umur: number | null;
  keluhan: string | null;
  status?: "Menunggu Dokter" | "Sudah Didiagnosa" | "Selesai";
  history?: {
    status: "Menunggu Dokter" | "Sudah Didiagnosa" | "Selesai";
    timestamp: string;
  }[];
}

const PasienDashboard = () => {
  const { addPasien } = useDokterContextProvider();
  const initialFormData: PasienFormData = {
    nama: null,
    umur: null,
    keluhan: null,
  };
  const [form, setForm] = useState<PasienFormData>(initialFormData);

  const handleSave = () => {
    if (!form.nama || !form.keluhan) return;

    addPasien({
      ...form,
      status: "Menunggu Dokter",
      history: [
        {
          status: "Menunggu Dokter",
          timestamp: new Date().toISOString(),
        },
      ],
    });
    setForm(initialFormData);
  };

  return (
    <div className="p-6 space-y-6 mx-auto">
      <h1 className="text-xl font-bold mb-4 text-center">Dashboard Pasien</h1>

      <div className="max-w-3xl mx-auto space-y-5 mb-6 mt-10">
        <div className="grid grid-cols-[120px_1fr] items-center gap-4">
          <label className="text-sm text-gray-700 text-right font-bold">
            <span className="text-red-500">*</span> Nama
          </label>
          <input placeholder="Nama" value={form.nama ?? ""} onChange={(e) => setForm({ ...form, nama: e.target.value })} className="border w-full px-2 py-1 rounded" />
        </div>
        <div className="grid grid-cols-[120px_1fr] items-center gap-4">
          <label className="text-sm text-gray-700 text-right font-bold">
            <span className="text-red-500">*</span> Umur
          </label>
          <input type="number" placeholder="Umur" value={form.umur ?? ""} onChange={(e) => setForm({ ...form, umur: Number(e.target.value) })} className="border w-full px-2 py-1 rounded" min={0} />
        </div>
        <div className="grid grid-cols-[120px_1fr] items-center gap-4">
          <label className="text-sm text-gray-700 text-right font-bold">
            <span className="text-red-500">*</span> Keluhan
          </label>
          <textarea placeholder="Keluhan" value={form.keluhan ?? ""} onChange={(e) => setForm({ ...form, keluhan: e.target.value })} className="border w-full px-2 py-1 rounded" />
        </div>

        <div className="flex justify-end">
          <button onClick={handleSave} className="bg-blue-500 text-white px-3 py-1 rounded cursor-pointer">
            Kirim
          </button>
        </div>
      </div>
    </div>
  );
};

export default PasienDashboard;
