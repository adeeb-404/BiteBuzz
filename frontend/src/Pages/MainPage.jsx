import CanteenList from "../Components/mainPage/CanteenList";
import Dashboard from "../Components/mainPage/Dashboard";
import { useState } from "react";


function MainPage() {
  const [clickedId, setClickedId] = useState(null);

  return (
    <div className="flex w-full h-fit mt-16 fixed">
      <CanteenList onclick={setClickedId}/>
      <Dashboard index={clickedId}/>
    </div>
  );
}

export default MainPage;
