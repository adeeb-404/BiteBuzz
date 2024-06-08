/* eslint-disable react/prop-types */
import orderItems from "../../assets/orderItems";

function OrderList({ setIndex }) {
  
  
  return (
    <div className="w-[20%] h-screen overflow-scroll">
      <div className="bg-gray-100 h-fit flex gap-2 flex-col justify-center items-center">
        <h1>Order List</h1>
        {orderItems.map((element, index) => {
          return (
            <div
              key={index}
              onClick={() => setIndex(index)}
              className="h-fit w-[80%] flex flex-col justify-center items-center bg-gray-400 rounded-lg cursor-pointer transition duration-500 ease-in-out hover:bg-[#3d3d3d] dark:hover:bg-[#b1b0b0] hover:text-[#dcfef4] dark:hover:text-green-100 hover:shadow-2xl group"
            >
              <img
                src={element.orderFood[0].foodImg}
                className="h-[5rem] w-[5rem] m-1 mt-3 rounded-md group-hover:shadow-glow"
              ></img>
              <div className="flex flex-col justify-center mt-2">
                <div className="flex mx-3 w-fit h-fit justify-evenly">
                  <p className="text-[1.1rem] font-bold mx-5">{element.name.split(' ')[0]}</p>
                  <p className="text-[1.1rem]">{element.usn}</p>
                </div>
                <div className="text-[1.1rem] mb-2 h-fit flex justify-center items-center">
                  {" "}
                  <p>Arrival Time : </p>
                  <p> {element.arrivalTime}</p>
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
