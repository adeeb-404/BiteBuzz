import HomeNav from "./Components/homepage/canteen/HomeNav";
import { Outlet } from "react-router-dom";
function CanteenRoot() {
  return (
    <>
      <HomeNav />
      <Outlet />
    </>
  );
}

export default CanteenRoot;
