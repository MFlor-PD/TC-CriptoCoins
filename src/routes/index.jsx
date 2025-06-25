import { createBrowserRouter } from "react-router-dom";
import Root from '../pages/Root.jsx';
import Home from '../pages/Home.jsx'
import Coin from '../pages/Coin.jsx'
import Favorites from '../pages/Favorites.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
    children: [
      {index: true, element: <Home />},
      {path:"coin/:slug", element: <Coin />},
      {path: "favorites", element: <Favorites />}
    ]
  }
])


export default router