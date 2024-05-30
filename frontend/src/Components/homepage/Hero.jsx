import image from "../../assets/pizza-3007395.jpg";
function Hero() {
  return (
    <div className=" flex items-center justify-around h-screen p-4 pr-0 dark:text-white dark:bg-black">
      <div className="flex flex-col items-start h-full">
        <h1 className=" text-[4rem] font-extrabold  pt-[10%]">
          Order your cravings with ease
        </h1>
        <div className="flex items-start justify-center w-full h-full pt-20 text-black font-semibold">
          <button className="border-green-600 border-2 m-4 p-4 px-8 rounded-full bg-green-600">
            Login
          </button>
          <button className="border-green-600 border-2 m-4 p-4 px-8 rounded-full bg-green-200">
            Signup
          </button>
        </div>
      </div>
      <img
        src={image}
        alt="image of pizza"
        className="h-full border-t-8 border-l-8 border-green-600 rounded-l-3xl"
      />
    </div>
  );
}

export default Hero;
