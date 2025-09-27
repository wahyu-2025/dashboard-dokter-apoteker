import { useContext } from "react";
import { DokterContext } from "./DokterContext";

const useDokterContextProvider = () => {
  const context = useContext(DokterContext);
  if (!context) {
    throw new Error("useDokterContextProvider must be used inside DokterContextProvider");
  }
  return context;
};

export { useDokterContextProvider };
