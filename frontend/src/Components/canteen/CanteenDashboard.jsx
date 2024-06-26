/* eslint-disable react/prop-types */
// import orderItems from "../../assets/orderItems";
import OrderBox from "./orderBox";
import { useSelector } from "react-redux";

function CanteenDashboard({ index }) {
  const orderItems = useSelector((state) => state.canteen.currOrders);
  if (index === null)
    return (
      <h1 className="py-5 text-green-900 text-center w-[80%] h-full flex items-center justify-center text-[4rem]">
        No order selected
      </h1>
    );

  return (
    <div className="w-[80%] p-8">
      <div className="py-3">
        <h1 className="font-semibold px-2 text-green-900 text-2xl">
          {orderItems[index].usn}
        </h1>
        <h1 className="font-weight-600 text-green-900">
          ({orderItems[index].name})
        </h1>
      </div>
      <div className="grid grid-cols-5 gap-4">
        {orderItems[index].orders.map((foods, ind) => {
          return <OrderBox key={ind} foods={foods} />;
        })}
      </div>
    </div>
  );
}

export default CanteenDashboard;
