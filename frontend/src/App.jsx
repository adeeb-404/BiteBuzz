import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Pages/Home.jsx";
import Login from "./Pages/Login.jsx";
import { ThemeProvider } from "./darkmodecontext.jsx";
import MainPage from "./Pages/MainPage.jsx";
import Root from "./Root.jsx";
import { isAuthLoader, canteenMenuLoader } from "./Loaders.js";
import { LoginAction, changePasswordAction } from "./Actions.js";
import Settings from "./Pages/Settings.jsx";
import Menu from "./Pages/Menu.jsx";
import CanteenPage from "./Pages/CanteenPage.jsx";
import Cart from "./Pages/Cart.jsx";
import UserHistory from "./Pages/UserHistory.jsx";
import FoodConfiguration from "./Pages/FoodConfiguration.jsx";

const router = createBrowserRouter([
  {
    path: "",
    loader: isAuthLoader,
    element: <Root />,
    children: [
      {
        index: true,
        element: <MainPage />,
      },
      {
        path: "canteen",
        children: [{ index: true, element: <CanteenPage /> }],
      },
      {
        path: ":canteenId",
        children: [
          {
            index: true,
            element: <Menu />,
            loader: canteenMenuLoader,
          },
          {
            path: "history",
            element: <UserHistory />,
          },
          {
            path: "food",
            element: <FoodConfiguration />,
          },
          {
            path:"history",
            element: <CanteenHistory />,
          }
        ],
      },
      {
        path: "cart",
        element: <Cart />,
      },
    ],
  },
  { path: "home", element: <Home /> },
  { path: "login", element: <Login />, action: LoginAction },
  { path: "settings", element: <Settings />, action: changePasswordAction },
]);

function App() {
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
