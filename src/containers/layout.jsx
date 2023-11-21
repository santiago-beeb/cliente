import Footer from "@components/Footer/Footer";
import Navbar from "@components/Navbar/Navbar";

const Layout = ({ children }) => {
  return (
    <div className="Layout">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export { Layout };
