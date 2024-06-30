/* eslint-disable react/prop-types */
import { FaStar } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Dashboard({ index }) {
  const canteenInfo = useSelector((state) => state.canteenInfo.data);
  const canteen = canteenInfo.find((ele) => ele._id == index);
  if (index == null) {
    return (
      <div className="hidden md:block md:w-full m-3 h-full overflow-hidden">
        <div className="mx-4 border-4 border-green-600 md:h-[38rem] rounded-3xl bg-green-100 flex p-3 flex-col gap-10 text-4xl">
          <h1 className="flex items-center justify-center h-[80%]">
            No canteen selected
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="hidden md:block md:w-full h-full m-3 overflow-hidden">
      <div className="mx-4 border-4 border-green-600 md:h-[38rem] rounded-3xl bg-green-100 flex p-3 flex-col gap-10">
        <div className="flex h-[60%]">
          <div className="w-[70%] h-full">
            <h1 className="font-bold text-green-900">{canteen.name}</h1>
            <img
              src={canteen.photo}
              alt="canteen image"
              className="h-full w-[90%] p-3 rounded-3xl"
            />
          </div>

          <div className="w-[30%] h-auto flex flex-col gap-5">
            <div>
              <h1 className="py-3 font-bold text-green-900">Description :</h1>
              <p className="text-green-700">{canteen.description}</p>
            </div>
            <h1 className="flex flex-row items-center text-green-900">
              <div className="font-bold">Rating :</div>
              <div className="pl-2">{canteen.rating}</div>
              <FaStar className="text-yellow-500 m-1" />
            </h1>
            {/* Buttons */}
            <div className="flex justify-center gap-4 mt-4">
              <Link
                className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition duration-300"
                to={`${canteen._id}`}
              >
                Menu
              </Link>
              <Link
                className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition duration-300"
                to={`${canteen._id}/history`}
              >
                History
              </Link>
            </div>
          </div>
        </div>

        <div className="h-[25%]">
          <h1 className="py-2 font-bold text-[1.1rem] text-green-900">
            Popular Dishes :
          </h1>
          <div className="flex gap-5 justify-center">
            {canteen.top5.map((foods, ind) => {
              return (
                <div
                  key={ind}
                  className="border bg-green-200 h-[8rem] w-[8rem] flex flex-col items-center rounded-md justify-around transition duration-300 ease-in-out transform hover:scale-105 border-green-500"
                >
                  <h1 className="font-bold text-green-900">{foods.dishName}</h1>
                  <img
                    className="h-[4rem] w-[4rem] rounded-md my-1"
                    src={foods.photo}
                    alt={foods.dishName}
                  />
                  <div className="flex w-full justify-around text-green-900">
                    <div className="w-fit">
                      <span className="text-[1rem]">&#x20B9;</span>
                      {foods.price}
                    </div>
                    <div className="w-fit flex flex-row items-center gap-1">
                      <FaStar className="text-yellow-500" />
                      <p>{foods.rating.currRating}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
