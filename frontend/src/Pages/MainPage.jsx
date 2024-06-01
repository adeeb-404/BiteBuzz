import CanteenList from "../Components/mainPage/CanteenList";
import Dashboard from "../Components/mainPage/Dashboard";

function MainPage() {
  return (
    <div className="flex w-full h-screen relative ">
      <CanteenList />
      <Dashboard />
    </div>
  );
}

export default MainPage;
