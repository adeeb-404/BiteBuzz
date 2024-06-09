import { useState, useEffect } from "react";
import Header from "../Components/homepage/Header";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import { Link, json, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userActions } from "../store/Studentuser";
import { userActions as canteenActions } from "../store/CanteenUser";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const dispatch = useDispatch();
  const [params] = useSearchParams();
  const isStudent = params.get("mode") === "student";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

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
        USN: username,
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
      localStorage.setItem("user", userData.body._id);
      setLoading(() => false);
      return navigator("/");
    }

    const result = {
      phoneNo: username,
      password: password,
    };

    const response = await fetch("http://localhost:5000/api/canteen/login", {
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
    dispatch(canteenActions.setUser(userData.user));
    console.log(userData.user._id);
    localStorage.setItem("user", userData.user._id);
    setLoading(() => false);
    return navigator("/canteen");
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
          <motion.button
            className="absolute right-0 top-0 p-2  border-l-2 border-b-2 border-stone-900 dark:border-green-100 rounded-sm dark:text-green-100"
            whileHover={{ backgroundColor: "lightgreen" }}
            transition={{ type: "spring", duration: 1 }}
            onClick={handleClick}
          >
            X
          </motion.button>
          <div className="flex mb-4  rounded-lg gap-0 dark:border-2 border-green-50  ">
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
            <input
              name="password"
              type="password"
              placeholder="Password"
              className="mb-4 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800 dark:bg-green-200 placeholder:text-gray-800"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              aria-label="Password"
              required
              // minLength={10}
            />
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
