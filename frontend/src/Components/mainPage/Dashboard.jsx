import canteenInfo from "../../assets/CanteenInfo";

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
            <h1>{canteenInfo[index].name}</h1>
            <img src={canteenInfo[index].img} alt="canteen image" className="h-full w-[90%] p-3 rounded-2xl" />
          </div>

          <div className="w-[30%] h-auto flex flex-col gap-5">
            <div>
              <h1 className="py-3">Discrption : </h1>
              <p>{canteenInfo[index].disc}</p>
            </div>
            <h1>Rating : {canteenInfo[index].rating} <span className="text-[2rem]">&#x22C6;</span></h1>
          </div>

        </div>

        <div className="h-[25%]"> 
          <h1 className="py-5 font-bold text-[1.1rem]">Top 5 from this canteen : </h1>
          <div className="flex gap-5 justify-center">
          {canteenInfo[index].top5.map((foods,ind) =>{
            return(
              <div key={ind} className="border bg-gray-300 h-[8rem] w-[8rem] flex flex-col items-center gap-2 rounded-md">
                 <img className="h-[40%] w-[4rem] rounded-md mt-2 " src={foods.foodImg}></img>
                 <h1 className="font-bold">{foods.name}</h1>
                 <div>
                    <p>{foods.rating}</p>
                    <p></p>
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
