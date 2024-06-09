/* eslint-disable react/prop-types */
import canteenInfo from "../../assets/CanteenInfo";

function MainPage({ onclick }) {
  function handleCanteenClick(ind) {
    onclick(ind);
  }

  return (
    <div className="w-[100%] md:mx-4 md:w-[20%] max-h-[89vh] p-5 text-center border-r border-black box-border overflow-scroll pb-12 cursor-pointer">
      <h1 className=" text-3xl">Canteen list</h1>
      {canteenInfo.map((element, ind) => {
        return (
          <div
            onClick={() => handleCanteenClick(ind)}
            key={ind}
            className="group bg-[#ededed] my-4 w-[99%] h-[15rem] flex items-center justify-center flex-col rounded-md cust-canteen-hover"
          >
            <img
              src={element.img}
              alt="canteen"
              className="box-border h-[10rem] w-[12rem] rounded-sm group-hover:border-white group-hover:shadow-glow"
            />
            <h2 className="font-bold mt-2">{element.name}</h2>
          </div>
        );
      })}
    </div>
  );
}

export default MainPage;
