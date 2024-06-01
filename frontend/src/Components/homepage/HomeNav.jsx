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
    <div className="cust-flex mx-3 mt-2 p-5 text-[1.3rem] bg-gray-100 rounded-md  font-bold sticky top-0">
      <div className="cust-flex px-5 self-start">
        <p className="px-2">logo</p>
        <p>BiteBuzz</p>
      </div>

      <div className="flex h-auto bg-white rounded-md">
        <IoSearch className="px-2 size-9" />
        <input
          placeholder="Search Canteen"
          className="w-[25rem] h-7 px-2 py-4 rounded-md self font-normal"
          type="text"
        />
      </div>

      <div className="cust-flex px-7 w-[30%]">
        <MdOutlineShoppingCart className="mx-5 size-10" />
        <p className="w-[50%]">welcome @user</p>
        <IoSettingsSharp className="mx-2 size-7" />
        <Link onClick={tempHandler}>
          <RiLogoutCircleLine className="mx-2 size-7" />
        </Link>
      </div>
    </div>
  );
}

export default HomeNav;
