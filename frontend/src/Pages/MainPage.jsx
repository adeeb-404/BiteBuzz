import CanteenList from "../Components/mainPage/CanteenList";
import Dashboard from "../Components/mainPage/Dashboard";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";

function MainPage() {
  const [clickedId, setClickedId] = useState(null);

  return (
    <>
      <div className="flex max-h-fit w-full">
        <CanteenList onclick={setClickedId} />
        <Dashboard index={clickedId} />
      </div>
    </>
  );
}

export default MainPage;
