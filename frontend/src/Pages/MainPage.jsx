import CanteenList from "../Components/mainPage/CanteenList";
import Dashboard from "../Components/mainPage/Dashboard";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import { setCanteens } from "../store/Canteen.js";
import { useDispatch } from "react-redux";

let isinitial = false;
function MainPage() {
  const dispatch = useDispatch();

  const [clickedId, setClickedId] = useState(null);

  useEffect(() => {
    if (isinitial) return;
    async function f() {
      const response = await fetch("http://localhost:5000/api/user/dashboard");
      const data = await response.json();
      console.log(data);
      dispatch(setCanteens(data));
    }
    f();
    isinitial = true;
  }, [dispatch]);

  return (
    <>
      <div className="flex max-h-fit w-full bg-white dark:bg-[#0A0A0A]">
        <CanteenList onclick={setClickedId} />
        <Dashboard index={clickedId} />
      </div>
    </>
  );
}

export default MainPage;
