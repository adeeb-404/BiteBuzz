/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";

function OrderList({ setIndex }) {
  const orderItems = useSelector((state) => state.canteen.currOrders);
  return (
    <div className="w-[20%] h-screen overflow-scroll border-2 border-green-950 bg-green-100">
      <div className=" h-fit flex gap-4 flex-col justify-center items-center">
        <h1 className="text-green-900 font-bold text-2xl mt-4">Order List</h1>
        {orderItems.map((element, index) => {
          return (
            <div
              key={index}
              onClick={() => setIndex(index)}
              className="h-fit w-[80%] flex flex-col justify-center items-center bg-green-200 rounded-lg cursor-pointer transition duration-500 ease-in-out hover:bg-green-300 hover:text-green-900 hover:shadow-2xl group border-2 border-green-900"
            >
              <img
                src={element.orders[0].photo}
                alt={`${element.name.split(" ")[0]}'s order`}
                className="h-[5rem] w-[5rem] m-1 mt-3 rounded-md group-hover:shadow-glow"
              />
              <div className="flex flex-col justify-center mt-2">
                <div className="flex mx-3 w-fit h-fit justify-evenly">
                  <p className="text-[1.1rem] font-bold mx-5 text-green-900">
                    {element.name.split(" ")[0]}
                  </p>
                  <p className="text-[1.1rem] text-green-900">{element.usn}</p>
                </div>
                <div className="text-[1.1rem] mb-2 h-fit flex justify-center items-center">
                  <p className="text-green-900">Arrival Time :</p>
                  <p className="text-green-900 ml-1">{element.arrivalTime}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default OrderList;
