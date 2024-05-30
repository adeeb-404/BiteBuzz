import { motion } from "framer-motion";
import { useTheme } from "../../darkmodecontext";

function Header() {
  const { darkMode, toggleDarkMode } = useTheme();
  return (
    <div className=" bg-white dark:bg-black text-black dark:text-white ">
      <nav className=" min-w-screen flex items-center justify-between px-6">
        <h1 className="p-2 text-xl font-semibold">BiteBuzz</h1>
        <motion.button
          whileTap={{ x: 10, y: -10 }}
          transition={{ type: "spring" }}
          className="p-2 m-4 bg-gray-200 dark:bg-gray-800 rounded"
          onClick={toggleDarkMode}
        >
          Toggle to {darkMode ? "Light" : "Dark"} Mode
        </motion.button>
      </nav>
    </div>
  );
}

export default Header;
