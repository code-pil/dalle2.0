import { RouterProvider, createBrowserRouter } from "react-router-dom";

import {
  Home,
  CreatePost,
  Root,
  Error,
  Auth,
  action as logoutAction,
} from "./Pages";
import { loader as postLoader } from "./Pages/Home";
import { action as authAction } from "./Pages/Auth";
import { checkAuthLoader, tokenLoader } from "./utils";
import "./App.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Error />,
    id: "root",
    loader: tokenLoader,
    children: [
      { index: true, element: <Home />, loader: postLoader },
      {
        path: "create-post",
        element: <CreatePost />,
        loader: checkAuthLoader,
      },
      {
        path: "auth",
        element: <Auth />,
        action: authAction,
      },
      {
        path: "logout",
        action: logoutAction,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
