import { redirect } from "react-router-dom";

export function isAuthLoader() {
  if (!localStorage.getItem("user")) return redirect("/home");
  else return null;
}
