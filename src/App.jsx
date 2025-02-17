import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLoyout from "./components/MainLoyout";
import Home from "./pages/Home";
import SingleProduct from "./pages/SingleProduct";
import PageNoInfo from "./pages/PageNoInfo";
import { useState, useEffect } from "react";
import axios from "axios";
import ErrorPage from "./pages/ErrorPage";

function App() {
  const [exsist, setExsist] = useState(true);
  const [malumot, setMalumot] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/treap");
        setMalumot(response.data);
      } catch (error) {
        console.error("API dan malumot olishda xatolik:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const newMalumot = malumot.some((item) => !!item.id);
    setExsist(newMalumot); // Agar hech qanday `id` bo‘lmasa, false bo‘ladi
  }, [malumot]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLoyout />,
      errorElement: <ErrorPage />, // Xato bo‘lsa shu sahifa chiqadi
      children: [
        {
          index: true,
          element: exsist ? <Home /> : <PageNoInfo />,
        },
        {
          path: "/singleproducts/:id",
          element: <SingleProduct />,
        },
      ],
    },
    {
      path: "*",
      element: <ErrorPage />, // 404 Not Found sahifasi
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
