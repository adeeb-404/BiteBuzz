import { IoSearch } from "react-icons/io5";
import { MdOutlineShoppingCart } from "react-icons/md";
import { IoSettingsSharp } from "react-icons/io5";
import { RiLogoutCircleLine } from "react-icons/ri";
import { redirect } from "react-router-dom";
import { Link } from "react-router-dom";
function tempHandler() {
  localStorage.removeItem("token");
  return redirect("/home");
}

function HomeNav() {
  return (
    <div className="navbar cust-flex w-full text-[1rem] bg-gray-100 rounded-md gap-4 font-bold md:text-[1.3rem] md:items-center py-2 fixed z-50 top-0">
      <div className=" logo p-1 cust-flex md:px-5 self-start md:pt-0">
        <p className="px-2">logo</p>
        <p className="hidden md:block">BiteBuzz</p>
      </div>

      <div className="flex h-8 bg-white rounded-md">
        <IoSearch className="px-2 size-8 bg-white rounded-lg " />
        <input
          placeholder="Search Canteen"
          className="w-[8rem] h-7 md:w-[25rem] md:h-7 px-2 py-4 rounded-md self font-normal"
          type="text"
        />
      </div>

      <div className="cust-flex gap-2 md:gap-1 md:px-7 md:w-[15%]">
        <MdOutlineShoppingCart className="size-7 md:size-9" />
        {/* <p className="w-[50%]">welcome @user</p> */}
        <IoSettingsSharp className=" size-7 md:size-7" />
        <Link onClick={tempHandler}>
          <RiLogoutCircleLine className=" size-7" />
        </Link>
      </div>
    </div>
  );
}

export default HomeNav;
