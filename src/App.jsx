import React from "react";
import Home from "./components/Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Contact from "./components/Contact";
import Register from "./pages/Register";
import Products from "./components/Products";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import ChangePassword from "./pages/ChangePassword";
import ProtectedRoute from "./components/ProtectedRoute";
import DeleteUser from "./pages/DeleteUser";
import AdminDashboard from "./components/AdminDashboard";
import NotAuthorized from "./pages/NotAuthorized";
import Cart from "./components/Cart";
import FloatingCartButton from "./components/FloatingCartButton";

const AppContent = () => {
  const location = useLocation();
  const hideheader = ["/login", "/register"].includes(location.pathname);
  const hideCartButton = ["/login", "/register"].includes(location.pathname);

  return (
    <>
      {!hideheader && <Header />}

      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/products" element={<Products />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute userOnly={true}>
              <Dashboard />
            </ProtectedRoute>
          }
        ></Route>
        <Route path="/change-password" element={<ChangePassword />}></Route>
        <Route
          path="/delete"
          element={
            <ProtectedRoute>
              <DeleteUser />
            </ProtectedRoute>
          }
        ></Route>

        <Route
          path="/admin"
          element={
            <ProtectedRoute adminOnly={true}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route path="/not-authorized" element={<NotAuthorized />} />
      </Routes>

      {/* ✅ Show Floating Cart Button only when not hidden */}
      {!hideCartButton && <FloatingCartButton />}
      <Footer />
    </>
  );
};

const App = () => {
  return (
    <BrowserRouter basename="/Cake-Shop">
      <AppContent />
      <ToastContainer autoClose={1000} />
    </BrowserRouter>
  );
};
export default App;
