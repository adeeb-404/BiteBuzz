import image from "../../assets/pizza-3007395_1280.jpg";
import { motion } from "framer-motion";
import { useTheme } from "../../darkmodecontext";
function Hero() {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <div className="h-fit">
      <header className="sticky top-0  z-50 shadow-lg shadow-green-500 dark:shadow-[#002616] cust-text">
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
      <div className="flex items-center justify-around h-screen pl-4 md:p-4 md:pl-0 cust-text dark:border-white border-black flex-col md:flex-row">
        <motion.img
          src={image}
          alt="image of pizza"
          animate={{ x: [500, 0] }}
          transition={{ duration: 2, type: "spring" }}
          className="h-auto md:h-full rounded-l-3xl md:border-t-2 md:border-r-2 shadow-lg md:shadow-xl md:shadow-green-950 shadow-green-950 dark:shadow-[#002616] dark:border-gray-900 md:rounded-r-3xl md:rounded-l-none md:mr-8 z-30"
        />
        <motion.div
          className="flex flex-col items-start h-full"
          animate={{ x: [-500, 0] }}
          transition={{ duration: 2, type: "spring" }}
        >
          <h1 className=" text-[3rem] md:text-[4rem] font-extrabold pt-[10%]">
            Order your cravings with ease
          </h1>
          <div className="flex items-start justify-center w-full h-full md:pt-20 text-black font-semibold">
            <motion.button
              className="border-green-600 border-2 m-4 p-3 md:p-4 px-6 md:px-8 rounded-full bg-green-600"
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.1, backgroundColor: "#bef264" }}
              transition={{ type: "spring" }}
            >
              Login
            </motion.button>
            <motion.button
              className="border-green-600 border-2 m-4 p-3 md:p-4 px-6 md:px-8 rounded-full bg-green-200"
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.1, backgroundColor: "#bef264" }}
              transition={{ type: "spring" }}
            >
              Signup
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Hero;
