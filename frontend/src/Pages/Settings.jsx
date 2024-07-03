import { useNavigate, useSubmit } from "react-router-dom";
import {
  FaUser,
  FaBell,
  FaLock,
  FaRegEyeSlash,
  FaMoon,
  FaSun,
} from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";
import BackButton from "../Customs/BackButton";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { userActions } from "../store/CanteenUser.js";
import { useTheme } from "../darkmodecontext";
import { userActions as studentActions } from "../store/Studentuser.js";

function SettingsPage() {
  const navigator = useNavigate();
  const submit = useSubmit();
  const dispatch = useDispatch();
  const doFetch = !useSelector((state) => state.canteen.name);

  const isStudent = localStorage.getItem("student");
  const { darkMode, toggleDarkMode } = useTheme();
  useEffect(() => {
    async function getDashboard() {
      let iD = localStorage.getItem("canteen");
      if (isStudent) iD = localStorage.getItem("student");
      const response = await fetch(
        `http://localhost:5000/api/${
          isStudent ? "user" : "canteen"
        }/${iD}/profile`
      );
      const data = await response.json();
      if (isStudent) dispatch(studentActions.setUser(data));
      else dispatch(userActions.setUser(data));
    }
    if (doFetch) getDashboard();
  });

  const [data, setData] = useState({
    currPassword: "",
    newPassword: "",
    confirmPassword: "",
    emailNotifications: false,
    smsNotifications: false,
  });

  const handleClick = () => {
    navigator("..");
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const proceed = window.confirm(
      "Are you sure? You will need to login again"
    );
    if (proceed) submit(data, { method: "post" });
  };

  const userName = useSelector((state) => state.user.name);
  const canteenUserName = useSelector((state) => state.canteen.name);
  const userEmail = useSelector((state) => state.user.email);
  const canteenUserEmail = useSelector((state) => state.canteen.email);
  const [passwordVisible, setPasswordVisible] = useState({
    curr: false,
    newPass: false,
    confirmPass: false,
  });

  const name = userName || canteenUserName;
  const email = userEmail || canteenUserEmail;

  function makePasswordVisible(e) {
    setPasswordVisible((prev) => ({
      ...prev,
      [e]: !prev[e],
    }));
  }

  return (
    <div className="min-h-screen bg-green-50 dark:bg-[#121212] py-10 px-4 transition duration-300">
      <BackButton
        className="mb-5 py-2 px-4 bg-green-700 dark:bg-green-600 text-white rounded-lg hover:bg-green-800 dark:hover:bg-green-700 transition duration-300"
        onClick={handleClick}
      >
        Back
      </BackButton>
      <h1 className="text-4xl font-bold text-green-900 dark:text-green-200 mb-10 text-center">
        Settings
      </h1>
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Profile Settings */}
        <div className="bg-white dark:bg-[#181818] p-6 rounded-lg shadow-lg">
          <div className="flex items-center mb-4">
            <FaUser className="text-green-700 dark:text-green-500 text-2xl mr-2" />
            <h2 className="text-2xl font-semibold text-green-900 dark:text-green-200">
              Profile Settings
            </h2>
          </div>
          <form className="space-y-4">
            <div>
              <label
                className="block text-green-700 dark:text-green-500 font-medium mb-1"
                htmlFor="username"
              >
                Name
              </label>
              <div
                type="text"
                id="username"
                className="w-full p-2 border border-green-300 dark:border-green-700 text-black dark:text-white rounded-lg focus:outline-none focus:border-green-500 dark:focus:border-green-400"
              >
                {name}
              </div>
            </div>
            <div>
              <label
                className="block text-green-700 dark:text-green-500 font-medium mb-1"
                htmlFor="email"
              >
                Email
              </label>
              <div
                type="email"
                id="email"
                className="w-full p-2 border border-green-300 text-black dark:text-white dark:border-green-700 rounded-lg focus:outline-none focus:border-green-500 dark:focus:border-green-400"
              >
                {email}
              </div>
            </div>
          </form>
        </div>

        {/* Notification Settings */}
        <div className="bg-white dark:bg-[#181818] p-6 rounded-lg shadow-lg">
          <div className="flex items-center mb-4">
            <FaBell className="text-green-700 dark:text-green-500 text-2xl mr-2" />
            <h2 className="text-2xl font-semibold text-green-900 dark:text-green-200">
              Notification Settings
            </h2>
          </div>
          <form className="space-y-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="emailNotifications"
                name="emailNotifications"
                checked={data.emailNotifications}
                onChange={handleChange}
                className="h-5 w-5 text-green-600 dark:text-green-400 focus:ring-green-500 border-green-300 dark:border-green-700 rounded"
              />
              <label
                htmlFor="emailNotifications"
                className="ml-2 text-green-700 dark:text-green-500"
              >
                Email Notifications
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="smsNotifications"
                name="smsNotifications"
                checked={data.smsNotifications}
                onChange={handleChange}
                className="h-5 w-5 text-green-600 dark:text-green-400 focus:ring-green-500 border-green-300 dark:border-green-700 rounded"
              />
              <label
                htmlFor="smsNotifications"
                className="ml-2 text-green-700 dark:text-green-500"
              >
                SMS Notifications
              </label>
            </div>
            <button className="w-full py-2 bg-green-700 dark:bg-green-600 text-white rounded-lg hover:bg-green-800 dark:hover:bg-green-700 transition duration-300">
              Save Changes
            </button>
          </form>
        </div>

        {/* Dark Mode Settings */}
        <div className="bg-white dark:bg-[#181818] p-6 rounded-lg shadow-lg transition duration-300">
          <div className="flex items-center mb-4">
            <FaMoon className="text-green-700 dark:text-green-500 text-2xl mr-2" />
            <h2 className="text-2xl font-semibold text-green-900 dark:text-green-200">
              Dark Mode
            </h2>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-green-700 dark:text-green-500">
              Toggle Dark Mode
            </span>
            <button
              onClick={toggleDarkMode}
              className="p-2 bg-green-700 dark:bg-green-600 text-white rounded-lg hover:bg-green-800 dark:hover:bg-green-700 transition duration-300"
            >
              {!darkMode ? (
                <FaSun className="text-xl" />
              ) : (
                <FaMoon className="text-xl" />
              )}
            </button>
          </div>
        </div>

        {/* Account Security */}
        <div className="bg-white dark:bg-[#181818] p-6 rounded-lg shadow-lg">
          <div className="flex items-center mb-4">
            <FaLock className="text-green-700 dark:text-green-500 text-2xl mr-2" />
            <h2 className="text-2xl font-semibold text-green-900 dark:text-green-200">
              Account Security
            </h2>
          </div>
          <form className="space-y-4" method="POST" onSubmit={handleSubmit}>
            <div>
              <label
                className="block text-green-700 dark:text-green-500 font-medium mb-1"
                htmlFor="currentPassword"
              >
                Current Password
              </label>
              <div className="flex flex-row border border-green-300 dark:border-green-700 rounded-lg pr-2 focus-within:border-green-500 dark:focus-within:border-green-400 transition duration-300">
                <input
                  type={!passwordVisible.curr ? "password" : "text"}
                  id="currentPassword"
                  name="currPassword"
                  value={data.currPassword}
                  onChange={handleChange}
                  minLength={6}
                  required
                  className="w-full p-2 focus:ring-0 text-black dark:text-white focus:outline-none dark:bg-[#121212]"
                />
                <div
                  className="flex items-center justify-center cursor-pointer"
                  onClick={() => makePasswordVisible("curr")}
                >
                  {!passwordVisible.curr ? (
                    <FaRegEyeSlash className="text-green-700 dark:text-green-500 text-xl" />
                  ) : (
                    <IoEyeOutline className="text-green-700 dark:text-green-500 text-xl" />
                  )}
                </div>
              </div>
            </div>
            <div>
              <label
                className="block text-green-700 dark:text-green-500 font-medium mb-1"
                htmlFor="newPassword"
              >
                New Password
              </label>
              <div className="flex flex-row border border-green-300 dark:border-green-700 rounded-lg pr-2 focus-within:border-green-500 dark:focus-within:border-green-400 transition duration-300">
                <input
                  type={!passwordVisible.newPass ? "password" : "text"}
                  id="newPassword"
                  name="newPassword"
                  value={data.newPassword}
                  onChange={handleChange}
                  minLength={6}
                  required
                  className="w-full p-2 focus:ring-0 text-black dark:text-white focus:outline-none dark:bg-[#121212]"
                />
                <div
                  className="flex items-center justify-center cursor-pointer"
                  onClick={() => makePasswordVisible("newPass")}
                >
                  {!passwordVisible.newPass ? (
                    <FaRegEyeSlash className="text-green-700 dark:text-green-500 text-xl" />
                  ) : (
                    <IoEyeOutline className="text-green-700 dark:text-green-500 text-xl" />
                  )}
                </div>
              </div>
            </div>
            <div>
              <label
                className="block text-green-700 dark:text-green-500 font-medium mb-1"
                htmlFor="confirmPassword"
              >
                Confirm New Password
              </label>
              <div className="flex flex-row border border-green-300 dark:border-green-700 rounded-lg pr-2 focus-within:border-green-500 dark:focus-within:border-green-400 transition duration-300">
                <input
                  type={!passwordVisible.confirmPass ? "password" : "text"}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={data.confirmPassword}
                  onChange={handleChange}
                  minLength={6}
                  required
                  className="w-full p-2 focus:ring-0 text-black dark:text-white focus:outline-none dark:bg-[#121212]"
                />
                <div
                  className="flex items-center justify-center cursor-pointer"
                  onClick={() => makePasswordVisible("confirmPass")}
                >
                  {!passwordVisible.confirmPass ? (
                    <FaRegEyeSlash className="text-green-700 dark:text-green-500 text-xl" />
                  ) : (
                    <IoEyeOutline className="text-green-700 dark:text-green-500 text-xl" />
                  )}
                </div>
              </div>
            </div>
            <button className="w-full py-2 bg-green-700 dark:bg-green-600 text-white rounded-lg hover:bg-green-800 dark:hover:bg-green-700 transition duration-300">
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SettingsPage;
