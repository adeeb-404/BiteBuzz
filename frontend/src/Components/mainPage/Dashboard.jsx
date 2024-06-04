import canteenInfo from "../../assets/CanteenInfo";
import { FaStar } from "react-icons/fa6";


function Dashboard({index}) {
  // console.log(index);
  // console.log(canteenInfo[index]);
  if(index == null){
    return(
      <div className="hidden md:block md:w-full h-full overflow-scroll ">
        <div className="mx-4 border-4 border-black md:h-[38rem] rounded-3xl bg-gray-100 flex p-3 flex-col gap-10">No canteen selected</div>
      </div>
    )
  }

  return (
    <div className="hidden md:block md:w-full h-full overflow-scroll ">
      <div className="mx-4 border-4 border-black md:h-[38rem] rounded-3xl bg-gray-100 flex p-3 flex-col gap-10">
        {/* <h1>{index}</h1> */}
        <div className="flex h-[60%]">
          <div className="w-[70%] h-full">
            <h1 className="font-bold">{canteenInfo[index].name}</h1>
            <img src={canteenInfo[index].img} alt="canteen image" className="h-full w-[90%] p-3 rounded-2xl" />
          </div>

          <div className="w-[30%] h-auto flex flex-col gap-5">
            <div>
              <h1 className="py-3 font-bold">Discrption : </h1>
              <p>{canteenInfo[index].disc}</p>
            </div>
            <h1 className="flex flex-row items-center"><div className="font-bold">Rating : </div> <div className="pl-2">{canteenInfo[index].rating}</div> <FaStar className="size-3 m-1"/></h1>
          </div>

        </div>

        <div className="h-[25%]"> 
          <h1 className="py-5 font-bold text-[1.1rem]">Top 5 from this canteen : </h1>
          <div className="flex gap-5 justify-center">
          {canteenInfo[index].top5.map((foods,ind) =>{
            return(
              <div key={ind} className="border bg-gray-300 h-[8rem] w-[8rem] flex flex-col items-center rounded-md justify-around">
                 <h1 className="font-bold">{foods.name}</h1>
                 <img className="h-[4rem] w-[4rem] rounded-md my-1" src={foods.foodImg}></img>
                 <div className="flex w-full justify-around">
                    <div className="w-fit"><span className="text-[1rem]">&#x20B9;</span>{foods.price}</div>
                    <div className="w-fit flex flex-row items-center gap-1"><FaStar className="size-3"/><p>{foods.rating}</p></div>
                 </div>
              </div>
            )
          })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
