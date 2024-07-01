import { useState, useEffect } from "react";
import Header from "../Components/homepage/Header";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import { Link, json, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userActions } from "../store/Studentuser";
import { userActions as canteenActions } from "../store/CanteenUser";
import "react-toastify/dist/ReactToastify.css";
import { FaRegEyeSlash } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";

function Login() {
  const dispatch = useDispatch();
  const [params] = useSearchParams();
  const isStudent = params.get("mode") === "student";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const navigator = useNavigate();

  function handleClick() {
    navigator("..");
  }
  useEffect(() => {
    if (error)
      toast.error(error.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    setError(() => null);
    setLoading(() => false);
  }, [error]);

  async function LoginAction(e) {
    e.preventDefault();
    setLoading(() => true);
    if (isStudent) {
      const result = {
        usn: username,
        password: password,
      };

      const response = await fetch("http://localhost:5000/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(result),
      });
      if (response.status == 400) {
        const data = await response.json();
        setError({ message: data.message });
        setLoading(() => false);
        return;
      }

      if (!response.ok) {
        setLoading(() => false);
        throw new json(
          { message: "Server error" },
          { status: 500, statusText: "An error occurred" && response.message }
        );
      }

      const userData = await response.json();
      console.log(userData);
      dispatch(userActions.setUser(userData.body));
      console.log(userData.body._id);
      localStorage.setItem("student", userData.body._id);
      setLoading(() => false);
      return navigator("/user");
    }

    const result = {
      phone: username,
      password: password,
    };

    const response = await fetch("http://localhost:5000/api/canteen/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(result),
    });
    if (response.status == 404) {
      const data = await response.json();
      setError({ message: data.message });
      setLoading(() => false);
      return;
    }

    if (!response.ok) {
      setLoading(() => false);
      throw new json(
        { message: "Server error" },
        { status: 500, statusText: "An error occurred" && response.message }
      );
    }

    const userData = await response.json();
    console.log(userData);
    dispatch(canteenActions.setUser(userData.body));
    localStorage.setItem("canteen", userData.body._id);
    setLoading(() => false);
    return navigator("/canteen");
  }

  function makePasswordVisible(){
    setPasswordVisible(!passwordVisible);
  }

  return (
    <>
      <Header />
      <ToastContainer limit={5} />
      <div className="h-screen flex items-center justify-center bg-green-100 dark:bg-[#000300]">
        <motion.div
          className="flex flex-col items-center border-2 border-gray-800 dark:border-green-100 rounded-md bg-white dark:bg-black p-8 shadow-lg relative"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
        >
          <button
            className=" border-2 border-black group hover:border-green-500 w-9 h-9 duration-500 overflow-hidden absolute top-0 right-0"
            type="button"
            onClick={handleClick}
          >
            <p className="font-Manrope text-3xl h-full w-full flex items-center justify-center text-black dark:text-green-200 duration-500 relative z-10 group-hover:scale-0">
              ×
            </p>
            <span className="absolute w-full h-full bg-green-500 rotate-45 group-hover:top-6 duration-500 top-12 left-0"></span>
            <span className="absolute w-full h-full bg-green-500 rotate-45 top-0 group-hover:left-6 duration-500 left-12"></span>
            <span className="absolute w-full h-full bg-green-500 rotate-45 top-0 group-hover:right-6 duration-500 right-12"></span>
            <span className="absolute w-full h-full bg-green-500 rotate-45 group-hover:bottom-6 duration-500 bottom-12 right-0"></span>
          </button>

          <div className="flex my-4  rounded-lg gap-0 dark:border-2 border-green-50 ">
            <Link
              className={`px-8 py-2  rounded-l-md ${
                isStudent
                  ? "bg-gray-800 text-white dark:bg-green-200 dark:text-black font-bold"
                  : "bg-white text-gray-800 border-gray-800 dark:bg-black dark:text-white font-bold"
              }`}
              to="?mode=student"
              disabled={isStudent}
            >
              Student
            </Link>
            <Link
              to="?mode=canteen"
              disabled={!isStudent}
              className={`px-8 py-2  rounded-r-md ${
                !isStudent
                  ? "bg-gray-800 text-white dark:bg-green-200 dark:text-black font-bold"
                  : "bg-white text-gray-800 border-gray-800 dark:bg-black dark:text-white font-bold"
              }`}
            >
              Canteen
            </Link>
          </div>
          <form className="flex flex-col" method="post" onSubmit={LoginAction}>
            <input
              name="USN"
              type="text"
              placeholder={`${isStudent ? "USN" : "PhoneNo"}`}
              className="mb-4 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800 dark:bg-green-200 placeholder:text-gray-800"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              aria-label="Username"
              required
              minLength={10}
            />
            <div className="flex mb-4 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800 focus:outline focus-within:border-[#36454F] h-[2.5rem] dark:bg-green-200 pr-2 ">
              <input
                name="password"
                type={passwordVisible? "text" : "password"}
                placeholder="Password"
                className="p-2 h-full w-full dark:bg-green-200 placeholder:text-gray-800 focus:ring-0 focus:outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                aria-label="Password"
                required
                minLength={6}
              />
              <div
                    className="flex items-center justify-center cursor-pointer"
                    onClick={() => makePasswordVisible()}
                  >
                    {passwordVisible ? (
                      <IoEyeOutline className="text-green-700 text-xl" />
                    ) : (
                      <FaRegEyeSlash className="text-green-700 text-xl" />
                    )}
                  </div>
            </div>
            <input
              type="text"
              name="userType"
              defaultValue={isStudent ? "student" : "canteen"}
              className=" hidden"
            />
            <button
              type="submit"
              className="bg-gray-800 text-white py-2 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-800"
              disabled={loading}
            >
              {`${loading ? "Validating..." : "Login"}`}
            </button>
          </form>
        </motion.div>
      </div>
    </>
  );
}

export default Login;
