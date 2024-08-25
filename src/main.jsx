import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import React from "react";
import "./index.css";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import Home from "./pages/Home.jsx";
import SingleArticle from "./components/SingleArticle.jsx";
import Blog from "./pages/Blog.jsx";
import BrakeLink from "./pages/404.jsx";
import Testing from "./pages/Testing.jsx";
import CategoryPage from "./pages/CategoryPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "testing",
        element: <Testing />,
      },
      {
        path: `/post/:slug`,
        element: <SingleArticle />,
      },
      {
        path: `/category/:slug`,
        element: <CategoryPage />,
      },
      {
        path: "blog",
        element: <Blog />,
      },
      {
        path: `*`,
        element: <BrakeLink />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
