import { redirect } from "react-router-dom";

export function isAuthLoader() {
  if (!localStorage.getItem("token")) return redirect("/home");
  else return null;
}
