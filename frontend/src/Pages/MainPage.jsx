import CanteenList from "../Components/mainPage/CanteenList";
import Dashboard from "../Components/mainPage/Dashboard";

function MainPage() {
  return (
    <div className="flex w-full h-fit mt-16 fixed">
      <CanteenList />
      <Dashboard />
    </div>
  );
}

export default MainPage;
