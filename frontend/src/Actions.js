import { json, redirect } from "react-router-dom";
// import { userActions } from "./store/Studentuser";

// export async function LoginAction({ request }) {
//   const data = await request.formData();
//   const userType = data.get("userType");

//   if (userType === "student") {
//     const result = {
//       USN: data.get("USN"),
//       password: data.get("password"),
//     };
//     const response = await fetch("http://localhost:5000/api/user/login", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(result),
//     });
//     if (response.status == 400) return response;

//     if (!response.ok)
//       throw new json(
//         { message: "Server error" },
//         { status: 500, statusText: "An error occurred" && response.message }
//       );
//     const userData = await response.json();
//     console.log(userData);
//     userActions.initialize(userData);
//     localStorage.setItem("student", userData._id);
//     return redirect("/");
//   }

//   localStorage.setItem("canteen", "abc");
//   return redirect("/canteen");
// }

export async function changePasswordAction({ request }) {
  const data = await request.formData();

  const result = {
    userId: localStorage.getItem("user"),
    currentPassword: data.get("currPassword"),
    newPassword: data.get("newPassword"),
  };
  const response = await fetch("http://localhost:5000/api/user/settings", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(result),
  });
  if (response.status == 400) return response;

  if (!response.ok)
    throw new json(
      { message: "Server error" },
      { status: 500, statusText: "An error occurred" && response.message }
    );
  return redirect("/home");
}
