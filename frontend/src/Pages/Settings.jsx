import { FaUser, FaBell, FaLock, FaRegEyeSlash } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";
import { useNavigate, Form } from "react-router-dom";
import BackButton from "../Customs/BackButton";
import { useSelector } from "react-redux";
import { useState } from "react";

function SettingsPage() {
  const navigate = useNavigate();
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

  function handleClick() {
    navigate("..");
  }

  function makePasswordVisible(e) {
    setPasswordVisible((prev) => ({
      ...prev,
      [e]: !prev[e],
    }));
  }

  return (
    <div className="min-h-screen bg-green-50 py-10 px-4">
      <BackButton
        className="mb-5 py-2 px-4 bg-green-700 text-white rounded-lg hover:bg-green-800 transition duration-300"
        onClick={handleClick}
      >
        Back
      </BackButton>
      <h1 className="text-4xl font-bold text-green-900 mb-10 text-center">
        Settings
      </h1>
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Profile Settings */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center mb-4">
            <FaUser className="text-green-700 text-2xl mr-2" />
            <h2 className="text-2xl font-semibold text-green-900">
              Profile Settings
            </h2>
          </div>
          <form className="space-y-4">
            <div>
              <label
                className="block text-green-700 font-medium mb-1"
                htmlFor="username"
              >
                Name
              </label>
              <div
                type="text"
                id="username"
                className="w-full p-2 border border-green-300 rounded-lg focus:outline-none focus:border-green-500"
              >
                {name}
              </div>
            </div>
            <div>
              <label
                className="block text-green-700 font-medium mb-1"
                htmlFor="email"
              >
                Email
              </label>
              <div
                type="email"
                id="email"
                className="w-full p-2 border border-green-300 rounded-lg focus:outline-none focus:border-green-500"
              >
                {email}
              </div>
            </div>
          </form>
        </div>

        {/* Notification Settings */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center mb-4">
            <FaBell className="text-green-700 text-2xl mr-2" />
            <h2 className="text-2xl font-semibold text-green-900">
              Notification Settings
            </h2>
          </div>
          <form className="space-y-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="emailNotifications"
                className="h-5 w-5 text-green-600 focus:ring-green-500 border-green-300 rounded"
              />
              <label
                htmlFor="emailNotifications"
                className="ml-2 text-green-700"
              >
                Email Notifications
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="smsNotifications"
                className="h-5 w-5 text-green-600 focus:ring-green-500 border-green-300 rounded"
              />
              <label htmlFor="smsNotifications" className="ml-2 text-green-700">
                SMS Notifications
              </label>
            </div>
            <button className="w-full py-2 bg-green-700 text-white rounded-lg hover:bg-green-800 transition duration-300">
              Save Changes
            </button>
          </form>
        </div>

        {/* Account Security */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center mb-4">
            <FaLock className="text-green-700 text-2xl mr-2" />
            <h2 className="text-2xl font-semibold text-green-900">
              Account Security
            </h2>
          </div>
          <Form className="space-y-4" method="POST">
            <div>
              <label
                className="block text-green-700 font-medium mb-1"
                htmlFor="currentPassword"
              >
                Current Password
              </label>
              <div className="flex flex-row border border-green-300 rounded-lg pr-2 focus-within:border-black">
                <input
                  type={!passwordVisible.curr ? "password" : "text"}
                  id="currentPassword"
                  name="currPassword"
                  className="w-full p-2 focus:ring-0 focus:outline-none"
                />
                <div
                  className="flex items-center justify-center cursor-pointer"
                  onClick={() => makePasswordVisible("curr")}
                >
                  {!passwordVisible.curr ? (
                    <FaRegEyeSlash className="text-green-700 text-xl" />
                  ) : (
                    <IoEyeOutline className="text-green-700 text-xl" />
                  )}
                </div>
              </div>
            </div>
            <div>
              <label
                className="block text-green-700 font-medium mb-1"
                htmlFor="newPassword"
              >
                New Password
              </label>
              <div className="flex border border-green-300 rounded-lg pr-2 focus-within:border-black">
                <input
                  type={!passwordVisible.newPass ? "password" : "text"}
                  id="newPassword"
                  name="newPassword"
                  minLength="6"
                  className="w-full p-2 focus:ring-0 focus:outline-none"
                />
                <div
                  className="flex items-center justify-center cursor-pointer"
                  onClick={() => makePasswordVisible("newPass")}
                >
                  {!passwordVisible.newPass ? (
                    <FaRegEyeSlash className="text-green-700 text-xl" />
                  ) : (
                    <IoEyeOutline className="text-green-700 text-xl" />
                  )}
                </div>
              </div>
            </div>
            <div>
              <label
                className="block text-green-700 font-medium mb-1"
                htmlFor="confirmPassword"
              >
                Confirm New Password
              </label>
              <div className="flex border border-green-300 rounded-lg pr-2 focus-within:border-black">
                <input
                  type={!passwordVisible.confirmPass ? "password" : "text"}
                  id="confirmPassword"
                  className="w-full p-2 focus:ring-0 focus:outline-none"
                  minLength={6}
                />
                <div
                  className="flex items-center justify-center cursor-pointer"
                  onClick={() => makePasswordVisible("confirmPass")}
                >
                  {!passwordVisible.confirmPass ? (
                    <FaRegEyeSlash className="text-green-700 text-xl" />
                  ) : (
                    <IoEyeOutline className="text-green-700 text-xl" />
                  )}
                </div>
              </div>
            </div>
            <button className="w-full py-2 bg-green-700 text-white rounded-lg hover:bg-green-800 transition duration-300">
              Save Changes
            </button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default SettingsPage;
