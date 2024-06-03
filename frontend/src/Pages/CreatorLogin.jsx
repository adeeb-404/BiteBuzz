import { useState } from "react";
import Header from "../Components/homepage/Header";
import { Form, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function CreatorLogin() {
  const [username, setUsername] = useState("");
  const [accessKey, setAccessKey] = useState("");
  const navigator = useNavigate();

  function handleClick() {
    navigator("..");
  }
  return (
    <>
      <Header />
      <div className="h-screen flex items-center justify-center bg-gray-100">
        <motion.div
          className="flex flex-col items-center border-2 border-gray-800 rounded-md bg-white p-8 shadow-lg relative"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
        >
          <div className="flex mb-4">
            <motion.button
              className="absolute right-0 top-0 p-2  border-l-2 border-b-2 border-stone-900 rounded-sm "
              whileHover={{ backgroundColor: "lightgreen" }}
              transition={{ type: "spring", duration: 1 }}
              onClick={handleClick}
            >
              X
            </motion.button>
            <button
              className="px-8 py-2 bg-gray-800 text-white rounded-md"
              disabled
            >
              Creator Login
            </button>
          </div>
          <Form className="flex flex-col" method="post">
            <input
              name="username"
              type="text"
              placeholder="Username"
              className="mb-4 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              aria-label="Username"
            />
            <input
              name="accessKey"
              type="password"
              placeholder="Access Key"
              className="mb-4 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800"
              value={accessKey}
              onChange={(e) => setAccessKey(e.target.value)}
              aria-label="Access Key"
            />
            <button className="bg-gray-800 text-white py-2 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-800">
              Login
            </button>
          </Form>
        </motion.div>
      </div>
    </>
  );
}

export default CreatorLogin;
