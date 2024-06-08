// import orderItems from "../assets/orderItems";
import OrderList from "../Components/canteen/OrderList";
import CanteenDashboard from "../Components/canteen/CanteenDashboard";
import { useState } from "react";

function CanteenPage() {
  const [index, setIndex] = useState(null);
  return (
    <div className="text-3xl flex h-screen pt-14 fixed w-full">
      <OrderList setIndex={setIndex} />
      <CanteenDashboard index={index} />
    </div>
  );
}

export default CanteenPage;
