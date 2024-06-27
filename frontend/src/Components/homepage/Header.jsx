/* eslint-disable react/prop-types */
import DarkModeToggle from "../../Customs/DarkModeToggle.jsx";

function Header() {
  return (
    <header className="sticky top-0 z-50 shadow-md shadow-green-500 dark:shadow-[#002616] cust-text h-20 flex items-center">
      <nav className="min-w-full flex items-center justify-between px-6">
        <h1 className="p-2 text-md md:text-xl font-semibold">BiteBuzz</h1>
        <DarkModeToggle />
      </nav>
    </header>
  );
}

export default Header;
