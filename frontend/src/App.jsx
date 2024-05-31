import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Pages/Home.jsx";
import { ThemeProvider } from "./darkmodecontext.jsx";
import MainPage from "./Pages/MainPage.jsx";
import Root from "./Root.jsx";

const router = createBrowserRouter([
  { path: "/",element:<Root/>,children:[{
    index:true,
    element:<MainPage/>
  }] },
  { path: "/home", element: <Home /> },
]);

function App() {
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
