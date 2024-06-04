import CanteenList from "../Components/mainPage/CanteenList";
import Dashboard from "../Components/mainPage/Dashboard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";

function MainPage() {
  useEffect(() => {
    toast.success("Order Placed", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  }, []);

  return (
    <>
      <ToastContainer />
      <div className="flex w-full h-fit mt-16 fixed">
        <CanteenList />
        <Dashboard />
      </div>
    </>
  );
}

export default MainPage;
