/* eslint-disable react/prop-types */
import { useTheme } from "../../darkmodecontext";
function Header() {
  const { darkMode, toggleDarkMode } = useTheme();
  return (
    <header className="sticky top-0  z-50 shadow-md shadow-green-500 dark:shadow-[#002616] cust-text">
      <nav className="min-w-screen flex items-center justify-between px-6">
        <h1 className="p-2 text-md md:text-xl font-semibold">BiteBuzz</h1>
        <button
          className="p-2 m-4 bg-gray-200 dark:bg-gray-800 rounded"
          onClick={toggleDarkMode}
        >
          Toggle to {darkMode ? "Light" : "Dark"} Mode
        </button>
      </nav>
    </header>
  );
}

export default Header;
