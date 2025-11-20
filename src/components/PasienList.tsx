import React from "react";
import type { PasienFormData } from "./PasienDashboard";

interface PasienListProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: (index: number) => void;
  pasienData: PasienFormData[];
  onSelect: (index: number) => void;
  selectedIndex: number | null;
}

const PasienList: React.FC<PasienListProps> = ({ pasienData, onSelect, selectedIndex, isOpen, onClose, onDelete }) => {
  if (!isOpen) return;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center 
    bg-black/30 backdrop-blur-sm z-50"
    >
      <div className="bg-white rounded-lg p-6 shadow-lg max-w-lg w-full max-h-[70vh] flex flex-col">
        <div className="flex justify-between mb-4 flex-none">
          <h2 className="font-semibold text-lg">Data Pasien</h2>
          <button className="text-sm p-2 rounded cursor-pointer hover:bg-gray-100" onClick={onClose}>
            X
          </button>
        </div>

        <ul className="space-y-2 overflow-y-auto flex-1 pr-2">
          {pasienData && pasienData.length > 0 ? (
            pasienData.map((p, i) => (
              <li key={i} className={`border p-3 rounded cursor-pointer ${selectedIndex === i ? "bg-blue-100 border-blue-500" : "hover:bg-gray-50"}`} onClick={() => onSelect(i)}>
                <p>
                  <span className="font-bold">{p.nama}</span> ({p.umur} tahun)
                </p>
                <p>Keluhan: {p.keluhan}</p>
                <p>
                  Status: <span className={`px-2 py-1 text-xs rounded ${p.status === "Menunggu Dokter" ? "bg-yellow-100 text-yellow-800" : "bg-green-100 text-green-800"}`}>{p.status}</span>
                </p>

                <div className="flex justify-end">
                  <button className="cursor-pointer bg-blue-400 text-white rounded p-2 text-sm" onClick={() => onDelete(i)}>
                    Hapus
                  </button>
                </div>
              </li>
            ))
          ) : (
            <p className="text-center py-2">Tidak ada pasien.</p>
          )}
        </ul>
        <div className="flex justify-end pt-3">
          <button className="bg-blue-400 text-white p-2 cursor-pointer rounded" onClick={onClose}>
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};

export default PasienList;
