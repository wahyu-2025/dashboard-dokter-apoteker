const Navbar = () => {
  return (
    <div className="navbar py-7 flex items-center justify-between px-10 bg-blue-400 sticky top-0 z-50">
      <div className="logo">
        <h1 className="text-2xl font-bold">
          <a href="/">Dashoard Kesehatan</a>
        </h1>
      </div>
      <ul className="menu flex items-center gap-10 text-white font-bold mr-10">
        <li className="hover:text-zinc-900">
          <a href="/pasien">Pasien</a>
        </li>
        <li className="hover:text-zinc-900">
          <a href="/dokter">Dokter</a>
        </li>
        <li className="hover:text-zinc-900">
          <a href="/apoteker">Apoteker</a>
        </li>
        <li className="hover:text-zinc-900">
          <a href="/laporan">Laporan Kinerja</a>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
