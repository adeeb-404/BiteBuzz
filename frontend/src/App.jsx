import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Pages/Home.jsx";
import { ThemeProvider } from "./darkmodecontext.jsx";

const router = createBrowserRouter([
  { path: "/" },
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
