// Settings.js
import { useState } from "react";

function Settings() {
  const [email, setEmail] = useState("user@example.com");
  const [phone, setPhone] = useState("123-456-7890");
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
              <label className="block text-gray-700">Username (USN)</label>
              <input
                type="text"
                value="USN123456"
                readOnly
                className="w-full p-2 border rounded-lg bg-gray-200 cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-gray-700">Name</label>
              <input
                type="text"
                value="John Doe"
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
