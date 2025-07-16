import Footer from "@components/Footer/Footer";
import Navbar from "@components/Navbar/Navbar";

const Layout = ({ children }) => {
  return (
    <div className="Layout">
      <Navbar />
      <main className="main-content-wrapper">{children}</main>
      <Footer />
    </div>
  );
};

export { Layout };
