import { json, redirect } from "react-router-dom";

export async function LoginAction({ request }) {
  const data = await request.formData();
  const userType = data.get("userType");
  console.log(userType);
  const result = {
    USN: data.get("USN"),
    password: data.get("password"),
  };
  if (userType === "student") {
    const response = await fetch("http://localhost:5000/api/user/login", {
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
  }
  localStorage.setItem("token", "abc");
  return redirect("/");
}
