import canteen1 from "../../assets/canteen1.jpg";
import canteen2 from "../../assets/canteen2.jpg";
import canteen3 from "../../assets/canteen3.jpg";

function MainPage() {
  const canteenInfo = [
    { name: "Srikantu", img: canteen1 },
    { name: "Red canteen", img: canteen2 },
    { name: "Srikantu", img: canteen1 },
    { name: "Red canteen", img: canteen2 },
    { name: "Srikantu", img: canteen1 },
    { name: "Green canteen", img: canteen3 },
    { name: "Srikantu", img: canteen1 },
    { name: "Green canteen", img: canteen3 },
  ];

  return (
    <div className="w-[100%] md:mx-4 md:w-[20%] h-screen px-5 text-center border-r border-black box-border overflow-scroll pb-12">
      <h1 className=" text-3xl">Canteen list</h1>
      {canteenInfo.map((element, ind) => {
        return (
          <div
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
