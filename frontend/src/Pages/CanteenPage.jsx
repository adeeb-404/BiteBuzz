import OrderList from "../Components/canteen/OrderList";
import CanteenDashboard from "../Components/canteen/CanteenDashboard";
import { useState } from "react";

function CanteenPage() {
  const [index, setIndex] = useState(null);
  return (
    <div className="flex h-screen fixed w-screen bg-green-50 dark:bg-[#181818]">
      <OrderList setIndex={setIndex} />
      <CanteenDashboard index={index} />
    </div>
  );
}

export default CanteenPage;
