/* eslint-disable react/prop-types */
import orderItems from "../../assets/orderItems";
import OrderBox from "./orderBox";

function CanteenDashboard({ index }) {
  console.log(index);
  if (index === null) return <h1 className="py-5 px-8">No order selected</h1>;
  return (
  <div className="w-[80%] m-4 ml-10">
    <div className="py-3">
      <h1 className="font-semibold px-2">{orderItems[index].usn}</h1>
      <h1 className="font-weight-600">({orderItems[index].name})</h1>
    </div>
    <div className="grid grid-cols-5 ">
    {orderItems[index].orderFood.map((foods, ind) => {
      return(
        <OrderBox key={ind} foods ={foods}/>
      )
    })}
    </div>
  </div>
  );
}

export default CanteenDashboard;
