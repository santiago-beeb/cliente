import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <p>
        {"Copyright © "}
        <a color="inherit" href="https://general-shop.vercel.app/">
          General Shop
        </a>{" "}
        {new Date().getFullYear()}
        {"."}
      </p>
    </div>
  );
};

export default Footer;
