import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import PrivateRoutes from "../components/PrivateRoutes";
import RoadmapDetails from "../pages/RoadmapDetails";
import Login from "../auth/Login";
import Register from "../auth/Register";
import MainLayout from "../mainLayout/MainLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "roadmap/:id",
        element: (
          <PrivateRoutes>
            <RoadmapDetails />
          </PrivateRoutes>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Register />,
  },
]);
