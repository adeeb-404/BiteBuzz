import { json, redirect } from "react-router-dom";

export function isUserAuthLoader() {
  if (localStorage.getItem("canteen")) return redirect("/canteen");
  if (!localStorage.getItem("student")) return redirect("/home");
  else return null;
}

export function isCanteenAuthLoader() {
  if (localStorage.getItem("student")) return redirect("/");
  if (!localStorage.getItem("canteen")) return redirect("/home");
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

export async function historyLoader({ params }) {
  const id = params.canteenId;
  const result = {
    userId: localStorage.getItem("student"),
  };
  const response = await fetch(`http://localhost:5000/api/user/${id}/history`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(result),
  });
  if (!response.ok) {
    throw new json({ message: "could not fetch data" }, { status: 500 });
  }
  return response;
}
