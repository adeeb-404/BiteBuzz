import { IoSearch } from "react-icons/io5";
import { MdOutlineShoppingCart } from "react-icons/md";
import { IoSettingsSharp } from "react-icons/io5";
import { RiLogoutCircleLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userActions as studentActions } from "../../store/Studentuser";
import { userActions as canteenActions } from "../../store/CanteenUser";

function HomeNav() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const tempHandler = () => {
    dispatch(studentActions.resetUser());
    dispatch(canteenActions.resetUser());
    localStorage.removeItem("user");
    navigate("/home");
  };

  return (
    <motion.div
      className="navbar flex items-center w-full text-lg bg-gradient-to-br from-green-800 via-green-600 to-green-400 p-4 shadow-lg relative top-0 z-10"
      layout
    >
      <div className="logo flex items-center space-x-2 text-white">
        <div className="text-2xl font-bold">B</div>
        <div className="hidden md:block text-xl font-semibold">BiteBuzz</div>
      </div>

      <div className="flex flex-grow mx-4">
        <div className="relative w-full max-w-md">
          <IoSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search Food"
            className="w-full pl-10 pr-4 py-2 rounded-full bg-white shadow-inner focus:outline-none"
          />
        </div>
      </div>

      <div className="flex space-x-6 text-white">
        <motion.div
          whileHover={{ scale: 1.2 }}
          transition={{ duration: 0.3 }}
          className="cursor-pointer"
        >
          <MdOutlineShoppingCart className="text-3xl" />
        </motion.div>

        <motion.div
          whileHover={{ rotate: -45 }}
          transition={{ duration: 0.5 }}
          className="cursor-pointer"
        >
          <Link to="/settings">
            <IoSettingsSharp className="text-3xl" />
          </Link>
        </motion.div>

        <motion.div
          whileHover={{
            color: "red",
            borderColor: "red",
            transform: "rotate(90deg)",
          }}
          transition={{ type: "spring", duration: 0.5 }}
          className="cursor-pointer border-2 border-white rounded-full p-1"
        >
          <Link onClick={tempHandler}>
            <RiLogoutCircleLine className="text-2xl" />
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default HomeNav;
