import HomeNav from "./Components/homepage/HomeNav";
import { Outlet } from "react-router-dom";
function Root() {
  return (
    <>
      <HomeNav />
      <Outlet />
    </>
  );
}

export default Root;
