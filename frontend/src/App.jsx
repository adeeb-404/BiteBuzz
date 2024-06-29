import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Pages/Home.jsx";
import Login from "./Pages/Login.jsx";
import { ThemeProvider } from "./darkmodecontext.jsx";
import MainPage from "./Pages/MainPage.jsx";
import Root from "./Root.jsx";
import CanteenRoot from "./CanteenRoot.jsx";
import {
  isUserAuthLoader,
  isCanteenAuthLoader,
  canteenMenuLoader,
  historyLoader,
} from "./Loaders.js";
import { changePasswordAction } from "./Actions.js";
import Settings from "./Pages/Settings.jsx";
import Menu from "./Pages/Menu.jsx";
import CanteenPage from "./Pages/CanteenPage.jsx";
import Cart from "./Pages/Cart.jsx";
import UserHistory from "./Pages/UserHistory.jsx";
import FoodConfiguration from "./Pages/FoodConfiguration.jsx";
import CanteenHistory from "./Pages/CanteenHistory.jsx";

const router = createBrowserRouter([
  {
    path: "",
    loader: isUserAuthLoader,
    element: <Root />,
    children: [
      {
        index: true,
        element: <MainPage />,
      },
      { path: "settings", element: <Settings />, action: changePasswordAction },
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
            loader: historyLoader,
          },
          {
            path: "food",
            element: <FoodConfiguration />,
          },
        ],
      },
      {
        path: "cart",
        element: <Cart />,
      },
    ],
  },
  {
    path: "canteen",
    element: <CanteenRoot />,
    loader: isCanteenAuthLoader,
    children: [
      {
        path: "canteen",
        element: <CanteenPage />,
      },
      { path: "settings", element: <Settings />, action: changePasswordAction },
      {
        path: "history",
        element: <CanteenHistory />,
      },
    ],
  },
  { path: "home", element: <Home /> },
  { path: "login", element: <Login /> },
]);

function App() {
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
