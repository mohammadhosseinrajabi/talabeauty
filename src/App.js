import React, { useContext } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "./auth/login";
import "./styles/global.css";

import "./App.css";
import HomeNew from "./home_new/HomeNew";
import IndexAdmin from "./pages/admin/layout";
import CustomerSignup from "./auth/customersignup";
import LoginAdmin from "./auth/loginAdmin";
import ProtectedRoute from "./components/ProtectedRoute";
import { ForceRenderProv } from "./context/forceRenderContext";
import ProductsPage from "./pages/productsPage/productsPage";

import AuthContext from "./context/AuthContext";
import StylistPage from "./pages/stylistPage/stylistPage";
import ShopingCart from "./pages/shopping cart/shoppingCart";
import { CartProvider } from "./context/cartContext";


function App() {
  const { ProtectedRouteLogin } = useContext(AuthContext);
  return (
    <ForceRenderProv>
      <Router>
        <CartProvider>
          <div className="App">
            <Routes>
              {/* <Route path='/login' element={<Login/>} /> */}

              <Route path="/login" element={ProtectedRouteLogin(<Login />)} />
              {/* <Route 
        path="/customersignup" 
        element={ protectLoginRoute(<CustomerSignup />) } 
      /> */}

              <Route path="/LoginAdmin" element={<LoginAdmin />} />
              {/* <Route path="/logout" element={<Logout />} /> */}
              <Route path="/CustomerSignup" element={<CustomerSignup />} />
              <Route path="/home" element={<HomeNew />} />
              <Route path="/ProductPage/:id" element={<ProductsPage />} />
              <Route path="/StylistPage/:id" element={<StylistPage />} />
      


              <Route
                path="/admin/*"
                element={
                  <ProtectedRoute isAdmin={true}>
                    <IndexAdmin />
                  </ProtectedRoute>
                }
              />
              <Route path="/shoppingCart" element={<ShopingCart />} />

              <Route path="*" element={<HomeNew />} />
            </Routes>
          </div>
        </CartProvider>
      </Router>
    </ForceRenderProv>
  );
}

export default App;
