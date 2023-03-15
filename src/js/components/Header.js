import { Link } from "react-router-dom";

function Header() {
  return (
    <>
      <header>
        <Link to="/" className="header-link">
          Home
        </Link>
        <Link to="/budget" className="header-link">
          Budget
        </Link>
      </header>
    </>
  );
}

export default Header;
