/* eslint-disable react/prop-types */
// Settings.js
import { useState } from "react";
import { useSelector } from "react-redux";

function Settings({ isCanteen }) {
  let usn = useSelector((state) => state.user.usn);
  let name = useSelector((state) => state.user.usn);
  let curEmail = useSelector((state) => state.user.usn);
  let curphoneNo = useSelector((state) => state.user.usn);
  let usnc = useSelector((state) => state.canteen.usn);
  let namec = useSelector((state) => state.canteen.usn);
  let curEmailc = useSelector((state) => state.canteen.usn);
  let curphoneNoc = useSelector((state) => state.canteen.usn);

  const [email, setEmail] = useState(curEmail);
  const [phone, setPhone] = useState(curphoneNo);
  const [profilePic, setProfilePic] = useState(
    "https://via.placeholder.com/150"
  ); // Placeholder image

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const handleProfilePicChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfilePic(e.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold mb-4">Settings</h1>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">User Profile</h2>
          <div className="space-y-2">
            <div className="flex items-center space-x-4">
              <img
                src={profilePic}
                alt="Profile"
                className="w-20 h-20 rounded-full"
              />
              <input
                type="file"
                onChange={handleProfilePicChange}
                className="text-sm text-gray-600"
              />
            </div>
            <div>
              <label className="block text-gray-700">
                {isCanteen ? "Canteen Name" : "Username (USN)"}
              </label>
              <input
                type="text"
                value={usn}
                readOnly
                className="w-full p-2 border rounded-lg bg-gray-200 cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-gray-700">Name</label>
              <input
                type="text"
                value={name}
                readOnly
                className="w-full p-2 border rounded-lg bg-gray-200 cursor-not-allowed"
              />
            </div>
          </div>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Contact Information</h2>
          <div className="space-y-2">
            <div>
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                value={email}
                onChange={handleEmailChange}
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-gray-700">Phone Number</label>
              <input
                type="tel"
                value={phone}
                onChange={handlePhoneChange}
                className="w-full p-2 border rounded-lg"
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Settings;
