import { createContext, useState, useEffect, type Dispatch, type SetStateAction } from "react";
import type { PasienFormData } from "../PasienDashboard";

export interface DokterFormData {
  penyakit: string | null;
  gejala: string | null;
  resep: string | null;
  status: "Menunggu" | "Diproses" | "Selesai";
  history: { status: "Menunggu" | "Diproses" | "Selesai"; timestamp: string }[];
}

interface DokterContextType {
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  dokterDataList: DokterFormData[];
  pasienDataList: PasienFormData[];
  addData: (data: DokterFormData) => void;
  deleteData: (index: number) => void;
  updateStatus: (index: number, newStatus: "Menunggu" | "Diproses" | "Selesai") => void;
  addPasien: (data: PasienFormData) => void;
  deletePasien: (index: number) => void;
  updatePasienStatus: (index: number, newStatus: "Menunggu Dokter" | "Sudah Didiagnosa" | "Selesai") => void;
}

const DokterContext = createContext<DokterContextType | undefined>(undefined);

const STORAGE_KEY_DOKTER = "dokter-data-list";
const STORAGE_KEY_PASIEN = "pasien-data-list";

const DokterContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(false);
  // Dokter data
  const [dokterDataList, setDokterDataList] = useState<DokterFormData[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_DOKTER);
    return saved ? JSON.parse(saved) : [];
  });

  // Pasien data
  const [pasienDataList, setPasienDataList] = useState<PasienFormData[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_PASIEN);
    return saved ? JSON.parse(saved) : [];
  });

  // Sync ke localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_DOKTER, JSON.stringify(dokterDataList));
  }, [dokterDataList]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_PASIEN, JSON.stringify(pasienDataList));
  }, [pasienDataList]);

  // Dokter
  const addData = (data: DokterFormData) => {
    setDokterDataList((prev) => [...prev, data]);
  };

  const deleteData = (index: number) => {
    setDokterDataList((prev) => prev.filter((_, i) => i !== index));
  };

  const updateStatus = (index: number, newStatus: "Menunggu" | "Diproses" | "Selesai") => {
    setDokterDataList((prev) =>
      prev.map((item, i) =>
        i === index
          ? {
              ...item,
              status: newStatus,
              history: [...item.history, { status: newStatus, timestamp: new Date().toISOString() }],
            }
          : item
      )
    );
  };

  // Pasien
  const addPasien = (data: PasienFormData) => {
    setPasienDataList((prev) => [...prev, data]);
  };

  const deletePasien = (index: number) => {
    setPasienDataList((prev) => prev.filter((_, i) => i !== index));
  };

  const updatePasienStatus = (index: number, newStatus: "Menunggu Dokter" | "Sudah Didiagnosa" | "Selesai") => {
    setPasienDataList((prev) => {
      const updated = [...prev];
      if (updated[index]) {
        updated[index].status = newStatus;
        updated[index].history?.push({
          status: newStatus,
          timestamp: new Date().toISOString(),
        });
      }
      return updated;
    });
  };

  return (
    <DokterContext.Provider
      value={{
        loading,
        setLoading,
        dokterDataList,
        pasienDataList,
        addData,
        deleteData,
        updateStatus,
        addPasien,
        deletePasien,
        updatePasienStatus,
      }}
    >
      {children}
    </DokterContext.Provider>
  );
};

export { DokterContext, DokterContextProvider };
