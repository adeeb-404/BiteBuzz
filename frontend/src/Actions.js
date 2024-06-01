import { redirect } from "react-router-dom";

export async function LoginAction({ request }) {
  const data = await request.formData();

  const result = {
    username: data.get("username"),
    password: data.get("password"),
    userType: data.get("userType"),
  };
  console.log(result);
  localStorage.setItem("token", "abc");
  return redirect("/");
}

export async function CreatorLoginAction({ request }) {
  const data = await request.formData();

  const result = {
    username: data.get("username"),
    accessKey: data.get("accessKey"),
  };
  console.log(result);
  localStorage.setItem("token", "abc");
  return redirect("/");
}
