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
    const response = await fetch("http://localhost:5000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(result),
    });

    if (response.status == 400) return response;

    if (!response.ok)
      throw new json(
        { message: "invalid username or password" },
        { status: 400, statusText: "An error occurred" && response.message }
      );
    const data = await response.json();
    console.log(data);
  }

  console.log(result);
  localStorage.setItem("token", "abc");
  return redirect("/");
}
