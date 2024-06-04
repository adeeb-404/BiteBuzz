import canteenInfo from "../assets/CanteenInfo"
import menuItems from "../assets/menuItems"
import MenuFoodBox from "../Components/menu/MenuFoodBox";


function Menu() {

    console.log(menuItems[0].foodItems[0].foodImg)
    const selectedCanteen = menuItems[0];
    return (
    <div className="h-screen fixed w-full">
        <div className="text-3xl relative m-[3.6rem] bg-slate-500 h-[90%] w-[90%] rounded-lg p-5">
            <h1 className="font-bold mb-2">{menuItems[0].name}</h1>
            <div className="grid grid-cols-6 px-10 py-4">
            {selectedCanteen.foodItems.map((element, index) => {
                const currFood = selectedCanteen.foodItems[index];
                return (
                    <MenuFoodBox currFood ={currFood}/>
                )
            })}
            </div>
        </div>
    </div>
  )
}

export default Menu