import OrderList from "../Components/canteen/OrderList";
import CanteenDashboard from "../Components/canteen/CanteenDashboard";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../store/CanteenUser.js";
import HomeNav from "../Components/homepage/canteen/HomeNav";

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

  useEffect(() => {
    const timer = setInterval(() => {
      async function getCurOrders() {
        const canteenId = localStorage.getItem("canteen");
        const response = await fetch(
          `http://localhost:5000/api/canteen/${canteenId}`
        );
        const data = await response.json();
        console.log(data);
        dispatch(userActions.setCurrOrder(data));
      }
      getCurOrders();
    }, 5000);

    return () => {
      clearInterval(timer);
    };
  }, [dispatch]);

  const [index, setIndex] = useState(null);
  return (
    <>
      <HomeNav />
      <div className="flex h-screen fixed w-screen bg-green-50 dark:bg-[#181818]">
        <OrderList setIndex={setIndex} />
        <CanteenDashboard index={index} />
      </div>
    </>
  );
}

export default CanteenPage;
