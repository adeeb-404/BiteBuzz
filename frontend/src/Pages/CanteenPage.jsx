import OrderList from "../Components/canteen/OrderList";
import CanteenDashboard from "../Components/canteen/CanteenDashboard";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { userActions } from "../store/CanteenUser.js";

function CanteenPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    async function getCurOrders() {
      const canteenId = localStorage.getItem("canteen");
      const response = await fetch(
        `http://localhost:5000/api/canteen/${canteenId}`
      );
      const data = await response.json();
      dispatch(userActions.setCurrOrder(data));
    }
    getCurOrders();
  }, [dispatch]);

  const [index, setIndex] = useState(null);
  return (
    <div className="flex h-screen fixed w-screen bg-green-50 dark:bg-[#181818]">
      <OrderList setIndex={setIndex} />
      <CanteenDashboard index={index} />
    </div>
  );
}

export default CanteenPage;
