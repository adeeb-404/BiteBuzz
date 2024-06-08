import orderItems from "../assets/orderItems";
import OrderList from "../Components/canteen/OrderList";
import CanteenDashboard from "../Components/canteen/CanteenDashboard";

function CanteenPage() {

  return (
  <div className="text-3xl flex h-screen pt-14 fixed w-full">
    <OrderList onclick={index}/>
    <CanteenDashboard />
  </div>
  )
}

export default CanteenPage;
