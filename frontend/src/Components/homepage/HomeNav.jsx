import { IoSearch } from "react-icons/io5";
import { MdOutlineShoppingCart } from "react-icons/md";
import { IoSettingsSharp } from "react-icons/io5";
import { RiLogoutCircleLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userActions } from "../../store/Studentuser";

function HomeNav() {
  const navigator = useNavigate();
  const dispatch = useDispatch();
  function tempHandler() {
    dispatch(userActions.resetUser());
    localStorage.removeItem("user");
    return navigator("/home");
  }
  return (
    <motion.div
      className="navbar cust-flex w-full text-[1rem] bg-gray-100 rounded-md gap-4 font-bold md:text-[1.3rem] md:items-center py-2 fixed z-10 top-0"
      layout
    >
      <div className=" logo p-1 cust-flex md:px-5 self-start md:pt-0">
        <p className="px-2">logo</p>
        <p className="hidden md:block">BiteBuzz</p>
      </div>

      <div className="flex h-8 bg-white rounded-md">
        <IoSearch className="px-2 size-8 bg-white rounded-lg " />
        <input
          placeholder="Search Food"
          className="w-[8rem] h-7 md:w-[25rem] md:h-7 px-2 py-4 rounded-md self font-normal"
          type="text"
        />
      </div>

      <div className="cust-flex gap-2 md:gap-1 md:px-7 md:w-[15%]">
        <motion.div
          whileHover={{ scale: [1.3, 1] }}
          transition={{ duration: 1 }}
        >
          <MdOutlineShoppingCart className="size-7 md:size-9" />
        </motion.div>
        {/* <p className="w-[50%]">welcome @user</p> */}
        <motion.div whileHover={{ rotate: -45 }} transition={{ duration: 0.5 }}>
          <Link to="/settings">
            <IoSettingsSharp className=" size-7 md:size-7" />
          </Link>
        </motion.div>

        <motion.div
          whileHover={{ color: "red", border: "2px solid red" }}
          transition={{ type: "spring", duration: 1 }}
          style={{ border: "2px solid white" }}
        >
          <Link onClick={tempHandler}>
            <RiLogoutCircleLine className=" size-7" />
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default HomeNav;
