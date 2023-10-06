import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "../containers/layout";
import { Home } from "../pages/Home/Home";
import { Login } from "../pages/Login/Login";
import { CreateAccount } from "../pages/CreateAccount/CreateAccount";
import "./App.css";
import { NotFound } from "../pages/NotFound/NotFound";
import { AdminProduct } from "../pages/AdminProduct/AdminProduct";
import { Checkout } from "../pages/Checkout/Checkout";
import { AppContext, AppProvider } from "../context/AppContext";
import { useContext } from "react";

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginWrapper />} />
            <Route path="/signup" element={<CreateAccountWrapper />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/administrar-productos" element={<AdminWrapper />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </AppProvider>
  );
}

const LoginWrapper = () => {
  const { isLoggedIn } = useContext(AppContext);
  return isLoggedIn ? <Navigate to="/" /> : <Login />;
};

const AdminWrapper = () => {
  const { isAdmin } = useContext(AppContext);
  return !isAdmin ? <Navigate to="/" /> : <AdminProduct />;
};

const CreateAccountWrapper = () => {
  const { isLoggedIn } = useContext(AppContext);
  return isLoggedIn ? <Navigate to="/" /> : <CreateAccount />;
};

export default App;
