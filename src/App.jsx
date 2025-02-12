import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLoyout from "./components/MainLoyout";
import Home from "./pages/Home";
import SingleProduct from "./pages/SingleProduct";
import PageNoInfo from "./pages/PageNoInfo";
import { useState } from "react";

function App() {
  const [salom, setSalom] = useState(false);
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLoyout />,
      children: [
        {
          index: true,
          element: salom ? <Home /> : <PageNoInfo />, // Shart qo‘ydik
        },
        {
          path: "/singleproducts/:id",
          element: <SingleProduct />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;

//https://file.notion.so/f/f/5b638310-5a1e-44da-a320-410c29ac135b/9489b2d7-7a13-4058-8fa1-f79a6f0c5e10/data.json?table=block&id=1948b22a-1b3d-80fa-9c0a-c4820fb4b35d&spaceId=5b638310-5a1e-44da-a320-410c29ac135b&expirationTimestamp=1739181600000&signature=Ua0b2Widdh6pRXBKK2Nn9yT_mmfAAkc5GhsfudX0mck&downloadName=data.json
