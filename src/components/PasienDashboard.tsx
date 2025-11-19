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
    <div className="p-6 space-y-6 mx-auto flex justify-center items-center">

      <div className="formPasienCard bg-white-100 min-w-3xl max-w-3xl pr-15 pt-5 pb-1 shadow-xl mt-15 outline outline-sky-200 rounded-md">
        <div className="formPasienHeader">
          <h1 className="text-xl font-bold mb-4 text-center text-sky-900">Form Pasien</h1>
        </div>
        <div className="formPasienBody">
          <div className="max-w-3xl mx-auto space-y-5 mb-6 mt-10">
            <div className="grid grid-cols-[120px_1fr] items-center gap-4">
              <label className="text-sm text-gray-700 text-right font-bold">
                <span className="text-red-500">*</span> Nama
              </label>
              <input placeholder="Nama" value={form.nama ?? ""} onChange={(e) => setForm({ ...form, nama: e.target.value })} className="border w-full px-2 py-1 rounded focus:outline-2 focus:-outline-offset-2 focus:outline-sky-700" />
            </div>
            <div className="grid grid-cols-[120px_1fr] items-center gap-4">
              <label className="text-sm text-gray-700 text-right font-bold">
                <span className="text-red-500">*</span> Umur
              </label>
              <input type="number" placeholder="Umur" value={form.umur ?? ""} onChange={(e) => setForm({ ...form, umur: Number(e.target.value) })} className="border w-full px-2 py-1 rounded focus:outline-2 focus:-outline-offset-2 focus:outline-sky-700" min={0} />
            </div>
            <div className="grid grid-cols-[120px_1fr] items-center gap-4">
              <label className="text-sm text-gray-700 text-right font-bold">
                <span className="text-red-500">*</span> Keluhan
              </label>
              <textarea placeholder="Keluhan" value={form.keluhan ?? ""} onChange={(e) => setForm({ ...form, keluhan: e.target.value })} className="border w-full px-2 py-1 rounded focus:outline-2 focus:-outline-offset-2 focus:outline-sky-700" />
            </div>

            <div className="flex justify-end">
              {/* <button onClick={handleSave} className="bg-blue-500 text-white px-3 py-1 rounded cursor-pointer">
            Kirim
          </button> */}

              <button onClick={handleSave} className="inline-flex items-center justify-center gap-2 rounded-4xl bg-black px-4 py-2 text-sm/6 font-semibold text-white hover:bg-sky-800 dark:bg-sky-700 dark:hover:bg-sky-600 cursor-pointer">
                Kirim
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasienDashboard;
