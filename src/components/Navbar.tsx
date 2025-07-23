import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav>
      <ul>
        <Link to="/signup">Signup</Link>
        <Link to="/signup">Login</Link>
      </ul>
    </nav>
  );
}
