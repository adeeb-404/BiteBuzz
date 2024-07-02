import { useSelector } from "react-redux";
import BackButton from "../Customs/BackButton";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

// const orderedDetail = [
//   {
//     studentName: "Adeeb",
//     orderedFood: [
//       {
//         foodName: "Idli",
//         price: 30,
//         quantity: 2,
//         orderedTime: "11:00AM",
//         foodImg:
//           "https://www.vegrecipesofindia.com/wp-content/uploads/2021/06/idli-recipe-4-500x500.jpg",
//       },
//       {
//         foodName: "Vada",
//         price: 20,
//         quantity: 3,
//         orderedTime: "11:00AM",
//         foodImg:
//           "https://c.ndtvimg.com/2023-09/u113o4r_medu-vada_625x300_06_September_23.jpg",
//       },
//     ],
//   },
//   {
//     studentName: "John",
//     orderedFood: [
//       {
//         foodName: "Pizza",
//         price: 50,
//         quantity: 1,
//         orderedTime: "11:00AM",
//         foodImg:
//           "https://content.jdmagicbox.com/comp/mysore/w1/0821px821.x821.190913203137.a3w1/catalogue/ovenstory-pizza-vijaynagar-1st-stage-mysore-h9wuaxkcc7.jpg",
//       },
//       {
//         foodName: "Burger",
//         price: 40,
//         quantity: 4,
//         orderedTime: "11:00AM",
//         foodImg:
//           "https://www.foodandwine.com/thmb/DI29Houjc_ccAtFKly0BbVsusHc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/crispy-comte-cheesburgers-FT-RECIPE0921-6166c6552b7148e8a8561f7765ddf20b.jpg",
//       },
//     ],
//   },
//   {
//     studentName: "Alice",
//     orderedFood: [
//       {
//         foodName: "Fries",
//         price: 15,
//         quantity: 5,
//         orderedTime: "11:00AM",
//         foodImg:
//           "https://www.foodandwine.com/thmb/DI29Houjc_ccAtFKly0BbVsusHc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/crispy-comte-cheesburgers-FT-RECIPE0921-6166c6552b7148e8a8561f7765ddf20b.jpg",
//       },
//     ],
//   },
// ];

function CanteenHistory() {
  const navigate = useNavigate();
  const history = useSelector((state) => state.canteen.history);
  const [orderedDetail] = useState(history);

  function handleClick() {
    navigate("..");
  }
  return (
    <div className="bg-green-50 dark:bg-[#121212] min-h-screen py-10">
      <BackButton
        className="mb-5 py-2 px-4 inline bg-green-700 dark:bg-green-600 text-white rounded-lg hover:bg-green-800 dark:hover:bg-green-700 transition duration-300"
        onClick={handleClick}
      >
        Back
      </BackButton>
      <h1 className="text-4xl font-bold text-green-900 dark:text-green-200 mb-10 text-center">
        History
      </h1>
      <div className="flex flex-col items-center">
        {orderedDetail &&
          orderedDetail.map((student, index) => {
            return (
              <div
                key={index}
                className="w-full max-w-4xl bg-white dark:bg-[#1e1e1e] shadow-lg rounded-lg p-5 mb-5 border-2 border-green-300 dark:border-green-700"
              >
                <h2 className="text-2xl font-bold text-green-900 dark:text-green-200 mb-4">
                  Ordered by: {student.name}
                </h2>
                <p className="text-sm text-green-600 dark:text-green-500">
                  Arrival Time: {student.arrivalTime}
                </p>
                <p className="text-lg text-green-700 dark:text-green-400">
                  Price: ₹{student.price}
                </p>
                {student.orders.map((foods, index) => {
                  return (
                    <div
                      key={index}
                      className="flex items-center border-b border-green-200 dark:border-green-800 p-4 hover:bg-green-50 dark:hover:bg-[#2e2e2e]"
                    >
                      <img
                        src={foods.photo}
                        alt="Food Image"
                        className="w-20 h-20 rounded-lg"
                      />
                      <div className="ml-4">
                        <h3 className="text-xl text-green-900 dark:text-green-200">
                          {foods.itemName}
                        </h3>

                        <p className="text-lg text-green-700 dark:text-green-400">
                          Quantity: {foods.quantity}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default CanteenHistory;
