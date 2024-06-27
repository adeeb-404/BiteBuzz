import { json, redirect } from "react-router-dom";

export function isAuthLoader() {
  if (!localStorage.getItem("user")) return redirect("/home");
  else return null;
}

export async function canteenMenuLoader({ params }) {
  const id = params.canteenId;
  const response = await fetch(`http://localhost:5000/api/user/${id}`);
  if (!response.ok) {
    throw new json({ message: "could not fetch data" }, { status: 500 });
  }
  return response;
}
