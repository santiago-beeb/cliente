import { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppContext, AppProvider } from "@context/AppContext";
import { Layout } from "@containers/layout";
import { Home } from "@pages/Home/Home";
import { Login } from "@pages/Login/Login";
import { CreateAccount } from "@pages/CreateAccount/CreateAccount";
import { NotFound } from "@pages/NotFound/NotFound";
import { AdminProduct } from "@pages/AdminProduct/AdminProduct";
import { Checkout } from "@pages/Checkout/Checkout";
import { ActivateUser } from "@pages/ActivateUser/ActivateUser";
import Women from "@pages/Category/Women";
import Men from "@pages/Category/Men";
import PasswordRecovery from "@pages/PasswordRecovery/PasswordRecovery";
import "./App.css";

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginWrapper />} />
            <Route path="/signup" element={<CreateAccountWrapper />} />
            <Route path="/checkout" element={<CheckoutWrapper />} />
            <Route path="/men" element={<Men />} />
            <Route path="/women" element={<Women />} />
            <Route path="/password-recovery" element={<PasswordRecovery />} />
            <Route path="/administrar-productos" element={<AdminWrapper />} />
            <Route path="/activate/:userId" element={<ActivateUser />} />
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

const CheckoutWrapper = () => {
  const { isLoggedIn } = useContext(AppContext);
  return !isLoggedIn ? <Navigate to="/login" /> : <Checkout />;
};

export default App;
