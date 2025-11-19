import { useState } from "react";
import { useDokterContextProvider } from "./hooks/useDokterContext";
import { Search } from "lucide-react";
import DeleteResep from "./blocks/DeleteResep";

const ApotekerDashboard: React.FC = () => {
  const { dokterDataList, deleteData, updateStatus } = useDokterContextProvider();
  const [search, setSearch] = useState("");
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);

  const filtered = dokterDataList.filter((item) => item.penyakit?.toLowerCase().includes(search.toLowerCase()) || item.gejala?.toLowerCase().includes(search.toLowerCase()));

  const handleOpenDelete = (index: number) => {
    setDeleteIndex(index);
  };

  const handleConfirmDelete = () => {
    if (deleteIndex !== null) {
      deleteData(deleteIndex);
      setDeleteIndex(null);
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto mt-15">
      <div className="dashboardApotekerCard outline outline-sky-200 rounded shadow-xl pt-5 pb-6 px-6">
        <div className="dashboardApotekerHeader">
          <h1 className="text-2xl font-bold mb-6 text-center text-cyan-900">Dashboard Apoteker</h1>
        </div>

        <div className="dashboardApotekerBody">
          {/* Search box */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Cari penyakit atau gejala..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Result list */}
          {filtered.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-4">
              {filtered.map((item, index) => (
                <div key={index} className="p-4 border rounded-xl shadow hover:shadow-lg transition bg-white">
                  <p className="font-semibold text-blue-600">
                    🦠 Penyakit: <span className="text-gray-800">{item.penyakit}</span>
                  </p>
                  <p className="text-gray-600 mt-1">
                    🤒 Gejala: <span className="font-medium">{item.gejala}</span>
                  </p>
                  <p className="mt-2">
                    💊 <span className="font-semibold text-green-600">Resep:</span> {item.resep}
                  </p>

                  {/* Status sekarang */}
                  <p className="mt-2">
                    📌 Status: <span className="font-semibold">{item.status}</span>
                  </p>

                  {/* Tombol aksi */}
                  <div className="flex gap-2 justify-end mt-3">
                    {item.status === "Menunggu" && (
                      <button className="bg-yellow-500 text-white px-3 py-1 text-sm rounded" onClick={() => updateStatus(index, "Diproses")}>
                        Proses
                      </button>
                    )}

                    {item.status !== "Selesai" && (
                      <button className="bg-green-500 text-white px-3 py-1 text-sm rounded" onClick={() => updateStatus(index, "Selesai")}>
                        Tandai Selesai
                      </button>
                    )}

                    <button className="bg-blue-400 text-white px-3 py-1 text-sm rounded" onClick={() => handleOpenDelete(index)}>
                      Hapus
                    </button>
                  </div>

                  {/* Riwayat status */}
                  {item.history && (
                    <div className="mt-3 text-xs text-gray-500">
                      <p className="font-semibold">Riwayat:</p>
                      <ul className="list-disc pl-4">
                        {item.history.map((h, i) => (
                          <li key={i}>
                            {h.status} – {new Date(h.timestamp).toLocaleString()}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 mt-4">Tidak ada data yang cocok.</p>
          )}
        </div>
      </div>

      {/* Delete Dialog */}
      <DeleteResep isOpen={deleteIndex !== null} onClose={() => setDeleteIndex(null)} onConfirm={handleConfirmDelete} />
    </div>
  );
};

export default ApotekerDashboard;
