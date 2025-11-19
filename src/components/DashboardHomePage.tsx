// import { useNavigate } from "react-router-dom";
import MedicineVisual from  "../undraw_medicine_hqqg_theme.svg"

// interface MenuItem {
//   privName: string;
//   path: string;
//   title: string;
//   description: string;
// }

const DashboardHomePage = () => {
  // const navigate = useNavigate();

  // const data: MenuItem[] = [
  //   { privName: "Pasien", path: "/pasien", title: "Pasien", description: "Lorem Ipsum" },
  //   { privName: "Dokter", path: "/dokter", title: "Dokter", description: "Lorem Ipsum" },
  //   { privName: "Apoteker", path: "/apoteker", title: "Apoteker", description: "Lorem Ipsum" },
  //   { privName: "Laporan", path: "/laporan", title: "Laporan Kinerja", description: "Lorem Ipsum" },
  // ];

  return (
    <>
    <div className="compWrapper w-full flex justify-center item-center">
      <img src={MedicineVisual} alt="" className="w-100"/>
    </div>
    {/* <div className="imgWrapper flex justify-center item-center w-full h-full">
      <img src={MedicineVisual} alt="" className="w-100"/>
    </div> */}

      {/* <div className="py-10">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-y-6 gap-x-20">
          {data.map((item) => (
            <div key={item.privName} className="bg-white p-6 rounded-xl shadow-sm flex items-start gap-4 hover:shadow-md transition cursor-pointer" onClick={() => navigate(item.path)}>
              <div className="bg-blue-100 p-3 rounded-md">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 text-blue-600">
                  <path d="M12 2a5 5 0 100 10 5 5 0 000-10zm0 12c-4.418 0-8 2.239-8 5v3h16v-3c0-2.761-3.582-5-8-5z" />
                  <path d="M15 14h-2v-2h-2v2H9v2h2v2h2v-2h2z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div> */}
    </>
  );
};

export default DashboardHomePage;
