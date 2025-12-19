import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/home";
import Product from "../pages/Product/product";
import ProductDetail from "../pages/Product/productDetail";
import Contact from "../pages/Contact/contact";
import Login from "../pages/login";
import Logout from "../pages/logout";
import Profile from "../pages/profile";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<Product />} />
        <Route path="product/:id" element={<ProductDetail />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
    </Routes>
  );
}
