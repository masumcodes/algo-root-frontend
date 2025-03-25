import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router";
import EditTask from "./pages/EditTask";
import { Button } from "./components/ui/button";
import Home from "./pages/Home";
function App() {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/Edit-Task/:id",
      element: <EditTask />,
    },
  ]);
  return <RouterProvider router={appRouter} />;
}

export default App;
