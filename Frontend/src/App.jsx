import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Pizza from "./pages/Pizza";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import CartProvider from "./context/CartContext";
import UserProvider, { UserContext } from "./context/UserContext";

const AppRoutes = () => {
  const { token } = useContext(UserContext);

  return (
    <Routes>
      <Route path="/" element={<Home />} />

      {/* PÚBLICAS SOLO SIN SESIÓN: si HAY token, manda a HOME */}
      <Route
        path="/login"
        element={!token ? <LoginPage /> : <Navigate to="/" replace />}
      />
      <Route
        path="/register"
        element={!token ? <RegisterPage /> : <Navigate to="/" replace />}
      />

      <Route path="/cart" element={<Cart />} />
      <Route path="/pizza/:id" element={<Pizza />} />

      {/* PRIVADA: si NO HAY token, manda a LOGIN (NO a home) */}
      <Route
        path="/profile"
        element={token ? <Profile /> : <Navigate to="/login" replace />}
      />

      <Route path="/404" element={<NotFound />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
};

const App = () => {
  return (
    <UserProvider>
      <CartProvider>
        <BrowserRouter>
          <Navbar />
          <AppRoutes />
          <Footer />
        </BrowserRouter>
      </CartProvider>
    </UserProvider>
  );
};

export default App;
