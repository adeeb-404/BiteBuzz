import OrderList from "../Components/canteen/OrderList";
import CanteenDashboard from "../Components/canteen/CanteenDashboard";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../store/CanteenUser.js";

function CanteenPage() {
  const dispatch = useDispatch();
  const doFetch = !useSelector((state) => state.canteen.name);

  useEffect(() => {
    async function getDashboard() {
      const canteenId = localStorage.getItem("canteen");
      const response = await fetch(
        `http://localhost:5000/api/canteen/${canteenId}/profile`
      );
      const data = await response.json();
      dispatch(userActions.setUser(data));
    }

    async function getCurOrders() {
      const canteenId = localStorage.getItem("canteen");
      const response = await fetch(
        `http://localhost:5000/api/canteen/${canteenId}`
      );
      const data = await response.json();
      dispatch(userActions.setCurrOrder(data));
    }
    if (doFetch) {
      getDashboard();
    } else getCurOrders();
  }, [dispatch, doFetch]);

  const [index, setIndex] = useState(null);
  return (
    <div className="flex h-screen fixed w-screen bg-green-50 dark:bg-[#181818]">
      <OrderList setIndex={setIndex} />
      <CanteenDashboard index={index} />
    </div>
  );
}

export default CanteenPage;
