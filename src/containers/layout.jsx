import Navbar from "../components/Navbar/Navbar";

const Layout = ({ children }) => {
  return (
    <div className="Layout">
      <Navbar />
      {children}
    </div>
  );
};

export { Layout };
