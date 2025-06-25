import { createBrowserRouter } from "react-router-dom";
import Home from '../pages/Home.jsx'
import Coin from '../pages/Coin.jsx'
//import Favorites from '../pages/Favorites.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
    children: [
      {index: true, element: <Home />},
      {path:"coin/:slug", element: <Coin />},
      //{path: "favorites", element: <Favorites />}
    ]
  }
])


export default router