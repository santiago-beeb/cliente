import { Layout } from "../containers/layout";
import { AppContext } from "../context/AppContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useInitialState } from "../hooks/useInitialState";
import Home from "../pages/Home/Home";
import { Login } from "../pages/Login/Login";
import { CreateAccount } from "../pages/CreateAccount/CreateAccount";
import "./App.css"

const App = () => {
  const initialState = useInitialState();
  return (
    <AppContext.Provider value={initialState}>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<CreateAccount />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </AppContext.Provider>
  );
};

export default App;
